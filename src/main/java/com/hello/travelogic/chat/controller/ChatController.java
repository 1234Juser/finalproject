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

        // 여기서 chatMessage.getMemberCode() 값이 있는지 확인이 필요
        // log.debug("Controller: Received memberCode {}", chatMessage.getMemberCode()); // 만약 로그가 찍힌다면...
//        chatService.sendMessage(roomId, message);

        return chatService.sendMessage(roomId, message);
    }


    // 사용자 입장시 메시지 전송 핸들러 (채팅방마다 독립된 입장/퇴장 알림 채널)
    @MessageMapping("/chat.addUser/{roomId}")
    public ChatMessageDTO addUser(@DestinationVariable String roomId,
                                  @Payload ChatMessageDTO message,
                                  SimpMessageHeaderAccessor headerAccessor) {
        log.debug("addUser roomId: {}, message: {}", roomId, message);

        // ChatService의 addUser 메서드 내부에서 세션 저장 및 DB 추가 로직을 모두 처리하도록 변경하는 것이 좋습니다.
        // 현재 코드는 컨트롤러에서 chatRoomService.addMemberToRoom을 호출한 후 chatService.addUser를 다시 호출하고 있습니다.
        // ChatService의 addUser가 DB 추가 로직을 포함하도록 수정하면 이 부분을 간결하게 만들 수 있습니다.
        // 일단 현재 구조를 유지하며 진행하겠습니다.


        // 세션에 유저 정보 저장 (ChatService.addUser 내부에서 처리하도록 이동 권장)
//        headerAccessor.getSessionAttributes().put("username", message.getSender());
//        headerAccessor.getSessionAttributes().put("roomId", roomId);
        // headerAccessor.getSessionAttributes().put("memberCode", message.getMemberCode()); // memberCode도 저장 필요

        // 입장 멤버 중간 테이블에 추가 (ChatService.addUser 내부에서 처리하도록 이동 권장)
//        chatRoomService.addMemberToRoom(roomId, message.getSender());

        // 입장 메시지 및 브로드캐스트
        // ChatService.addUser는 DB 저장 및 메시지 발행을 모두 하므로, 위 두 줄은 ChatService.addUser 내부로 옮기는 것이 좋습니다.
        return chatService.addUser(roomId, message, headerAccessor);
    }


    // 사용자 퇴장시 메시지 전송 핸들러. 별도의 응답을 클라이언트에게 보내지 않음 (void)
    @MessageMapping("/chat.leave/{roomId}")
    public void handleLeave(@DestinationVariable String roomId,
                                      @Payload ChatMessageDTO message) {
        log.debug("Received LEAVE message for room: {} from sender: {}", roomId, message.getSender());      // message.getSender()는 memberName

        // message.getMemberCode()를 사용하여 ChatRoomMemberEntity를 찾고 업데이트합니다.
        if (message.getSender() != null) {
            // 퇴장 메시지 전송
            chatService.sendExitMessage(roomId, message, message.getSender());
        } else {
            log.warn("Received LEAVE message without memberCode for room: {}. Cannot process leave.", roomId);
            // memberCode가 없는 경우 로깅 또는 클라이언트에게 오류 알림
        }
    }

}
