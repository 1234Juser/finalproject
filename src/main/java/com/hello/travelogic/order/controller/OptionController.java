package com.hello.travelogic.order.controller;

import com.hello.travelogic.order.domain.OptionEntity;
import com.hello.travelogic.order.dto.OptionDTO;
import com.hello.travelogic.order.repo.OptionRepo;
import com.hello.travelogic.order.service.OptionService;
import com.hello.travelogic.product.domain.ProductEntity;
import com.hello.travelogic.product.repo.ProductRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
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

    // 옵션들 정보 가져오기
    @GetMapping("/products/{productUid}/option")
    public ResponseEntity<?> getOptionsByDate(
            @PathVariable String productUid,
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate) {

        try {
            List<OptionDTO> options = optionService.getOptionsByDate(productUid, startDate, endDate);
            log.info("🟢 조회된 옵션들: {}", options);
            return ResponseEntity.ok(options);
        } catch (Exception e) {
            log.error("🔴 옵션 데이터 조회 실패:", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("옵션 데이터 조회 실패");
        }
    }

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
        Integer adultCount = Integer.parseInt(String.valueOf(requestBody.getOrDefault("adultCount", "0")));
        Integer childCount = Integer.parseInt(String.valueOf(requestBody.getOrDefault("childCount", "0")));

        try {
            if (reservationDate == null || reservationDate.isBlank()) {
                return ResponseEntity.badRequest().body("예약 날짜가 비어있습니다.");
            }
            Long optionCode = optionService.saveReservation(productUid, reservationDate, adultCount, childCount, authentication);
            return ResponseEntity.ok(optionCode);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            log.error("🔴 예약 저장 실패:", e);
            return ResponseEntity.status(500).body(null);
        }
    }

    // 옵션 단일 조회 (optionCode로 조회)
    @GetMapping("/products/{productUid}/option/{optionCode}")
    public ResponseEntity<?> getOptionByCode(
            @PathVariable String productUid,
            @PathVariable Long optionCode) {

        try {
            OptionEntity optionEntity = optionRepo.findById(optionCode)
                    .orElseThrow(() -> new RuntimeException("해당 옵션을 찾을 수 없습니다."));

            // 상품 UID가 일치하는지 확인 (보안 강화)
            if (!optionEntity.getProduct().getProductUid().equals(productUid)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("상품 UID가 일치하지 않습니다.");
            }

            OptionDTO optionDTO = optionService.getOptionByCode(optionCode);
            log.info("🟢 조회된 옵션: {}", optionDTO);
            return ResponseEntity.ok(optionDTO);
        } catch (Exception e) {
            log.error("🔴 옵션 조회 실패:", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("옵션 조회 실패");
        }
    }
}
