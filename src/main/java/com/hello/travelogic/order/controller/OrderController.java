package com.hello.travelogic.order.controller;

import com.hello.travelogic.order.dto.OrderDTO;
import com.hello.travelogic.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
public class OrderController {
    // 주문 생성(옵션 선택 → 주문 저장) + 결제 요청, 주문 조회

    private final OrderService orderService;

    // 주문하기(옵션 선택 후 주문하기 클릭)
    @PostMapping("/order/create")
    public ResponseEntity<Long> createOrder(@RequestBody OrderDTO orderDTO) {
        Long orderCode = orderService.createOrder(orderDTO);
        return ResponseEntity.ok(orderCode);
    }

    // 결제 페이지에서 보여줄 주문정보
    @GetMapping("/order/{orderCode}")
    public ResponseEntity<OrderDTO> getOrder(@PathVariable Long orderCode) {
        OrderDTO orderDTO = orderService.getOrder(orderCode);
        return ResponseEntity.ok(orderDTO);
    }
}