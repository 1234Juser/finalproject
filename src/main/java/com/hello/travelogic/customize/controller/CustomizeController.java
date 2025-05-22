package com.hello.travelogic.customize.controller;

import com.hello.travelogic.customize.dto.CustomizeDTO;
import com.hello.travelogic.customize.service.CustomizeService;
import com.hello.travelogic.product.domain.ProductEntity;
import com.hello.travelogic.product.dto.ProductDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/customize")
@Slf4j
public class CustomizeController {

    private final CustomizeService customizeService;

    @PostMapping("/search")
    public ResponseEntity<List<ProductDTO>> searchProducts(@RequestBody CustomizeDTO customizeDTO) { // ProductDTO로 변경
        log.info("프론트엔드에서 받은 CustomizeDTO: {}", customizeDTO); // DTO 값 로그
        List<ProductEntity> products = customizeService.searchProductsByConditions(customizeDTO);
        log.info("CustomizeService에서 받은 검색 결과 (개수): {}", products.size()); // 검색 결과 개수 로그
        if (products.isEmpty()) {
            log.warn("검색 조건에 해당하는 상품이 없습니다."); // 결과가 없을 때 경고 로그
        }
        // ProductEntity 리스트를 ProductDTO 리스트로 변환
        List<ProductDTO> productDTOs = products.stream()
                .map(ProductDTO::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(productDTOs); // ProductDTO 리스트 반환
    }
}
