package com.hello.travelogic.order.controller;

import com.hello.travelogic.member.repository.MemberRepository;
import com.hello.travelogic.order.dto.OrderDTO;
import com.hello.travelogic.order.service.OrderService;
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
                                                  Authentication authentication) {
        boolean isAdmin = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(role -> role.equals("ROLE_ADMIN"));

        if (!isAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("접근 권한이 없습니다.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(orderService.getAllMemberBookingList(start));
    }

    // 로그인 회원의 예약 조회
    @GetMapping("/my/reservations/recent")
    public ResponseEntity<?> getRecentOrders(Authentication authentication) {
        String memberId = authentication.getPrincipal().toString();
        Long memberCode = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."))
                .getMemberCode();
        log.debug("회원 {}의 예약 조회 요청", memberCode);
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

    // 예약 상태 실시간 반영(reservationDate이 지난날이 되면 orderStatus가 SCHEDULED에서 COMPLETED로)
    @PostMapping("/reservation/update-status/completed/{orderCode}")
    public ResponseEntity<String> updateCompletedStatus(@PathVariable Long orderCode) {
        int updated = orderService.updateOrderStatusIfCompleted(orderCode);
        return ResponseEntity.ok(updated == 1 ? "COMPLETED로 상태 변경됨" : "변경 사항 없음");
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
        String memberId = authentication.getPrincipal().toString();
        Long memberCode = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."))
                .getMemberCode();
        orderService.cancelOrderByMember(orderCode, memberCode);
        return ResponseEntity.ok("예약이 취소되었습니다.");
    }
}