package com.hello.travelogic.member.controller;

import com.hello.travelogic.member.dto.LoginResponseDTO;
import com.hello.travelogic.member.service.GoogleOAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/oauth/google")
@RequiredArgsConstructor
public class GoogleOAuthController {

    private final GoogleOAuthService googleOAuthService;

    @GetMapping("/callback")
    public LoginResponseDTO googleCallbackGet(@RequestParam String code){
        return googleOAuthService.googleLogin(code);
    }

    @PostMapping("/unlink")
    public ResponseEntity<?> googleUnlink(@RequestBody Map<String, String> req, @RequestHeader("Authorization") String bearerToken) {
        String googleAccessToken = req.get("accessToken");
        googleOAuthService.unlinkSocialAccount(googleAccessToken, bearerToken);
        return ResponseEntity.ok().build();
    }


}
