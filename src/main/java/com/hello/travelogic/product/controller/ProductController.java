package com.hello.travelogic.product.controller;

import com.hello.travelogic.product.dto.ProductDTO;
import com.hello.travelogic.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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


    // countryId에 해당하는 투어 상품 조회
    @GetMapping("/country")
    public ResponseEntity getProductsByCountry(@RequestParam("country_id") Long countryId) {
        log.debug("get products by country ID : {}", countryId);
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProductsByCountry(countryId));
    }


    // cityId에 해당하는 투어 상품 조회
    @GetMapping("/city")
    public ResponseEntity getProductsByCity(@RequestParam("city_id") Long cityId) {
        log.debug("get products by city ID : {}", cityId);
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProductsByCity(cityId));
    }


    // 투어 상품 상세 페이지
    @GetMapping("/{productUid}")
    public ResponseEntity<ProductDTO> getProductDetail(@PathVariable("productUid") String productUid,
                                         @RequestParam("memberCode") Long memberCode) {
        log.debug("get product detail : {}", productUid);
        log.debug("memberCode: {}", memberCode);
        ProductDTO dto = productService.getProductDetail(productUid, memberCode);
//        return ResponseEntity.status(HttpStatus.OK).body(productService.getProductsByUid(productUid));
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }


    // 상품 등록
    @PostMapping("/register")
    public ResponseEntity registerProduct(@ModelAttribute ProductDTO productDTO,
                                          @RequestParam("productThumbnail") MultipartFile productThumbnail) {
        log.debug("파일 이름 찍히는지 확인 : " + productThumbnail.getOriginalFilename() );
        log.debug("DTO 데이터 확인,,,,," + productDTO.toString());
        log.debug("상품 등록 요청 registerProduct 메서드....... : {}", productDTO);
        int result = productService.registerProduct(productDTO, productThumbnail);
        log.debug("registerProduct result : {}", result);
        if (result == 1) {
            return ResponseEntity.status(HttpStatus.CREATED).body("상품이 성공적으로 등록되었습니다.");
        } else if (result == -1) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("충돌 발생: 데이터를 다시 확인해 주세요.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("상품 등록에 실패했습니다.");
        }
    }
}
