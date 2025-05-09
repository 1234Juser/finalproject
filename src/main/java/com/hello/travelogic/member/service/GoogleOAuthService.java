package com.hello.travelogic.member.service;


import com.hello.travelogic.member.domain.AuthorityEntity;
import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.member.domain.MemberRoleEntity;
import com.hello.travelogic.member.dto.LoginResponseDTO;
import com.hello.travelogic.member.repository.AuthorityRepository;
import com.hello.travelogic.member.repository.MemberRepository;
import com.hello.travelogic.member.repository.MemberRoleRepository;
import com.hello.travelogic.utils.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.json.XMLTokener.entity;

@Service
@RequiredArgsConstructor
public class GoogleOAuthService {

    @Value("${google.client-id}")
    private String clientId;

    @Value("${google.client-secret}")
    private String clientSecret;

    @Value("${google.redirect-uri}")
    private String redirectUri;

    @Value("${google.token-uri}")
    private String tokenUri;

    @Value("${google.user-info-uri}")
    private String userInfoUri;

    private final AuthorityRepository authorityRepository;
    private final MemberRoleRepository memberRoleRepository;
    private final MemberRepository memberRepository;
    private final JwtUtil jwtUtil;

    /**
     * 1. 프론트에서 전달받은 code로 구글 토큰 발급
     * 2. 토큰으로 구글 유저 정보 요청
     * 3. 정보 바탕으로 회원 등록 or 로그인
     * 4. JWT·회원정보 응답
     */
    @Transactional
    public LoginResponseDTO googleLogin(String code) {
        // 1. access token 발급
        String googleAccessToken = getAccessToken(code);

        // 2. 유저 정보
        GoogleUser googleUser = getUserInfo(googleAccessToken);

        // 3. DB 조회/회원가입
        // 기존 회원 여부 (탈퇴 회원 포함하여 조회)
        MemberEntity member = memberRepository.findByMemberEmail(googleUser.email()).orElse(null);

        if (member != null) {
            // 관리자 비활성화 계정인지 우선 체크
            if (!"Y".equals(member.getAdminActive())) {
                throw new RuntimeException("관리자에 의해 비활성화된 계정입니다."); // 혹은 CustomException
            }
            if ("Y".equals(member.getMemberEndstatus())) {
                // 탈퇴 계정 재가입 처리
                member.setMemberEndstatus("N");
                member.setMemberEnddate(null);
                member.setMemberRegisterdate(LocalDateTime.now()); // 재가입 시점으로 갱신
                // 개인정보, 사진 등도 구글 최신 정보로 갱신
                member.setMemberName(googleUser.name());
                member.setMemberProfileImageUrl(googleUser.picture());
                member.setSocialType("google");
                member.setMemberId("google_" + googleUser.sub());
                // 필요시 memberRole 추가 등 복구 처리
                memberRepository.save(member);
            } else {
                // 기존 활성 회원: 정보 업데이트만 수행
                member.setMemberName(googleUser.name());
                member.setMemberProfileImageUrl(googleUser.picture());
                member.setSocialType("google");
                member.setMemberId("google_" + googleUser.sub());
                memberRepository.save(member);
            }
        } else {
            // 신규 회원 (기존과 동일)
            member = MemberEntity.builder()
                    .memberName(googleUser.name())
                    .memberEmail(googleUser.email())
                    .memberId("google_" + googleUser.sub())
                    .memberRegisterdate(LocalDateTime.now())
                    .memberProfileImageUrl(googleUser.picture())
                    .memberEndstatus("N")
                    .socialType("google")
                    .build();
            member = memberRepository.save(member);
            // 권한 추가
            AuthorityEntity userAuthority = authorityRepository.findByAuthorityName("ROLE_USER");
            MemberRoleEntity memberRole = MemberRoleEntity.builder()
                    .id(new MemberRoleEntity.MemberRoleId(member.getMemberCode(), userAuthority.getAuthorityCode()))
                    .member(member)
                    .authority(userAuthority)
                    .build();
            memberRoleRepository.save(memberRole);
        }

        List<String> roles = List.of("ROLE_USER");
        String jwt = jwtUtil.generateToken(member.getMemberId(), roles, member.getMemberCode());

        return new LoginResponseDTO(
                jwt,                    // 서비스 JWT - accessToken (localStorage의 accessToken)
                member.getMemberName(),
                member.getMemberProfileImageUrl(),
                roles,
                member.getMemberCode(),
                null,                   // 6. kakaoAccessToken은 null (구글이니까)
                googleAccessToken       // googleAccessToken (localStorage의 googleAccessToken)
        );

    }

    /**
     * 구글 OAuth - Authorization Code로 Access Token 요청
     */
    private String getAccessToken(String code) {
        RestTemplate restTemplate = new RestTemplate();

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("redirect_uri", redirectUri);
        params.add("grant_type", "authorization_code");
        params.add("code", code);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(params, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(tokenUri, entity, String.class);

        JSONObject body = new JSONObject(response.getBody());
        return body.getString("access_token");
    }

    /**
     * 구글 액세스 토큰으로 사용자 정보 가져오기
     */
    private GoogleUser getUserInfo(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        ResponseEntity<String> response = restTemplate.exchange(userInfoUri, HttpMethod.GET, new HttpEntity<>(headers), String.class);

        // 응답 코드 체크 (200 OK가 아니면 예외 처리)
        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("구글 사용자 정보 요청 실패: HTTP " + response.getStatusCode());
        }

        JSONObject body = new JSONObject(response.getBody());

        // sub 필드가 없으면 id 필드를 사용하도록 방어 처리
        String sub = body.optString("sub", null);
        if (sub == null || sub.isEmpty()) {
            sub = body.optString("id", null);
        }
        if (sub == null || sub.isEmpty()) {
            throw new RuntimeException("구글 사용자 정보에 sub 또는 id 필드가 존재하지 않습니다. 응답: " + body.toString());
        }

        return new GoogleUser(
                sub,
                body.optString("name", ""),
                body.optString("email", ""),
                body.optString("picture", "")
        );

    }

    //구굴로그인 연동해제
    @Transactional
    public void unlinkSocialAccount(String googleAccessToken, String bearerToken) {
        // 1. 구글 액세스 토큰 만료(연결 해제)
        if (googleAccessToken != null && !googleAccessToken.isEmpty()) {
            try {
                String revokeUrl = "https://accounts.google.com/o/oauth2/revoke?token=" + googleAccessToken;
                RestTemplate restTemplate = new RestTemplate();
                restTemplate.postForEntity(revokeUrl, null, String.class);
            } catch (Exception e) {
                // 이미 만료된 토큰 등은 무시
            }
        }

        // JWT에서 사용자 식별 정보 추출 (예: memberId)
        String memberId = jwtUtil.getMemberIdFromToken(bearerToken.replace("Bearer ", ""));
        MemberEntity member = memberRepository.findByMemberId(memberId).orElse(null);

        if (member != null) {
            // DB 업데이트(소셜 타입 등 필드 제거)
            member.setSocialType(null);
            member.setSocialAccountId(null);
            member.setMemberEndstatus("Y");
            member.setMemberEnddate(LocalDateTime.now());
            memberRepository.save(member);
        }
    }
    /** 구글 사용자 객체 */
    record GoogleUser(String sub, String name, String email, String picture) {
    }
}

