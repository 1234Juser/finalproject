package com.hello.travelogic.order.dto;

import com.hello.travelogic.order.domain.OrderEntity;
import com.hello.travelogic.order.domain.OrderStatus;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class OrderDTO {

    private long orderCode;
    private long productCode;
    private long optionCode;
    private long memberCode;
    private String bookingUid;
    private int orderAdultPrice;
    private Integer orderChildPrice;
    private int totalPrice;
    private LocalDateTime orderDate;
    @NotNull
    private OrderStatus orderStatus;

    // 리뷰 작성 여부를 나타내는 임시필드
    private boolean isReviewed;

    public OrderDTO(OrderEntity entity) {
        this.orderCode = entity.getOrderCode();
        this.productCode = entity.getProduct().getProductCode();
        this.optionCode = entity.getOption().getOptionCode();
        this.memberCode = entity.getMember().getMemberCode();
        this.bookingUid = entity.getBookingUid();
        this.orderAdultPrice = entity.getOrderAdultPrice();
        this.orderChildPrice = entity.getOrderChildPrice();
        this.totalPrice = entity.getTotalPrice();
        this.orderDate = entity.getOrderDate();
        this.orderStatus = entity.getOrderStatus();
        this.isReviewed = entity.isReviewed();
    }
}
