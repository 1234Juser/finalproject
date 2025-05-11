package com.hello.travelogic.realtime.repository;

import com.hello.travelogic.realtime.domain.CityViewCountEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CityViewCountRepository extends JpaRepository<CityViewCountEntity, Long> {


    // 조회수 기준으로 내림차순 정렬하여 상위 limit개의 CityViewCountEntity를 찾는 메서드
    List<CityViewCountEntity> findTop10ByOrderByViewCountDesc();

    // CityEntity의 ID를 기준으로 CityViewCountEntity를 찾는 메서드 추가
    Optional<CityViewCountEntity> findByCity_CityId(Long cityId);

    // 모든 CityViewCountEntity를 가져오는 메서드 추가
    List<CityViewCountEntity> findAll();

}