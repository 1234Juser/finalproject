package com.hello.travelogic.product.service;

import com.hello.travelogic.product.domain.CityEntity;
import com.hello.travelogic.product.domain.CountryEntity;
import com.hello.travelogic.product.domain.ProductEntity;
import com.hello.travelogic.product.domain.RegionEntity;
import com.hello.travelogic.product.dto.ProductDTO;
import com.hello.travelogic.product.dto.RegionDTO;
import com.hello.travelogic.product.repo.CityRepo;
import com.hello.travelogic.product.repo.CountryRepo;
import com.hello.travelogic.product.repo.ProductRepo;
import jakarta.persistence.EntityNotFoundException;
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
    private final CityRepo cityRepo;
    @Autowired
    private CountryRepo countryRepo;

    // 모든 Products 조회
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


    // cityCode를 기반으로 투어 상품 조회
    public List<ProductDTO> getProductsByCity(Long cityCode) {

        // cityCode에 해당하는 CityEntity 먼저 조회
        CityEntity cityEntity = cityRepo.findByCityCode(cityCode);
        log.info("cityEntity : {}", cityEntity);

        // CityEntity로 해당 도시의 투어 상품 조회
        List<ProductEntity> productEntityList = productRepo.findByCityCode(cityEntity);
        List<ProductDTO> productList = null;
        if(productEntityList.size() != 0) {
            productList = productEntityList.stream().map( product -> new ProductDTO(product)).toList();
        }
        log.info("productEntityList : {}", productEntityList);
        log.info("productList : {}", productList);
        return productList;
    }


    // countryCode를 기반으로 투어 상품 조회
    public List<ProductDTO> getProductsByCountry(Long countryCode) {

        // countryCode를 해당하는 countryEntity 먼저 조회
        CountryEntity countryEntity = countryRepo.findByCountryCode(countryCode);
        log.info("countryEntity : {}", countryEntity);

        // countryEntity 해당 국가의 투어 상품 조회
        List<ProductEntity> productEntityList = productRepo.findByCountryCode(countryEntity);
        List<ProductDTO> productList = null;
        if(productEntityList.size() != 0) {
            productList = productEntityList.stream().map( product -> new ProductDTO(product)).toList();
        }
        log.info("productEntityList : {}", productEntityList);
        log.info("productList : {}", productList);
        return productList;
    }

    public ProductDTO getProductsByUid(String productUid) {

        ProductEntity productEntity = productRepo.findByProductUid(productUid);
        log.debug("productEntity : {}", productEntity);
        if(productEntity != null) {
            return new ProductDTO(productEntity);
        }
            return null;
    }
}
