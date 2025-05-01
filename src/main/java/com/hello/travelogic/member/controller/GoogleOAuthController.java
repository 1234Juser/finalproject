package com.hello.travelogic.member.controller;

import com.hello.travelogic.member.dto.LoginResponseDTO;
import com.hello.travelogic.member.service.GoogleOAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/oauth/google")
@RequiredArgsConstructor
public class GoogleOAuthController {

    private final GoogleOAuthService googleOAuthService;

    @GetMapping("/callback")
    public LoginResponseDTO googleCallbackGet(@RequestParam String code){
        return googleOAuthService.googleLogin(code);
    }


}
