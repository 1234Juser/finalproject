package com.hello.travelogic.member.repository;

import com.hello.travelogic.member.domain.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {
    boolean existsByMemberId(String memberId);
    boolean existsByMemberEmail(String memberEmail);

}
