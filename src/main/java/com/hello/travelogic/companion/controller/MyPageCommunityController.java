package com.hello.travelogic.companion.controller;

import com.hello.travelogic.companion.dto.CompanionCommentDTO;
import com.hello.travelogic.companion.dto.CompanionListDTO;
import com.hello.travelogic.companion.service.CompanionCommentService;
import com.hello.travelogic.companion.service.CompanionService;
import com.hello.travelogic.companion.service.LikeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/mypage/community")
public class MyPageCommunityController {

    private final CompanionService companionService;
    private final CompanionCommentService companionCommentService;
    private final LikeService likeService;

    //내가 작성한 게시글 목록조회
    @GetMapping("/posts")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Page<CompanionListDTO>> getMyPosts(
            Authentication authentication,
            @PageableDefault(size = 10) Pageable pageable) {
        String token = (String) authentication.getCredentials();
        Page<CompanionListDTO> myPosts = companionService.getMyCompanions(token, pageable);
        return ResponseEntity.ok(myPosts);
    }

    //내가 작성한 댓글 목록조회
    @GetMapping("/comments")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Page<CompanionCommentDTO>> getMyComments(
            Authentication authentication,
            @PageableDefault(size = 10) Pageable pageable) {
        String token = (String) authentication.getCredentials();
        Page<CompanionCommentDTO> myComments = companionCommentService.getMyCompanionComments(token, pageable);
        return ResponseEntity.ok(myComments);
    }

    //사용자가 좋아요한 게시글 목록 조회
    @GetMapping("/liked-posts")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Page<CompanionListDTO>> getLikedPosts(
            Authentication authentication,
            @PageableDefault(size = 10) Pageable pageable){
                String token = (String) authentication.getCredentials();
        Page<CompanionListDTO> likedPosts = likeService.getLikedCompanions(token, pageable);
        return ResponseEntity.ok(likedPosts);
    }

    //사용자가 좋아요한 댓글 목록 조회
    @GetMapping("/liked-comments")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Page<CompanionCommentDTO>> getLikedComments(
            Authentication authentication,
            @PageableDefault(size = 10) Pageable pageable) {
                String token = (String) authentication.getCredentials();
        Page<CompanionCommentDTO> likedComments = likeService.getLikedComments(token, pageable);
        return ResponseEntity.ok(likedComments);
    }
}

