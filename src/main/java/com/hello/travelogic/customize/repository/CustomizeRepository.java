package com.hello.travelogic.customize.repository;

import com.hello.travelogic.product.domain.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface CustomizeRepository  extends JpaRepository<ProductEntity, Long> {

    @Query("SELECT p FROM ProductEntity p " +
            "LEFT JOIN p.productThemes pt " +
            "LEFT JOIN pt.themeCode t " + // ThemeEntity 조인
            "WHERE (:startDate IS NULL OR p.productStartDate >= :startDate) " +
            "AND (:endDate IS NULL OR p.productEndDate <= :endDate) " +
            "AND (:countryId IS NULL OR p.countryId.countryId = :countryId) " +
            "AND (:cityId IS NULL OR p.cityId.cityId = :cityId) " +
            "AND (:themeCode IS NULL OR pt.themeCode.themeCode = :themeCode) " +
            // 성인 및 아동 인원 수에 따른 가격 필터링
            "AND (:adultCount IS NULL OR (p.productAdult * :adultCount) >= :minPrice) " +
            "AND (:childCount IS NULL OR (p.productChild * :childCount) >= :minPrice) " +
            "AND (:minPrice IS NULL OR ((p.productAdult * COALESCE(:adultCount, 0)) + (p.productChild * COALESCE(:childCount, 0))) >= :minPrice) " +
            "AND (:maxPrice IS NULL OR ((p.productAdult * COALESCE(:adultCount, 0)) + (COALESCE(:childCount, 0) * p.productChild)) <= :maxPrice) " +
            // 총 인원 수 필터링
            "AND (:adultCount IS NULL OR :childCount IS NULL OR (COALESCE(:adultCount, 0) + COALESCE(:childCount, 0)) >= p.productMinParticipants) " +
            "AND (:adultCount IS NULL OR :childCount IS NULL OR (COALESCE(:adultCount, 0) + COALESCE(:childCount, 0)) <= p.productMaxParticipants) " +
            "AND (:productType IS NULL OR t.themeCondition = :productType) " + // productType 필터링 조건 추가 (themeCondition 사용)
            "GROUP BY p.productCode")
    List<ProductEntity> findProductsByCustomizeConditions(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            @Param("countryId") Long countryId,
            @Param("cityId") Long cityId,
            @Param("themeCode") Long themeCode,
            @Param("adultCount") Integer adultCount,
            @Param("childCount") Integer childCount,
            @Param("minPrice") Integer minPrice,
            @Param("maxPrice") Integer maxPrice,
            @Param("productType") String productType // productType 파라미터 추가
    );
}


