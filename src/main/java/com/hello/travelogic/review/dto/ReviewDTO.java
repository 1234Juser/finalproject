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
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Slf4j
public class ReviewDTO {

    private long reviewCode;
    private long memberCode;
    private long orderCode;
    private long productCode;
    private long optionCode = 0L;
    private Integer reviewRating;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime reviewDate = LocalDateTime.now();
    @Size(min = 10, max = 500, message = "리뷰는 10자 이상 500자 이하로 작성해주세요.")
    private String reviewContent;
    private String reviewPic;   // 파일 경로 URL 저장용
    @NotNull
    private String reviewStatus = "ACTIVE";

    // 리뷰 폼 출력용 필드
    private String memberName;
    private String productTitle;
    private LocalDate reservationDate;
    private String productUid;

    public void setOptionEntity(OptionEntity optionEntity) {
        if (optionEntity != null) {
            this.optionCode = optionEntity.getOptionCode();
            this.reservationDate = optionEntity.getReservationDate();
            this.productCode = optionEntity.getProduct().getProductCode();
            this.productTitle = optionEntity.getProduct().getProductTitle();
        } else {
            this.optionCode = 0L;  // 기본값 설정
             log.debug("OptionEntity가 null입니다. 기본값 0L로 설정");
        }
    }

    public void setProductEntity(ProductEntity productEntity) {
        this.productCode = productEntity.getProductCode();
        this.productTitle = productEntity.getProductTitle();
    }

    public ReviewDTO(ReviewEntity entity) {
        this.reviewCode = entity.getReviewCode();
        this.memberCode = entity.getMember().getMemberCode();
        this.productCode = entity.getProduct().getProductCode();
        this.orderCode = entity.getOrder().getOrderCode();
        this.reviewRating = entity.getReviewRating();
        this.reviewDate = entity.getReviewDate();
        this.reviewContent = entity.getReviewContent();
        this.reviewPic = entity.getReviewPic();
        this.reviewStatus = entity.getReviewStatus() != null ? entity.getReviewStatus().name() : "ACTIVE";
        this.optionCode = 0L;
        this.productUid = entity.getProduct() != null ? entity.getProduct().getProductUid() : null;

        // 필드 직접 참조 방지
        if (entity.getOrder() != null) {
            this.orderCode = entity.getOrder().getOrderCode();
//            this.order = entity.getOrder();
            log.debug("🟡 OrderEntity 로드 완료 - orderCode: {}", this.orderCode);
        }
        if (entity.getMember() != null) {
            this.memberCode = entity.getMember().getMemberCode();
            this.memberName = entity.getMember().getMemberName();
            log.debug("🟡 MemberEntity 로드 완료 - memberCode: {}, memberName: {}", this.memberCode, this.memberName);
        }
        if (entity.getProduct() != null) {
            this.productCode = entity.getProduct().getProductCode();
            this.productTitle = entity.getProduct().getProductTitle();
            this.productUid = entity.getProduct().getProductUid();
            log.debug("🟡 ProductEntity: code={}, title={}, uid={}",
                    this.productCode, this.productTitle, this.productUid);
        }
        if (entity.getOption() != null) {
            this.optionCode = entity.getOption().getOptionCode();
            this.reservationDate = entity.getOption().getReservationDate();
            log.debug("🟡 OptionEntity 로드 완료 - optionCode: {}, reservationDate: {}", this.optionCode, this.reservationDate);
        }
    }
    public void setReviewStatus(String reviewStatus) {
        try {
            // ENUM에 존재하는 값만 허용
            this.reviewStatus = ReviewStatus.valueOf(reviewStatus.toUpperCase()).name();
        } catch (IllegalArgumentException e) {
            this.reviewStatus = "ACTIVE";  // 기본값
            log.warn("잘못된 리뷰 상태입니다. 기본값 ACTIVE로 설정합니다. 입력값: {}", reviewStatus);
        }
    }
}
