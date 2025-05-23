package com.hello.travelogic.customize.service;

import com.hello.travelogic.customize.dto.CustomizeDTO;
import com.hello.travelogic.customize.repository.CustomizeRepository;
import com.hello.travelogic.product.domain.ProductEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class CustomizeService {

    private final CustomizeRepository customizeRepository;

    public List<ProductEntity> searchProductsByConditions(CustomizeDTO customizeDTO) {
        log.info("CustomizeService에서 Repository로 전달할 검색 조건:"); // Repository로 전달할 값 로그
        log.info("  startDate: {}", customizeDTO.getStartDate());
        log.info("  endDate: {}", customizeDTO.getEndDate());
        log.info("  countryId: {}", customizeDTO.getCountryId());
        log.info("  cityId: {}", customizeDTO.getCityId());
        log.info("  themeName: {}", customizeDTO.getThemeName());
        log.info("  adultCount: {}", customizeDTO.getAdultCount());
        log.info("  childCount: {}", customizeDTO.getChildCount());
        log.info("  minPrice: {}", customizeDTO.getMinPrice());
        log.info("  maxPrice: {}", customizeDTO.getMaxPrice());
        log.info("  productType: {}", customizeDTO.getProductType());


        List<ProductEntity> products = customizeRepository.findProductsByCustomizeConditions(
                customizeDTO.getStartDate(),
                customizeDTO.getEndDate(),
                customizeDTO.getCountryId(),
                customizeDTO.getCityId(),
                customizeDTO.getThemeName(),
                customizeDTO.getAdultCount(),
                customizeDTO.getChildCount(),
                customizeDTO.getMinPrice(),
                customizeDTO.getMaxPrice(),
                customizeDTO.getProductType()
        );
        log.info("CustomizeRepository에서 받은 검색 결과 (개수): {}", products.size());
        return products;
    }

}
