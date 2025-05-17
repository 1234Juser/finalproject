package com.hello.travelogic.member.repository;

import com.hello.travelogic.member.domain.MemberRoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberRoleRepository extends JpaRepository<MemberRoleEntity, MemberRoleEntity.MemberRoleId> {

    // MemberRoleRepository에 다음 혹은 유사한 메소드가 필요합니다:
    // Optional<MemberRoleEntity> findByMember_MemberCodeAndAuthority_AuthorityName(Long memberCode, String authorityName);
    // 로그인 유저의 memberCode 조회 (1:1 문의 채팅)
    List<MemberRoleEntity> findByMember_MemberCode(Long memberCode);


}
