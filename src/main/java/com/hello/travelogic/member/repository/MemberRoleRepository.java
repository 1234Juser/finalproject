package com.hello.travelogic.member.repository;

import com.hello.travelogic.member.domain.MemberRoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRoleRepository extends JpaRepository<MemberRoleEntity, MemberRoleEntity.MemberRoleId> {
    
    // 로그인 유저의 memberCode 조회 (1:1 문의 채팅) (비회원도 조회)
    List<MemberRoleEntity> findByMember_MemberCode(Long memberCode);

    // 시스템 멤버 역할 조회
    Optional<MemberRoleEntity> findByMember_MemberCodeAndAuthority_AuthorityName(Long systemMemberCode, String targetAuthorityName);

    // 특정 ROLE_ADMIN을 가진 관리자의 MemberRoleEntity 조회
    List<MemberRoleEntity> findByAuthority_AuthorityName(String targetAuthorityName);
}
