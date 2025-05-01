package com.hello.travelogic.product.service;

import com.hello.travelogic.product.domain.CityEntity;
import com.hello.travelogic.product.domain.CountryEntity;
import com.hello.travelogic.product.domain.ProductEntity;
import com.hello.travelogic.product.domain.ThemeEntity;
import com.hello.travelogic.product.dto.ProductDTO;
import com.hello.travelogic.product.repo.CityRepo;
import com.hello.travelogic.product.repo.CountryRepo;
import com.hello.travelogic.product.repo.ProductRepo;
import com.hello.travelogic.product.repo.ThemeRepo;
import com.hello.travelogic.utils.FileUploadUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class ProductService {

    @Autowired
    private final ProductRepo productRepo;
    @Autowired
    private final CityRepo cityRepo;
    @Autowired
    private CountryRepo countryRepo;
    @Autowired
    private ThemeRepo themeRepo;

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


    // cityId를 기반으로 투어 상품 조회
    public List<ProductDTO> getProductsByCity(Long cityId) {

        // cityId에 해당하는 CityEntity 먼저 조회
        CityEntity cityEntity = cityRepo.findByCityId(cityId);
        log.info("cityEntity : {}", cityEntity);

        // CityEntity로 해당 도시의 투어 상품 조회
        List<ProductEntity> productEntityList = productRepo.findByCityId(cityEntity);
        List<ProductDTO> productList = null;
        if(productEntityList.size() != 0) {
            productList = productEntityList.stream().map( product -> new ProductDTO(product)).toList();
        }
        log.info("productEntityList : {}", productEntityList);
        log.info("productList : {}", productList);
        return productList;
    }


    // countryId를 기반으로 투어 상품 조회
    public List<ProductDTO> getProductsByCountry(Long countryId) {

        // countryId를 해당하는 countryEntity 먼저 조회
        CountryEntity countryEntity = countryRepo.findByCountryId(countryId);
        log.info("countryEntity : {}", countryEntity);
        log.info("countryEntity : {}", countryEntity);

        // countryEntity 해당 국가의 투어 상품 조회
        List<ProductEntity> productEntityList = productRepo.findByCountryId(countryEntity);
        List<ProductDTO> productList = null;
        if(productEntityList.size() != 0) {
            productList = productEntityList.stream().map( product -> new ProductDTO(product)).toList();
        }
        log.info("productEntityList : {}", productEntityList);
        log.info("productList : {}", productList);
        return productList;
    }

    // productUid를 기반으로 투어 상품 조회
    public ProductDTO getProductsByUid(String productUid) {

        ProductEntity productEntity = productRepo.findByProductUid(productUid);
        log.debug("productEntity : {}", productEntity);
        if(productEntity != null) {
            return new ProductDTO(productEntity);
        }
            return null;
    }


    // 상품 등록
    @Transactional
    public int registerProduct(ProductDTO productDTO, MultipartFile productThumbnail) {
        int result = 1;
        try {
            // 1. 입력 받은 데이터 유효성 검증 및 엔티티 매핑
            CountryEntity country = countryRepo.findById(productDTO.getCountryId())
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 국가 코드입니다."));
            log.info("country : {}" , country);

            CityEntity city = cityRepo.findById(productDTO.getCityId())
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 도시 코드입니다."));
            log.info("city : {}" , city);

            ThemeEntity theme = themeRepo.findById(productDTO.getThemeCode())
                    .orElse(null);       // nullable 가능 (themeCode는 nullable)
            log.info("theme : {}" , theme);


            // 2. 날짜 검증 - 날짜 타입 변환 (String → LocalDate)
            LocalDate startDate = LocalDate.parse(productDTO.getProductStartDate());
            log.info("startDate : {}" , startDate);
            LocalDate today = LocalDate.now();      // 시스템에서 오늘 날짜 가져오기
            log.info("today : {}" , today);
            if (startDate.isBefore(today)) {
                throw new IllegalArgumentException("시작 날짜는 오늘 혹은 이후 날짜여야 합니다.");
            }

            LocalDate endDate = LocalDate.parse(productDTO.getProductEndDate());
            log.info("endDate : {}" , endDate);
            if (endDate.isBefore(startDate)) {
                throw new IllegalArgumentException("끝 날짜는 시작 날짜 이후여야 합니다.");
            }


            // 3. 도시별 productUid 생성 로직
            String cityName = cityRepo.findCityNameByCityId(productDTO.getCityId());    // 도시 이름 조회 (예:"SEOUL")
            log.info("cityname : {}" , cityName);
            String prefix = cityName.toUpperCase().replaceAll("\\s+", "");      // 대문자 변환 + 공백제거
            log.info("prefix : {}" , prefix);
            Long count = productRepo.countByProductUidStartingWith(prefix);     // "SEOUL%" 로 시작하는 uid 몇 개인지 확인
            log.info("count : {}" , count);
            String newUid = prefix + String.format("%03d", count + 1);      // 새로운 UID 만들기
            log.info("newUid : {}" , newUid);

/*
            // 4. productCode 생성 로직 (숫자를 단순히 자동 증가되도록 설정)
             Long newProductCode = productRepo.findMaxProductCode().orElse(0L) + 1; // 최대 product_code + 1
            log.info("newProductCode : {}" , newProductCode);
*/

            // 4. 썸네일 파일 저장 및 DTO에 파일명 생성
            if (productThumbnail != null && !productThumbnail.isEmpty()) {
                String thumbnailfileName = FileUploadUtils.saveNewFile(productThumbnail);
                log.debug("저장된 썸네일 파일명 : {}", thumbnailfileName);
                productDTO.setProductThumbnail(thumbnailfileName); // DTO에 파일명 설정
            }

            // 5. productEntity 생성 및 설정
            ProductEntity productE = new ProductEntity(productDTO);
            productE.setCountryId(country);
            productE.setCityId(city);
            productE.setThemeCode(theme);
            productE.setProductStartDate(startDate);
            productE.setProductEndDate(endDate);
            productE.setProductUid(newUid);
            productE.setProductThumbnail(productE.getProductThumbnail());     // ← DTO에 설정된 파일명 사용!!
//            productE.setProductCode(newProductCode); // 생성된 product_code 설정

            // 6. 데이터 저장
            productRepo.save(productE);
            log.info("productEntity 생성 및 설정.... productE 확인,,, : {} ", productE);

        } catch (ObjectOptimisticLockingFailureException e) {
            log.debug("낙관적 잠금 충돌 발생: {}", e.getMessage(), e);       // 충돌 상태를 구체적으로 반환
            result = -1;
        } catch (Exception e) {
            result = 0;
//            e.printStackTrace();
            log.debug("상품 등록 중 오류 발생: {}", e.getMessage(), e);
        }

        return result;
    }


    // 예시: themeCode에 따라 productType 설정
    private ProductEntity.ProductType getProductTypeByThemeCode(ThemeEntity themeEntity) {
        Long themeCode = themeEntity.getThemeCode();

        if (themeCode == 1) {
            return ProductEntity.ProductType.TOUR;
        } else if (themeCode == 2) {
            return ProductEntity.ProductType.CRUISE;
        } else if (themeCode == 3) {
            return ProductEntity.ProductType.GOLF;
        } else if (themeCode == 4) {
            return ProductEntity.ProductType.KIDS;
        } else if (themeCode == 5) {
            return ProductEntity.ProductType.HONEYMOON;
        } else if (themeCode == 6) {
            return ProductEntity.ProductType.SILVER;
        }
        throw new IllegalArgumentException("알 수 없는 테마 코드: " + themeCode);
    }

}
