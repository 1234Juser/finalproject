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
        try {
            Map<String, Object> result = orderService.createOrder(orderDTO);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
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
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
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

            orderService.deletePendingOrder(orderCode);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.ok("중복 요청 또는 삭제 예외: 무시됨");
        }
    }
}