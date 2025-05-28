package com.hello.travelogic.payment.controller;

import com.hello.travelogic.payment.domain.PaymentMethod;
import com.hello.travelogic.payment.domain.PaymentStatus;
import com.hello.travelogic.payment.dto.PaymentDTO;
import com.hello.travelogic.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Slf4j
public class PaymentController {

    private final PaymentService paymentService;

    // REST API사용을 위한 인증(access_token 취득)
    @PostMapping("/users/getToken")
    public ResponseEntity<String> getAccessToken() {
        try {
            String accessToken = paymentService.getAccessToken();
            return ResponseEntity.ok(accessToken);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Access Token 발급 실패");
        }
    }

    // 결제 생성
    @PostMapping("/payments/create")
    public ResponseEntity<PaymentDTO> createPayment(@RequestBody PaymentDTO paymentDTO) {
        PaymentDTO createdPayment = paymentService.createPayment(paymentDTO);
        return ResponseEntity.ok(createdPayment);
    }

    // impUid로 결제 상태 변경
    @PatchMapping("/payments/{impUid}/status")
    public ResponseEntity<String> updatePaymentStatus(@PathVariable String impUid, @RequestParam PaymentStatus status) {
        try {
            paymentService.updatePaymentStatus(impUid, status);
            return ResponseEntity.ok("결제 상태가 성공적으로 업데이트되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("결제 상태 업데이트 중 오류가 발생했습니다.");
        }
    }

    // impUid로 결제 취소
    @PatchMapping("/payments/{impUid}/cancel")
    public ResponseEntity<String> cancelPayment(@PathVariable String impUid) {
        boolean isCanceled = paymentService.cancelPayment(impUid);
        if (isCanceled) {
            return ResponseEntity.ok("결제가 성공적으로 취소되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("결제 취소에 실패했습니다.");
        }
    }

    // impUid로 결제 상태 조회
    @GetMapping("/payments/imp/{impUid}")
    public ResponseEntity<PaymentDTO> getPaymentByImpUid(@PathVariable String impUid) {
        PaymentDTO payment = paymentService.getPaymentByImpUid(impUid);
        return ResponseEntity.ok(payment);
    }

    // merchantUid로 결제 정보 조회(결제 완료 여부를 알 수 없을 때)
    @GetMapping("/payments/{merchantUid}")
    public ResponseEntity<PaymentDTO> getPaymentByMerchantUid(@PathVariable String merchantUid) {
        PaymentDTO payment = paymentService.getPaymentByMerchantUid(merchantUid);
        return ResponseEntity.ok(payment);
    }

    // 내 여행 페이지에서 결재내역 보기 버튼
    @GetMapping("/payments/order/{orderCode}")
    public ResponseEntity<List<PaymentDTO>> getPaymentsByOrderCode(@PathVariable Long orderCode) {
        try {
            List<PaymentDTO> payments = paymentService.getPaymentsByOrderCode(orderCode);
            return ResponseEntity.ok(payments);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // 결제 환불 처리
    @PostMapping("/payments/{impUid}/refund")
    public ResponseEntity<String> refundPayment(@PathVariable String impUid, @RequestBody String reason) {
        try {
            boolean isRefunded = paymentService.refundPayment(impUid, reason);
            if (isRefunded) {
                return ResponseEntity.ok("환불이 성공적으로 처리되었습니다.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("환불 처리에 실패했습니다.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("환불 처리 중 오류가 발생했습니다.");
        }
    }

    // 결제 영수증 발급
    @GetMapping("/payments/{impUid}/receipt")
    public ResponseEntity<String> getReceiptUrl(@PathVariable String impUid) {
        try {
            String receiptUrl = paymentService.getReceiptUrl(impUid);
            return ResponseEntity.ok(receiptUrl);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("영수증 발급 실패");
        }
    }

    // 결제 수단 선택지 가져오기
    // enum클래스의 정적 메서드라
    // 복잡한 비즈니스 로직이나 DB접근 없이
    // enum값을 나열해서 반환하는 단순작업이므로 서비스 코드는 따로 없다.
    @GetMapping("/payments/methods")
    public ResponseEntity<List<String>> getAllPaymentMethods() {
        List<String> methods = Arrays.stream(PaymentMethod.values())
                .map(Enum::name)
                .collect(Collectors.toList());
        return ResponseEntity.ok(methods);
    }

    // 무통장 입금 결제상태 자동화
    @PostMapping("/iamport/webhook")
    public ResponseEntity<String> receiveWebhook(@RequestBody Map<String, Object> payload) {
        String impUid = (String) payload.get("imp_uid");

        paymentService.processPaymentWebhook(impUid);
        return ResponseEntity.ok("OK");
    }

    @GetMapping("/payments/booking/{bookingUid}")
    public ResponseEntity<PaymentDTO> getPaymentByBookingUid(@PathVariable String bookingUid) {
        PaymentDTO payment = paymentService.getPaymentByBookingUid(bookingUid);
        return ResponseEntity.ok(payment);
    }
}
