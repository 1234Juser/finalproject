package com.hello.travelogic.order.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hello.travelogic.order.dto.OrderDTO;
import com.hello.travelogic.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
public class OrderController {
    // 주문 생성(옵션 선택 → 주문 저장) + 결제 요청, 주문 조회

    private final OrderService orderService;

    // 주문하기(옵션 선택 후 주문하기 클릭. 결제 전 상태)
    @PostMapping("/order/create")
    public ResponseEntity<Map<String, Object>> createOrder(@RequestBody OrderDTO orderDTO) {
        log.info("📥 주문 생성 요청 도착: {}", orderDTO);
        try {
//            Long orderCode = orderService.createOrder(orderDTO);
            Map<String, Object> result = orderService.createOrder(orderDTO);
            log.info("🟢 주문 생성 성공: orderCode={}, bookingUid={}", result.get("orderCode"), result.get("bookingUid"));
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("🔴 주문 생성 실패:", e);
            return ResponseEntity.status(500).body(null);
        }
    }

    // 결제 페이지에서 보여줄 주문정보
    @GetMapping("/order/{orderCode}")
    public ResponseEntity<OrderDTO> getOrder(@PathVariable Long orderCode) {
        try {
            OrderDTO orderDTO = orderService.getOrder(orderCode);
            return ResponseEntity.ok(orderDTO);
        } catch (Exception e) {
            log.error("🔴 주문 조회 실패:", e);
            return ResponseEntity.status(500).body(null);
        }
    }

    // 주문 상태 변경 (결제 완료)
    @PatchMapping("/order/{orderCode}/complete")
    public ResponseEntity<?> completeOrder(
            @PathVariable Long orderCode,
            @RequestBody Map<String, String> requestBody) {

        try {
            String paymentMethod = requestBody.get("paymentMethod");
            int totalPrice = Integer.parseInt(requestBody.get("totalPrice"));
            orderService.completeOrder(orderCode, paymentMethod, totalPrice);
            return ResponseEntity.ok("주문이 성공적으로 완료되었습니다.");
        } catch (Exception e) {
            log.error("🔴 주문 완료 실패:", e);
            return ResponseEntity.status(500).body("주문 완료 실패: " + e.getMessage());
        }
    }

    // PENDING 주문 삭제 (결제 실패 or 취소)
    @DeleteMapping("/order/{orderCode}/delete")
    public ResponseEntity<?> deletePendingOrder(@PathVariable Long orderCode) {
        try {
            orderService.deletePendingOrder(orderCode);
            return ResponseEntity.ok("PENDING 상태의 주문이 성공적으로 삭제되었습니다.");
        } catch (IllegalStateException e) {
            log.warn("🟠 PENDING 주문 삭제 실패 (상태 문제): {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            log.error("🔴 PENDING 주문 삭제 실패:", e);
            return ResponseEntity.status(500).body("주문 삭제 실패: " + e.getMessage());
        }
    }

    // 주문검토페이지 이탈시 생성되었던 orderCode와 optionCode 자동삭제
    @PostMapping("/orders/cancel-pending")
    public ResponseEntity<?> cancelPendingOrderOnPageExit(@RequestBody String body) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Long> request = objectMapper.readValue(body, new TypeReference<>() {});
            Long orderCode = request.get("orderCode");

            log.info("📥 페이지 이탈 주문 삭제 요청 수신됨: {}", orderCode);
            orderService.deletePendingOrder(orderCode);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("🔴 페이지 이탈 삭제 처리 중 예외 발생", e);
            return ResponseEntity.ok("중복 요청 또는 삭제 예외: 무시됨");
        }
    }

//    public static String generateBookingUid() {
//        LocalDate now = LocalDate.now();
//        String datePart = now.format(java.time.format.DateTimeFormatter.ofPattern("yyyy-MMdd"));
//
//        Random random = new Random();
//        int randomPart = random.nextInt(10000); // 0000 ~ 9999
//
//        // 숫자부는 항상 4자리로 맞추기
//        return String.format("%s-%04d", datePart, randomPart);
//    }
//
//    public static void main(String[] args) {
//        System.out.println(generateOptionUid());
//    }

    // 주문취소(결제취소=환불)
//    @PatchMapping("/order/{orderCode}/cancel")
}