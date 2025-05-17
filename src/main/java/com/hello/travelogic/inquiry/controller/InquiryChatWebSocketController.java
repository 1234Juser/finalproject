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


    // (구독) 1:1 문의 채팅 보내기
    @MessageMapping("/inquiry/chat.sendMessage/{icId}")    // 클라이언트가 이 경로로 메시지 전송
    public InquiryChatMessageDTO sendInquiryMessage(@DestinationVariable Long icId,
                                                    @Payload InquiryChatMessageDTO message) {
        log.debug("Received message for icId {}: {}", icId, message.getMessage());

        // 또는 JWT 토큰 등에서 사용자 정보를 추출하여 DTO에 채워 넣을 수 있음 (인터셉터 또는 여기서 직접)
        return inquiryChatWebSocketService.sendInquiryMessage(icId, message);
    }

/*
// 이 메소드는 프론트에서 처리
    // 사용자가 1:1 문의 채팅방에 입장했음을 알리고, 시스템 환영 메시지를 처리합니다.
    @MessageMapping("/inquiry/join/{icId}")
    public InquiryChatMessageDTO handleUserJoin(@DestinationVariable Long icId,
                                         @Payload InquiryChatMessageDTO message,
                                         SimpMessageHeaderAccessor headerAccessor) {

        log.info("Controller: Received JOIN message for icId {}: memberCode={}",
                icId, message.getMemberCode());

        return inquiryChatWebSocketService.handleUserJoin(icId, message, headerAccessor);
    }

 */
}
