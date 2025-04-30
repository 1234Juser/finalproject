package com.hello.travelogic.product.repo;

import com.hello.travelogic.product.domain.CityEntity;
import com.hello.travelogic.product.domain.CountryEntity;
import com.hello.travelogic.product.domain.ProductEntity;
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


    ProductEntity findByProductUid(String productUid);

    // 인텔리제이꺼임
    // 도시 이름 조회
    @Query("SELECT c.cityName FROM CityEntity c WHERE c.cityId = :cityId")
    String findCityNameByCityId(@Param("cityCode") String cityCode);
    // UID 갯수 cityId
    Long countByProductUidStartingWith(String prefix);

    // productCode의 최댓값 찾기
    @Query("SELECT MAX(p.productCode) FROM ProductEntity p")
    Optional<Long> findMaxProductCode();
}
