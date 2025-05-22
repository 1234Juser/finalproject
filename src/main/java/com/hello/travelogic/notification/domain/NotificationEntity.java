package com.hello.travelogic.notification.domain;

import com.hello.travelogic.member.domain.MemberEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "tbl_notification")
public class NotificationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "noti_id")
    private Long notiId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_code", nullable = false)
    private MemberEntity memberCode;

    @Column(name = "noti_message", nullable = false, length = 255)
    private String notiMessage;

    @Column(name = "noti_is_read")
    private boolean notiIsRead = false; // 기본값 false

    @CreationTimestamp // 엔티티가 처음 저장될 때 자동으로 현재 시간으로 설정
    @Column(name = "noti_created_at", nullable = false, updatable = false)
    private LocalDateTime notiCreatedAt;


    // 읽음 처리용 메서드
    public void markAsRead() {
        this.notiIsRead = true;
    }
}
