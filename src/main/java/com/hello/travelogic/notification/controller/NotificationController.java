package com.hello.travelogic.notification.controller;

import com.hello.travelogic.notification.dto.NotificationRequestDTO;
import com.hello.travelogic.notification.dto.NotificationResponseDTO;
import com.hello.travelogic.notification.service.NotificationService;
import com.hello.travelogic.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
public class NotificationController {

    private final NotificationService notificationService;
    private final Map<Integer, SseEmitter> sseEmitters = new ConcurrentHashMap<>(); // 사용자별 Emitter 관리
    private final JwtUtil jwtUtil;


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
    @GetMapping("/member/{memberCode}")
    public ResponseEntity<List<NotificationResponseDTO>> getNotifications(@PathVariable Long memberCode) {
        List<NotificationResponseDTO> list = notificationService.getNotifications(memberCode);
        log.debug("getNotifications list::::::: {}", list);
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }


    // 모든 알림 읽음 처리
    @PostMapping("/mark-all-as-read/member/{memberCode}")
    public ResponseEntity<Void> markAllAsRead(@PathVariable Long memberCode) {
        notificationService.markAllAsRead(memberCode);
        return ResponseEntity.ok().build();
    }


    // 개별 알림 읽음 처리
    @PostMapping("/mark-as-read/{notiId}")
    public ResponseEntity<Void> markAsRead(@PathVariable Long notiId) {
        notificationService.markAsRead(notiId);
        return ResponseEntity.ok().build();
    }


    // 알림 개별 삭제
    @DeleteMapping("/delete/{notiId}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long notiId) {
        notificationService.deleteNotification(notiId);
        return ResponseEntity.noContent().build();
    }


    // 모든 알림 삭제
    @DeleteMapping("/delete-all")
    public ResponseEntity<Void> deleteAllNotifications(@RequestHeader("Authorization") String token) {
        // "Bearer " 접두사 제거
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7).trim();
        }

        // 토큰에서 memberCode 추출
        Long memberCode = jwtUtil.getMemberCodeFromToken(token);
        notificationService.deleteAllNotifications(memberCode);
        return ResponseEntity.noContent().build();
    }



}

