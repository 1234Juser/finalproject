package com.hello.travelogic.companion.controller;

import com.hello.travelogic.companion.dto.CompanionCommentDTO;
import com.hello.travelogic.companion.service.CompanionCommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/companions/{companionId}/comments")
public class CompanionCommentController {

    private final CompanionCommentService companionCommentService;

    // 특정 게시글의 댓글 목록 조회 (누구나 접근 가능)
    // CompanionController의 getCompanionById에서 댓글 목록을 함께 반환하므로 별도 엔드포인트는 불필요할 수 있습니다.
    // 필요하다면 추가 가능:
    /*
    @GetMapping
    public ResponseEntity<List<CompanionCommentDTO>> getCommentsByCompanionId(@PathVariable Integer companionId) {
        List<CompanionCommentDTO> comments = companionCommentService.getCommentsByCompanionId(companionId);
        return ResponseEntity.ok(comments);
    }
     */

    //댓글 등록 (로그인한 사용자만 가능)
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CompanionCommentDTO> createComment(
            @PathVariable Integer companionId,
            @RequestParam String content,
            Authentication authentication
    ){
        String token = (String) authentication.getCredentials();
        CompanionCommentDTO createdComment = companionCommentService.createComment(companionId, content, token);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdComment);
    }

    //댓글 수정(작성자본인만 가능)
    @PutMapping("/{commentId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CompanionCommentDTO> updateComment(
            @PathVariable Integer companionId,
            @PathVariable Integer commentId,
            @RequestParam String content,
            Authentication authentication
    ){
        String token = (String) authentication.getCredentials();
        CompanionCommentDTO updatedComment = companionCommentService.updateComment(companionId, commentId, content, token);
        return ResponseEntity.ok(updatedComment);
    }

    //댓글삭제(작성자 본인또는 관리자만 가능)
    @DeleteMapping("/{commentId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteComment(
            @PathVariable Integer companionId,
            @PathVariable Integer commentId,
            Authentication authentication
    ){
        String token = (String) authentication.getCredentials();
        companionCommentService.deleteComment(companionId, commentId, token);
        return ResponseEntity.noContent().build();

    }
}
