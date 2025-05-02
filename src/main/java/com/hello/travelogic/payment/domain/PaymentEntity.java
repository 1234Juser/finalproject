package com.hello.travelogic.payment.domain;

import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.order.domain.OrderEntity;
import com.hello.travelogic.payment.dto.PaymentDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_payment")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class PaymentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentCode;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_code", nullable = false)
    private MemberEntity member;    // 회원1 - 결제N

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_code", nullable = false)
    private OrderEntity order;      // 주문1 - 결제1

    @NotNull
    @Column(name = "payment_method", nullable = false)
    private String paymentMethod;

    @NotNull
    @Column(name = "payment_brand", nullable = false)
    private String paymentBrand;

    @NotNull
    @Column(name = "payment_time", nullable = false)
    private LocalDateTime paymentTime;

    @NotNull
    @Column(name = "payment_amount", nullable = false)
    private int paymentAmount;

    @NotNull
    @Column(name = "payment_status", nullable = false)
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    @NotNull
    @Column(name = "imp_uid", nullable = false)
    private String impUid;

    @NotNull
    @Column(name = "merchant_uid", nullable = false)
    private String merchantUid;

    @NotNull
    @Column(name = "receipt_url", nullable = false)
    private String receiptUrl;

    public PaymentEntity(PaymentDTO dto, MemberEntity member, OrderEntity order) {
        this.member = member;
        this.order = order;
        this.paymentMethod = dto.getPaymentMethod();
        this.paymentBrand = dto.getPaymentBrand();
        this.paymentTime = dto.getPaymentTime();
        this.paymentAmount = dto.getPaymentAmount();
        this.paymentStatus = dto.getPaymentStatus();
        this.impUid = dto.getImpUid();
        this.merchantUid = dto.getMerchantUid();
        this.receiptUrl = dto.getReceiptUrl();
    }
}
