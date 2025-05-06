package com.hello.travelogic.review.repo;

import com.hello.travelogic.review.domain.ReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface ReviewRepo extends JpaRepository<ReviewEntity, Long> {

    // 평점 평균
    @Query("SELECT AVG(r.reviewRating) FROM ReviewEntity r WHERE r.order.product.productCode = :productCode")
    Optional<Double> getAverageRatingByProductCode(@Param("productCode") Long productCode);

    // 상품 상세페이지에서 리뷰 디폴트 정렬 최신순
    // /review/product/{productCode}
    List<ReviewEntity> findByOrder_Product_ProductCode(long productCode);

    Optional<ReviewEntity> findByMemberMemberCodeAndOrderOrderCode(Long memberCode, Long orderCode);

    ReviewEntity findByReviewCode(long reviewCode);

    // 상품별 평점순
    // /review/product/{productCode}?sort=rating
    List<ReviewEntity> findByOrder_Product_ProductCodeOrderByReviewRatingDesc(long productCode); // 평점순

    // 상품별 최신순
    // /review/product/{productCode}?sort=date
//    List<ReviewEntity> findByOrder_Product_ProductCodeOrderByReviewDateDesc(long productCode);   // 최신순 (명시적)
    // tbl_review에 fk로 product_code가 들어옴
    List<ReviewEntity> findByProduct_ProductCodeOrderByReviewDateDesc(long productCode);

    int countByProduct_ProductCode(Long productCode);

    @Query(value = "SELECT AVG(review_rating) FROM tbl_review WHERE product_code = :productCode", nativeQuery = true)
    Double findAvgRatingByProductCode(@Param("productCode") Long productCode);

}
