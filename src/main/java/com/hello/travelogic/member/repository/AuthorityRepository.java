package com.hello.travelogic.member.repository;

import com.hello.travelogic.member.domain.AuthorityEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepository extends JpaRepository<AuthorityEntity, Integer> {
    AuthorityEntity findByAuthorityName(String authorityName);
}
