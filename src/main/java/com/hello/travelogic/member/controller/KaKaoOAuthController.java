package com.hello.travelogic.member.controller;

import com.hello.travelogic.member.dto.LoginResponseDTO;
import com.hello.travelogic.member.service.KaKaoOAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/oauth/kakao")
@RequiredArgsConstructor
public class KaKaoOAuthController {

    private final KaKaoOAuthService kakaoOAuthService;

    //인가코드로 콜백
    @GetMapping("/callback")
    public LoginResponseDTO kakaoCallback(@RequestParam String code){
        return kakaoOAuthService.kakaoLogin(code);
    }

    //소셜연동해제
    @PostMapping("/unlink")
    public ResponseEntity<?> kakaoUnlink(Authentication authentication,
                                         @RequestBody Map<String, String> req){
        String accessToken = req.get("accessToken");
        String memberId = (String) authentication.getPrincipal();
        kakaoOAuthService.kakaoUnlink(memberId, accessToken);
        return ResponseEntity.ok().body("success unlink");
    }
}
