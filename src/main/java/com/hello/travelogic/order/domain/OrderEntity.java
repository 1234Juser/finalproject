package com.hello.travelogic.order.domain;

import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.order.dto.OrderDTO;
import com.hello.travelogic.product.domain.ProductEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_order")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderCode;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_code", nullable = false)
    private ProductEntity product;      // 상품1 - 주문N

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "option_code", nullable = false)
    private OptionEntity option;    // 옵션1 - 주문1

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_code", nullable = false)
    private MemberEntity member;     // 회원1 - 주문N

    @NotNull
    @Column( name = "booking_uid", nullable = false )
    private String bookingUid;

    @NotNull
    @Column( name = "order_adult_price", nullable = false )
    private int orderAdultPrice;

    @Column( name = "order_child_price", nullable = true )
    private Integer orderChildPrice;

    @NotNull
    @Column( name = "total_price", nullable = false )
    private int totalPrice;

    @NotNull
    @Column( name = "order_date", nullable = false )
    private LocalDateTime orderDate;

    @NotNull
    @Column( name = "order_status", nullable = false )
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    @Column(name = "is_reviewed", nullable = false)
    private boolean isReviewed = false;

    public OrderEntity(OrderDTO dto, ProductEntity product, OptionEntity option, MemberEntity member) {
        this.product = product;
        this.option = option;
        this.member = member;
        this.bookingUid = dto.getBookingUid();
        this.orderAdultPrice = dto.getOrderAdultPrice();
        this.orderChildPrice = dto.getOrderChildPrice();
        this.totalPrice = dto.getTotalPrice();
        this.orderDate = dto.getOrderDate();
        this.orderStatus = dto.getOrderStatus();
        this.isReviewed = dto.isReviewed();
    }
}
