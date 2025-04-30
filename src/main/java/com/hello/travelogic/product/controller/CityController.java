package com.hello.travelogic.product.controller;

import com.hello.travelogic.product.service.CityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class CityController {

    @Autowired
    private final CityService cityService;

    // 국가별 도시 목록 불러오기
    @GetMapping("/cities/{countryId}")
    public ResponseEntity getCitiesBycountryCode(@PathVariable("countryId") Long countryId) {
        log.debug("get cities by country code : {}", countryId);
        return ResponseEntity.status(HttpStatus.OK).body(cityService.getCitiesByCountry(countryId));
    }

    // 권역별 도시 목록 불러오기 (국내여행)
    @GetMapping("/cities/region/{regionCode}")
    public ResponseEntity getCitiesByRegionCode(@PathVariable("regionCode") Long regionCode) {
        log.debug("get cities by region code : {}", regionCode);
        return ResponseEntity.status(HttpStatus.OK).body(cityService.getCitiesByRegion(regionCode));
    }
}
