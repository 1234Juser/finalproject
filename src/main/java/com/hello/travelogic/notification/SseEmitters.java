package com.hello.travelogic.notification;

import com.hello.travelogic.notification.dto.NotificationResponseDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
@Slf4j
public class SseEmitters {


    private final Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();


    // SSE 구독 시 저장
    public void add(Long memberCode, SseEmitter emitter) {
        emitters.put(memberCode, emitter);
    }


    // 연결 종료 시 제거
    public void remove(Long memberCode) {
        SseEmitter emitter = emitters.remove(memberCode);
        if (emitter != null) {
//            emitter.complete();
            emitters.remove(memberCode);
        }
    }


    // 알림 전송
    public void send(Long memberCode, NotificationResponseDTO dto) {
        SseEmitter emitter = emitters.get(memberCode);

        log.debug("SseEmitters 메소드------->>>>>>send memberCode: {}, dto: {}", memberCode, dto);


        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event()
                        .id(String.valueOf(dto.getNotiId()))
                        .name("new-notification")     // (클라이언트에서 구분용)
                        .data(dto));
            } catch (IOException e) {
                emitter.completeWithError(e);
                emitters.remove(memberCode, emitter);   // 오류 발생 시 해당 emitter 제거
            }
        }
    }

}
