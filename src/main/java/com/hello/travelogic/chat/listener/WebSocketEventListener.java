package com.hello.travelogic.chat.listener;

import com.hello.travelogic.chat.service.ChatRoomService;
import com.hello.travelogic.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Map;

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
        Map<String, Object> sessionAttributes = headerAccessor.getSessionAttributes();

        if (sessionAttributes == null) {
            log.warn(">>>>>> WebSocket 세션 연결 끊김 감지 (SessionDisconnectEvent), 세션 속성을 찾을 수 없습니다. SessionId={}", headerAccessor.getSessionId());
            return; // 더 이상 진행할 수 없음
        }
        log.debug("웹소켓이벤트리스너-----SessionId : {}", headerAccessor.getSessionId());


        // WebSocket 세션에 저장했던 사용자 및 방 정보 가져오기
        // ChatService.addUser 메서드에서 이 정보들을 세션 속성에 저장했어야 합니다.
        // username (memberName)과 roomId를 가져옵니다.
        String username = (String) headerAccessor.getSessionAttributes().get("username");   // 사용자 이름 (로깅용)
        log.debug("웹소켓이벤트리스너-----username : {}", username);
        String roomId = (String) headerAccessor.getSessionAttributes().get("roomId");       // 채팅방 UID
        log.debug("웹소켓이벤트리스너-----roomId : {}", roomId);
//        Long memberCode = (Long) headerAccessor.getSessionAttributes().get("memberCode");   // 사용자 memberCode (DB 조회용)
//        log.debug("웹소켓이벤트리스너-----memberCode : {}", memberCode);       // 필요 없음. (ChatRoomService.exitChatRoom 내부에서 memberName으로 MemberEntity를 조회하여 사용합니다.)

        String inquiryChatId = (String) headerAccessor.getSessionAttributes().get("icId"); // "icId" 또는 일관된 키 사용
        log.debug("웹소켓이벤트리스너-----icId : {}", inquiryChatId);



        // username과 roomId가 모두 있는 경우에만 퇴장 처리 진행 (일반적으로 로그인한 회원)
        // 퇴장 처리는 memberCode와 roomId만 있으면 ChatRoomService.exitChatRoom에서 가능
        if (roomId != null && username != null) {
            log.info(">>>>>> WebSocket 세션 연결 끊김 감지(회원으로 처리): user={}, room={}, sessionId={}",
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
            // roomId가 없거나, username(memberId)이 없는 경우 (예: 단순 연결 후 바로 끊김, 비회원 등)
            if (username != null || roomId != null) { // 사용자 정보가 일부라도 있다면
                log.warn(">>>>>> WebSocket 세션 연결 끊김 감지 (사용자 정보 일부 존재, 채팅방 미참여 또는 비회원 등): username(memberId)={}, roomId={}, SessionId={}. DB 퇴장 처리 스킵.",
                        username, roomId, headerAccessor.getSessionId());
            } else { // 사용자 정보가 전혀 없다면
                log.warn(">>>>>> WebSocket 세션 연결 끊김 감지 (세션에 사용자 식별 정보 없음): SessionId={}. DB 퇴장 처리 스킵.", headerAccessor.getSessionId());
            }
            // 이 경우에는 특정 채팅방에 대한 퇴장 처리를 하지 않습니다.
        }
    }
}
