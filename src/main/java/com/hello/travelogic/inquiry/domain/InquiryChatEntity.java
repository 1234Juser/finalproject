package com.hello.travelogic.inquiry.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})      // Jackson의 Hibernate 프록시 속성 무시
public class InquiryChatEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ic_id")
    private Long inquiryChatId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "member_code", referencedColumnName = "member_code", nullable = false),
            @JoinColumn(name = "authority_code", referencedColumnName = "authority_code", nullable = false)
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

    @OneToMany(mappedBy = "inquiryChat", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @JsonIgnore
    private List<InquiryChatMessageEntity> messages = new ArrayList<>();
    // messages 는 채팅방 안에 있는 모든 메시지들의 목록임. InquiryChatMessageEntity의 inquiryChatMessage를 가리키는게 아님.
    // messages 는 InquiryChatMessageEntity 객체들의 리스트임.
    // ToString.Exclude : 양방향 연관 관계에서 toString() 메소드의 재귀 호출로 인한 무한 루프를 방지하기 위해 toString() 생성에서 제외
    // JsonIgnore : 서버에서 클라이언트로 전송되는 JSON 응답의 순환 참조로 인한 무한 루프 방지

    public enum ChatStatus {
        WAITING,
        ACTIVE,
        CLOSED
    }

}

