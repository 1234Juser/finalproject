package com.hello.travelogic.product.dto;

import com.hello.travelogic.product.domain.CityEntity;
import com.hello.travelogic.product.domain.CountryEntity;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CityDTO {

    private Long cityId;
    private Long cityCode;
    private Long countryId;
    private Long regionCode;
    private String cityUid;
    private String cityName;

    public CityDTO(CityEntity cityDTO) {
        this.cityId = cityDTO.getCityId();
        this.cityCode = cityDTO.getCityCode();
        this.countryId = cityDTO.getCountryId().getCountryCode();
        this.regionCode = cityDTO.getRegionCode().getRegionCode();
        this.cityUid = cityDTO.getCityUid();
        this.cityName = cityDTO.getCityName();
    }
}
