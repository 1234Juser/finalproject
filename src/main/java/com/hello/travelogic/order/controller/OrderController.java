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
    // 주문 생성(옵션 선택 → 주문 저장) + 결제 요청

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

    //    // 본인의 예약 조회
    //    @GetMapping("/mypagy/reservations/{memberCode}")
    //    public ResponseEntity<List<OrderDTO>> getMyBookingList(
    //            @AuthenticationPrincipal MemberDTO member
    //            ) {
    //        List<OrderDTO> personalBookingList = orderService.getBookingsByMemberIdAndStatus(memberCode, orderStatus);
    //        return ResponseEntity.status(HttpStatus.OK).body(personalBookingList);
    //    }
    //
    //    // 지난 여행 조회하기
    //    @GetMapping("/order/completed/{memberCode}")
    //    public ResponseEntity<List<OrderDTO>> getCompletedOrders(@PathVariable long memberCode) {
    //        List<OrderDTO> orders = orderService.getCompletedOrders(memberCode);
    //        return ResponseEntity.ok(orders);
    //    }
    //
    //    // 지난 여행 내역 조회(isReviewed포함)
    //    @GetMapping("/past/{memberCode}")
    //    public ResponseEntity<List<OrderDTO>> getPastTrips(@PathVariable("memberCode") long memberCode) {
    //        log.debug(">>>>> 지난여행 조회 memberCode = {}", memberCode);
    //
    //        List<OrderDTO> pastTrips = orderService.getPastTripsByMember(memberCode);
    //        return ResponseEntity.ok(pastTrips);
    //    }
    //
    //    // 모든 사용자의 예약 조회 + 10개씩 페이징처리
    //    @GetMapping("/admin/manage/booking")
    //    public ResponseEntity getAllMemberBookingList(@RequestParam(value="start", defaultValue="0")int start) {
    //        return ResponseEntity.status(HttpStatus.OK).body(orderService.getAllMemberBookingList(start));
    //    }
}