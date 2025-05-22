package com.hello.travelogic.notification.controller;

import com.hello.travelogic.notification.dto.NotificationRequestDTO;
import com.hello.travelogic.notification.dto.NotificationResponseDTO;
import com.hello.travelogic.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/notifications", produces = MediaType.APPLICATION_JSON_VALUE)
public class NotificationController {

    private final NotificationService notificationService;
    private final Map<Integer, SseEmitter> sseEmitters = new ConcurrentHashMap<>(); // 사용자별 Emitter 관리


    // SSE 구독(연결) API 엔드포인트 : 클라이언트가 알림을 실시간으로 받을 수 있도록 만들어줌.
    // 연결 확인하는 방법 : 웹 브라우저 주소창에 http://localhost:8080/api/notifications/subscribe/1 입력 ㄱ
    @GetMapping(value = "/subscribe/{memberCode}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(@PathVariable Integer memberCode) {
        // 1. SseEmitter 객체 생성 (타임아웃을 매우 길게 설정 (또는 적절히))
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        // emitters.put(memberCode, emitter); // 실제로는 좀 더 견고한 Emitter 관리가 필요합니다.

        // 2. 연결 생명주기 관리 콜백 등록
        // 연결이 완료되거나 타임아웃 발생 시 emitter 제거
        emitter.onCompletion(() -> sseEmitters.remove(memberCode, emitter));
        emitter.onTimeout(() -> sseEmitters.remove(memberCode, emitter));
        emitter.onError((e) -> sseEmitters.remove(memberCode, emitter));


        // 3. 생성된 emitter를 맵에 저장 (나중에 특정 사용자에게 데이터 보낼 때 사용)
        sseEmitters.put(memberCode, emitter); // 성공적으로 초기 메시지 전송 후 맵에 추가


        // 4. 초기 연결 확인 메시지 전송 (선택 사항)
        // 연결 직후 더미 데이터(또는 연결 확인 메시지) 전송 (선택 사항)
        try {
            emitter.send(SseEmitter.event().name("connect").data("SSE connection established for member " + memberCode));
        } catch (IOException e) {
            // log.error("Failed to send initial SSE event", e);
            sseEmitters.remove(memberCode, emitter); // 실패 시 제거
        }

        // 5. emitter 반환 (HTTP 연결 유지)
        return emitter;

    }


    // 알림 저장
    @PostMapping("/send")
    public ResponseEntity<NotificationResponseDTO> createNotification(@RequestBody NotificationRequestDTO requestDTO) {
        // TODO: memberCode 유효성 검사, message 내용 검증 등
        NotificationResponseDTO notification = notificationService.createNotification(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(notification);
    }



    // 알림 목록 조회
    @GetMapping("/{memberCode}")
    public ResponseEntity<List<NotificationResponseDTO>> getNotifications(@PathVariable Long memberCode) {
        List<NotificationResponseDTO> list = notificationService.getNotifications(memberCode);
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }


    // 읽음 처리
    /*@PostMapping("/read")
    public ResponseEntity<Void> markAsRead(@RequestBody NotificationUpdateRequestDto dto) {
        notificationService.markAsRead(dto.getNotificationId());
        return ResponseEntity.ok().build();
    }*/





    // 새로운 알림 생성 (내부 시스템 호출용 또는 특정 이벤트 발생 시)
    // 실제 사용 시에는 인증/인가된 사용자만 호출 가능하도록 보안 설정 필요



    // 특정 회원의 모든 알림 조회
    // 예: /api/v1/notifications/member/1


    // 특정 회원의 읽지 않은 알림 조회
    // 예: /api/v1/notifications/member/1/unread

    // 특정 회원의 읽지 않은 알림 개수 조회
    // 예: /api/v1/notifications/member/1/unread-count


    // 알림 읽음 처리
    // 예: /api/v1/notifications/1/read (memberCode는 JWT 등에서 추출하여 서비스에 전달)

    // private Integer getCurrentUserMemberCode(UserDetails userDetails) {
    //     // Spring Security 사용 시 UserDetails에서 사용자 정보를 추출하여 memberCode 반환
    //     // 예: ((CustomUserDetails) userDetails).getMemberCode();
    //     return 1; // 임시
    // }

}

