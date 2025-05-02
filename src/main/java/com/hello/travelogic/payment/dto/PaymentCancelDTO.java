package com.hello.travelogic.payment.dto;

import com.hello.travelogic.payment.domain.PaymentCancelEntity;
import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class PaymentCancelDTO {

    private long paymentCancelCode;
    private long paymentCode;
    private LocalDateTime cancelTime;
    private int cancelAmount;
    private String pgTid;
    private String cancelReceiptUrl;

    public PaymentCancelDTO(PaymentCancelEntity entity) {
        this.paymentCancelCode = entity.getPaymentCancelCode();
        this.paymentCode = entity.getPayment().getPaymentCode();
        this.cancelTime = entity.getCancelTime();
        this.cancelAmount = entity.getCancelAmount();
        this.pgTid = entity.getPgTid();
        this.cancelReceiptUrl = entity.getCancelReceiptUrl();
    }
}
