package com.hello.travelogic.order.service;

import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.member.repository.MemberRepository;
import com.hello.travelogic.order.domain.OptionEntity;
import com.hello.travelogic.order.dto.OptionDTO;
import com.hello.travelogic.order.repo.OptionRepo;
import com.hello.travelogic.order.repo.OrderRepo;
import com.hello.travelogic.product.domain.ProductEntity;
import com.hello.travelogic.product.repo.ProductRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

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
        optionDTO.setReservationDate(null);
//        optionDTO.setTotalPrice(0); // 초기 가격은 0으로 설정

        // 초기 가격은 이미 0으로 설정되어 있으므로 추가 설정 불필요
        log.info("🟢 OptionService - OptionDTO 생성: {}", optionDTO);
        return optionDTO;
    }

    @Transactional
    public void selectReservationDate(String productUid, String reservationDate) {
        ProductEntity product = productRepo.findByProductUid(productUid)
                .orElseThrow(() -> new IllegalArgumentException("해당 상품을 찾을 수 없습니다."));
        if (reservationDate == null || reservationDate.isBlank()) {
            throw new IllegalArgumentException("예약 날짜가 비어있습니다.");
        }

        OptionEntity option = new OptionEntity();
        option.setProduct(product);
//        option.setReservationDate(reservationDate != null ? LocalDate.parse(reservationDate) : null);
        if (reservationDate != null && !reservationDate.isBlank()) {
            option.setReservationDate(LocalDate.parse(reservationDate));
        } else {
            option.setReservationDate(null);  // 명시적으로 null 설정
        }
        option.setAdultCount(0); // 기본값 설정
        option.setChildCount(0);
        optionRepo.save(option);

        log.info("🟢 예약 날짜 저장 완료: productUid = {}, reservationDate = {}", productUid, reservationDate);
    }

    // 실제 예약 옵션 생성 : 회원만 접근 가능
    @Transactional
    public void saveReservation(String productUid, String reservationDate, Authentication authentication) {
        ProductEntity product = productRepo.findByProductUid(productUid)
                .orElseThrow(() -> new IllegalArgumentException("해당 상품을 찾을 수 없습니다."));

        Long memberCode = Long.parseLong(authentication.getName());
        MemberEntity member = memberRepository.findByMemberCode(memberCode)
                .orElseThrow(() -> new IllegalArgumentException("해당 회원을 찾을 수 없습니다."));

        LocalDate date = LocalDate.parse(reservationDate);

        // 한 사람이 한 날에 같은 상품의 옵션 여러개 생성하는거 방지
        // 예) '하이미 가이드와 함께하는 세비야 도보투어'가 25-05-14일자 진행되는 걸로 홍길동이 여러번 예약하는 행위
        boolean exists = orderRepo.existsByMemberAndProductAndOption_ReservationDate(member, product, date);
        if (exists) {
            throw new IllegalStateException("해당 날짜에 이미 동일 상품에 대한 예약이 존재합니다.");
        }

        OptionEntity option = new OptionEntity();
        option.setProduct(product);
//        option.setReservationDate(date);
        option.setReservationDate(reservationDate != null ? LocalDate.parse(reservationDate) : null);
        option.setAdultCount(0); // 기본값 설정
        option.setChildCount(0);
        optionRepo.save(option);
    }
}
