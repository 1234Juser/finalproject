package com.hello.travelogic.chat.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChatRoomCreateRequest {
    // 채팅방 생성 요청 DTO

    private String chatRoomTitle;
    private String chatRoomDescription;
    private Integer chatRoomMaxParticipants;
}
