package com.hello.travelogic.chat.service;

import com.hello.travelogic.chat.dto.ChatMessageDTO;
import com.hello.travelogic.chat.dto.ChatRoomCreateResponse;
import com.hello.travelogic.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatService {

    private final SimpMessagingTemplate messagingTemplate;
    private final MemberService memberService;
    private final ChatRoomService chatRoomService;

    // 채팅 메시지 로깅을 위한 Logger 인스턴스 생성
    private static final Logger chatLogger = LoggerFactory.getLogger("ChatLog");
    // 일반 디버깅 및 정보 로그용
    private static final Logger generalLogger = LoggerFactory.getLogger(ChatService.class);


    // ★★ 클라이언트에서 join/chat 메시지 보낼 때 sender 필드에 'username'으로 담아서 보내는 중임 ★★
    public ChatMessageDTO sendMessage(String roomId, ChatMessageDTO message) {

        log.debug("sendMessage 호출됨. RoomId: {}, Message Type: {}", roomId, message.getType());
        generalLogger.debug("수신된 메시지 원본 - sender: {}, memberCode: {}", message.getSender(), message.getMemberCode()); // <--- 이 로그 추가



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


    // 입장시 메시지 전송
    public ChatMessageDTO addUser(String roomId, ChatMessageDTO message, SimpMessageHeaderAccessor headerAccessor) {

        message.setSentAt(LocalDateTime.now(ZoneId.of("Asia/Seoul")));

        // 입장 사용자 프로필 이미지 URL 설정
        if (message.getSender() != null) {
            String profileImageUrl = memberService.getProfileImageUrl(message.getSender());
            message.setProfileImageUrl(profileImageUrl);
        }

        // WebSocket 세션 속성에 유저 정보 저장
        if (headerAccessor.getSessionAttributes() != null) {
            headerAccessor.getSessionAttributes().put("username", message.getSender());
            headerAccessor.getSessionAttributes().put("roomId", roomId);
        }
/*        // 참여 인원 업데이트
        chatRoomService.addMemberToRoom(roomId, message.getSender()); // 채팅방에 멤버 추가
        // 현재 참여 인원 수 계산
        long currentParticipants = chatRoomService.getCurrentParticipantsCount(roomId);

        // 참여 인원을 포함한 메시지를 생성
        Map<String, Object> payload = Map.of(
                "type", "USER_UPDATE", // 메시지 타입
                "message", message.getSender() + "님이 참여했습니다.", // 출력 메시지
                "currentParticipants", currentParticipants // 현재 참여 인원
        );*/

        chatLogger.info("[{}] User: {}", message.getType(), message.getSender());
        generalLogger.debug("User {} joined, broadcasting to /topic/chat/{}", message.getSender(), roomId);

        // 입장 멤버 중간 테이블에 추가 (ChatService.addUser 내부에서 처리하도록 이동 권장)
        chatRoomService.addMemberToRoom(roomId, message.getSender());

/*        // 메시지 전송
        messagingTemplate.convertAndSend("/topic/chat/" + roomId + "/updates", payload);
        log.debug("Broadcasting user updates to /topic/chat/{}/updates: {}", roomId, payload);
        log.debug("User added to room {}. Broadcasting participants count: {}", roomId, currentParticipants);*/

         // roomId에 따라 구독한 유저에게만 입장 알림 전송
        messagingTemplate.convertAndSend("/topic/chat/" + roomId, message);

        return message;
    }


    // 퇴장시 메시지 전송
    public void sendExitMessage(String roomId, ChatMessageDTO message, String memberName) {

        log.debug("sendExitMessage roomId: {}, memberName: {}", roomId, memberName);

        String exitMsg = memberName + "님이 채팅방을 퇴장하였습니다.";

        ChatMessageDTO exitMessage = ChatMessageDTO.builder()
                .type(ChatMessageDTO.MessageType.valueOf("LEAVE"))
                .roomId(roomId)
                .sender("System") // 시스템 메시지로 처리
                .message(exitMsg)
                .sentAt(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
                .build();

        // 다른 사용자에게 퇴장 메시지 전송
        messagingTemplate.convertAndSend("/topic/chat/" + roomId, exitMessage);

        log.info("[퇴장 메시지] {}: {}", roomId, exitMsg);
         chatLogger.info("[LEAVE] User: {} left room {}", memberName, roomId);
    }

}
