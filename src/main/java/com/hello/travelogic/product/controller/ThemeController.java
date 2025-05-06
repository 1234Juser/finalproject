package com.hello.travelogic.product.controller;

import com.hello.travelogic.product.service.ThemeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class ThemeController {

    @Autowired
    private final ThemeService themeService;

    // 테마 전체 조회
    @GetMapping("/themes")
    public ResponseEntity getThemes() {
        log.debug("get themes");
        return ResponseEntity.status(HttpStatus.OK).body(themeService.getThemes());
    }
}
