package com.hello.travelogic.realtime.dto;

import com.hello.travelogic.realtime.domain.CityViewCountEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CityViewCountDTO {
    private Long cityId;
    private String cityName;
    private Integer viewCount;
    private String cityNameKR;

    // Entity를 DTO로 변환하는 정적 팩토리 메서드
    public static CityViewCountDTO fromEntity(CityViewCountEntity entity) {
        return new CityViewCountDTO(
                entity.getCity().getCityId(),
                entity.getCity().getCityName(),
                entity.getViewCount(),
                entity.getCityNameKR() // CityViewCountEntity에서 직접 cityNameKR 가져오기
        );
    }
}