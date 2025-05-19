package com.hello.travelogic.inquiry.controller;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class CsrfController {
    /**
     * CSRF 토큰 값을 반환합니다.
     * @param csrfToken - Spring Security가 관리하는 CSRF 토큰 객체
     * @return JSON 형태의 CSRF 토큰 값
     */


    // CSRF 토큰을 반환
    @GetMapping("/csrf")
    public Map<String, String> csrf(CsrfToken csrfToken) {
        return Map.of("csrfToken", csrfToken.getToken());
        // 클라이언트로 {"csrfToken" : "실제로 토큰 값"} 형태의 응답을 보냄

    }
}
