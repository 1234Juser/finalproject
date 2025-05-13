package com.hello.travelogic.order.service;

import com.hello.travelogic.order.dto.OptionDTO;
import com.hello.travelogic.product.domain.ProductEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class OptionService {

    public OptionDTO createOptionForm(ProductEntity productEntity) {
        // OptionDTO 생성 (기본 상품 정보 포함)
        OptionDTO optionDTO = new OptionDTO();
        optionDTO.setProductCode(productEntity.getProductCode());
        optionDTO.setProductTitle(productEntity.getProductTitle());
        optionDTO.setProductAdult(productEntity.getProductAdult());
        optionDTO.setProductChild(productEntity.getProductChild());
//        optionDTO.setTotalPrice(0); // 초기 가격은 0으로 설정

        // 초기 가격은 이미 0으로 설정되어 있으므로 추가 설정 불필요
        log.info("🟢 OptionService - OptionDTO 생성: {}", optionDTO);
        return optionDTO;
    }
}
