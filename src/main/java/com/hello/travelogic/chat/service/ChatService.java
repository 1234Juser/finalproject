package com.hello.travelogic.chat.service;

import com.hello.travelogic.chat.dto.ChatMessageDTO;
import com.hello.travelogic.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatService {

    private final SimpMessagingTemplate messagingTemplate;
    private final MemberService memberService;

    // 채팅 메시지 로깅을 위한 Logger 인스턴스 생성
    private static final Logger chatLogger = LoggerFactory.getLogger("ChatLog");
    // 일반 디버깅 및 정보 로그용
    private static final Logger generalLogger = LoggerFactory.getLogger(ChatService.class);


    // ★★ 클라이언트에서 join/chat 메시지 보낼 때 sender 필드에 'username'으로 담아서 보내는 중임 ★★
    public ChatMessageDTO sendMessage(String roomId, ChatMessageDTO message) {

        // 서버 시간
        message.setSentAt(LocalDateTime.now(ZoneId.of("Asia/Seoul")));

        // 발신자 프로필 이미지 URL 설정
        if (message.getSender() != null && message.getType() == ChatMessageDTO.MessageType.CHAT) {
            String profileImageUrl = memberService.getProfileImageUrl(message.getSender());
            // getSender = memberCode.memberCode로 프로필 이미지 가지고 옴.
            log.debug("메시지 보낼 때 message.getSender(): {}", message.getSender());
            log.debug("메시지 보낼 때 profileImageUrl: {}", profileImageUrl);
            log.debug("메시지 보낼 때 memberService.getProfileImageUrl(message.getSender()): {}", memberService.getProfileImageUrl(message.getSender()));
            message.setProfileImageUrl(profileImageUrl);
        }

        // 수신된 채팅 메시지를 로그로 기록
        chatLogger.info("[{}] roomId: {}, sender: {}, message: {}, profileImageUrl: {}, sentAt: {}",
                message.getType(), roomId, message.getSender(), message.getMessage(),
                message.getProfileImageUrl(), message.getSentAt());

        generalLogger.debug("Broadcasting message from {} to /topic/chat/{}", message.getSender(), roomId);

        messagingTemplate.convertAndSend("/topic/chat/" + roomId, message);

        return message;
    }


    public ChatMessageDTO addUser(String roomId, ChatMessageDTO message, SimpMessageHeaderAccessor headerAccessor) {

        message.setSentAt(LocalDateTime.now(ZoneId.of("Asia/Seoul")));

        // 입장 사용자 프로필 이미지 URL 설정 (일반적으로 JOIN/LEAVE 메시지에는 프로필 이미지를 표시하지 않으나, 필요시 추가)
        if (message.getSender() != null) {
            String profileImageUrl = memberService.getProfileImageUrl(message.getSender());
            log.debug("유저 참가할 때 message.getSender(): {}", message.getSender());
            log.debug("유저 참가할 때 profileImageUrl: {}", profileImageUrl);
            message.setProfileImageUrl(profileImageUrl);
        }

        if (headerAccessor.getSessionAttributes() != null) {
            headerAccessor.getSessionAttributes().put("username", message.getSender());
            headerAccessor.getSessionAttributes().put("roomId", roomId);
        }

        chatLogger.info("[{}] User: {}", message.getType(), message.getSender());
        generalLogger.debug("User {} joined, broadcasting to /topic/chat/{}", message.getSender(), roomId);

        // roomId에 따라 구독한 유저에게만 입장 알림 전송
        messagingTemplate.convertAndSend("/topic/chat/" + roomId, message);

        return message;
    }
}
