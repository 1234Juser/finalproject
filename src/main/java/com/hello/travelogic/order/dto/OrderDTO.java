package com.hello.travelogic.order.dto;

import com.hello.travelogic.order.domain.OrderEntity;
import com.hello.travelogic.order.domain.OrderStatus;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
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
    // OneToOne에서 ManyToOne으로 바꾸며 생긴 오류 해결법
    private String memberName;
    private String productTitle;
    private int adultCount;
    private Integer childCount;
    private LocalDate reservationDate;
    // 주문내역에서 useNavigate(링크) 걸기위해
    private String productUid;

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
        this.memberName = entity.getMember().getMemberName();
        this.productTitle = entity.getProduct().getProductTitle();
        this.adultCount = entity.getOption().getAdultCount();
        this.childCount = entity.getOption().getChildCount();
        this.reservationDate = entity.getOption().getReservationDate();
        this.productUid = entity.getProduct() != null ? entity.getProduct().getProductUid() : null;
    }
}
