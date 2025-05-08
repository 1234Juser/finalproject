package com.hello.travelogic.search.service;

import com.hello.travelogic.product.domain.CityEntity;
import com.hello.travelogic.product.domain.ProductEntity;
import com.hello.travelogic.product.repo.*;
import com.hello.travelogic.search.dto.SearchDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class SearchService {

    private final ProductRepo productRepo;
    private final CityRepo cityRepo;
    private final CountryRepo countryRepo;
    private final RegionRepo regionRepo;
    private final ThemeRepo themeRepo;

    public List<SearchDTO> unifiedSearch(String keyword) {
        List<SearchDTO> results = new ArrayList<>();

        // 상품명, 상품설명 둘 다 검색
        List<ProductEntity> products = productRepo.searchByTitleOrDescription(keyword);
        for (ProductEntity product : products) {
            results.add(SearchDTO.fromProduct(product));
        }



        return results;

    }
}


