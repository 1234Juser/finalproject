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
    private Integer inquiryChatMessageId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ic_id", nullable = false)
    private InquiryChatEntity inquiryChatId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "member_code", referencedColumnName = "member_code"),
            @JoinColumn(name = "authority_code", referencedColumnName = "authority_code")
    })
    private MemberRoleEntity memberRole;

    @Enumerated(EnumType.STRING)
    @Column(name = "icm_sender_type", nullable = false)
    private SenderType inquiryChatMessageSenderType;

    @Column(name = "icm_message", columnDefinition = "TEXT", nullable = false)
    private String inquiryChatMessage;

    @Column(name = "icm_sent_at", nullable = false)
    private LocalDateTime inquiryChatMessageSentAt;


    public enum SenderType {
        user,
        admin
    }
}

