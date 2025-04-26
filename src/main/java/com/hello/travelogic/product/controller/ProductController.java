package com.hello.travelogic.product.controller;

import com.hello.travelogic.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class ProductController {

    @Autowired
    private final ProductService productService;


    @GetMapping("/products")
    public ResponseEntity getProducts() {
        log.debug("get products 요청");
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProducts());
    }
}
