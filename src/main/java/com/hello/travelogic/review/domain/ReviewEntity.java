package com.hello.travelogic.review.domain;

import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.order.domain.OptionEntity;
import com.hello.travelogic.order.domain.OrderEntity;
import com.hello.travelogic.product.domain.ProductEntity;
import com.hello.travelogic.review.dto.ReviewDTO;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_review")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = {"member", "product", "option", "order"})   // 무한참조 방지
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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_code", nullable = false)
    private ProductEntity product;   // 상품1 - 리뷰N

    @NotNull
    @OneToOne
    @JoinColumn(name = "option_code", nullable = false)
    private OptionEntity option;    // 옵션1 - 리뷰1

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_code", nullable = false)
    private OrderEntity order;      // 주문1 - 리뷰1

    @NotNull
    @Column( name = "review_rating", nullable = false )
    private Integer reviewRating;

    @Size(min = 10, max = 500, message = "리뷰는 10자 이상 500자 이하로 작성해주세요.")
    @Column( name = "review_content", nullable = true, columnDefinition = "TEXT")
    private String reviewContent;

    @NotNull
    @Column( name = "review_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime reviewDate = LocalDateTime.now();

    @Column( name = "review_pic", length = 255, nullable = true )
    private String reviewPic;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column( name = "review_status", nullable = false)
    private ReviewStatus reviewStatus;

    public ReviewEntity(ReviewDTO review, MemberEntity member, OrderEntity order) {
        this.member = member;
        this.product = order.getProduct();
        this.option = order.getOption();
        this.order = order;
        this.reviewRating = review.getReviewRating();
        this.reviewDate = review.getReviewDate();
        this.reviewContent = review.getReviewContent();
        this.reviewPic = review.getReviewPic();
        this.reviewStatus = review.getReviewStatus();
    }

    private static final Logger log = LoggerFactory.getLogger(ReviewEntity.class);

    @PrePersist
    public void prePersist() {
        this.reviewDate = this.reviewDate == null ? LocalDateTime.now() : this.reviewDate;
//        if (this.reviewDate == null) {
//            this.reviewDate = LocalDateTime.now();
//        }
        if (this.reviewPic == null || this.reviewPic.equals("")) {
            this.reviewPic = "nan";
            log.debug("prePersist 호출됨 - 기존 reviewPic: {}", this.reviewPic);
        }
        if (this.order != null) {
            this.order.setReviewed(true);
            log.debug("주문 상태를 리뷰 완료로 설정 - orderCode: {}", this.order.getOrderCode());
        }
    }

    @PreRemove
    public void preRemove() {
        if (this.order != null) {
            this.order.setReviewed(false);
            log.debug("주문 상태를 리뷰 미완료로 설정 - orderCode: {}", this.order.getOrderCode());
        }
    }
}
