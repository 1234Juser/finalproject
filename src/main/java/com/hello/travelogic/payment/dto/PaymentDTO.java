package com.hello.travelogic.payment.dto;

import com.hello.travelogic.payment.domain.PaymentEntity;
import com.hello.travelogic.payment.domain.PaymentMethod;
import com.hello.travelogic.payment.domain.PaymentStatus;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class PaymentDTO {

    @NotNull
    private long paymentCode;
    @NotNull
    private long memberCode;
    @NotNull
    private long orderCode;
    @NotNull
    private PaymentMethod paymentMethod;
    @NotNull
    private String paymentBrand;
    @NotNull
    private LocalDateTime paymentTime;
    @NotNull
    private int paymentAmount;
    @NotNull
    private PaymentStatus paymentStatus;
    @NotNull
    private String impUid;
    @NotNull
    private String merchantUid;
    @NotNull
    private String receiptUrl;

    public PaymentDTO(PaymentEntity entity) {
        this.paymentCode = entity.getPaymentCode();
        this.memberCode = entity.getMember().getMemberCode();
        this.orderCode = entity.getOrder().getOrderCode();
        this.paymentMethod = entity.getPaymentMethod();
        this.paymentBrand = entity.getPaymentBrand();
        this.paymentTime = entity.getPaymentTime();
        this.paymentAmount = entity.getPaymentAmount();
        this.paymentStatus = entity.getPaymentStatus();
        this.impUid = entity.getImpUid();
        this.merchantUid = entity.getMerchantUid();
        this.receiptUrl = entity.getReceiptUrl();
    }
}
