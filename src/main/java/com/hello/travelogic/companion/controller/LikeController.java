package com.hello.travelogic.companion.controller;

import com.hello.travelogic.companion.service.LikeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/likes")
@RequiredArgsConstructor
@Slf4j
public class LikeController {

    private final LikeService likeService;

    // 게시물 좋아요 추가/취소 엔드포인트
    @PostMapping("/companion/{companionId}")
    @PreAuthorize("isAuthenticated()") // 로그인한 사용자만 접근 가능
    public ResponseEntity<Boolean> toggleCompanionLike(
            @PathVariable Integer companionId,
            Authentication authentication
    ) {
        String token = (String) authentication.getCredentials();
        boolean liked = likeService.toggleCompanionLike(companionId, token);
        return ResponseEntity.ok(liked); // true 반환 시 좋아요 추가, false 반환 시 좋아요 취소
    }

    // 댓글 좋아요 추가/취소 엔드포인트
    @PostMapping("/comment/{commentId}")
    @PreAuthorize("isAuthenticated()") // 로그인한 사용자만 접근 가능
    public ResponseEntity<Boolean> toggleCommentLike(
            @PathVariable Integer commentId,
            Authentication authentication
    ) {
        String token = (String) authentication.getCredentials();
        boolean liked = likeService.toggleCommentLike(commentId, token);
        return ResponseEntity.ok(liked); // true 반환 시 좋아요 추가, false 반환 시 좋아요 취소
    }

    // 특정 게시물의 좋아요 수 조회 엔드포인트
    @GetMapping("/companion/{companionId}/count")
    public ResponseEntity<Integer> getCompanionLikeCount(@PathVariable Integer companionId) {
        int count = likeService.getCompanionLikeCount(companionId);
        return ResponseEntity.ok(count);
    }

    // 특정 댓글의 좋아요 수 조회 엔드포인트
    @GetMapping("/comment/{commentId}/count")
    public ResponseEntity<Integer> getCommentLikeCount(@PathVariable Integer commentId) {
        int count = likeService.getCommentLikeCount(commentId);
        return ResponseEntity.ok(count);
    }

    // 특정 사용자가 특정 게시물에 좋아요를 눌렀는지 확인하는 엔드포인트
    @GetMapping("/companion/{companionId}/status")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Boolean> isCompanionLikedByUser(
            @PathVariable Integer companionId,
            Authentication authentication
    ) {
        String token = (String) authentication.getCredentials();
        boolean liked = likeService.isCompanionLikedByUser(companionId, token);
        return ResponseEntity.ok(liked);
    }

    // 특정 사용자가 특정 댓글에 좋아요를 눌렀는지 확인하는 엔드포인트
    @GetMapping("/comment/{commentId}/status")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Boolean> isCommentLikedByUser(
            @PathVariable Integer commentId,
            Authentication authentication
    ) {
        String token = (String) authentication.getCredentials();
        boolean liked = likeService.isCommentLikedByUser(commentId, token);
        return ResponseEntity.ok(liked);
    }
}
