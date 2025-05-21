package com.hello.travelogic.customize.controller;

import com.hello.travelogic.customize.dto.CustomizeDTO;
import com.hello.travelogic.customize.service.CustomizeService;
import com.hello.travelogic.product.domain.ProductEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/customize")
@Slf4j
public class CustomizeController {

    private final CustomizeService customizeService;

    @PostMapping("/search")
    public ResponseEntity<List<ProductEntity>> searchProducts(@RequestBody CustomizeDTO customizeDTO) {
        List<ProductEntity> products = customizeService.searchProductsByConditions(customizeDTO);
        return ResponseEntity.ok(products);
    }
}
