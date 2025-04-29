package com.hello.travelogic.product.repo;

import com.hello.travelogic.product.domain.CountryEntity;
import com.hello.travelogic.product.domain.RegionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CountryRepo extends JpaRepository<CountryEntity, Long> {

    // regionCode 필드를 기준으로 국가 조회
    List<CountryEntity> findByRegionCode(RegionEntity regionCode);

    // countryCode 필드를 기준으로 국가 조회(CityService용)
    CountryEntity findByCountryCode(Long countryCode);
}
