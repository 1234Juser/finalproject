package com.hello.travelogic.product.repo;

import com.hello.travelogic.product.domain.CityEntity;
import com.hello.travelogic.product.domain.CountryEntity;
import com.hello.travelogic.product.domain.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepo extends JpaRepository<ProductEntity, Long> {

    // countryCode 필드를 기준으로 투어 상품 조회
    List<ProductEntity> findByCountryCode(CountryEntity countryCode);

    // cityCode 필드를 기준으로 투어 상품 조회
    List<ProductEntity> findByCityCode(CityEntity cityCode);


    ProductEntity findByProductUid(String productUid);
}
