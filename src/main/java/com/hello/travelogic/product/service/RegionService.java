package com.hello.travelogic.product.service;


import com.hello.travelogic.product.domain.RegionEntity;
import com.hello.travelogic.product.dto.RegionDTO;
import com.hello.travelogic.product.repo.RegionRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RegionService {

    @Autowired
    private final RegionRepo regionRepo;

    public List<RegionDTO> getRegionByType(String regionType) {
        List<RegionEntity> regionE = regionRepo.findByRegionType(RegionEntity.RegionType.valueOf(regionType));
        List<RegionDTO> regionList = null;
        if(regionE.size() != 0) {
            regionList = regionE.stream().map( region -> new RegionDTO(region)).toList();
        }
        log.info("regionE : {}", regionE);
        log.info("regionList : {}", regionList);
        return regionList;
    }
}
