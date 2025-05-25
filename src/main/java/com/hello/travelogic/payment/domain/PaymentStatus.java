package com.hello.travelogic.payment.domain;

public enum PaymentStatus {

    PENDING,    // 결제 진행 중
    COMPLETED,  // 결제 완료
    CANCELED,   // 결제 취소
    FAILED,     // 결제 실패
    REFUNDED,   // 환불 완료
    EXPIRED,    // 결제 만료
    WAITING_BANK_TRANSFER   // 무통장입금 입금 대기 상태
}
