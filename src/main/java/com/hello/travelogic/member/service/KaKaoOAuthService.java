package com.hello.travelogic.member.service;

import com.hello.travelogic.member.domain.AuthorityEntity;
import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.member.domain.MemberRoleEntity;
import com.hello.travelogic.member.dto.LoginRequestDTO;
import com.hello.travelogic.member.dto.LoginResponseDTO;
import com.hello.travelogic.member.repository.AuthorityRepository;
import com.hello.travelogic.member.repository.MemberRepository;
import com.hello.travelogic.member.repository.MemberRoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class KaKaoOAuthService {

    @Value("${kakao.client-id}")
    private String clientId;

    @Value("${kakao.redirect-uri}")
    private String redirectUri;

    private final AuthorityRepository authorityRepository;
    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final MemberRoleRepository memberRoleRepository;

    public LoginResponseDTO kakaoLogin(String code) {
        log.info("[KAKAO] 전달받은 CODE: {}", code);

        // 빈 값 체크
        if (code == null || code.trim().isEmpty()) {
            throw new IllegalArgumentException("인가 코드가 비어 있습니다.");
        }
        if (clientId == null || clientId.trim().isEmpty()) {
            log.error("[KAKAO] clientId 환경설정이 비어 있음");
            throw new IllegalStateException("카카오 클라이언트 ID가 설정되지 않았습니다.");
        }
        if (redirectUri == null || redirectUri.trim().isEmpty()) {
            log.error("[KAKAO] redirectUri 환경설정이 비어 있음");
            throw new IllegalStateException("카카오 리다이렉트 URI가 설정되지 않았습니다.");
        }

        RestTemplate restTemplate = new RestTemplate();

        String tokenUrl = "https://kauth.kakao.com/oauth/token";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("redirect_uri", redirectUri);
        params.add("code", code);

        log.debug("[KAKAO] 토큰요청 params: client_id={}, redirect_uri={}, code={}", clientId, redirectUri, code);

        HttpEntity<MultiValueMap<String, String>> tokenRequest = new HttpEntity<>(params, headers);

        ResponseEntity<String> tokenResponse;
        try {
            tokenResponse = restTemplate.exchange(
                    tokenUrl,
                    HttpMethod.POST,
                    tokenRequest,
                    String.class
            );
        } catch (HttpClientErrorException.BadRequest e) {
            // 카카오에서 내려준 에러 내용도 로그로 남김
            log.error("[KAKAO] 토큰 요청 실패 (400 Bad Request). 요청 파라미터: {}, 응답: {}", params, e.getResponseBodyAsString());
            throw new IllegalArgumentException("카카오 인증에 실패했습니다: " + e.getResponseBodyAsString());
        } catch (HttpClientErrorException e) {
            log.error("[KAKAO] 토큰 요청 실패. 요청 파라미터: {}, 응답: {}", params, e.getResponseBodyAsString());
            throw new IllegalArgumentException("카카오 인증에 실패했습니다: " + e.getResponseBodyAsString());
        }

        log.info("[KAKAO] 토큰응답: {}", tokenResponse.getBody());

        String accessToken;
        try {
            accessToken = new JSONObject(tokenResponse.getBody()).getString("access_token");
        } catch (Exception ex) {
            log.error("[KAKAO] access_token 추출 실패: {}", tokenResponse.getBody());
            throw new IllegalArgumentException("카카오 토큰 응답 파싱에 실패했습니다.");
        }

        // 이하 동작 동일
        HttpHeaders infoHeaders = new HttpHeaders();
        infoHeaders.setBearerAuth(accessToken);

        HttpEntity<String> infoRequest = new HttpEntity<>(infoHeaders);
        ResponseEntity<String> userInfoResponse = restTemplate.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.GET,
                infoRequest,
                String.class
        );

        log.info("[KAKAO] 사용자 정보 API 응답: {}", userInfoResponse.getBody());

        JSONObject kakaoAccount = new JSONObject(userInfoResponse.getBody())
                .getJSONObject("kakao_account");
        Long kakaoId = new JSONObject(userInfoResponse.getBody()).getLong("id");
        String email = kakaoAccount.optString("email");
        String nickname = kakaoAccount.getJSONObject("profile").optString("nickname");
        String profileImageUrl = "";
        if (kakaoAccount.has("profile")) {
            profileImageUrl = kakaoAccount.getJSONObject("profile").optString("profile_image_url", "");
        }
        AuthorityEntity userAuthority = authorityRepository.findByAuthorityName("ROLE_USER");

        // 1. 카카오 소셜타입+ID로 먼저 회원 찾기
        Optional<MemberEntity> optionalMember = memberRepository.findBySocialTypeAndSocialAccountId("kakao", kakaoId);

        if (optionalMember.isPresent()) {
            MemberEntity member = optionalMember.get();
            if (!"Y".equals(member.getAdminActive())) {
                throw new RuntimeException("관리자에 의해 비활성화된 계정입니다.");
            }
            // (1) 탈퇴 상태면 재활성
            if ("Y".equals(member.getMemberEndstatus())) {
                updateMemberAsRejoinedFromKakao(member, nickname, email, profileImageUrl, kakaoId);
                member = memberRepository.save(member);

                // 권한 체크 및 부여
                boolean alreadyHasRole = member.getRoles() != null &&
                        member.getRoles().stream()
                                .anyMatch(role ->
                                        role.getAuthority() != null &&
                                                role.getAuthority().getAuthorityCode().equals(userAuthority.getAuthorityCode())
                                );
                if (!alreadyHasRole) {
                    MemberRoleEntity.MemberRoleId roleId = new MemberRoleEntity.MemberRoleId(
                            member.getMemberCode(),
                            userAuthority.getAuthorityCode()
                    );
                    MemberRoleEntity memberRole = MemberRoleEntity.builder()
                            .id(roleId)
                            .member(member)
                            .authority(userAuthority)
                            .build();
                    memberRoleRepository.save(memberRole);

                    //  [핵심 수정 1] 메모리에 있는 member 객체에 role 정보 즉시 반영
                    if (member.getRoles() == null) {
                        member.setRoles(new HashSet<>());
                    }
                    member.getRoles().add(memberRole);
                }

                LoginRequestDTO loginRequest = LoginRequestDTO.builder()
                        .memberId("kakao_" + kakaoId)
                        .memberPassword("")
                        .build();
                LoginResponseDTO responseDTO = memberService.login(loginRequest);
                responseDTO.setKakaoAccessToken(accessToken);
                return responseDTO;
            } else {
                // (2) 이미 활성 상태면
                LoginRequestDTO loginRequest = LoginRequestDTO.builder()
                        .memberId("kakao_" + kakaoId)
                        .memberPassword("")
                        .build();
                LoginResponseDTO responseDTO = memberService.login(loginRequest);
                responseDTO.setKakaoAccessToken(accessToken);
                return responseDTO;
            }
        } else {
            // 2. 카카오 계정이 처음이라면, 이메일로 중복 회원 여부 추가 체크
            Optional<MemberEntity> emailCheckMember = memberRepository.findByMemberEmail(email);
            if (emailCheckMember.isPresent()) {
                MemberEntity member = emailCheckMember.get();
                // (a) 카카오+탈퇴 상태: 재가입 허용
                if ("Y".equals(member.getMemberEndstatus()) && "kakao".equalsIgnoreCase(member.getSocialType())) {
                    updateMemberAsRejoinedFromKakao(member, nickname, email, profileImageUrl, kakaoId);
                    member = memberRepository.save(member);

                    // 권한 체크 및 부여
                    boolean alreadyHasRole = member.getRoles() != null &&
                            member.getRoles().stream()
                                    .anyMatch(role ->
                                            role.getAuthority() != null &&
                                                    role.getAuthority().getAuthorityCode().equals(userAuthority.getAuthorityCode())
                                    );
                    if (!alreadyHasRole) {
                        MemberRoleEntity.MemberRoleId roleId = new MemberRoleEntity.MemberRoleId(
                                member.getMemberCode(),
                                userAuthority.getAuthorityCode()
                        );
                        MemberRoleEntity memberRole = MemberRoleEntity.builder()
                                .id(roleId)
                                .member(member)
                                .authority(userAuthority)
                                .build();
                        memberRoleRepository.save(memberRole);

                        //  [핵심 수정 2] 메모리에 있는 member 객체에 role 정보 즉시 반영
                        if (member.getRoles() == null) {
                            member.setRoles(new HashSet<>());
                        }
                        member.getRoles().add(memberRole);
                    }

                    LoginRequestDTO loginRequest = LoginRequestDTO.builder()
                            .memberId("kakao_" + kakaoId)
                            .memberPassword("")
                            .build();
                    LoginResponseDTO responseDTO = memberService.login(loginRequest);
                    responseDTO.setKakaoAccessToken(accessToken);
                    return responseDTO;
                } else {
                    // (b) 활성회원이거나, 일반/구글 계정 사용자는 중복 에러
                    throw new IllegalStateException("이미 해당 이메일로 가입된 회원이 존재합니다. 카카오 계정만 연동/재가입 할 수 있습니다.");
                }
            } else {
                // 3. 정말 신규라면 신규회원 생성
                MemberEntity newMember = MemberEntity.builder()
                        .memberName(nickname)
                        .memberId("kakao_" + kakaoId)
                        .memberEmail(email)
                        .memberPassword("")
                        .memberRegisterdate(LocalDateTime.now())
                        .memberEndstatus("N")
                        .socialType("kakao")
                        .socialAccountId(kakaoId)
                        .memberProfileImageUrl(profileImageUrl)
                        .adminActive("Y")
                        .build();
                newMember = memberRepository.save(newMember);

                // 권한 체크 및 부여
                boolean alreadyHasRole = newMember.getRoles() != null &&
                        newMember.getRoles().stream()
                                .anyMatch(role ->
                                        role.getAuthority() != null &&
                                                role.getAuthority().getAuthorityCode().equals(userAuthority.getAuthorityCode())
                                );
                if (!alreadyHasRole) {
                    MemberRoleEntity.MemberRoleId roleId = new MemberRoleEntity.MemberRoleId(
                            newMember.getMemberCode(),
                            userAuthority.getAuthorityCode()
                    );
                    MemberRoleEntity memberRole = MemberRoleEntity.builder()
                            .id(roleId)
                            .member(newMember)
                            .authority(userAuthority)
                            .build();
                    memberRoleRepository.save(memberRole);

                    // ⭐ [핵심 수정 3] 메모리에 있는 newMember 객체에 role 정보 즉시 반영
                    if (newMember.getRoles() == null) {
                        newMember.setRoles(new HashSet<>());
                    }
                    newMember.getRoles().add(memberRole);
                }

                LoginRequestDTO loginRequest = LoginRequestDTO.builder()
                        .memberId("kakao_" + kakaoId)
                        .memberPassword("")
                        .build();
                LoginResponseDTO responseDTO = memberService.login(loginRequest);
                responseDTO.setKakaoAccessToken(accessToken);
                return responseDTO;
            }
        }
    }

    // ---- 유틸 메서드 (Service 내 private static 등으로 선언) ----
    private void updateMemberAsRejoinedFromKakao (
            MemberEntity member, String nickname, String email, String profileImageUrl, Long kakaoId){
        member.setMemberEndstatus("N");
        member.setMemberEnddate(null);
        member.setMemberRegisterdate(LocalDateTime.now());
        // 아래 정보 모두 갱신
        member.setMemberName(nickname);
        member.setMemberEmail(email);
        member.setMemberProfileImageUrl(profileImageUrl);
        member.setSocialType("kakao");
        member.setSocialAccountId(kakaoId);
        member.setAdminActive("Y");
    }

    //카카오 연동해제
    public void kakaoUnlink(String memberId, String accessToken) {
        System.out.println("Received Kakao AccessToken: " + accessToken);

        // 1. 입력받은 memberId로 현재 사용자 조회
        Optional<MemberEntity> optionalMember = memberRepository.findByMemberId(memberId);
        if (optionalMember.isEmpty()) {
            throw new IllegalArgumentException("존재하지 않는 회원입니다.");
        }
        MemberEntity member = optionalMember.get();
        // 2. 카카오 계정과의 연동 해제 처리
        if (accessToken != null && !accessToken.trim().isEmpty()) {
            try {
                RestTemplate restTemplate = new RestTemplate();
                HttpHeaders headers = new HttpHeaders();
                headers.setBearerAuth(accessToken);
                headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

                // 카카오 unlink는 body 없이도 동작하나, 빈 MultiValueMap을 주는 것이 더 안전
                MultiValueMap<String, String> body = new LinkedMultiValueMap<>();

                HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

                ResponseEntity<String> response = restTemplate.postForEntity(
                        "https://kapi.kakao.com/v1/user/unlink", request, String.class
                );
                log.info("카카오 unlink API 응답: {}", response.getBody());
            } catch (Exception ex) {
                log.warn("카카오 unlink API 호출 실패 : {}", ex.getMessage());
                // 실패 시 예외 던져서 트랜잭션 전체 롤백 하도록(권장)
                throw new RuntimeException("카카오 unlink 실패: " + ex.getMessage());
            }
        } else {
            log.info("accessToken이 없어 카카오 unlink API는 호출하지 않습니다.");
            // 토큰 없으면 연동 해제도 못 하니까 여기서 예외 발생 권장
            throw new IllegalArgumentException("카카오 엑세스 토큰이 없습니다.");
        }


        // (API 성공시에만 DB 탈퇴/연동 해제)
//        member.setSocialType(null);
//        member.setSocialAccountId(null);
        member.setMemberEnddate(LocalDateTime.now());
        member.setMemberEndstatus("Y");
        memberRepository.save(member);

    }
}