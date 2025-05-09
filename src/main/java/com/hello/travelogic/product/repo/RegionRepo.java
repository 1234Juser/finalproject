package com.hello.travelogic.product.repo;

import com.hello.travelogic.product.domain.CountryEntity;
import com.hello.travelogic.product.domain.RegionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegionRepo extends JpaRepository<RegionEntity, Long> {


    List<RegionEntity> findByRegionType(RegionEntity.RegionType regionType);

    // 지역 -> 국가 조회 (CountryService용)
    RegionEntity findByRegionCode(Long regionCode);

}
