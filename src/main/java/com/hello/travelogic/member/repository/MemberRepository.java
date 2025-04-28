package com.hello.travelogic.member.repository;

import com.hello.travelogic.member.domain.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {
    boolean existsByMemberId(String memberId);
    boolean existsByMemberEmail(String memberEmail);
    //로그인
    Optional<MemberEntity> findByMemberId(String memberId);

    // 찜 등록/취소에 사용
    Optional<MemberEntity> findByMemberCode(Long memberCode);
}
