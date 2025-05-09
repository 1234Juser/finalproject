package com.hello.travelogic.search.service;

import com.hello.travelogic.product.domain.CityEntity;
import com.hello.travelogic.product.domain.ProductEntity;
import com.hello.travelogic.product.repo.*;
import com.hello.travelogic.search.dto.SearchDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort; // Sort import
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

    // sortBy 파라미터 추가
    public Page<SearchDTO> unifiedSearch(String keyword, int page, int size, String sortBy) {
        Sort sort = Sort.unsorted(); // 기본 정렬
        if ("low".equals(sortBy)) {
            sort = Sort.by(Sort.Direction.ASC, "productAdult"); // 낮은 가격순 정렬 (필드명 확인 필요)
        } else if ("high".equals(sortBy)) {
            sort = Sort.by(Sort.Direction.DESC, "productAdult"); // 높은 가격순 정렬 (필드명 확인 필요)
        }

        Pageable pageable = PageRequest.of(page, size, sort); // Pageable 객체에 정렬 정보 추가

        // 상품명, 상품설명 둘 다 검색
        Page<ProductEntity> products = productRepo.searchByTitleOrDescription(keyword, pageable); // Pageable 전달

        return products.map(SearchDTO::fromProduct); // Page<ProductEntity>를 Page<SearchDTO>로 변환
    }

}