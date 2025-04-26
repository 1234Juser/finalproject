package com.hello.travelogic.product.service;

import com.hello.travelogic.product.domain.ProductEntity;
import com.hello.travelogic.product.dto.ProductDTO;
import com.hello.travelogic.product.repo.ProductRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    @Autowired
    private final ProductRepo productRepo;

    public List<ProductDTO> getProducts() {
        List<ProductDTO> productList = null;
        List<ProductEntity> productE = productRepo.findAll();
        if(productE.size() != 0) {
                productList = productE.stream().map( product -> new ProductDTO(product)).toList();

        }
        log.info("productE : {}", productE);
        log.info("productList : {}", productList);
        return productList;
//        return productRepo.findAll().stream().map( products -> new ProductDTO(products)).toList();
    }
}
