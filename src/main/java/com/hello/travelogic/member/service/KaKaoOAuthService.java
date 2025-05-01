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

        Optional<MemberEntity> optionalMember = memberRepository.findBySocialTypeAndSocialAccountId("kakao", kakaoId.intValue());
        MemberEntity newMember;
        if (optionalMember.isEmpty()) {
            newMember = MemberEntity.builder()
                    .memberName(nickname)
                    .memberId("kakao_" + kakaoId)
                    .memberEmail(email)
                    .memberPassword("")
                    .memberRegisterdate(LocalDateTime.now())
                    .memberEndstatus("N")
                    .socialType("kakao")
                    .socialAccountId(kakaoId.intValue())
                    .memberProfileImageUrl(profileImageUrl)
                    .build();
            newMember = memberRepository.save(newMember);
        } else {
            newMember = optionalMember.get();
        }

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
        }

        LoginRequestDTO loginRequest = LoginRequestDTO.builder()
                .memberId("kakao_" + kakaoId)
                .memberPassword("")
                .build();

        LoginResponseDTO responseDTO = memberService.login(loginRequest);
        responseDTO.setKakaoAccessToken(accessToken); // 카카오 accessToken값을 DTO에 넣는다
        return responseDTO;

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
        member.setSocialType(null);
        member.setSocialAccountId(null);
        member.setMemberEnddate(LocalDateTime.now());
        member.setMemberEndstatus("Y");
        memberRepository.save(member);

    }
}