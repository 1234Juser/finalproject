package com.hello.travelogic.product.dto;

import com.hello.travelogic.product.domain.CountryEntity;
import com.hello.travelogic.product.domain.RegionEntity;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CountryDTO {

    private Long countryCode;
    private Long regionCode;       // RegionEntity 대신 ID만
    private String countryUid;
    private String countryName;

    public CountryDTO(CountryEntity countryDTO) {
        this.countryCode = countryDTO.getCountryCode();
        this.regionCode = countryDTO.getRegionCode().getRegionCode();
        this.countryUid = countryDTO.getCountryUid();
        this.countryName = countryDTO.getCountryName();
    }
}
