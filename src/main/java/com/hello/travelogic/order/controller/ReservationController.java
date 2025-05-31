package com.hello.travelogic.order.controller;

import com.hello.travelogic.member.repository.MemberRepository;
import com.hello.travelogic.order.domain.OrderEntity;
import com.hello.travelogic.order.dto.OrderDTO;
import com.hello.travelogic.order.service.OrderService;
import com.hello.travelogic.product.dto.ProductDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ReservationController {
    // 예약 내역 관리 (조회 + 취소)

    private final OrderService orderService;
    private final MemberRepository memberRepository;

    // 모든 사용자의 예약 조회 + 10개씩 페이징처리
    @GetMapping("/admin/booking")
    public ResponseEntity getAllMemberBookingList(@RequestParam(value="start", defaultValue="0")int start,
                                                  @RequestParam(value="productCode", required=false)Long productCode,
                                                  @RequestParam(value="orderStatus", required = false) String orderStatus,
                                                  Authentication authentication) {
        boolean isAdmin = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(role -> role.equals("ROLE_ADMIN"));

        if (!isAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("접근 권한이 없습니다.");
        }
        Map<String, Object> result;
        if (productCode != null || (orderStatus != null && !orderStatus.equalsIgnoreCase("all"))) {
            result = orderService.getReservationsByProduct(productCode, orderStatus, start);
        } else {
            result = orderService.getAllMemberBookingList(start);
        }
        return ResponseEntity.ok(result);
    }

    // 로그인 회원의 예약 조회
    @GetMapping("/my/reservations/recent")
    public ResponseEntity<?> getRecentOrders(Authentication authentication) {
        String memberId = authentication.getPrincipal().toString();
        Long memberCode = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."))
                .getMemberCode();
        return ResponseEntity.ok(orderService.getRecentOrders(memberCode));
    }

    @GetMapping("/my/reservations/old")
    public ResponseEntity<?> getOldOrders(Authentication authentication) {
        String memberId = authentication.getPrincipal().toString();
        Long memberCode = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."))
                .getMemberCode();
        return ResponseEntity.ok(orderService.getOldOrders(memberCode));
    }

    // 한 주문건만 예약 취소가 아니라 관리자는 여러 건의 주문을 동시에 취소 할 수 있어야 하기에
    // Patch가 아닌 Post
    @PostMapping("/admin/booking/cancel")
    public ResponseEntity cancelSelectedOrders(@RequestBody List<Long> orderCodeList,
                                               Authentication authentication) {
        boolean isAdmin = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(role -> role.equals("ROLE_ADMIN"));

        if (!isAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("접근 권한이 없습니다.");
        }
        orderService.cancelOrdersByAdmin(orderCodeList);
        return ResponseEntity.ok("선택한 예약이 취소되었습니다.");
    }

    // 일반사용자가 한 건의 예약을 취소
    @PatchMapping("/my/reservations/cancel/{orderCode}")
    public ResponseEntity cancelMyReservation(@PathVariable Long orderCode,
                                              Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("인증 정보가 없습니다.");
        }
        String memberId = authentication.getPrincipal().toString();
        Long memberCode = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."))
                .getMemberCode();
        orderService.cancelOrderByMember(orderCode, memberCode);
        return ResponseEntity.ok("예약이 취소되었습니다.");
    }

    // 관리자의 상품별 필터링
    @GetMapping("/admin/booking/filter")
    public ResponseEntity<?> getReservationsByProductCode(
            @RequestParam(value = "productCode", required = false) Long productCode,
            @RequestParam(value = "orderStatus", required = false) String orderStatus,
            @RequestParam(value = "start", defaultValue = "0") int start,
            Authentication authentication) {

        boolean isAdmin = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(role -> role.equals("ROLE_ADMIN"));

        if (!isAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("접근 권한이 없습니다.");
        }

        Map<String, Object> result = orderService.getReservationsByProduct(productCode, orderStatus, start);
        return ResponseEntity.ok(result);
    }

    // 필터링 해서 상품별 조회
    @GetMapping("/admin/booking/products")
    public ResponseEntity<?> getAllProductListForFilter(Authentication authentication) {
        boolean isAdmin = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(role -> role.equals("ROLE_ADMIN"));

        if (!isAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("접근 권한이 없습니다.");
        }
        List<ProductDTO> productList = orderService.getProductListForFilter();
        return ResponseEntity.ok(productList);
    }

    // bookingUid로 예약 명세서 페이지 출력
    @GetMapping("/reservations/receipt/{bookingUid}")
    public ResponseEntity<OrderDTO> getOrderByBookingUid(@PathVariable String bookingUid,
                                                         Authentication authentication) {
        String memberId = authentication.getPrincipal().toString();
        Long memberCode = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."))
                .getMemberCode();
        OrderDTO orderDTO = orderService.getOrderByBookingUid(bookingUid, memberCode);
        return ResponseEntity.ok(orderDTO);
    }

    // 리뷰 작성 요청 모달
    @GetMapping("/my/reservations/review-request")
    public ResponseEntity<?> getLatestUnreviewedOrder(Authentication authentication) {
        String memberId = authentication.getPrincipal().toString();
        Long memberCode = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."))
                .getMemberCode();

        return orderService.getLatestUnreviewedCompletedOrder(memberCode)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());  // 없으면 204
    }

    // 예약 상태별 조회
    @GetMapping("/my/reservations/old/{status}")
    public ResponseEntity<?> getOldOrdersByStatus(@PathVariable String status,
                                                  @RequestParam String startDate,
                                                  @RequestParam String endDate,
                                                  Authentication authentication) {
        String memberId = authentication.getPrincipal().toString();
        Long memberCode = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."))
                .getMemberCode();

        return ResponseEntity.ok(orderService.getOldOrdersByStatus(memberCode, status, startDate, endDate));
    }
}