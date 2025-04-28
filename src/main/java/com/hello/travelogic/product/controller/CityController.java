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

    // 도시 목록 불러오는 API
    @GetMapping("/cities/{countryCode}")
    public ResponseEntity getCitiesBycountryCode(@PathVariable("countryCode") Long countryCode) {
        log.debug("get cities by country code : {}", countryCode);
        return ResponseEntity.status(HttpStatus.OK).body(cityService.getCitiesByCountry(countryCode));
    }
}
