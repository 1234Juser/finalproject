package com.hello.travelogic.product.service;

import com.hello.travelogic.product.domain.CityEntity;
import com.hello.travelogic.product.domain.CountryEntity;
import com.hello.travelogic.product.domain.RegionEntity;
import com.hello.travelogic.product.dto.CountryDTO;
import com.hello.travelogic.product.dto.RegionDTO;
import com.hello.travelogic.product.repo.CountryRepo;
import com.hello.travelogic.product.repo.RegionRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CountryService {

    private final CountryRepo countryRepo;
    private final RegionRepo regionRepo;


    // RegionEntity를 통해 해당하는 국가 가져오기
    public List<CountryDTO> getCountriesByRegion(Long regionCode) {

        // regionCode에 해당하는 RegionEntity 먼저 조회
        RegionEntity regionEntity = regionRepo.findByRegionCode(regionCode);
        log.info("regionEntity : {}", regionEntity);

        // 위에서 받은 RegionEntity로 국가 목록 가져오기
        List<CountryEntity> countryEntityList = countryRepo.findByRegionCode(regionEntity);
        List<CountryDTO> countryByRegion = null;
        if(countryEntityList.size() != 0) {
            countryByRegion = countryEntityList.stream().map( cr -> new CountryDTO(cr)).toList();
        }
        log.info("countryEntityList : {}", countryEntityList);
        log.info("countryByRegion : {}", countryByRegion);

        return countryByRegion;
    }

}
