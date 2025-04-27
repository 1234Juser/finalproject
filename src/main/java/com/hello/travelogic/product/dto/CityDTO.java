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

    private Long cityCode;
    private Long countryCode;
    private String cityUid;
    private String cityName;

    public CityDTO(CityEntity cityDTO) {
        this.cityCode = cityDTO.getCityCode();
        this.countryCode = cityDTO.getCountryCode().getCountryCode();
        this.cityUid = cityDTO.getCityUid();
        this.cityName = cityDTO.getCityName();
    }
}
