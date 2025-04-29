package com.hello.travelogic.member.repository;

import com.hello.travelogic.member.domain.PasswordResetAuthCodeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetAuthCodeRepository extends JpaRepository<PasswordResetAuthCodeEntity, Long> {
    Optional<PasswordResetAuthCodeEntity> findTopByMemberEmailOrderByExpiredAtDesc(String memberEmail);
    // 이메일로 모든 인증코드 삭제
    void deleteByMemberEmail(String memberEmail);

    // 특정 이메일+코드 조합 삭제하고 싶다면 이렇게도 가능
    void deleteByMemberEmailAndAuthCode(String memberEmail, String authCode);
}

