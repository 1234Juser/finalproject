package com.hello.travelogic.inquiry.domain;

import com.hello.travelogic.member.domain.MemberRoleEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "tbl_inquiry_chat")
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class InquiryChatEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ic_id")
    private Integer inquiryChatId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "member_code", referencedColumnName = "member_code"),
            @JoinColumn(name = "authority_code", referencedColumnName = "authority_code")
    })
    private MemberRoleEntity memberRole;

    @Column(name = "ic_start_date", nullable = false)
    private LocalDateTime inquiryChatStartDate;

    @Column(name = "ic_end_date")
    private LocalDateTime inquiryChatEndDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "ic_chat_status", nullable = false)
    private ChatStatus inquiryChatStatus;

    @Column(name = "member_id", nullable = false)
    private String memberId;

    @Column(name = "member_email", nullable = false)
    private String memberEmail;

    @OneToMany(mappedBy = "inquiryChatId", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InquiryChatMessageEntity> messages = new ArrayList<>();
    // messages 는 채팅방 안에 있는 모든 메시지들의 목록임. InquiryChatMessageEntity의 inquiryChatMessage를 가리키는게 아님.
    // messages 는 InquiryChatMessageEntity 객체들의 리스트임.


    public enum ChatStatus {
        WAITING,
        ACTIVE,
        CLOSED
    }

}

