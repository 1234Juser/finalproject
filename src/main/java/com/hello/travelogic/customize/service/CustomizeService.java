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
        return customizeRepository.findProductsByCustomizeConditions(
                customizeDTO.getStartDate(),
                customizeDTO.getEndDate(),
                customizeDTO.getCountryId(),
                customizeDTO.getCityId(),
                customizeDTO.getThemeCode(),
                customizeDTO.getAdultCount(),
                customizeDTO.getChildCount(),
                customizeDTO.getMinPrice(),
                customizeDTO.getMaxPrice(),
                customizeDTO.getProductType()
        );
    }
}
