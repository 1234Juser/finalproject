package com.hello.travelogic.payment.domain;

public enum PaymentStatus {

    PENDING,    // 결제 진행 중
    COMPLETED,  // 결제 완료
    CANCELED,   // 결제 취소
    FAILED,     // 결제 실패
    REFUNDED,   // 환불 완료
    EXPIRED     // 결제 만료
}
