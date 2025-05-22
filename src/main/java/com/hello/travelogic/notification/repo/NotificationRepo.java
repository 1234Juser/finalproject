package com.hello.travelogic.notification.repo;

import com.hello.travelogic.notification.domain.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepo extends JpaRepository<NotificationEntity, Long> {

    // memberCode의 memberCode 필드를 기준으로 알림 목록 조회 (내림차순 정렬)
    List<NotificationEntity> findByMemberCode_MemberCodeOrderByNotiCreatedAtDesc(Long memberCode);

//    // 회원 번호 기준으로 알림 목록을 조회
//    List<Notification> findByMember_MemberCodeOrderByCreatedAtDesc(Long memberCode);

//    List<NotificationEntity> findByMemberCodeAndNotiIsReadOrderByNotiCreatedAtDesc(Long memberCode, boolean notiIsRead);

    // 특정 회원의 읽지 않은 알림 개수 조회
//    long countByMemberCodeAndNotiIsRead(Long memberCode, boolean notiIsRead);

}
