package com.hello.travelogic.product.repo;

import com.hello.travelogic.product.domain.CityEntity;
import com.hello.travelogic.product.domain.CountryEntity;
import com.hello.travelogic.product.domain.RegionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CityRepo extends JpaRepository<CityEntity, Long> {

    // countryCode 필드를 기준으로 국가 조회
    List<CityEntity> findByCountryCode(CountryEntity countryCode);

    CityEntity findByCityCode(Long cityCode);

    // regionCode 필드를 기준으로 도시 조회
    List<CityEntity> findByRegionCode(RegionEntity regionCode);
}
