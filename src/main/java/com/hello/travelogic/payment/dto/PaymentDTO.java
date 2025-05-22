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

    // 결제 관련 화면 출력을 위한 임시 필드
    private String productThumbnail;

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

        // 필드 직접 참조 방지
        if (entity.getOrder() != null && entity.getOrder().getProduct() != null) {
//            this.orderCode = entity.getOrder().getOrderCode();
//            this.productThumbnail = entity.getOrder().getProduct().getProductThumbnail();
            String productPic = entity.getOrder().getProduct().getProductThumbnail();

            if (productPic == null || productPic.isBlank()) {
                this.productThumbnail = "/img/empty/empty-list.jpeg";
            } else if (productPic.contains("/") && productPic.split("/").length >= 2) {
                this.productThumbnail = "/upload/product/" + productPic;
            } else {
                this.productThumbnail = "/static/img/product/" + productPic;
            }
        }
    }
}
