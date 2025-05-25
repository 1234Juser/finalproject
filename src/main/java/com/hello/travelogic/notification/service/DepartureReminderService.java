package com.hello.travelogic.notification.service;

import com.hello.travelogic.notification.dto.NotificationRequestDTO;
import com.hello.travelogic.order.domain.OrderEntity;
import com.hello.travelogic.order.domain.OrderStatus;
import com.hello.travelogic.order.repo.OrderRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartureReminderService {

    private static final Logger log = LoggerFactory.getLogger(DepartureReminderService.class);

    private final OrderRepo orderRepo;
    private final NotificationService notificationService;



     @Scheduled(cron = "0 * * * * ?")      // 매분 0초에 실행 (테스트용)
//    @Scheduled(cron = "0 0 0 * * ?")        // 매일 자정에 실행
    @Transactional
    public void sendDepartureReminders() {
        LocalDate tomorrow = LocalDate.now().plusDays(1);
        log.info("🚀 출발 하루 전 알림 작업 시작. 대상 날짜: {}", tomorrow);

        List<OrderEntity> ordersToRemind = orderRepo.findByOrderStatusAndOptionReservationDate (OrderStatus.SCHEDULED, tomorrow);
        log.debug("ordersToRemind: {}", ordersToRemind);

        if (ordersToRemind.isEmpty()) {
            log.info("ℹ️ 출발 하루 전 알림 대상 주문이 없습니다 (날짜: {}).", tomorrow);
            return;
        }

        log.info("🔔 총 {}건의 출발 하루 전 알림 대상 주문을 찾았습니다.", ordersToRemind.size());

        for (OrderEntity order : ordersToRemind) {
            try {
                Long memberCode = order.getMember().getMemberCode();
                String productName = order.getProduct().getProductTitle();
                String message = "예약하신 상품 [" + productName + "]의 출발일(" + order.getOption().getReservationDate() + ")이 하루 남았습니다! 투어를 준비해주세요.";

                NotificationRequestDTO notificationRequest = NotificationRequestDTO.builder()
                        .memberCode(memberCode)
                        .notiMessage(message)
                        .notiOrderId(order.getOrderCode())
                        // .notiType("DEPARTURE_REMINDER") // 알림 타입 구분 필요 시 추가
                        .build();

                notificationService.createNotification(notificationRequest);
                log.info("✅ 출발 하루 전 알림 전송 성공: 회원 코드 = {}, 주문 코드 = {}, 예약일 = {}",
                        memberCode, order.getOrderCode(), order.getOption().getReservationDate());

            } catch (Exception e) {
                log.error("❌ 출발 하루 전 알림 전송 중 오류 발생: 주문 코드 = {}, 오류 = {}",
                        order.getOrderCode(), e.getMessage(), e);
                // 개별 알림 실패가 전체 작업을 중단시키지 않도록 예외 처리
            }
        }
        log.info("🏁 출발 하루 전 알림 작업 완료.");
    }
}
