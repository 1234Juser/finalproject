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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
public class OptionController {
    // 예약을 하기 위한 옵션 생성, 옵션 조회, 옵션 삭제, 옵션 수정

    private final OptionService optionService;
    private final OptionRepo optionRepo;
    private final ProductRepo productRepo;

    // 예약 폼 : 비회원도 접근 가능
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
    // 예약 날짜 선택 : 비회원도 접근 가능
    @PatchMapping("/products/{productUid}/reservation-date")
    public ResponseEntity<?> selectReservationDate(
            @PathVariable String productUid,
            @RequestBody Map<String, String> requestBody) {

        String reservationDate = requestBody.get("reservationDate");
        log.info("🔵 예약 날짜 요청: productUid = {}, reservationDate = {}", productUid, reservationDate);
        try {
            // 예약 날짜가 비어있는지 확인
            if (reservationDate == null || reservationDate.isBlank()) {
                return ResponseEntity.badRequest().body("예약 날짜가 비어있습니다.");
            }
            optionService.selectReservationDate(productUid, reservationDate);
            return ResponseEntity.ok("예약 날짜가 성공적으로 선택되었습니다.");
        } catch (Exception e) {
            log.error("🔴 예약 날짜 선택 실패:", e);
            return ResponseEntity.status(500).body("예약 날짜 선택 실패: " + e.getMessage());
        }
    }

    // 옵션 저장 : 회원만 접근 가능
    @PatchMapping("/products/{productUid}/reservation")
    public ResponseEntity<?> saveReservation(
            @PathVariable String productUid,
            @RequestBody Map<String, String> requestBody,
            Authentication authentication) {

        String reservationDate = requestBody.get("reservationDate");

        try {
            optionService.saveReservation(productUid, reservationDate, authentication);
            return ResponseEntity.ok("예약이 성공적으로 저장되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("예약 저장 실패: " + e.getMessage());
        }
    }


}
