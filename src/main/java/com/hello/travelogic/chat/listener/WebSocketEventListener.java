package com.hello.travelogic.chat.listener;

import com.hello.travelogic.chat.service.ChatRoomService;
import com.hello.travelogic.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

/**
 * WebSocket 세션 이벤트를 처리하는 리스너.
 * 주로 사용자의 연결이 끊어졌을 때 퇴장 처리를 담당합니다.
 * 브라우저 탭 종료, 새로고침 감지 → WebSocket 끊김 감지
 * => SessionDisconnectEvent 사용
 * WebSocketEventListener의 역할 : 연결이 끊어진 사용자의 정보를 가지고 퇴장 처리를 시작하는 것
 * 이 리스너는 tbl_chat_member 테이블 업데이트(DB 업데이트)만 담당
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketEventListener implements ApplicationListener<SessionDisconnectEvent> {

    private final ChatRoomService chatRoomService;

    @Override
    public void onApplicationEvent(SessionDisconnectEvent event) {
        // 이벤트에서 STOMP 헤더 정보에 접근하여 세션 속성을 가져옵니다.
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        // WebSocket 세션에 저장했던 사용자 및 방 정보 가져오기
        // ChatService.addUser 메서드에서 이 정보들을 세션 속성에 저장했어야 합니다.
        // username (memberName)과 roomId를 가져옵니다.
        String username = (String) headerAccessor.getSessionAttributes().get("username");   // 사용자 이름 (로깅용)
        log.debug("웹소켓이벤트리스너-----username : {}", username);
        String roomId = (String) headerAccessor.getSessionAttributes().get("roomId");       // 채팅방 UID
        log.debug("웹소켓이벤트리스너-----roomId : {}", roomId);
//        Long memberCode = (Long) headerAccessor.getSessionAttributes().get("memberCode");   // 사용자 memberCode (DB 조회용)
//        log.debug("웹소켓이벤트리스너-----memberCode : {}", memberCode);       // 필요 없음. (ChatRoomService.exitChatRoom 내부에서 memberName으로 MemberEntity를 조회하여 사용합니다.)

        // 사용자 정보와 방 정보가 모두 있는 경우에만 퇴장 처리 진행
        // 퇴장 처리는 memberCode와 roomId만 있으면 ChatRoomService.exitChatRoom에서 가능
        if (roomId != null && username != null) {
            log.info(">>>>>> WebSocket 세션 연결 끊김 감지: user={}, room={}, sessionId={}",
                    username, roomId, headerAccessor.getSessionId());

            try {
                // ★ ChatRoomService의 exitChatRoom 메서드 호출 ★
                // 이 메서드는 DB 업데이트만 담당합니다.
                chatRoomService.exitChatRoom(roomId, username);
                log.info(">>>>>> WebSocket 연결 끊김으로 인한 DB 퇴장 처리 완료: user={}, room={}", username, roomId);

            } catch (RuntimeException e) {
                log.error(">>>>>> WebSocket 연결 끊김으로 인한 DB 퇴장 처리 실패: user={}, room={}, 오류: {}", username, roomId, e.getMessage());
                // 퇴장 처리 중 DB 관련 오류 발생 시 로깅
            }

        } else {
            log.warn(">>>>>> WebSocket 세션 연결 끊김 감지, 하지만 세션 속성에서 사용자/방/memberCode 정보를 찾을 수 없습니다. SessionId={}", headerAccessor.getSessionId());
            // 이 경우는 addUser 단계에서 세션 속성 저장이 누락되었거나, 다른 이유로 정보가 사라진 경우입니다.
            // 필요한 경우 추가적인 로깅 또는 오류 처리를 할 수 있습니다.
        }
    }
}
