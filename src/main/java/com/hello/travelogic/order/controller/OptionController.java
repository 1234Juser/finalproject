package com.hello.travelogic.order.controller;

import com.hello.travelogic.order.domain.OptionEntity;
import com.hello.travelogic.order.dto.OptionDTO;
import com.hello.travelogic.order.repo.OptionRepo;
import com.hello.travelogic.order.service.OptionService;
import com.hello.travelogic.product.domain.ProductEntity;
import com.hello.travelogic.product.repo.ProductRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class OptionController {
    // 예약을 하기 위한 옵션 생성, 옵션 조회, 옵션 삭제, 옵션 수정

    private final OptionService optionService;
    private final OptionRepo optionRepo;
    private final ProductRepo productRepo;

    @GetMapping("/products/{productUid}/option/create")
    public ResponseEntity<OptionDTO> getOptionForm(@PathVariable String productUid) {
        log.info("🔵 OptionController - getOptionForm: {}", productUid);

        // 상품 정보 가져오기
        ProductEntity productEntity = productRepo.findByProductUid(productUid)
                .orElseThrow(() -> new RuntimeException("해당 상품을 찾을 수 없습니다."));

        // OptionDTO 생성
        OptionDTO optionDTO = optionService.createOptionForm(productEntity);

        return ResponseEntity.ok(optionDTO);
    }

//    @GetMapping("/option/date/{date}")
//    public List<OptionEntity> getOptionsByDate(@PathVariable String reservationDate) {
//        return optionRepo.findByDate(reservationDate);
//    }
}
