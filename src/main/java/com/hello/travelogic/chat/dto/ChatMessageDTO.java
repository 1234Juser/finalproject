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
    private String roomId;
    private String sender;
    private String message;
    private LocalDateTime sentAt;

    public enum MessageType {
        CHAT,
        JOIN,
        LEAVE
    }

}
