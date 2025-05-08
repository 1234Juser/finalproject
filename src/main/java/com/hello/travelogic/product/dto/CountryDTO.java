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

    private Long countryId;
    private Long countryCode;
    private Long regionCode;       // RegionEntity 대신 ID만
    private String countryUid;
    private String countryName;
    private String countryNameKR;

    public CountryDTO(CountryEntity countryDTO) {
        this.countryId = countryDTO.getCountryId();
        this.countryCode = countryDTO.getCountryCode();
        this.regionCode = countryDTO.getRegionCode().getRegionCode();
        this.countryUid = countryDTO.getCountryUid();
        this.countryName = countryDTO.getCountryName();
        this.countryNameKR = countryDTO.getCountryNameKr();
    }
}
