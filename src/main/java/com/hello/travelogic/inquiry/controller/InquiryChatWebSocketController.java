package com.hello.travelogic.inquiry.controller;

import com.hello.travelogic.inquiry.dto.InquiryChatMessageDTO;
import com.hello.travelogic.inquiry.service.InquiryChatWebSocketService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
@Slf4j
public class InquiryChatWebSocketController {

    private final InquiryChatWebSocketService inquiryChatWebSocketService;


    // 사용자 메시지 전송 경로
    @MessageMapping("/inquiry/{icId}/send")
    public InquiryChatMessageDTO sendUserMessage(
            @DestinationVariable Long icId,
            @Payload InquiryChatMessageDTO message) {
        log.debug("사용자 메시지 수신 - icId: {}, 메시지: {}", icId, message.getMessage());
        return inquiryChatWebSocketService.handleUserMessage(icId, message);
    }

    // 관리자 메시지 전송 경로
    @MessageMapping("/admin/inquiry/{icId}/send")
    public InquiryChatMessageDTO sendAdminMessage(
            @DestinationVariable Long icId,
            @Payload InquiryChatMessageDTO message,
            SimpMessageHeaderAccessor headerAccessor) {
        log.debug("관리자 메시지 수신 - icId: {}, 메시지: {}", icId, message.getMessage());
        return inquiryChatWebSocketService.handleAdminMessage(icId, message, headerAccessor);
    }

    // 기존의 @MessageMapping("/inquiry/{icId}") 메서드는 제거하거나, 필요 시 명확한 역할을 정의하여 별도로 유지
}