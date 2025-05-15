package com.hello.travelogic.inquiry.dto;

import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class InquiryChatMessageDTO {
    private Integer icmId;
    private Integer icId;
    private Integer memberCode;
    private Integer authorityCode;
    private String senderType; // "user" 또는 "admin"
    private String message;
    private LocalDateTime sentAt;
}

