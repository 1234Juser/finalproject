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
        String accessToken = getAccessToken(code);

        // 2. 유저 정보
        GoogleUser googleUser = getUserInfo(accessToken);

        // 3. DB 조회/회원가입
        MemberEntity member = memberRepository.findByMemberEmail(googleUser.email())
                .orElseGet(() -> {
                    // 신규 회원가입
                    MemberEntity newMember = MemberEntity.builder()
                            .memberName(googleUser.name())
                            .memberEmail(googleUser.email())
                            .memberId("google_" + googleUser.sub()) // sub는 memberId에만 사용
                            .memberRegisterdate(LocalDateTime.now())
                            .memberProfileImageUrl(googleUser.picture())
                            .memberEndstatus("N")
                            .socialType("google")
                            .socialAccountId(null) // 여기서 null로 설정
                            .build();
                    MemberEntity saved = memberRepository.save(newMember);

                    // 권한 설정: "ROLE_USER" 추가 (같은 위치)
                    AuthorityEntity userAuthority = authorityRepository.findByAuthorityName("ROLE_USER");
                    if (userAuthority == null) {
                        throw new RuntimeException("ROLE_USER 권한이 없습니다.");
                    }
                    MemberRoleEntity memberRole = MemberRoleEntity.builder()
                            .id(new MemberRoleEntity.MemberRoleId(saved.getMemberCode(), userAuthority.getAuthorityCode()))
                            .member(saved)
                            .authority(userAuthority)
                            .build();
                    memberRoleRepository.save(memberRole);

                    return saved;
                });

        // 4. 역할 세팅 (권한 로드 방식은 상황에 맞춰 바꿔주세요)
        List<String> roles = List.of("ROLE_USER");
        String jwt = jwtUtil.generateToken(member.getMemberId(), roles);

        return new LoginResponseDTO(
                jwt,
                member.getMemberName(),
                member.getMemberProfileImageUrl(),
                roles,
                member.getMemberCode(),
                null
        );
    }



    /** 구글 OAuth - Authorization Code로 Access Token 요청 */
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

    /** 구글 액세스 토큰으로 사용자 정보 가져오기 */
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


    /** 구글 사용자 객체 */
    record GoogleUser(String sub, String name, String email, String picture) {}
}


