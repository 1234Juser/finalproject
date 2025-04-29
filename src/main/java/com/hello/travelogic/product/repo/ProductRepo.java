package com.hello.travelogic.product.repo;

import com.hello.travelogic.product.domain.CityEntity;
import com.hello.travelogic.product.domain.CountryEntity;
import com.hello.travelogic.product.domain.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepo extends JpaRepository<ProductEntity, Long> {

    // countryCode 필드를 기준으로 투어 상품 조회
    List<ProductEntity> findByCountryCode(CountryEntity countryCode);

    // cityCode 필드를 기준으로 투어 상품 조회
    List<ProductEntity> findByCityCode(CityEntity cityCode);

    // 찜 등록/취소에 사용
    Optional<ProductEntity> findByProductCode(long productCode);


    ProductEntity findByProductUid(String productUid);
}
