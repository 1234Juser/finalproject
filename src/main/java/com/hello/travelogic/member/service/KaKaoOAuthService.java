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

        return memberService.login(loginRequest);

    }
}