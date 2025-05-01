package com.hello.travelogic.payment.dto;

//import com.hello.travelogic.payment.domain.PaymentEntity;
//import com.hello.travelogic.payment.domain.PaymentStatus;
//import jakarta.validation.constraints.NotNull;
//import lombok.*;
//
//import java.time.LocalDateTime;
//
//@NoArgsConstructor
//@AllArgsConstructor
//@Getter
//@Setter
//@ToString
//public class PaymentDTO {
//
//    private long paymentCode;
//    private long memberCode;
//    private long orderCode;
//    private String paymentMethod;
//    private String paymentBrand;
//    private LocalDateTime paymentTime;
//    private int paymentAmount;
//    @NotNull
//    private PaymentStatus paymentStatus;
//    private String impUid;
//    private String merchantUid;
//    private String receiptUrl;
//
//    public PaymentDTO(PaymentEntity entity) {
//        this.paymentCode = entity.getPaymentCode();
//        this.memberCode = entity.getMember().getMemberCode();
//        this.orderCode = entity.getOrder().getOrderCode();
//        this.paymentMethod = entity.getPaymentMethod();
//        this.paymentBrand = entity.getPaymentBrand();
//        this.paymentTime = entity.getPaymentTime();
//        this.paymentAmount = entity.getPaymentAmount();
//        this.paymentStatus = entity.getPaymentStatus();
//        this.impUid = entity.getImpUid();
//        this.merchantUid = entity.getMerchantUid();
//        this.receiptUrl = entity.getReceiptUrl();
//    }
//}
