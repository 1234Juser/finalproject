package com.hello.travelogic.inquiry.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class InquiryChatAdminDTO {
    private Long inquiryChatId;
    private String memberId;
    private String inquiryChatStatus;
    private LocalDateTime inquiryChatStartDate;
    private LocalDateTime inquiryChatEndDate;
}