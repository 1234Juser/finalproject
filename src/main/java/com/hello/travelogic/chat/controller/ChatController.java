package com.hello.travelogic.chat.controller;

import com.hello.travelogic.chat.dto.ChatMessageDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")
@Slf4j
public class ChatController {

    // 채팅 메시지 로깅을 위한 Logger 인스턴스 생성
    // "ChatLog"라는 이름의 로거를 사용합니다. 이 이름은 logback 설정에서 사용될 수 있습니다.
    private static final Logger chatLogger = LoggerFactory.getLogger("ChatLog");
    // 일반 디버깅 및 정보 로그용
    private static final Logger generalLogger = LoggerFactory.getLogger(ChatController.class);

    //    private final ChatService chatService;


/*    // 채팅방 생성
    @PostMapping("/room")
    public ResponseEntity<ChatDTO> createChatRoom(@RequestParam Long creatorMemberCode,
                                                  @RequestBody ChatDTO chatDTO) {
        ChatDTO createdRoom = chatService.createChatRoom(creatorMemberCode, chatDTO);
        return new ResponseEntity<>(createdRoom, HttpStatus.CREATED);
    }

    // 개설된 채팅방 조회
    @GetMapping("/rooms")
    public ResponseEntity<List<ChatDTO>> getAllChatRooms() {
        List<ChatDTO> chatRooms = chatService.getAllChatRooms();
        return new ResponseEntity<>(chatRooms, HttpStatus.OK);
    }*/


    // 클라이언트가 "/app/chat.send"로 메시지를 보내면 이 메소드가 호출됩니다.
    // 수신된 메시지는 "/topic/public"을 구독하는 모든 클라이언트에게 메시지 전송
    @MessageMapping("/chat.send")
    @SendTo("/topic/public")
    public ChatMessageDTO sendMessage(@Payload ChatMessageDTO message) {
        // 수신된 채팅 메시지를 로그로 기록
        // 예: [CHAT] Sender: user1, Content: Hello everyone!
        chatLogger.info("[{}] roomId: {}, sender: {}, message: {}, sentAt: {}",
                message.getType(),
                message.getRoomId(),
                message.getSender(),
                message.getMessage(),
                message.getSentAt());
        generalLogger.debug("Broadcasting message from {} to /topic/public", message.getSender());

        return message;
    }


    // 클라이언트가 "/app/chat.addUser"로 메시지를 보내면 이 메소드가 호출됩니다.
    // 새로운 사용자가 채팅에 참여했음을 알리는 메시지를 "/topic/public"을 구독하는 모든 클라이언트에게 전달합니다.
    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessageDTO addUser(@Payload ChatMessageDTO message,
                               SimpMessageHeaderAccessor headerAccessor) {
        if (headerAccessor.getSessionAttributes() != null) {
            headerAccessor.getSessionAttributes().put("username", message.getSender());
        }
        // 사용자 추가 이벤트를 로그로 기록
        // 예: [JOIN] User: user2
        chatLogger.info("[{}] User: {}", message.getType(), message.getSender());
        generalLogger.debug("User {} joined, broadcasting to /topic/public", message.getSender());
        return message;
    }
}
