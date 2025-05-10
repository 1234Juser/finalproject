package com.hello.travelogic.chat.dto;

import lombok.*;

import java.awt.*;
import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChatMessageDTO {

    private MessageType type;
    private Long roomId;
    private String sender; // 보내는 사람 ID 또는 닉네임
    private String message; // 채팅 내용
    private LocalDateTime sentAt; // 보낸 시각

    public enum MessageType {
        CHAT,
        JOIN,
        LEAVE
    }

}
