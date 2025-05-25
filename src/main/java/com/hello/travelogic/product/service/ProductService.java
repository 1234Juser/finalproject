package com.hello.travelogic.product.service;

import com.hello.travelogic.product.domain.*;
import com.hello.travelogic.product.dto.ProductDTO;
import com.hello.travelogic.product.repo.*;
import com.hello.travelogic.utils.FileUploadUtils;
import com.hello.travelogic.review.repo.ReviewRepo;
import com.hello.travelogic.wish.repo.WishRepo;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class ProductService {

    @Autowired
    private final ProductRepo productRepo;
    @Autowired
    private final RegionRepo regionRepo;
    @Autowired
    private final CityRepo cityRepo;
    @Autowired
    private CountryRepo countryRepo;
    @Autowired
    private ThemeRepo themeRepo;
    private final ReviewRepo reviewRepo;
    private final WishRepo wishRepo;
    
    final String baseDir = System.getProperty("user.dir") + File.separator + "upload" + File.separator + "product" + File.separator;
    

    // 모든 Products 조회
    public Map<String, Object> getProducts(int start, int page) {
        
        start = start > 0 ? start - 1 : start;
        // 페이지는 인덱스 기반이라서 0부터 시작하는데,
        // start=1 일때 2번째 인덱스의 값이 출력되므로, start=1일 때 1번째 인덱스의 값이 프론트에 출력될 수 있도록 만들어줌.
        
        Pageable pageable = PageRequest.of(start, page, Sort.by(Sort.Order.asc ("productCode")));
        
        Page <ProductEntity> pageEntity = productRepo.findAll(pageable);
        List<ProductEntity> listE = pageEntity.getContent();
        Map <String, Object> map = new HashMap <> ();
        
        map.put("productList", listE.stream().map(entity -> new ProductDTO (entity)).toList());
        map.put("totalPages", pageEntity.getTotalPages());           // 전체 페이지 수
        map.put("currentPage", pageEntity.getNumber() + 1);          // 현재 페이지 번호
        map.put ("totalItems", pageEntity.getTotalElements ());        // 전체 아이템 개수

        return map;
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
    public ProductDTO getProductsByUid(String productUid, Long memberCode) {

        // 찜 여부 확인 기능 추가하면서 수정
        Optional<ProductEntity> optional = productRepo.findByProductUid(productUid);
        if (optional.isPresent()) {
            ProductEntity product = optional.get();
            log.debug("productEntity : {}", product);

            // 비회원인 경우 memberCode가 null이므로 기본값 false
            boolean isWished = false;
            if (memberCode != null) {
                isWished = wishRepo.existsByMember_MemberCodeAndProduct_ProductCode(
                        memberCode, product.getProductCode()
                );
                log.debug("isWished: {}", isWished);
            }

            // DTO로 변환하고 찜 상태 세팅
            ProductDTO dto = new ProductDTO(product);
            dto.setWished(isWished);

            return dto;
        }
            return null;
    }


    // 상품 등록
    @Transactional
    public int registerProduct(ProductDTO productDTO, MultipartFile productThumbnail) {
        int result = 1;
        try {
            // 1. 입력 받은 데이터 유효성 검증 및 엔티티 매핑
            RegionEntity region = regionRepo.findById(productDTO.getRegionCode())
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 권역 코드입니다."));

            CountryEntity country = countryRepo.findById(productDTO.getCountryId())
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 국가 코드입니다."));

            CityEntity city = cityRepo.findById(productDTO.getCityId())
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 도시 코드입니다."));

            ThemeEntity theme = themeRepo.findById(productDTO.getThemeCode())
                    .orElse(null);       // nullable 가능 (themeCode는 nullable)


            // 2. 날짜 검증 - 날짜 타입 변환 (String → LocalDate)
            LocalDate startDate = LocalDate.parse(productDTO.getProductStartDate());
            LocalDate today = LocalDate.now();
            if (startDate.isBefore(today)) {
                throw new IllegalArgumentException("시작 날짜는 오늘 혹은 이후 날짜여야 합니다.");
            }

            LocalDate endDate = LocalDate.parse(productDTO.getProductEndDate());
            if (endDate.isBefore(startDate)) {
                throw new IllegalArgumentException("끝 날짜는 시작 날짜 이후여야 합니다.");
            }


            // 3. 도시별 productUid 생성 로직
            String cityName = cityRepo.findCityNameByCityId(productDTO.getCityId());    // 도시 이름 조회 (예:"SEOUL")
            String prefix = cityName.toUpperCase().replaceAll("\\s+", "");      // 대문자 변환 + 공백제거
            Long count = productRepo.countByProductUidStartingWith(prefix);     // "SEOUL%" 로 시작하는 uid 몇 개인지 확인
            String newUid = prefix + String.format("%03d", count + 1);      // 새로운 UID 만들기

/*
            // 4. productCode 생성 로직 (숫자를 단순히 자동 증가되도록 설정)
             Long newProductCode = productRepo.findMaxProductCode().orElse(0L) + 1; // 최대 product_code + 1
            log.info("newProductCode : {}" , newProductCode);
*/

            // 4. 썸네일 파일 저장 및 DTO에 파일명 생성
            if (productThumbnail != null && !productThumbnail.isEmpty()) {
                String thumbnailfileName = FileUploadUtils.saveNewFile(productThumbnail);
                productDTO.setProductThumbnail(thumbnailfileName);
            }


            // 5. productEntity 생성 및 설정
            ProductEntity productE = new ProductEntity(productDTO);
            productE.setRegionCode(region);
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
            log.debug("낙관적 잠금 충돌 발생: {}", e.getMessage(), e);
            result = -1;
        } catch (Exception e) {
            result = 0;
//            e.printStackTrace();
            log.debug("상품 등록 중 오류 발생: {}", e.getMessage(), e);
        }

        return result;
    }
    
    // 리뷰 작성/삭제 시 reviewcount만 업데이트
    public void updateReviewCount(Long productCode) {
//        int count = reviewRepo.countByProduct_ProductCode(productCode);
//        ProductEntity product = productRepo.findById(productCode).orElseThrow();
//        product.setReviewCount(count);
        int newReviewCount = reviewRepo.countByProduct_ProductCode(productCode);

        ProductEntity product = productRepo.findById(productCode)
                .orElseThrow(() -> new IllegalArgumentException("해당 상품이 존재하지 않습니다."));

        product.setReviewCount(newReviewCount);
        productRepo.save(product);

    }

    
    // 상품 상세 페이지
    public ProductDTO getProductDetail(String productUid, Long memberCode) {
        ProductEntity product = productRepo.findByProductUid(productUid)
                .orElseThrow(() -> new NoSuchElementException("상품 없음"));

        log.info("찜 여부 체크: memberCode={}, productCode={}", memberCode, product.getProductCode());

        // 비회원일 경우 isWished를 기본값 false로 초기화
        boolean isWished = false;
        if (memberCode != null) {
            isWished = wishRepo.existsByMember_MemberCodeAndProduct_ProductCode(memberCode, product.getProductCode());
            log.info("찜 여부 결과: {}", isWished);
        }

        ProductDTO dto = new ProductDTO(product);

        dto.setWished(isWished);

        return dto;
    }
    
    
    // 상품 수정 페이지
    public ProductDTO getProductToModify ( String productUid ) {
        
        Optional<ProductEntity> productEntity = productRepo.findByProductUid(productUid);
        log.info("상품 productEntity 확인 : {}", productEntity);
        
        if(productEntity.isPresent ()) {
            log.info ("productEntity.get() : {}", productEntity.get());
            return new ProductDTO(productEntity.get());
        } else {
            throw new EntityNotFoundException ("상품을 찾을 수 없습니다. productUid : " + productUid);
        }
        
    }
    
    
    // 상품 수정
    @Transactional
    public int productUpdate ( String productUid, ProductDTO productDTO, MultipartFile productThumbnail ) {
        
        int result = 1;
        Optional<ProductEntity> productEOptional  = productRepo.findByProductUid (productUid);
        
        try {
            if (productEOptional .isPresent()) {
                ProductEntity productE = productEOptional .get();
            
                // 1. 파일을 재업로드한 경우 실행
                if (productThumbnail != null && !productThumbnail.isEmpty()) {
                    
                    // 1-1. 기존 파일이 존재한다면 삭제
                    if (productEOptional.get ().getProductThumbnail () != null && !productEOptional.get ().getProductThumbnail ().isEmpty()) {
                        String oldFileName = productEOptional.get ().getProductThumbnail ();
                        
                        try {
                                Path path = Paths.get(baseDir + oldFileName);
                                Files.deleteIfExists(path);
                        } catch (IOException e) {
                                log.debug ("파일 삭제 에러" + e.getMessage());
                                e.printStackTrace();
                                return -1;
                        }
                    }
                    
                    // 1-2. 새 파일 저장
                    try {
                            String thumbnailfileName = FileUploadUtils.saveNewFile(productThumbnail);
                            productE.setProductThumbnail(thumbnailfileName);
                    } catch (IOException e) {
                            e.printStackTrace ();
                            return -1;
                    }
                    
                } else {
                // 2. 파일 재업로드하지 않은 경우 DTO에 담긴 값으로 엔티티 업데이트 및 DTO의 썸네일 이름 유지
                    productE.setProductTitle(productDTO.getProductTitle());
                    productE.setProductContent(productDTO.getProductContent());
                    productE.setProductStartDate(LocalDate.parse (productDTO.getProductStartDate()));
                    productE.setProductEndDate(LocalDate.parse (productDTO.getProductEndDate()));
                    productE.setProductAdult(productDTO.getProductAdult());
                    productE.setProductChild(productDTO.getProductChild());
                    productE.setProductMinParticipants(productDTO.getProductMinParticipants());
                    productE.setProductMaxParticipants(productDTO.getProductMaxParticipants());
                    productE.setProductStatus(productDTO.getProductStatus());
                    productE.setProductThumbnail(productDTO.getProductThumbnail());
                }
            
            // 3. 데이터 저장
            productRepo.save(productE);
        
            } else {
                 // 해당 productUid를 가진 상품이 없는 경우
                 result = 0;
            }
            
        } catch (Exception e) {
            result = 0;
            e.printStackTrace();
            log.debug("상품 등록 중 오류 발생: {}", e.getMessage(), e);
    }
        
        return result;
    }
    
    
    // 상품 삭제
    @Transactional
    public int productDelete ( String productUid, MultipartFile productThumbnail ) {
        
        log.debug ("productThumbnail 확인 : {}", productThumbnail);
        
        // 엔티티 먼저 조회
        ProductEntity productEntity = productRepo.findByProductUid (productUid)
                                      .orElseThrow(() -> new EntityNotFoundException(">>>>>일치하는 UID 없음. productUid 확인하세요: " + productUid));
        
        log.debug ("productEntity 확인 : {}", productEntity);
        
        // 엔티티 삭제 & 관련 파일 삭제
        if (productEntity != null) {
            productRepo.delete(productEntity);
            try {
                Path path = Paths.get(baseDir + productEntity.getProductThumbnail ());
                log.debug ("path 확인,,,, : {}" , path);
                if (path.toFile ().exists ()) {
                    Files.deleteIfExists(path);  //파일이 존재하면 삭제
                }
                
            } catch (Exception e) {
                throw new RuntimeException (e);
            }
            
            return 1;
        }
        
        return 0;
    }
    
    // 명세서 페이지에 띄울 랜덤 상품 광고
    public List<ProductDTO> getRandomAdProducts(int count) {
        return productRepo.findRandomProducts(count)
                .stream()
                .map(ProductDTO::new)
                .collect(Collectors.toList());
    }
}
