package com.hello.travelogic.chat.dto;

import com.hello.travelogic.chat.domain.ChatRoomEntity;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChatRoomCreateResponse {
    // 채팅방 응답 DTO (목록 조회용)

    private Long chatRoomId;
    private Long memberCode;
    private String chatRoomUid;
    private String chatRoomTitle;
    private LocalDateTime chatRoomCreateAt;
    private String chatRoomDescription;
    private Integer chatRoomMaxParticipants;
    private int currentParticipants;
    private boolean isCurrentUserCreator; // 현재 로그인한 사용자가 방장인지 여부

    // Entity → ResponseDTO로 변환 (저장 후 클라이언트에게 보낼 때)
    public ChatRoomCreateResponse(ChatRoomEntity chatRoomEntity, int currentParticipants) {
        this.chatRoomId = chatRoomEntity.getChatRoomId();
        this.memberCode = chatRoomEntity.getMemberCode().getMemberCode();
        this.chatRoomUid = chatRoomEntity.getChatRoomUid();
        this.chatRoomTitle = chatRoomEntity.getChatRoomTitle();
        this.chatRoomCreateAt = chatRoomEntity.getChatRoomCreateAt();
        this.chatRoomDescription = chatRoomEntity.getChatRoomDescription();
        this.chatRoomMaxParticipants = chatRoomEntity.getChatRoomMaxParticipants();
        this.currentParticipants = currentParticipants;
        this.isCurrentUserCreator = false;

    }

}