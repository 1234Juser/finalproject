package com.hello.travelogic.companion.controller;

import com.hello.travelogic.companion.dto.FollowDTO;
import com.hello.travelogic.companion.service.FollowService;
import com.hello.travelogic.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/follow")
@RequiredArgsConstructor
@Slf4j
public class FollowController {

    private final FollowService followService;
    private final JwtUtil jwtUtil;

    // 팔로우 요청 처리
    @PostMapping("/{followingMemberCode}")
    public ResponseEntity<?> followMember(@PathVariable Long followingMemberCode, @RequestHeader("Authorization") String authorizationHeader) {
        try {
            String token = authorizationHeader.substring(7);
            Long followerMemberCode = jwtUtil.getMemberCodeFromToken(token);

            followService.follow(followerMemberCode, followingMemberCode);
            return ResponseEntity.ok().body("팔로우 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage()); // 이미 팔로우 중
        } catch (Exception e) {
            log.error("팔로우 처리 중 오류 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("팔로우 처리 중 오류가 발생했습니다.");
        }
    }

    // 언팔로우 요청 처리
    @DeleteMapping("/{followingMemberCode}")
    public ResponseEntity<?> unfollowMember(@PathVariable Long followingMemberCode, @RequestHeader("Authorization") String authorizationHeader) {
        try {
            String token = authorizationHeader.substring(7);
            Long followerMemberCode = jwtUtil.getMemberCodeFromToken(token);

            followService.unfollow(followerMemberCode, followingMemberCode);
            return ResponseEntity.ok().body("언팔로우 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            log.error("언팔로우 처리 중 오류 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("언팔로우 처리 중 오류가 발생했습니다.");
        }
    }

    // 특정 회원의 팔로잉 목록 조회
    @GetMapping("/{memberCode}/following")
    public ResponseEntity<?> getFollowingList(@PathVariable Long memberCode) {
        try {
            List<FollowDTO> followingDTOList = followService.getFollowingList(memberCode); // 서비스에서 FollowDTO 리스트를 직접 받음
            return ResponseEntity.ok(followingDTOList);
        } catch (Exception e) {
            log.error("팔로잉 목록 조회 중 오류 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("팔로잉 목록 조회 중 오류가 발생했습니다.");
        }
    }

    // 특정 회원의 팔로워 목록 조회
    @GetMapping("/{memberCode}/followers")
    public ResponseEntity<?> getFollowerList(@PathVariable Long memberCode) {
        try {
            List<FollowDTO> followerDTOList = followService.getFollowerList(memberCode); // 서비스에서 FollowDTO 리스트를 직접 받음
            return ResponseEntity.ok(followerDTOList);
        } catch (Exception e) {
            log.error("팔로워 목록 조회 중 오류 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("팔로워 목록 조회 중 오류가 발생했습니다.");
        }
    }

    // 현재 로그인한 사용자가 특정 회원을 팔로우하는지 여부 확인 (React에서 팔로우 버튼 상태 결정에 사용)
    @GetMapping("/is-following/{followingMemberCode}")
    public ResponseEntity<?> isFollowing(@PathVariable Long followingMemberCode, @RequestHeader("Authorization") String authorizationHeader) {
        try {
            String token = authorizationHeader.substring(7);
            Long followerMemberCode = jwtUtil.getMemberCodeFromToken(token);

            boolean isFollowing = followService.isFollowing(followerMemberCode, followingMemberCode);
            return ResponseEntity.ok(isFollowing);
        } catch (Exception e) {
            log.error("팔로우 여부 확인 중 오류 발생: {}", e.getMessage());
            // 로그인하지 않은 경우 등 오류 발생 시 false 반환
            return ResponseEntity.ok(false);
        }
    }
}