package com.hello.travelogic.product.controller;


import com.hello.travelogic.product.service.RegionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class RegionController {

    @Autowired
    private final RegionService regionService;

    // 국내여행지 권역별 선택
    @GetMapping("/domestic")
    public ResponseEntity getDomRegion() {
        log.debug("get domestic region 요청");
        return ResponseEntity.status(HttpStatus.OK).body(regionService.getRegionByType("DOMESTIC"));
    }

    // 해외여행지 대륙별 선택
    @GetMapping("/international")
    public ResponseEntity getIntlRegion() {
        log.debug("get international region 요청");
        return ResponseEntity.status(HttpStatus.OK).body(regionService.getRegionByType("INTERNATIONAL"));
    }



}
