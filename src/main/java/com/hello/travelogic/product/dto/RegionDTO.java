package com.hello.travelogic.product.dto;

import com.hello.travelogic.product.domain.RegionEntity;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RegionDTO {

    private Long regionCode;
    private String regionUid;
    private RegionEntity.RegionType regionType;
    private String regionName;

    public RegionDTO(RegionEntity regionDTO) {
        this.regionCode = regionDTO.getRegionCode();
        this.regionUid = regionDTO.getRegionUid();
        this.regionType = regionDTO.getRegionType();
        this.regionName = regionDTO.getRegionName();
    }
}
