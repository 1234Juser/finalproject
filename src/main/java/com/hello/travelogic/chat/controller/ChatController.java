package com.hello.travelogic.chat.controller;

import com.hello.travelogic.chat.dto.ChatMessageDTO;
import com.hello.travelogic.chat.service.ChatRoomService;
import com.hello.travelogic.chat.service.ChatService;
import com.hello.travelogic.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/chat")
@Slf4j
public class ChatController {

    private final ChatService chatService;
    private final ChatRoomService chatRoomService;


    // roomId 로 메시지 전송
    @MessageMapping("/chat.send/{roomId}")
    public ChatMessageDTO sendMessage(@DestinationVariable String roomId,
                                      @Payload ChatMessageDTO message) {

        return chatService.sendMessage(roomId, message);
    }


    // 사용자 입장 핸들러 (채팅방마다 독립된 입장/퇴장 알림 채널)
    @MessageMapping("/chat.addUser/{roomId}")
    public ChatMessageDTO addUser(@DestinationVariable String roomId,
                                  @Payload ChatMessageDTO message,
                                  SimpMessageHeaderAccessor headerAccessor) {
        log.debug("addUser roomId: {}, message: {}", roomId, message);
        // 세션에 유저 정보 저장
        headerAccessor.getSessionAttributes().put("username", message.getSender());
        headerAccessor.getSessionAttributes().put("roomId", roomId);

        // 입장 멤버 중간 테이블에 추가
        chatRoomService.addMemberToRoom(roomId, message.getSender());

        // 입장 메시지 브로드캐스트
        return chatService.addUser(roomId, message, headerAccessor);
    }

}
