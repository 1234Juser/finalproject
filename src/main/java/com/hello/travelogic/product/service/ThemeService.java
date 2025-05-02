package com.hello.travelogic.product.service;

import com.hello.travelogic.product.domain.CityEntity;
import com.hello.travelogic.product.domain.CountryEntity;
import com.hello.travelogic.product.domain.ProductEntity;
import com.hello.travelogic.product.domain.ThemeEntity;
import com.hello.travelogic.product.dto.CityDTO;
import com.hello.travelogic.product.dto.ProductDTO;
import com.hello.travelogic.product.dto.ThemeDTO;
import com.hello.travelogic.product.repo.CityRepo;
import com.hello.travelogic.product.repo.CountryRepo;
import com.hello.travelogic.product.repo.ThemeRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class ThemeService {

    @Autowired
    private final ThemeRepo themeRepo;

    public List<ThemeDTO> getThemes() {
        List<ThemeDTO> themeList = null;
        List<ThemeEntity> themeE = themeRepo.findAll();
        if(themeE.size() != 0) {
            themeList = themeE.stream().map( t -> new ThemeDTO(t)).toList();

        }
        log.info("themeE : {}", themeE);
        log.info("themeList : {}", themeList);
        return themeList;

    }


}
