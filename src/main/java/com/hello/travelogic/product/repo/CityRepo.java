package com.hello.travelogic.product.repo;

import com.hello.travelogic.product.domain.CityEntity;
import com.hello.travelogic.product.domain.CountryEntity;
import com.hello.travelogic.product.domain.RegionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CityRepo extends JpaRepository<CityEntity, Long> {

    // countryId 필드를 기준으로 국가 조회
    List<CityEntity> findBycountryId(CountryEntity countryId);

    CityEntity findByCityId(Long cityId);

    // regionCode 필드를 기준으로 도시 조회
    List<CityEntity> findByRegionCode(RegionEntity regionCode);

    // chat gpt꺼임
    // 새로운 uid 생성용
    @Query(value = "SELECT city_name FROM tbl_city WHERE city_id = :cityId", nativeQuery = true)
    String findCityNameByCityId(Long cityId);


}
