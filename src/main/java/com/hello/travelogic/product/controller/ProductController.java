package com.hello.travelogic.product.controller;

import com.hello.travelogic.product.dto.ProductDTO;
import com.hello.travelogic.product.service.ProductService;
import jakarta.persistence.EntityNotFoundException;
import com.hello.travelogic.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private final ProductService productService;
    private final JwtUtil jwtUtil;

    // 투어 상품 전체 조회
    @GetMapping("")
    public ResponseEntity getProducts(@RequestParam(defaultValue = "0") int start,
                                                            @RequestParam(defaultValue = "10") int page) {
        log.debug ("start: {} / page: {}", start, page);
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProducts(start, page));
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
                                                       @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        log.debug("get product detail : {}", productUid);
        // 비로그인 상태를 대비해 memberCode는 null로 초기화
        Long memberCode = null;
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            memberCode = jwtUtil.getMemberCodeFromToken(authorizationHeader.replace("Bearer ", ""));
            log.debug("memberCode : {}", memberCode);
        }
        ProductDTO dto = productService.getProductDetail(productUid, memberCode);
//        return ResponseEntity.status(HttpStatus.OK).body(productService.getProductsByUid(productUid));
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }


    // 상품 등록
    @PostMapping(value = "/register", consumes = "multipart/form-data")
    public ResponseEntity registerProduct(@RequestPart("productDTO") ProductDTO productDTO,
                                          @RequestPart("productThumbnail") MultipartFile productThumbnail) {
        try {
            log.debug("전달된 productThumbnail 객체: {}", productThumbnail); // MultipartFile 객체 전체 출력

            int result = productService.registerProduct(productDTO, productThumbnail);
            log.debug("registerProduct result : {}", result);

            if (result == 1) {
                return ResponseEntity.status(HttpStatus.CREATED).body("상품이 성공적으로 등록되었습니다.");
            } else if (result == -1) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("충돌 발생: 데이터를 다시 확인해 주세요.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("상품 등록에 실패했습니다.");
            }

        } catch (Exception e) {
            log.error("Controller 예외 발생: " + e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 단 예외: " + e.getMessage());

        }
    }


    // 상품 수정 페이지
    @GetMapping("/admin/{productUid}")
    public ResponseEntity  getProductToModify(@PathVariable("productUid") String productUid) {
        log.debug("get product detail : {}", productUid);
        ProductDTO productDTO = productService.getProductToModify(productUid);

        if(productDTO != null)
            return ResponseEntity.status(HttpStatus.OK).body(productDTO);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("일치하는 상품이 없습니다. UID를 다시 확인하세요.");
    }


    // 상품 수정
    @PutMapping("/admin/{productUid}")
    public ResponseEntity ProductUpdate(@PathVariable("productUid") String productUid,
                                                                                @RequestPart("productDTO") ProductDTO productDTO,
                                                                                @RequestPart(value = "productThumbnail", required = false) MultipartFile productThumbnail) {

        int result = productService.productUpdate(productUid, productDTO, productThumbnail);

        if(result == 1)
            return ResponseEntity.ok (Map.of ("message", "수정 성공"));
        else if (result == 0)
            return ResponseEntity.status (HttpStatus.BAD_REQUEST).body(Map.of("message", "잘못된 요청입니다. 입력 내용을 확인해주세요."));
        else
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "상품 수정 중 오류가 발생했습니다."));
    }


    // 상품 삭제
    @DeleteMapping("/admin/{productUid}")
    public ResponseEntity ProductDelete(@PathVariable("productUid") String productUid,
                                                                @RequestPart(value = "productThumbnail", required = false) MultipartFile productThumbnail) {

        log.debug ("productUid: {}", productUid);
        int result = productService.productDelete(productUid, productThumbnail);

        if(result == 1) {
            log.debug ("product delete result : {}", result);
            return ResponseEntity.status (HttpStatus.NO_CONTENT).build();
        } else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body ("일치하는 Uid 없음");
    }

}
