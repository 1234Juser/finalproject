package com.hello.travelogic.chat.domain;

import com.hello.travelogic.chat.dto.ChatRoomMemberDTO;
import com.hello.travelogic.member.domain.MemberEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "tbl_chat_room_member")
public class ChatRoomMemberEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crm_id")
    private Long crmId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_room_id", nullable = false)
    private ChatRoomEntity chatRoomId;        // 채팅방참여자 N - 채팅 1  관계

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_code", nullable = false)
    private MemberEntity memberCode;        // 채팅방참여자 N - 회원 1 관계

    @Column(name = "crm_joined_at", nullable = false)
    private LocalDateTime crmJoinedAt;

    @Column(name = "crm_is_exited", nullable = false)
    private Boolean crmIsExited;        // 퇴장 여부 (나간 상태면 true)

    @Column(name = "crm_exited_at")
    private LocalDateTime crmExitedAt;      // 퇴장 시간 (참여 중이면 null)

    @Column(name = "member_name", nullable = false)
    private String memberName;

    @Column(name = "crm_is_creator", nullable = false)
    private boolean isCreator;

}
