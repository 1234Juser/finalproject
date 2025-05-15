package com.hello.travelogic.inquiry.dto;

import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class InquiryChatDTO {
    private Integer icId;
    private Integer memberCode;
    private Integer authorityCode;
    private String memberId;
    private String memberEmail;
    private LocalDateTime icStartDate;
    private LocalDateTime icEndDate;
    private String icChatStatus;
}

