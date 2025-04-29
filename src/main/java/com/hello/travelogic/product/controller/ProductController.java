package com.hello.travelogic.product.controller;

import com.hello.travelogic.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private final ProductService productService;

    // 투어 상품 전체 조회
    @GetMapping("")
    public ResponseEntity getProducts() {
        log.debug("get products 요청");
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProducts());
    }


    // countryCode에 해당하는 투어 상품 조회
    @GetMapping("/country")
    public ResponseEntity getProductsByCountry(@RequestParam("countrycode") Long countryCode) {
        log.debug("get products by country code : {}", countryCode);
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProductsByCountry(countryCode));
    }


    // cityCode에 해당하는 투어 상품 조회
    @GetMapping("/city")
    public ResponseEntity getProductsByCity(@RequestParam("citycode") Long cityCode) {
        log.debug("get products by city code : {}", cityCode);
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProductsByCity(cityCode));
    }


    // 투어 상품 상세 페이지
    @GetMapping("/{productUid}")
    public ResponseEntity getProductDetail(@PathVariable("productUid") String productUid) {
        log.debug("get product detail : {}", productUid);
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProductsByUid(productUid));
    }
}
