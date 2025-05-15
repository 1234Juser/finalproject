package com.hello.travelogic.chat.domain;

import com.hello.travelogic.chat.dto.ChatRoomCreateResponse;
import com.hello.travelogic.member.domain.MemberEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "tbl_chat_room")
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChatRoomEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_room_id")
    private Long chatRoomId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_code", nullable = false)
    private MemberEntity memberCode;        // 회원 1 : 채팅방 N 관계

    @Column(name = "chat_room_uid", unique = true, nullable = false, length = 20)
    private String chatRoomUid;       // 클라이언트가 사용할 식별자(UUID 또는 이름 기반)

    @Column(name = "chat_room_title", nullable = false, length = 50)
    private String chatRoomTitle;

    @Column(name = "chat_room_create_at", nullable = false)
    private LocalDateTime chatRoomCreateAt;

    @Column(name = "chat_room_description", length = 50)
    private String chatRoomDescription;

    @Column(name = "chat_room_max_participants", nullable = false)
    private Integer chatRoomMaxParticipants;

    // 양방향 매핑 ("chatroomId"는 ChatRoomMemberEntity에서 @ManyToOne ChatRoomEntity의 필드명)
    @OneToMany(mappedBy = "chatRoomId", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChatRoomMemberEntity> chatRoomMembers = new ArrayList<>();     // 채팅방 1 : 채팅방참여자 N 관계


}
