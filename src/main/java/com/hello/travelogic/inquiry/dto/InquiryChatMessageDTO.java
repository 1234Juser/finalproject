package com.hello.travelogic.inquiry.dto;

import com.hello.travelogic.inquiry.domain.InquiryChatMessageEntity;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Slf4j
public class InquiryChatMessageDTO {
    private Long icmId;
    private Long icId;
    private Long memberCode;
    private Integer authorityCode;
    private InquiryChatMessageEntity.SenderType senderType; // "user" 또는 "admin"
    private InquiryChatMessageEntity.MessageType messageType;
    private String message;
    private LocalDateTime sendAt;   // 서버 시간 사용 시 DTO에서 필요 없을 수도 있음
    private String memberId;



    public InquiryChatMessageDTO(InquiryChatMessageEntity icmDTO) {
        this.icmId = icmDTO.getInquiryChatMessageId();
        this.icId = icmDTO.getInquiryChat().getInquiryChatId();
        this.memberCode = icmDTO.getMemberRole().getMember().getMemberCode();
        this.authorityCode = icmDTO.getMemberRole().getAuthority().getAuthorityCode();
        this.senderType = icmDTO.getInquiryChatMessageSenderType();
        this.messageType = icmDTO.getInquiryChatMessageType();
        this.message = icmDTO.getInquiryChatMessage();
        this.sendAt = icmDTO.getInquiryChatMessageSentAt();
        this.memberId = icmDTO.getMemberRole().getMember().getMemberId();

        log.debug("this.memberId = {} " , icmDTO.getMemberRole().getMember().getMemberId());

    }
}

