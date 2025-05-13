package com.hello.travelogic.chat.controller;

import com.hello.travelogic.chat.dto.ChatMessageDTO;
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
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/chat")
@Slf4j
public class ChatController {

    // 채팅 메시지 로깅을 위한 Logger 인스턴스 생성
    private static final Logger chatLogger = LoggerFactory.getLogger("ChatLog");
    // 일반 디버깅 및 정보 로그용
    private static final Logger generalLogger = LoggerFactory.getLogger(ChatController.class);

    private final SimpMessagingTemplate messagingTemplate;
    private final MemberService memberService;


    // roomId 로 메시지 전송
    @MessageMapping("/chat.send/{roomId}")
    public ChatMessageDTO sendMessage(@DestinationVariable String roomId,
                                      @Payload ChatMessageDTO message) {
        // 서버 시간
        message.setSentAt(LocalDateTime.now(ZoneId.of("Asia/Seoul")));

        // 발신자 프로필 이미지 URL 설정
        if (message.getSender() != null && message.getType() == ChatMessageDTO.MessageType.CHAT) {
            String profileImageUrl = memberService.getProfileImageUrl(message.getSender());
            log.debug("message.getSender(): {}", message.getSender());
            log.debug("profileImageUrl: {}", profileImageUrl);
            message.setProfileImageUrl(profileImageUrl);
        }

        // 수신된 채팅 메시지를 로그로 기록
        chatLogger.info("[{}] roomId: {}, sender: {}, message: {}, profileImageUrl: {}, sentAt: {}",
                message.getType(),
                message.getRoomId(),
                message.getSender(),
                message.getMessage(),
                message.getProfileImageUrl(),
                message.getSentAt());
        generalLogger.debug("Broadcasting message from {} to /topic/chat/{}", message.getSender(), roomId);

        messagingTemplate.convertAndSend("/topic/chat/" + roomId, message);

        return message;
    }


    // 채팅방마다 독립된 입장/퇴장 알림 채널 사용
    @MessageMapping("/chat.addUser/{roomId}")
    public ChatMessageDTO addUser(@DestinationVariable String roomId,
                                  @Payload ChatMessageDTO message,
                                  SimpMessageHeaderAccessor headerAccessor) {

        message.setSentAt(LocalDateTime.now(ZoneId.of("Asia/Seoul")));
        // 입장 사용자 프로필 이미지 URL 설정 (JOIN 메시지에도 필요하다면)
        // 일반적으로 JOIN/LEAVE 메시지에는 프로필 이미지를 표시하지 않으나, 필요시 아래 로직 추가
            /*
            if (message.getSender() != null) {
                String profileImageUrl = memberService.getProfileImageUrl(message.getSender());
                message.setProfileImageUrl(profileImageUrl);
            }
            */

        if (headerAccessor.getSessionAttributes() != null) {
            headerAccessor.getSessionAttributes().put("username", message.getSender());
            headerAccessor.getSessionAttributes().put("roomId", roomId);
        }

        chatLogger.info("[{}] User: {}", message.getType(), message.getSender());
        generalLogger.debug("User {} joined, broadcasting to /topic/chat/{}", message.getSender());

        // roomId에 따라 구독한 유저에게만 입장 알림 전송
        messagingTemplate.convertAndSend("/topic/chat/" + roomId, message);

        return message;
    }


}
