package com.hello.travelogic.payment.domain;

import com.hello.travelogic.payment.dto.PaymentCancelDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_payment_cancel")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class PaymentCancelEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long PaymentCancelCode;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_code", nullable = false)
    private PaymentEntity payment;      // 결제1 - 환불1

    @NotNull
    @Column(name = "cancel_time", nullable = false, updatable = false)
    private LocalDateTime cancelTime = LocalDateTime.now();

    @NotNull
    @Column(name = "cancel_amount", nullable = false)
    private int cancelAmount;

    @NotNull
    @Column(name = "pg_tid", nullable = false, unique = true)
    private String pgTid;

    @Null
    @Column(name = "cancel_receipt_url", nullable = true)
    private String cancelReceiptUrl;

    public PaymentCancelEntity(PaymentCancelDTO dto, PaymentEntity payment) {
        this.payment = payment;
        this.cancelTime = dto.getCancelTime() != null ? dto.getCancelTime() : LocalDateTime.now();
        this.cancelAmount = dto.getCancelAmount();
        this.pgTid = dto.getPgTid();
        this.cancelReceiptUrl = dto.getCancelReceiptUrl();
    }
}