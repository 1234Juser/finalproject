package com.hello.travelogic.product.service;

import com.hello.travelogic.product.domain.CityEntity;
import com.hello.travelogic.product.domain.CountryEntity;
import com.hello.travelogic.product.dto.CityDTO;
import com.hello.travelogic.product.dto.CountryDTO;
import com.hello.travelogic.product.repo.CityRepo;
import com.hello.travelogic.product.repo.CountryRepo;
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

    public List<CityDTO> getCitiesByCountry(Long countryCode) {

        // countryCode에 해당하는 CountryEntity 먼저 조회
        CountryEntity countryEntity = countryRepo.findByCountryCode(countryCode);
        log.info("countryEntity : {}", countryEntity);

        // CountryEntity로 도시 목록 가져오기
        List<CityEntity> cityEntityList = cityRepo.findByCountryCode(countryEntity);
        List<CityDTO> cityByCountry = null;
        if(cityEntityList.size() != 0) {
            cityByCountry = cityEntityList.stream().map( city -> new CityDTO(city)).toList();
        }
        log.info("countryEntityList : {}", cityEntityList);
        log.info("countryByRegion : {}", cityByCountry);

        return cityByCountry;


    }
}
