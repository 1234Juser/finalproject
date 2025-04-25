package com.hello.travelogic.member.repository;

import com.hello.travelogic.member.domain.MemberRoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRoleRepository extends JpaRepository<MemberRoleEntity, MemberRoleEntity.MemberRoleId> {
}
