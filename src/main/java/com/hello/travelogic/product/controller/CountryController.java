package com.hello.travelogic.product.controller;


import com.hello.travelogic.product.service.CountryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/country")
public class CountryController {

    @Autowired
    private final CountryService countryService;

    // regionCode로 국가 목록 반환
    @GetMapping("/{regionCode}")
    public ResponseEntity getCountryByRegionCode(@PathVariable Long regionCode) {
        log.debug("regionCode : {}", regionCode);
        return ResponseEntity.status(HttpStatus.OK).body(countryService.getCountriesByRegion(regionCode));
    }




}
