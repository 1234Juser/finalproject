package com.hello.travelogic.review.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hello.travelogic.order.domain.OrderStatus;
import com.hello.travelogic.review.domain.ReviewEntity;
import com.hello.travelogic.review.domain.ReviewStatus;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ReviewDTO {

    private long reviewCode;
    private long memberCode;
    private long orderCode;
    private Integer reviewRating;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime reviewDate;
    @Size(min = 10, max = 500, message = "리뷰는 10자 이상 500자 이하로 작성해주세요.")
    private String reviewContent;
    private String reviewPic;   // 파일 경로 URL 저장용
    @NotNull
    private ReviewStatus reviewStatus;

    public ReviewDTO(ReviewEntity entity) {
        this.reviewCode = entity.getReviewCode();
        this.memberCode = entity.getMember().getMemberCode();
        this.orderCode = entity.getOrder().getOrderCode();
        this.reviewRating = entity.getReviewRating();
        this.reviewDate = entity.getReviewDate();
        this.reviewContent = entity.getReviewContent();
        this.reviewPic = entity.getReviewPic();
        this.reviewStatus = entity.getReviewStatus();
    }
}
