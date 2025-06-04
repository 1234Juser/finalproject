package com.hello.travelogic.order.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hello.travelogic.order.domain.OrderEntity;
import com.hello.travelogic.order.domain.OrderStatus;
import com.hello.travelogic.payment.domain.PaymentEntity;
import com.hello.travelogic.payment.domain.PaymentMethod;
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
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime orderDate;
    @NotNull
    private OrderStatus orderStatus;

    // 리뷰 작성 여부를 나타내는 임시필드
    private boolean isReviewed;
    // OneToOne에서 ManyToOne으로 바꾸며 생긴 오류 해결법
    private String memberName;
    private String memberEmail;
    private String memberPhone;
    private String productTitle;
    private String productThumbnail;
    private int adultCount;
    private Integer childCount;
    private LocalDate reservationDate;
    // 주문내역에서 useNavigate(링크) 걸기위해
    private String productUid;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime vbankDue;

    public OrderDTO(OrderEntity entity, PaymentEntity payment) {
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
        this.isReviewed = entity.hasReview();
        this.memberName = entity.getMember().getMemberName();
        this.memberEmail = entity.getMember().getMemberEmail();
        this.memberPhone = entity.getMember().getMemberPhone();
        this.productTitle = entity.getProduct().getProductTitle();
//        this.productThumbnail = entity.getProduct() != null ? entity.getProduct().getProductThumbnail() : null;
        this.productThumbnail = entity.getProduct().getProductThumbnail();
        if (this.productThumbnail != null && !this.productThumbnail.isBlank() && !this.productThumbnail.startsWith("http")) {
            this.productThumbnail = "https://hellotravelogic-img-s3.s3.ap-northeast-2.amazonaws.com/" + this.productThumbnail.replace("\\", "/");
        } else if (this.productThumbnail == null || this.productThumbnail.isBlank()) {
            this.productThumbnail = "/static/img/earth.jpg";
        }
        this.adultCount = entity.getOption().getAdultCount();
        this.childCount = entity.getOption().getChildCount();
        this.reservationDate = entity.getOption().getReservationDate();
        this.productUid = entity.getProduct() != null ? entity.getProduct().getProductUid() : null;
        if (payment != null &&
                payment.getPaymentMethod() == PaymentMethod.BANK_TRANSFER &&
                payment.getVbankDue() != null) {
            this.vbankDue = payment.getVbankDue();
        }
    }
}
