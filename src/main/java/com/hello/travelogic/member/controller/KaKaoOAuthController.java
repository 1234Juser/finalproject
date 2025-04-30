package com.hello.travelogic.member.controller;

import com.hello.travelogic.member.dto.LoginResponseDTO;
import com.hello.travelogic.member.service.KaKaoOAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
}
