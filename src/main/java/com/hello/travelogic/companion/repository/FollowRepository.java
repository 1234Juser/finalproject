package com.hello.travelogic.companion.repository;

import com.hello.travelogic.companion.domain.FollowEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<FollowEntity, Integer> {

    // 팔로워 회원 코드와 팔로잉 회원 코드로 팔로우 관계 찾기
    Optional<FollowEntity> findByFollowerMember_MemberCodeAndFollowingMember_MemberCode(Long followerMemberCode, Long followingMemberCode);

    // 특정 회원의 팔로잉 목록 조회 (followerMember가 해당 회원인 경우)
    List<FollowEntity> findByFollowerMember_MemberCode(Long followerMemberCode);

    // 특정 회원의 팔로워 목록 조회 (followingMember가 해당 회원인 경우)
    List<FollowEntity> findByFollowingMember_MemberCode(Long followingMemberCode);

}
