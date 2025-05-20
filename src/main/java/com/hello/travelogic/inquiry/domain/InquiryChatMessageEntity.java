package com.hello.travelogic.inquiry.domain;

import com.hello.travelogic.member.domain.MemberRoleEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "tbl_inquiry_chat_message")
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class InquiryChatMessageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "icm_id")
    private Long inquiryChatMessageId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ic_id", nullable = false)
    private InquiryChatEntity inquiryChat;  // 필드명 변경: inquiryChatId -> inquiryChat (객체이므로)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "member_code", referencedColumnName = "member_code", nullable = false),
            @JoinColumn(name = "authority_code", referencedColumnName = "authority_code", nullable = false)
    })
    private MemberRoleEntity memberRole;

    @Enumerated(EnumType.STRING)
    @Column(name = "icm_sender_type", nullable = false)
    private SenderType inquiryChatMessageSenderType;

    @Enumerated(EnumType.STRING)
    @Column(name = "icm_message_type", nullable = false) // 추가된 필드
    private MessageType inquiryChatMessageType; // CHAT, JOIN, SYSTEM_WELCOME 등

    @Column(name = "icm_message", columnDefinition = "TEXT", nullable = false)
    private String inquiryChatMessage;

    @Column(name = "icm_sent_at", nullable = false)
    private LocalDateTime inquiryChatMessageSentAt;


    public enum SenderType {
        USER,
        ADMIN,
        SYSTEM
    }

    public enum MessageType { // 엔티티에도 MessageType 추가
        CHAT,             // 일반 대화 메시지
//        JOIN,             // 사용자 입장 알림 (DB 저장 여부 선택)
//        LEAVE,            // 사용자 퇴장 알림 (DB 저장 여부 선택)
        SYSTEM,         // 시스템 메시지
        INFO              // 기타 정보성 시스템 메시지
    }
}

