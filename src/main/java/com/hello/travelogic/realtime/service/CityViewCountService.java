package com.hello.travelogic.realtime.service;

import com.hello.travelogic.product.domain.CityEntity;
import com.hello.travelogic.product.repo.CityRepo;
import com.hello.travelogic.realtime.domain.CityViewCountEntity;
import com.hello.travelogic.realtime.dto.CityViewCountDTO; // CityViewCountDTO import
import com.hello.travelogic.realtime.repository.CityViewCountRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors; // Collectors import

@Service
@Slf4j
@RequiredArgsConstructor
public class CityViewCountService {
    private final CityViewCountRepository cityViewCountRepository;
    private final CityRepo cityRepo; //citiEntity를 찾기위해

    @Transactional
    public void incrementViewCount(Long cityId) {
        // CityViewCountEntity를 CityEntity의 ID로 조회
        Optional<CityViewCountEntity> cityViewCountOptional = cityViewCountRepository.findByCity_CityId(cityId);

        CityViewCountEntity cityViewCount;
        if(cityViewCountOptional.isPresent()){
            cityViewCount = cityViewCountOptional.get();
            cityViewCount.setViewCount(cityViewCount.getViewCount() + 1);
        }else{
            // CityEntity를 찾아서 CityViewCountEntity를 새로 생성
            Optional<CityEntity> cityOptional = cityRepo.findById(cityId);
            if(cityOptional.isPresent()){
                CityEntity city = cityOptional.get();
                cityViewCount = CityViewCountEntity.builder()
                        .city(city)
                        .viewCount(1)
                        .build();
            } else {
                // CityEntity를 찾지 못한 경우 예외 처리 또는 로그 기록
                log.warn("도시 아이디발견불가합니다. 조회수증가불가", cityId);
                return; // 또는 적절한 예외를 throw
            }
        }
        cityViewCountRepository.save(cityViewCount);
    }

    @Transactional(readOnly = true)
    public List<CityViewCountDTO> getTop10CitiesByViewCount() {
        List<CityViewCountEntity> topCities = cityViewCountRepository.findTop10ByOrderByViewCountDesc();
        // Entity 리스트를 DTO 리스트로 변환
        return topCities.stream()
                .map(CityViewCountDTO::fromEntity)
                .collect(Collectors.toList());
    }
}