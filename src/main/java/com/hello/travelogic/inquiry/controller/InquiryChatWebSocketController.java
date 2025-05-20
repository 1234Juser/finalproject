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
    @MessageMapping("/inquiry/{icId}/send")   // 프론트의 전송 경로 `/app/inquiry/{icId}/send`와 매칭됨
    public InquiryChatMessageDTO sendInquiryMessage(@DestinationVariable Long icId,
                                                    @Payload InquiryChatMessageDTO message) {
        log.debug("Received message for icId {}: {}", icId, message.getMessage());

        // 또는 JWT 토큰 등에서 사용자 정보를 추출하여 DTO에 채워 넣을 수 있음 (인터셉터 또는 여기서 직접)
        return inquiryChatWebSocketService.sendInquiryMessage(icId, message);
    }


    // 회원의 1:1 문의 채팅 구독/메시지 전송 경로
    @MessageMapping("/inquiry/{icId}")
    public InquiryChatMessageDTO addInquiryMessage(@DestinationVariable Long icId,
                                                   @Payload InquiryChatMessageDTO message,
                                                   SimpMessageHeaderAccessor headerAccessor) {
        String topic = "/topic/inquiry/" + message.getIcId();
        log.debug("Received message for icId {}: {}", icId, message.getMessage());

        return inquiryChatWebSocketService.addInquiryMessage(icId, message, headerAccessor);
    }


// 이 메소드는 프론트에서 처리
    // 사용자가 1:1 문의 채팅방에 입장했음을 알리고, 시스템 환영 메시지를 처리합니다.
    // handleUserJoin 메소드는 InquiryChatWebSocketService에서 해당 로직이 제거/변경됨에 따라 호출 의미가 없을 수 있음
// 필요 없다면 컨트롤러에서도 제거하거나 주석 처리
/*    @MessageMapping("/inquiry/join/{icId}")
    public InquiryChatMessageDTO handleUserJoin(@DestinationVariable Long icId,
                                         @Payload InquiryChatMessageDTO message,
                                         SimpMessageHeaderAccessor headerAccessor) {

        log.info("Controller: Received JOIN message for icId {}: memberCode={}",
                icId, message.getMemberCode());

        return inquiryChatWebSocketService.handleUserJoin(icId, message, headerAccessor);
    }*/



}
