package com.hello.travelogic.realtime.controller;

import com.hello.travelogic.realtime.domain.CityViewCountEntity;
import com.hello.travelogic.realtime.dto.CityViewCountDTO; // CityViewCountDTO import
import com.hello.travelogic.realtime.service.CityViewCountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/city")
@Slf4j
public class CityViewCountController {
    private final CityViewCountService cityViewCountService;

//    //도시 조회수증가
//    @PostMapping("/view/{cityId}")
//    public ResponseEntity<Void> incrementCityViewCount(@PathVariable Long cityId){
//        cityViewCountService.incrementViewCount(cityId);
//        return ResponseEntity.ok().build();
//    }
    //상위10개도시목록
    @GetMapping("/ranking")
    public ResponseEntity<List<CityViewCountDTO>> getTop10CityRanking(){ // 반환 타입 변경
        List<CityViewCountDTO> topCities = cityViewCountService.getTop10CitiesByViewCount();
        return ResponseEntity.ok(topCities);
    }

}