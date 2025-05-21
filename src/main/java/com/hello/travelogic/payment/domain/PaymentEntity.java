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
@ToString(exclude = {"member", "order"})
public class PaymentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentCode;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_code", nullable = false)
    private MemberEntity member;    // 회원1 - 결제N

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_code", nullable = false)
    private OrderEntity order;      // 주문1 - 결제1

    @Column(name = "payment_method", nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @Column(name = "payment_brand", nullable = false, length = 50)
    private String paymentBrand;

    @Column(name = "payment_time", nullable = false, updatable = false)
    private LocalDateTime paymentTime = LocalDateTime.now();

    @Column(name = "payment_amount", nullable = false)
    private int paymentAmount;

    @Column(name = "payment_status", nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    @Column(name = "imp_uid", nullable = false, unique = true, length = 50)
    private String impUid;

    @Column(name = "merchant_uid", nullable = false, unique = true, length = 50)
    private String merchantUid;

    @Column(name = "receipt_url", nullable = false, length = 200)
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
