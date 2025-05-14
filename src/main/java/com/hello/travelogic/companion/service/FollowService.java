package com.hello.travelogic.companion.service;

import com.hello.travelogic.companion.domain.FollowEntity;
import com.hello.travelogic.companion.dto.FollowDTO;
import com.hello.travelogic.companion.repository.FollowRepository;
import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class FollowService {

    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;

    // 팔로우 기능
    @Transactional
    public void follow(Long followerMemberCode, Long followingMemberCode) {
        if (followerMemberCode.equals(followingMemberCode)) {
            throw new IllegalArgumentException("자신을 팔로우할 수 없습니다.");
        }

        followRepository.findByFollowerMember_MemberCodeAndFollowingMember_MemberCode(followerMemberCode, followingMemberCode)
                .ifPresent(followEntity -> {
                    throw new IllegalStateException("이미 팔로우 중입니다.");
                });

        MemberEntity follower = memberRepository.findByMemberCode(followerMemberCode)
                .orElseThrow(() -> new IllegalArgumentException("팔로워 회원 정보를 찾을 수 없습니다."));
        MemberEntity following = memberRepository.findByMemberCode(followingMemberCode)
                .orElseThrow(() -> new IllegalArgumentException("팔로잉 회원 정보를 찾을 수 없습니다."));

        FollowEntity followEntity = FollowEntity.builder()
                .followerMember(follower)
                .followingMember(following)
                .followedAt(LocalDateTime.now())
                .build();

        followRepository.save(followEntity);
        log.info("멤버 {} 팔로우멤버 {}", followerMemberCode, followingMemberCode);
    }

    // 언팔로우 기능
    @Transactional
    public void unfollow(Long followerMemberCode, Long followingMemberCode) {
        FollowEntity followEntity = followRepository.findByFollowerMember_MemberCodeAndFollowingMember_MemberCode(followerMemberCode, followingMemberCode)
                .orElseThrow(() -> new IllegalArgumentException("팔로우 관계를 찾을 수 없습니다."));

        followRepository.delete(followEntity);
        log.info("멤버 {} 언팔로우멤버 {}", followerMemberCode, followingMemberCode);
    }

    // 특정 사용자의 팔로잉 목록 조회
    public List<FollowDTO> getFollowingList(Long memberCode) {
        return followRepository.findByFollowerMember_MemberCode(memberCode)
                .stream()
                .map(FollowEntity::getFollowingMember)
                .map(FollowDTO::fromEntity) // FollowDTO.fromEntity 사용
                .collect(Collectors.toList());
    }

    // 특정 사용자의 팔로워 목록 조회
    public List<FollowDTO> getFollowerList(Long memberCode) {
        return followRepository.findByFollowingMember_MemberCode(memberCode)
                .stream()
                .map(FollowEntity::getFollowerMember)
                .map(FollowDTO::fromEntity) // FollowDTO.fromEntity 사용
                .collect(Collectors.toList());
    }

    // 현재 로그인한 사용자가 특정 사용자를 팔로우하고 있는지 확인
    public boolean isFollowing(Long followerMemberCode, Long followingMemberCode) {
        return followRepository.findByFollowerMember_MemberCodeAndFollowingMember_MemberCode(followerMemberCode, followingMemberCode).isPresent();
    }
}
