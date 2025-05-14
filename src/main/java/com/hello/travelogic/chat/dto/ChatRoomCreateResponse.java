package com.hello.travelogic.chat.dto;

import com.hello.travelogic.chat.domain.ChatRoomEntity;
import lombok.*;

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

    // Entity → ResponseDTO로 변환 (저장 후 클라이언트에게 보낼 때)
    public ChatRoomCreateResponse(ChatRoomEntity chatRoomEntity, int currentParticipants) {
        this.chatRoomId = chatRoomEntity.getChatRoomId();
        this.memberCode = chatRoomEntity.getMemberCode().getMemberCode();
        this.chatRoomUid = chatRoomEntity.getChatRoomUid();
        this.chatRoomTitle = chatRoomEntity.getChatRoomTitle();
        this.chatRoomCreateAt = chatRoomEntity.getChatRoomCreateAt();
        this.chatRoomDescription = chatRoomEntity.getChatRoomDescription();
        this.chatRoomMaxParticipants = chatRoomEntity.getChatRoomMaxParticipants();
        this.currentParticipants = chatRoomEntity.getChatRoomMembers().size();
    }

    // 이 DTO는 생성 실패 시 컨트롤러에서 new ChatRoomCreateResponse()로 빈 객체를 반환하는 용도로도 사용되었으나,
    // 오류 응답은 별도의 방식 (문자열 메시지, Error DTO 등)으로 처리하는 것이 더 명확합니다.
    // 따라서 이 DTO는 성공적인 응답에만 사용되는 것이 이상적입니다.

}