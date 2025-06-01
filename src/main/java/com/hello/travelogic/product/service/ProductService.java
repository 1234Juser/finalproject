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
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ProductService {

    private final ProductRepo productRepo;
    private final RegionRepo regionRepo;
    private final CityRepo cityRepo;
    private final CountryRepo countryRepo;
    private final ThemeRepo themeRepo;
    private final ReviewRepo reviewRepo;
    private final WishRepo wishRepo;
    private final FileUploadUtils fileUploadUtils;
    private final ProductDetailRepo productDetailRepo;
    


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


            // 4. 썸네일 파일 저장 및 DTO에 파일명 생성
            if (productThumbnail != null && !productThumbnail.isEmpty()) {
                try {
                    // S3에 파일 업로드
                    String s3Url = fileUploadUtils.uploadToS3(productThumbnail);
                    log.debug("s3Url : {}", s3Url);
                    productDTO.setProductThumbnail(s3Url);
                } catch (IOException e) {
                    log.error("파일 업로드 실패 : ", e);
                }
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

            // --- 💡 새로운 로직 시작: cityId를 기반으로 해당 ProductDetailEntity 설정 💡 ---
            if (city != null && city.getCityId() != null) {
                Long citySpecificProductDetailCode = city.getCityId(); // city.cityId를 ProductDetail의 PK로 사용

                log.info("City ID {}에 해당하는 ProductDetail 정보 조회를 시도합니다. (ProductDetail PK: {})", city.getCityId(), citySpecificProductDetailCode);

                ProductDetailEntity citySpecificProductDetail = productDetailRepo.findById(citySpecificProductDetailCode)
                        .orElseThrow(() -> new EntityNotFoundException(
                                "ID가 " + citySpecificProductDetailCode + "인 ProductDetail 정보를 찾을 수 없습니다. " +
                                        "cityId (" + city.getCityId() + ")에 해당하는 ProductDetail 데이터가 DB에 있는지 확인해주세요."
                        ));
                productE.setProductDetail(citySpecificProductDetail); // 조회한 도시별 상세 정보를 ProductEntity에 연결
                log.info("City ID {}에 ProductDetail ID {} (제목: {}) 연결 성공.", city.getCityId(), citySpecificProductDetail.getProductDetailCode(), citySpecificProductDetail.getProductInfo().substring(0, Math.min(citySpecificProductDetail.getProductInfo().length(), 30))+"..."); // productInfo 앞부분 로깅
            } else {
                // 이 경우는 CityEntity 조회 시 예외가 발생하지 않았으나 city 또는 cityId가 null인 극히 드문 케이스입니다.
                // 또는, 모든 도시에 대해 ProductDetail을 필수로 연결하지 않을 경우에 대한 처리입니다.
                log.warn("City 또는 CityId 정보가 없어 ProductDetail을 연결할 수 없습니다. productUid: {}", newUid);
                // 필요하다면, 여기서 기본 ProductDetail(예: ID 1)을 연결하거나, productDetail 필드를 null로 둘 수 있습니다.
                // 시연 목적상, 선택된 cityId에 해당하는 ProductDetail이 항상 있다고 가정하고 진행합니다.
                // 만약 이 상황에서 오류를 발생시키고 싶다면 아래 주석을 해제하세요.
                // throw new IllegalStateException("City 정보가 유효하지 않아 ProductDetail을 설정할 수 없습니다.");
            }
            // --- 💡 새로운 로직 끝 ---

            // --- 💡 동적으로 cityName, countryName, fullLocation 설정 💡 ---
            String effectiveCityName = "";
            if (city != null && city.getCityName() != null) { // CityEntity에서 영문 도시명 사용
                effectiveCityName = city.getCityName();
            }
            productE.setCityName(effectiveCityName); // ProductEntity의 cityName 필드에 설정

            String effectiveCountryName = "";
            if (country != null && country.getCountryName() != null) { // CountryEntity에서 영문 국가명 사용
                effectiveCountryName = country.getCountryName();
            }
            productE.setCountryName(effectiveCountryName); // ProductEntity의 countryName 필드에 설정

            // fullLocation 조합
            if (!effectiveCityName.isEmpty() && !effectiveCountryName.isEmpty()) {
                productE.setFullLocation(effectiveCityName + ", " + effectiveCountryName);
            } else {
                // 둘 중 하나라도 비어있으면 그냥 합침 (예: 도시명만 있거나, 국가명만 있는 경우 - 실제로는 둘 다 있어야겠지만)
                productE.setFullLocation(effectiveCityName + effectiveCountryName);
            }
            // --- 💡 로직 끝 ---


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
                String oldS3Url = productE.getProductThumbnail(); // DB에 저장된 기존 S3 URL
            
                // 1. 파일을 재업로드한 경우 실행
                if (productThumbnail != null && !productThumbnail.isEmpty()) {
                    
                    // 1-1. 기존 파일이 존재한다면 S3에서 삭제
                    if (oldS3Url != null && !oldS3Url.isEmpty()) {
                        fileUploadUtils.deleteS3File(oldS3Url);
                    }

                    // 1-2. 엔티티에 새 파일 S3에 저장
                    try {
                        String newS3Url = fileUploadUtils.uploadToS3(productThumbnail);
                        productE.setProductThumbnail(newS3Url);
                    } catch (IOException e) {
                            e.printStackTrace ();
                            log.error("S3 파일 업로드 중 오류 발생: {}", e.getMessage(), e);
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
                    // 썸네일 파일이 변경되지 않았으므로 기존 S3 URL 유지
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
    public int productDelete ( String productUid ) {

//        log.debug ("상품 삭제 요청 productUid: {}", productUid);

        // 엔티티 먼저 조회
        ProductEntity productEntity = productRepo.findByProductUid (productUid)
                                      .orElseThrow(() -> new EntityNotFoundException(">>>>>일치하는 UID 없음. productUid 확인하세요: " + productUid));
        
//        log.debug ("productEntity 확인 : {}", productEntity);
        String s3ThumbnailUrl = productEntity.getProductThumbnail();
        
        // 1. S3 파일 먼저 삭제 시도
        if (s3ThumbnailUrl != null && !s3ThumbnailUrl.isEmpty()) {
            try {
                fileUploadUtils.deleteS3File (s3ThumbnailUrl);
                log.debug ("S3 파일 삭제 성공: {}", s3ThumbnailUrl);
            } catch (Exception e) {
                log.error ("S3 파일 삭제 중 오류 발생. DB 작업이 진행되지 않습니다.: {}", e.getMessage (), e);
                throw new RuntimeException ("S3 파일 삭제 실패하여 상품 삭제를 중단합니다.", e);
            }
            
        }
            // 2. S3 삭제 성공 또는 삭제할 파일이 없는 경우 DB 삭제 진행
            productRepo.delete(productEntity);
            log.debug("DB에서 상품 레코드 삭제 성공: {}", productUid);
            return 1;
        
    }
    
    // 명세서 페이지에 띄울 랜덤 상품 광고
    public List<ProductDTO> getRandomAdProducts(int count) {
        return productRepo.findRandomProducts(count)
                .stream()
                .map(ProductDTO::new)
                .collect(Collectors.toList());
    }

    // 실행 가능 기간이 지난 상품의 경우 productStatus를 자동으로 CLOSED로 바뀌게 해 옵션 선택 버튼 클릭 막기
    // 매일 밤12시 정각에 종료된 상품 상태를 CLOSED로 변경
    @Scheduled(cron = "0 0 20 * * *", zone = "Asia/Seoul") // 한국시간 기준 매일 01:00
    public void updateExpiredProductStatus() {
        log.info("[스케줄러 실행됨] updateExpiredProductStatus()");
        try {
            List<ProductEntity> products = productRepo.findAllByProductStatusNot(ProductEntity.ProductStatus.CLOSED);
            LocalDateTime now = LocalDateTime.now();

            for (ProductEntity product : products) {
                LocalDateTime endDateWithCutoff = product.getProductEndDate().atTime(20, 0);

                // 20:00을 기준으로 비교
//                log.info("상품 상태 검사: UID={} / 종료기한={} / 현재시간={} / 현재상태={}",
//                        product.getProductUid(), endDateWithCutoff, now, product.getProductStatus());

                if (now.isAfter(endDateWithCutoff) && product.getProductStatus() == ProductEntity.ProductStatus.ON_SALE) {
                    product.setProductStatus(ProductEntity.ProductStatus.CLOSED);
                    productRepo.save(product); // <- 명시적 저장
                    log.info("상품 상태 CLOSED로 변경됨: UID={}", product.getProductUid());
                }
            }
            productRepo.flush();
        } catch (Exception e) {
            log.error("[스케줄러 에러] 상태 변경 실패: ", e);
        }
    }
}
