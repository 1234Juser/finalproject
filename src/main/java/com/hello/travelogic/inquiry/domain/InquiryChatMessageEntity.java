package com.hello.travelogic.inquiry.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})      // Jackson의 Hibernate 프록시 속성 무시
public class InquiryChatMessageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "icm_id")
    private Long inquiryChatMessageId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ic_id", nullable = false)
    @ToString.Exclude                       // 양방향 연관 관계에서 toString() 메소드의 재귀 호출로 인한 무한 루프를 방지하기 위해 toString() 생성에서 제외
    @JsonIgnore                             // 서버에서 클라이언트로 전송되는 JSON 응답의 순환 참조로 인한 무한 루프 방지
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

