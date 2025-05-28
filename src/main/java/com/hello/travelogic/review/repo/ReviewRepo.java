package com.hello.travelogic.review.repo;

import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.order.domain.OrderEntity;
import com.hello.travelogic.review.domain.ReviewEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface ReviewRepo extends JpaRepository<ReviewEntity, Long> {

    // 평점 평균
//    @Query("SELECT AVG(r.reviewRating) FROM ReviewEntity r WHERE r.order.product.productCode = :productCode")
    // tbl_review에 fk로 product_code가 들어옴
//    @Query("SELECT AVG(r.reviewRating) FROM ReviewEntity r WHERE r.product.productCode = :productCode")
//    Optional<Double> getAverageRatingByProductCode(@Param("productCode") Long productCode);

    // 상품 상세페이지에서 리뷰 디폴트 정렬 최신순
    // /review/product/{productCode}
//    List<ReviewEntity> findByOrder_Product_ProductCode(long productCode);
    // 상품 상세페이지에서 리뷰 정렬옵션 평점순
    List<ReviewEntity> findByOrder_Product_ProductUidOrderByReviewRatingDesc(String productUid);
    // // 상품 상세페이지에서 리뷰 정렬디폴트 최신순
    List<ReviewEntity> findByProduct_ProductUidOrderByReviewDateDesc(String productUid);

    // 회원별 리뷰 조회
    Optional<ReviewEntity> findByMemberMemberCodeAndOrderOrderCode(Long memberCode, Long orderCode);

    ReviewEntity findByReviewCode(long reviewCode);

    // 상품별 평점순(order_code타고 올라가서 찾은 product_code라 지금은 안쓰는 버전)
    // /review/product/{productCode}?sort=rating
//    List<ReviewEntity> findByOrder_Product_ProductCodeOrderByReviewRatingDesc(long productCode); // 평점순

    // 관리자용 상품별 최신순
    // /review/product/{productCode}?sort=date
//    List<ReviewEntity> findByOrder_Product_ProductCodeOrderByReviewDateDesc(long productCode);   // 최신순 (명시적)
    // tbl_review에 fk로 product_code가 들어옴
    List<ReviewEntity> findByProduct_ProductCodeOrderByReviewDateDesc(long productCode);

    // 상품별 리뷰 개수
    int countByProduct_ProductCode(Long productCode);

    @Query(value = "SELECT AVG(review_rating) FROM tbl_review WHERE product_code = :productCode", nativeQuery = true)
    Double findAvgRatingByProductCode(@Param("productCode") Long productCode);

    // 리뷰 중복 작성 방지 체크
//    boolean existsByMemberAndOrder(MemberEntity member, OrderEntity order);
    boolean existsByMemberMemberCodeAndOrderOrderCode(Long memberCode, Long orderCode);

    @Query("SELECT r FROM ReviewEntity r " +
            "JOIN FETCH r.product p " +
            "JOIN FETCH r.order o " +
            "WHERE r.member.memberCode = :memberCode AND r.order.orderCode = :orderCode")
    ReviewEntity findByMemberCodeAndOrderCode(@Param("memberCode") Long memberCode,
                                              @Param("orderCode") Long orderCode);

    // 관리자용 리뷰 전체 조회
    List<ReviewEntity> findAllByOrderByReviewDateDesc();

    @Query(value = "SELECT AVG(review_rating) FROM tbl_review WHERE product_uid = :productUid", nativeQuery = true)
    Double findAvgRatingByProductUid(@Param("productUid") String productUid);

    // 리뷰 수 자동계산
//    @Query("SELECT COUNT(r) FROM ReviewEntity r WHERE r.product.productCode = :productCode")
//    int countByProductCode(@Param("productCode") Long productCode);

    // 상품코드로 리뷰 평균내고 productUid맞춰주기
    List<ReviewEntity> findByProduct_ProductCode(Long productCode);

    @Query("SELECT r FROM ReviewEntity r JOIN FETCH r.product p JOIN FETCH r.member m")
    Page<ReviewEntity> findAllWithJoins(Pageable pageable);

    // 관리자페이지에서 페이징처리
    Page<ReviewEntity> findPageByProduct_ProductCode(Long productCode, Pageable pageable);

    // 찜 리스트에서 productCode로 리뷰 개수
    @Query("SELECT COUNT(r) FROM ReviewEntity r WHERE r.product.productCode = :productCode")
    Long countByProductProductCode(@Param("productCode") Long productCode);

    // 내 리뷰 조회할 때 productUid도 가져오기
    @Query("SELECT r FROM ReviewEntity r " +
            "JOIN FETCH r.product " +
            "JOIN FETCH r.order " +
            "JOIN FETCH r.member " +
            "LEFT JOIN FETCH r.option " +
            "WHERE r.order.orderCode = :orderCode")
    Optional<ReviewEntity> findByOrderCodeWithDetails(@Param("orderCode") Long orderCode);

    @Query("SELECT r FROM ReviewEntity r JOIN FETCH r.product WHERE r.reviewCode = :reviewCode")
    Optional<ReviewEntity> findByReviewCodeWithProduct(@Param("reviewCode") Long reviewCode);

    @Query("SELECT r FROM ReviewEntity r JOIN FETCH r.product WHERE r.order.orderCode = :orderCode")
    Optional<ReviewEntity> findByOrderCodeWithProduct(@Param("orderCode") Long orderCode);
}