package com.hello.travelogic.product.service;

import com.hello.travelogic.product.domain.CityEntity;
import com.hello.travelogic.product.domain.CountryEntity;
import com.hello.travelogic.product.domain.RegionEntity;
import com.hello.travelogic.product.dto.CityDTO;
import com.hello.travelogic.product.dto.CountryDTO;
import com.hello.travelogic.product.repo.CityRepo;
import com.hello.travelogic.product.repo.CountryRepo;
import com.hello.travelogic.product.repo.RegionRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class CityService {

    private final CountryRepo countryRepo;
    private final CityRepo cityRepo;
    private final RegionRepo regionRepo;

    public List<CityDTO> getCitiesByCountry(Long countryId) {

        // countryId 해당하는 CountryEntity 먼저 조회
        CountryEntity countryEntity = countryRepo.findByCountryId(countryId);
        log.info("countryEntity : {}", countryEntity);

        // CountryEntity로 도시 목록 가져오기
        List<CityEntity> cityEntityList = cityRepo.findBycountryId(countryEntity);
        List<CityDTO> cityByCountry = null;
        if(cityEntityList.size() != 0) {
            cityByCountry = cityEntityList.stream().map( city -> new CityDTO(city)).toList();
        }
        log.info("countryEntityList : {}", cityEntityList);
        log.info("countryByRegion : {}", cityByCountry);

        return cityByCountry;


    }

    public List<CityDTO> getCitiesByRegion(Long regionCode) {

        // regionCode에 해당하는 RegionEntity 먼저 조회
        RegionEntity regionEntity = regionRepo.findByRegionCode(regionCode);
        log.info("regionEntity : {}", regionEntity);

        // RegionEntity로 도시 목록 가져오기
        List<CityEntity> cityEntityList = cityRepo.findByRegionCode(regionEntity);
        List<CityDTO> cityByRegion = null;
        if(cityEntityList.size() != 0) {
            cityByRegion = cityEntityList.stream().map( city -> new CityDTO(city)).toList();
        }
        log.info("cityEntityList : {}", cityEntityList);
        log.info("cityByRegion : {}", cityByRegion);

        return cityByRegion;
    }
}
