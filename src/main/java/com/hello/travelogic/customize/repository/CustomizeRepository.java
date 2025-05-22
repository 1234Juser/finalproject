package com.hello.travelogic.customize.repository;

import com.hello.travelogic.product.domain.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface CustomizeRepository  extends JpaRepository<ProductEntity, Long> {

    @Query("SELECT p FROM ProductEntity p " +
            "LEFT JOIN FETCH p.countryId c " + // countryId를 즉시 로딩
            "LEFT JOIN FETCH p.cityId ct " +   // cityId를 즉시 로딩
            "LEFT JOIN p.productThemes pt " +
            "LEFT JOIN pt.themeCode t " + // ThemeEntity 조인
            "WHERE (:startDate IS NULL OR p.productEndDate >= :startDate) " + // 상품 종료일이 검색 시작일보다 이후
            "AND (:endDate IS NULL OR p.productStartDate <= :endDate) " +   // 상품 시작일이 검색 종료일보다 이전
            "AND (:countryId IS NULL OR p.countryId.countryId = :countryId) " +
            "AND (:cityId IS NULL OR p.cityId.cityId = :cityId) " +
            "AND (:themeName IS NULL OR t.themeName = :themeName) " + // themeCode 대신 themeName 사용
            // 성인 및 아동 인원 수에 따른 가격 필터링 (총 가격 계산 수정)
            "AND (:minPrice IS NULL OR " +
            "((:adultCount * p.productAdult) + (:childCount * p.productChild)) >= :minPrice) " +
            "AND (:maxPrice IS NULL OR " +
            "((:adultCount * p.productAdult) + (:childCount * p.productChild)) <= :maxPrice) " +
            // 총 인원 수 필터링
            "AND (COALESCE(:adultCount, 0) + COALESCE(:childCount, 0) = 0 OR " + // 성인/아동 인원이 0이면 필터링 무시
            "((COALESCE(:adultCount, 0) + COALESCE(:childCount, 0)) >= p.productMinParticipants)) " +
            "AND (COALESCE(:adultCount, 0) + COALESCE(:childCount, 0) = 0 OR " + // 성인/아동 인원이 0이면 필터링 무시
            "((COALESCE(:adultCount, 0) + COALESCE(:childCount, 0)) <= p.productMaxParticipants)) " +
            "AND (:productType IS NULL OR t.themeCondition = :productType) ") // productType 필터링 조건 추가 (themeCondition 사용)
    List<ProductEntity> findProductsByCustomizeConditions(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            @Param("countryId") Long countryId,
            @Param("cityId") Long cityId,
            @Param("themeName") String themeName,
            @Param("adultCount") Integer adultCount,
            @Param("childCount") Integer childCount,
            @Param("minPrice") Integer minPrice,
            @Param("maxPrice") Integer maxPrice,
            @Param("productType") String productType
    );


}




