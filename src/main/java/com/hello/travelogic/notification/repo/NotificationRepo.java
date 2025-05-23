package com.hello.travelogic.notification.repo;

import com.hello.travelogic.notification.domain.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;

@Repository
public interface NotificationRepo extends JpaRepository<NotificationEntity, Long> {

    // memberCode의 memberCode 필드를 기준으로 알림 목록 조회 (내림차순 정렬)
    List<NotificationEntity> findByMemberCode_MemberCodeOrderByNotiCreatedAtDesc(Long memberCode);

    List<NotificationEntity> findByMemberCode_MemberCode(Long memberCode);
}
