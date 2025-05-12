package com.hello.travelogic.companion.controller;

import com.hello.travelogic.companion.dto.CompanionDetailDTO;
import com.hello.travelogic.companion.dto.CompanionListDTO;
import com.hello.travelogic.companion.service.CompanionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/companions")
@Validated // 클래스 레벨에 @Validated 추가하여 파라미터 유효성 검사 활성화
public class CompanionController {
    private final CompanionService companionService;

    // 게시글 목록 조회 (누구나 접근 가능, 기본 10개, 최신순)
    @GetMapping
    public ResponseEntity<Page<CompanionListDTO>> getAllCompanions(@PageableDefault(size = 10, sort = "companionCreatedAt", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<CompanionListDTO> companions = companionService.getAllCompanions(pageable);
        return ResponseEntity.ok(companions);
    }

    // 게시글 상세 조회 (누구나 접근 가능)
    @GetMapping("/{companionId}")
    public ResponseEntity<CompanionDetailDTO> getCompanionById(@PathVariable Integer companionId) {
        CompanionDetailDTO companionDetail = companionService.getCompanionById(companionId);
        return ResponseEntity.ok(companionDetail);
    }

    // 게시글 등록 (ROLE_ADMIN 또는 ROLE_USER 권한 필요)
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<Void> createCompanion(
            @RequestParam String companionTitle,
            @RequestParam String companionContent,
            Authentication authentication
    ) {
        String token = (String) authentication.getCredentials();
        // 추가: 파라미터 및 토큰 로깅
        log.info("createCompanion called with title: '{}', content: '{}'", companionTitle, companionContent);
        if (token == null || token.isEmpty()) {
            log.warn("Token is null or empty!");
        } else {
            log.info("Token received: {}", token);
        }

        companionService.createCompanion(companionTitle, companionContent, token);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    // 게시글 수정 (작성자 본인만 가능)
    @PutMapping("/{companionId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> updateCompanion(
            @PathVariable Integer companionId,
            @RequestParam String companionTitle,
            @RequestParam String companionContent,
            Authentication authentication
    ) {
        String token = (String) authentication.getCredentials();
        companionService.updateCompanion(companionId, companionTitle, companionContent, token);
        return ResponseEntity.ok().build();
    }

    // 게시글 삭제 (작성자 본인 또는 ROLE_ADMIN만 가능)
    @DeleteMapping("/{companionId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteCompanion(
            @PathVariable Integer companionId,
            Authentication authentication
    ) {
        String token = (String) authentication.getCredentials();
        companionService.deleteCompanion(companionId, token);
        return ResponseEntity.noContent().build();
    }
}