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
@Validated
public class CompanionController {
    private final CompanionService companionService;

    // 게시글 목록 조회 (누구나 접근 가능, 기본 10개, 공지사항 상단, 최신순)
    @GetMapping
    public ResponseEntity<Page<CompanionListDTO>> getAllCompanions(
            @RequestParam(name = "searchKeyword", required = false) String searchKeyword,
            @RequestParam(name = "searchType", required = false, defaultValue = "title") String searchType, // 기본값 title로 설정
            // PageableDefault 에서 sort 는 서비스 레이어에서 제어하므로 여기서는 제거하거나 기본값만 둡니다.
            @PageableDefault(size = 10) Pageable pageable) {
//        log.info("검색요청 searchKeyword: '{}', searchType: '{}', pageable: {}", searchKeyword, searchType, pageable);
        Page<CompanionListDTO> companions = companionService.getAllCompanions(searchKeyword, searchType, pageable);
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
            @RequestParam(required = false) Boolean isNotice, // 공지사항 여부 파라미터 추가
            Authentication authentication
    ) {
        String token = (String) authentication.getCredentials();
//        log.info("createCompanion called with title: '{}', content: '{}', isNotice: {}", companionTitle, companionContent, isNotice);
        if (token == null || token.isEmpty()) {
            log.warn("Token is null or empty!");
        }

        companionService.createCompanion(companionTitle, companionContent, token, isNotice);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    // 게시글 수정 (작성자 본인만 가능)
    // 공지사항 수정 기능도 필요하면, isNotice 파라미터 및 관련 로직 추가 필요
    @PutMapping("/{companionId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> updateCompanion(
            @PathVariable Integer companionId,
            @RequestParam String companionTitle,
            @RequestParam String companionContent,
            @RequestParam(required = false) Boolean isNotice, // 공지사항 여부 파라미터 추가
            Authentication authentication
    ) {
        String token = (String) authentication.getCredentials();
        companionService.updateCompanion(companionId, companionTitle, companionContent, token, isNotice);
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