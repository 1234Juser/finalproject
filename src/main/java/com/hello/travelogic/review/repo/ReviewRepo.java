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

    List<ReviewEntity> findByOrder_Product_ProductCode(long productCode);

    Optional<ReviewEntity> findByMemberMemberCodeAndOrderOrderCode(Long memberCode, Long orderCode);
}
