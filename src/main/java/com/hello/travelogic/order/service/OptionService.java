package com.hello.travelogic.order.service;

import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.member.repository.MemberRepository;
import com.hello.travelogic.order.domain.OptionEntity;
import com.hello.travelogic.order.dto.OptionDTO;
import com.hello.travelogic.order.repo.OptionRepo;
import com.hello.travelogic.order.repo.OrderRepo;
import com.hello.travelogic.product.domain.ProductEntity;
import com.hello.travelogic.product.repo.ProductRepo;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class OptionService {

    private final OptionRepo optionRepo;
    private final ProductRepo productRepo;
    private final OrderRepo orderRepo;
    private final MemberRepository memberRepository;

    public OptionDTO createOptionForm(ProductEntity productEntity) {
        if (productEntity == null) {
            throw new IllegalArgumentException("상품 정보가 없습니다.");
        }

        // OptionDTO 생성 (기본 상품 정보 포함)
        OptionDTO optionDTO = new OptionDTO();
        optionDTO.setProductCode(productEntity.getProductCode());
        optionDTO.setProductTitle(productEntity.getProductTitle());
        optionDTO.setProductAdult(productEntity.getProductAdult());
        optionDTO.setProductChild(productEntity.getProductChild());
        optionDTO.setAdultCount(0);
        optionDTO.setChildCount(0);
        optionDTO.setProductMaxParticipants(productEntity.getProductMaxParticipants());
        optionDTO.setReservationDate(null);
//        optionDTO.setTotalPrice(0); // 초기 가격은 0으로 설정

        // 초기 가격은 이미 0으로 설정되어 있으므로 추가 설정 불필요
        log.info("🟢 OptionService - OptionDTO 생성: {}", optionDTO);
        return optionDTO;
    }

    public List<OptionDTO> getOptionsByDate(String productUid, String startDate, String endDate) {
        try {
            // 문자열로 받은 날짜를 LocalDate로 변환
//            LocalDate date = LocalDate.parse(reservationDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
//            LocalDate parsedDate = LocalDate.parse(reservationDate.trim());
//            log.info("📝 검색할 reservationDate: {}", parsedDate);
            LocalDate start = LocalDate.parse(startDate.trim());
            LocalDate end = LocalDate.parse(endDate.trim());

            log.info("📝 검색할 예약 날짜 범위: {} ~ {}", start, end);

            // DB에서 옵션 조회
            List<OptionEntity> options = optionRepo.findByProduct_ProductUidAndReservationDate(productUid, start, end);
            log.info("🟢 예약 가능한 옵션 조회 ({}개): {}", options.size(), options);

            // 조회된 옵션을 DTO로 변환하여 반환
//            List<OptionDTO> optionDTOs = options.stream()
//                    .map(OptionDTO::new)
//                    .collect(Collectors.toList());
//
//            log.info("🟢 예약 가능한 옵션 조회: {}", optionDTOs);
//            return optionDTOs;
            // DTO로 변환
            return options.stream()
                    .map(OptionDTO::new)
                    .collect(Collectors.toList());

        } catch (Exception e) {
//            log.error("🔴 예약 가능한 옵션 조회 실패:", e);
//            throw new RuntimeException("예약 가능한 옵션 조회 실패: " + e.getMessage());
            log.error("🔴 예약 가능한 옵션 조회 실패: {}", e.getMessage());
            throw e;
        }
    }

    @Transactional
    public void selectReservationDate(String productUid, String reservationDate) {
        ProductEntity product = productRepo.findByProductUid(productUid)
                .orElseThrow(() -> new IllegalArgumentException("해당 상품을 찾을 수 없습니다."));
        if (reservationDate == null || reservationDate.isBlank()) {
            throw new IllegalArgumentException("예약 날짜가 비어있습니다.");
        }
        LocalDate parsedDate = LocalDate.parse(reservationDate);

        OptionEntity option = new OptionEntity();
        option.setProduct(product);
//        option.setReservationDate(reservationDate != null ? LocalDate.parse(reservationDate) : null);
        if (reservationDate != null && !reservationDate.isBlank()) {
            option.setReservationDate(LocalDate.parse(reservationDate));
        } else {
            option.setReservationDate(parsedDate);  // 명시적으로 null 설정
        }
//        option.setAdultCount(0); // 기본값 설정
//        option.setChildCount(0);
        optionRepo.save(option);

        log.info("🟢 예약 날짜 저장 완료: productUid = {}, reservationDate = {}", productUid, reservationDate);
    }

    // 실제 예약 옵션 생성(중복예약 방지, 날짜별 최대 예약인원 체크) : 회원만 접근 가능
    @Transactional
    public Long saveReservation(String productUid, String reservationDate, int adultCount, int childCount, Authentication authentication) {
        ProductEntity product = productRepo.findByProductUid(productUid)
                .orElseThrow(() -> new IllegalArgumentException("해당 상품을 찾을 수 없습니다."));

        String memberId = authentication.getName();

        MemberEntity member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new IllegalArgumentException("해당 회원을 찾을 수 없습니다."));

        LocalDate date = LocalDate.parse(reservationDate);

        // 한 사람이 한 날에 같은 상품의 옵션 여러개 생성하는거 방지
        // 예) '하이미 가이드와 함께하는 세비야 도보투어'가 25-05-14일자 진행되는 걸로 홍길동이 여러번 예약하는 행위
        boolean exists = orderRepo.existsByMemberAndProductAndOption_ReservationDate(member, product, date);
        log.info("🟡 중복 예약 여부: {}", exists);
        List<OptionEntity> options = optionRepo.findByProduct_ProductUidAndReservationDate(productUid, date, date);
        log.info("🔍 DB에 남아있는 옵션 수: {}", options.size());
        for (OptionEntity op : options) {
            log.info("🔸 optionCode: {}, reservationDate: {}, totalPrice: {}, 성인: {}, 아동: {}",
                    op.getOptionCode(), op.getReservationDate(), op.getTotalPrice(), op.getAdultCount(), op.getChildCount());
        }
        if (exists) {
            throw new IllegalStateException("해당 날짜에 이미 동일 상품에 대한 예약이 존재합니다.");
        }

        // **최대 예약 인원 체크**
        int currentParticipants = optionRepo.getTotalParticipantsByDate(productUid, date);
        int newParticipants = adultCount + childCount;
        int maxParticipants = product.getProductMaxParticipants();

        if (currentParticipants + newParticipants > maxParticipants) {
            throw new IllegalStateException("최대 예약 인원을 초과했습니다.");
        }

        // 상품 정보 초기화
//        int productAdultPrice = product.getProductAdult();
//        int productChildPrice = product.getProductChild();

        OptionEntity option = new OptionEntity();
        option.setProduct(product);
//        option.setReservationDate(date);
        option.setReservationDate(reservationDate != null ? LocalDate.parse(reservationDate) : null);
//        option.setAdultCount(0); // 기본값 설정
//        option.setChildCount(0);
        option.setAdultCount(adultCount);
        option.setChildCount(childCount);

        Integer productAdultPrice = product.getProductAdult() != null ? product.getProductAdult() : 0;
        Integer productChildPrice = product.getProductChild() != null ? product.getProductChild() : 0;
        int totalPrice = (adultCount * productAdultPrice) + (childCount * productChildPrice);
        option.setTotalPrice(totalPrice);
        optionRepo.save(option);

//        log.info("🟢 옵션 저장 완료: optionCode = {}", option.getOptionCode());
//        log.info("🟢 옵션 저장 완료 - optionCode: {}, totalPrice: {}", option.getOptionCode(), option.getTotalPrice());
        log.info("🟢 옵션 저장 완료 - optionCode: {}, adultCount: {}, childCount: {}, totalPrice: {}",
                option.getOptionCode(), option.getAdultCount(), option.getChildCount(), option.getTotalPrice());


        // 저장된 옵션 반환
        return option.getOptionCode();
    }

    public OptionDTO getOptionByCode(Long optionCode) {

        OptionEntity optionEntity = optionRepo.findById(optionCode)
                .orElseThrow(() -> new RuntimeException("해당 옵션을 찾을 수 없습니다."));

        ProductEntity productEntity = optionEntity.getProduct();
        if (productEntity == null) {
            throw new RuntimeException("옵션에 연결된 상품이 없습니다.");
        }
        OptionDTO optionDTO = new OptionDTO();
        optionDTO.setOptionCode(optionEntity.getOptionCode());
        optionDTO.setProductCode(productEntity.getProductCode());
        optionDTO.setProductTitle(productEntity.getProductTitle());
        optionDTO.setProductThumbnail(productEntity.getProductThumbnail());
        optionDTO.setReservationDate(optionEntity.getReservationDate());
        optionDTO.setAdultCount(optionEntity.getAdultCount());
        optionDTO.setChildCount(optionEntity.getChildCount());
//        optionDTO.setTotalPrice(optionEntity.getTotalPrice());

//        Integer productAdultPrice = productEntity.getProductAdult() != null ? productEntity.getProductAdult() : 0;
//        Integer productChildPrice = productEntity.getProductChild() != null ? productEntity.getProductChild() : 0;
//        int adultTotalPrice = optionEntity.getAdultCount() * productAdultPrice;
//        int childTotalPrice = optionEntity.getChildCount() * productChildPrice;
        int adultTotalPrice = optionEntity.getAdultCount() * productEntity.getProductAdult();
        int childTotalPrice = optionEntity.getChildCount() * productEntity.getProductChild();
        int totalPrice = adultTotalPrice + childTotalPrice;
        optionDTO.setTotalPrice(totalPrice);
        optionDTO.setProductAdult(adultTotalPrice);
        optionDTO.setProductChild(childTotalPrice);
        optionDTO.setProductMaxParticipants(productEntity.getProductMaxParticipants() != null ? productEntity.getProductMaxParticipants() : 0);

        log.info("🟢 OptionService - OptionDTO 생성: {}", optionDTO);
        return optionDTO;
    }
}