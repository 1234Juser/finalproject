package com.hello.travelogic.review.domain;

import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.order.domain.OrderEntity;
import com.hello.travelogic.review.dto.ReviewDTO;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "tbl_review")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ReviewEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_code", nullable = false)
    private Long reviewCode;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_code", nullable = false)
    private MemberEntity member;     // 회원1 - 리뷰N

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_code", nullable = false)
    private OrderEntity order;      // 주문1 - 리뷰1

    @NotNull
    @Column( name = "review_rating", nullable = false )
    private int reviewRating;

    @Size(min = 10, max = 500, message = "리뷰는 10자 이상 500자 이하로 작성해주세요.")
    @Column( name = "review_content", nullable = true, columnDefinition = "TEXT")
    private String reviewContent;

    @NotNull
    @Column( name = "review_date", nullable = false)
    private LocalDate reviewDate;

    @Column( name = "review_pic", length = 255 )
    private String reviewPic;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column( name = "review_status", nullable = false)
    private ReviewStatus reviewStatus;

    public ReviewEntity(ReviewDTO review, MemberEntity member, OrderEntity order) {
        this.member = member;
        this.order = order;
        this.reviewRating = review.getReviewRating();
        this.reviewDate = review.getReviewDate();
        this.reviewContent = review.getReviewContent();
        this.reviewPic = review.getReviewPic();
        this.reviewStatus = review.getReviewStatus();
    }

    @PrePersist
    public void prePersist() {
        this.reviewDate = this.reviewDate == null ? LocalDate.now() : this.reviewDate;
        if (this.reviewPic == null || this.reviewPic.equals("")) {
            reviewPic = null;
        }
    }
}
