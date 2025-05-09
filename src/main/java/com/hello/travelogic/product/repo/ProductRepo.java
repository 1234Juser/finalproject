package com.hello.travelogic.product.repo;

import com.hello.travelogic.product.domain.CityEntity;
import com.hello.travelogic.product.domain.CountryEntity;
import com.hello.travelogic.product.domain.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepo extends JpaRepository<ProductEntity, Long> {

    // countryId 필드를 기준으로 투어 상품 조회
    List<ProductEntity> findByCountryId(CountryEntity countryId);

    // cityCode 필드를 기준으로 투어 상품 조회
    List<ProductEntity> findByCityId(CityEntity cityId);

    // 찜 등록/취소에 사용
    Optional<ProductEntity> findByProductCode(long productCode);
    
    //  productUid 로 상품 찾기
    Optional<ProductEntity> findByProductUid(String productUid);

    // 인텔리제이꺼임
    // 도시 이름 조회
    @Query("SELECT c.cityName FROM CityEntity c WHERE c.cityId = :cityId")
    String findCityNameByCityId(@Param("cityCode") String cityCode);
    // UID 갯수 cityId
    Long countByProductUidStartingWith(String prefix);

    // productCode의 최댓값 찾기
    @Query("SELECT MAX(p.productCode) FROM ProductEntity p")
    Optional<Long> findMaxProductCode();

    // 리뷰 평균내기(찜기능 productCode)
    @Query(value = "SELECT AVG(review_rating) FROM tbl_review WHERE product_code = :productCode", nativeQuery = true)
    Double findAvgRatingByProductCode(@Param("productCode") Long productCode);

    // 리뷰 평균내기(상품상세페이지 productUid)
//    @Query("SELECT p FROM ProductEntity p LEFT JOIN FETCH p.reviews WHERE p.productUid = :productUid")
//    Optional<ProductEntity> findByProductUidWithReviews(@Param("productUid") String productUid);
//    @Query("SELECT p FROM ProductEntity p WHERE p.productUid = :productUid")
//    Optional<ProductEntity> findByProductUid(@Param("productUid") String productUid);


    //검색어입력창
    @Query("SELECT p FROM ProductEntity p WHERE p.productTitle LIKE %:kw% OR p.productContent LIKE %:kw%")
    Page<ProductEntity> searchByTitleOrDescription(@Param("kw") String kw, Pageable pageable);





}
