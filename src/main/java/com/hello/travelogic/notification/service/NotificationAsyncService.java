package com.hello.travelogic.notification.service;

import com.hello.travelogic.notification.dto.NotificationRequestDTO;
import com.hello.travelogic.order.domain.OrderEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@Slf4j
@RequiredArgsConstructor
public class NotificationAsyncService {

    private final NotificationService notificationService;

    // 비동기적으로 3초 지연 후 알림 생성 및 전송
    @Async
    public void sendDelayedNotification(OrderEntity order) {
        try {
            log.info("🔵 3초 지연 시작 - memberCode: {}", order.getMember().getMemberCode());
            TimeUnit.SECONDS.sleep(3);

            log.info("🟢 알림 생성 시작");
            Long memberCode = order.getMember().getMemberCode();
            String message = "주문 번호 " + order.getOrderCode() + "의 결제가 완료되었습니다.";

            NotificationRequestDTO notificationRequest = NotificationRequestDTO.builder()
                    .memberCode(memberCode)
                    .notiMessage(message)
                    .notiOrderId(order.getOrderCode())
                    .build();

            notificationService.createNotification(notificationRequest);
            log.info("🟢 결제 완료 알림 전송 (3초 지연): memberCode = {}, message = {}", memberCode, message);
        } catch (InterruptedException e) {
            log.error("🛑 InterruptedException 발생", e);
            Thread.currentThread().interrupt();
        } catch (Exception e) {
            log.error("🛑 알림 전송 중 예외 발생", e);
        }
    }
}
