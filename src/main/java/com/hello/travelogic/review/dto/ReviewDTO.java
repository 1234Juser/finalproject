package com.hello.travelogic.review.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.order.domain.OptionEntity;
import com.hello.travelogic.order.domain.OrderEntity;
import com.hello.travelogic.order.domain.OrderStatus;
import com.hello.travelogic.product.domain.ProductEntity;
import com.hello.travelogic.review.domain.ReviewEntity;
import com.hello.travelogic.review.domain.ReviewStatus;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ReviewDTO {

    private long reviewCode;
    private MemberEntity member;
    private ProductEntity product;
    private OptionEntity option;
    private OrderEntity order;

    private long memberCode;
    private long orderCode;
    private long productCode;
    private long optionCode;
    private Integer reviewRating;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime reviewDate = LocalDateTime.now();
    @Size(min = 10, max = 500, message = "리뷰는 10자 이상 500자 이하로 작성해주세요.")
    private String reviewContent;
    private String reviewPic;   // 파일 경로 URL 저장용
    @NotNull
    private ReviewStatus reviewStatus;

    // 리뷰 폼 출력용 필드
    private String memberName;
    private String productTitle;
    private LocalDate reservationDate;

    public ReviewDTO(ReviewEntity entity) {
        this.reviewCode = entity.getReviewCode();
        this.member = entity.getMember();
        this.memberCode = entity.getMember().getMemberCode();
        this.product = entity.getProduct();
        this.productCode = entity.getProduct().getProductCode();
        this.option = entity.getOption();
        this.order = entity.getOrder();
        this.orderCode = entity.getOrder().getOrderCode();
        this.reviewRating = entity.getReviewRating();
        this.reviewDate = entity.getReviewDate();
        this.reviewContent = entity.getReviewContent();
        this.reviewPic = entity.getReviewPic();
        this.reviewStatus = entity.getReviewStatus();

        if (entity.getOrder() != null) {
//            this.order = entity.getOrder().getOrderCode();
            this.order = entity.getOrder();
            this.reservationDate = entity.getOption().getReservationDate();
        }

        if (entity.getMember() != null) {
            this.memberName = entity.getMember().getMemberName();
        }
    }
}
