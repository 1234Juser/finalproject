package com.hello.travelogic.wish.service;

import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.member.repository.MemberRepository;
import com.hello.travelogic.product.domain.CityEntity;
import com.hello.travelogic.product.domain.ProductEntity;
import com.hello.travelogic.product.repo.ProductRepo;
import com.hello.travelogic.wish.domain.WishEntity;
import com.hello.travelogic.wish.domain.WishGroupEntity;
import com.hello.travelogic.wish.dto.WishDTO;
import com.hello.travelogic.wish.dto.WishGroupDTO;
import com.hello.travelogic.wish.repo.WishGroupRepo;
import com.hello.travelogic.wish.repo.WishRepo;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class WishService {

    private final WishRepo wishRepo;
    private final WishGroupRepo wishGroupRepo;
//    private final CityRepo cityRepo;
    private final ProductRepo productRepo;
    private final MemberRepository memberRepo;

    // 위시 그룹 조회
    public List<WishGroupDTO> getGroups(long memberCode) {
//        List<WishGroupEntity> entity = wishGroupRepo.findAllByMemberCode(memberCode);

        return wishGroupRepo.findByMember_MemberCode(memberCode)
                .stream()
                .map(WishGroupDTO::new)
                .collect(Collectors.toList());
    }

    // 특정 위시 그룹의 상품 조회
    public List<WishDTO> getItemsByGroupCode(long groupCode) {

//        List<WishEntity> listE = wishRepo.findAllByGroupCode(groupCode);

//        System.out.println("groupCode: " + groupCode + ", 찾은 찜 수: " + listE.size());

        return wishRepo.findByGroup_GroupCode(groupCode)
                .stream()
                .map(WishDTO::new)
                .collect(Collectors.toList());
    }

    // 위시 그룹 삭제
    @Transactional
    public boolean deleteGroup(long groupCode
//            , long memberCode
    ) {

        Optional<WishGroupEntity> group = wishGroupRepo.findByGroupCode(groupCode); // 그룹을 찾음
//        Optional<WishGroupEntity> groupOpt = wishGroupRepo.findByGroupCodeAndMember_MemberCode(groupCode, memberCode);
        if (group.isPresent()) {
            WishGroupEntity groupE = group.get();

            // 해당 그룹이 진짜 이 회원의 것인지 확인
//            if (groupE.getMember().getMemberCode() != memberCode) {
//                return false;
//            }
            // 그룹이 있으면 삭제
            wishGroupRepo.delete(groupE);
            // CascadeType.ALL + orphanRemoval 설정 덕분에
            // 관련 찜(WishEntity)들도 자동 삭제됨
//            wishGroupRepo.delete(group.get());
            return true;
        }
        // 그룹 찾지 못하여 실패
        return false;
    }

    // 위시 상품 삭제
    // 찜 그룹 내 위시리스트에서 사용
    @Transactional
    public List<WishDTO> cancelWish(Long wishCode) {

        WishEntity entity = wishRepo.findByWishCode(wishCode)
                .orElseThrow(() -> new NoSuchElementException("해당 찜이 존재하지 않습니다."));

        long groupCode = entity.getGroup().getGroupCode();
        wishRepo.delete(entity);
//        if(entity != null) {
//            wishRepo.delete(entity);
        // wishCode가 DB에 없는 경우를 위한 코드 교체
//        Optional<WishEntity> optional = wishRepo.findByWishCode(wishCode);
//        if(optional.isPresent()) {
//            wishRepo.delete(optional.get());
            // wishCode 삭제 성공 시 1 반환
//            return 1;
//        }
        // 삭제 실패시 0 반환
//        return 0;
        return wishRepo.findByGroup_GroupCode(groupCode)
                .stream()
                       .map(WishDTO::new)
                       .collect(Collectors.toList());
    }

    // 찜 등록취소 동시버전
    // 상품 상세페이지에서 사용
    public boolean registerOrCancelWish(WishDTO dto) {

//        long groupCode = dto.getGroupCode();
        long memberCode = dto.getMemberCode();
        long productCode = dto.getProductCode();

;

//        if (existingWish.isPresent()) {
////        if (existingWish != null) {
//            // 찜 취소
//            wishRepo.delete(existingWish.get());
//            return false;   // UNLIKED
//        } else {
            // 찜 등록
            // dto를 entity로 변환
//            WishEntity newWish = new WishEntity(dto);
//            MemberEntity member = memberRepo.findByMemberCode(dto.getMemberCode())
            MemberEntity member = memberRepo.findByMemberCode(memberCode)
                    .orElseThrow(() -> new NoSuchElementException("회원 없음"));

            log.info("===== 찜 등록 시도 =====");
            log.info("memberCode: {}", dto.getMemberCode());
            log.info("productCode: {}", dto.getProductCode());

            ProductEntity product = productRepo.findByProductCode(productCode)
                    .orElseThrow(() -> new NoSuchElementException("상품 없음"));

            log.info("상품 이름: {}", product.getProductTitle());

//            String cityName = product.getCityCode().getCityName();
            CityEntity city = product.getCityCode();
//            if (product.getCityCode() == null) {
            if (city == null) {
                log.error("🚨 city 정보가 null입니다. productCode: {}", productCode);
                throw new IllegalStateException("상품에 연결된 도시 정보가 없습니다.");
            }
            String cityName = city.getCityName();
            log.info("도시 이름: {}", cityName);

//            // 자동 그룹 생성: 같은 도시명 그룹이 없다면 생성
//            if (!wishGroupRepo.existsByGroupTitleAndMember_MemberCode(cityName, member.getMemberCode())) {
//                log.info("→ 찜 그룹 없음, 자동 생성합니다.");
////                WishGroupEntity autoGroup = new WishGroupEntity(member, cityName);
////                wishGroupRepo.save(autoGroup);
//                wishGroupRepo.save(new WishGroupEntity(member, cityName));
//            } else {
//                log.info("→ 이미 찜 그룹 있음");
//            }

            // 그룹 다시 조회 (자동 생성되었을 수도 있으니까)
            WishGroupEntity group = wishGroupRepo
//                    .findByGroupCode(groupCode)
//                    .findByGroupTitleAndMember_MemberCode(cityName, member.getMemberCode())
//                    .orElseThrow(() -> new NoSuchElementException("찜 그룹 없음"));
                    .findByGroupTitleAndMember_MemberCode(cityName, memberCode)
                    .orElseGet(() -> {
                        // 없으면 자동 생성
                        WishGroupEntity newGroup = new WishGroupEntity(member, cityName);
                        return wishGroupRepo.save(newGroup);
                    });

            // 이미 찜한 상품인지 확인
//        WishEntity existingWish = wishRepo.findByGroupCodeAndProductCode(dto.getGroupCode(), dto.getProductCode());
//            Optional<WishEntity> existingWish = wishRepo.findByGroup_GroupCodeAndProduct_ProductCode(groupCode, productCode);
        Optional<WishEntity> existingWish = wishRepo.findByGroup_GroupCodeAndProduct_ProductCode(group.getGroupCode(), productCode);

        if (existingWish.isPresent()) {
//        if (existingWish != null) {
            // 찜 취소
            wishRepo.delete(existingWish.get());
            return false;   // UNLIKED
        } else {
            WishEntity newWish = new WishEntity(dto, member, group, product);
            wishRepo.save(newWish);
            return true;
        }
    }

//    public List<WishDTO> cancelWishAndReturnList(long wishCode) {
//
//        // 하나의 찜 항목
//        WishEntity entity = wishRepo.findByWishCode(wishCode);
//
//        if (entity != null) {
//            // 그룹코드란? 위시엔티티에서 가져온 그룹코드다.
//            // 예를들어, 에펠탑여행사라는 셀러가 판매하는 파리 디즈니랜드 티켓 상품을 찜 좋아요 눌러뒀더라면
//            // 그룹코드는 파리의 숫자일 것이다.
//            // wishEntity에는 다음과 같이 저장되어 있다.(찜코드1, 멤버코드1, 그룹코드3, 상품코드43)
//            // 찜코드 1번을 삭제하고도 3번그룹을 조회해야하니까 그룹코드를 먼저 꺼내는 것이다.
//            long groupCode = entity.getGroupCode();
//            wishRepo.delete(entity);
//
//            // 선택 위시 삭제 후 해당 그룹 목록 재조회
//            List<WishEntity> listE = wishRepo.findAllByGroupCode(groupCode);
//
//            // DTO 변환 후 반환
//            return listE
//                    .stream()
//                    .map(m -> new WishDTO(m))
//                    .toList();
//        }
//        log.warn("wishCode {}에 해당하는 위시가 없습니다.", wishCode);
//        return new ArrayList<>();
//    }

    // 위시 그룹 생성
//    public int createGroup(WishGroupDTO dto) {
//        // 이미 동일한 그룹명이 존재하는지 확인
//        boolean exists = wishGroupRepo.existsByGroupTitleAndMemberCode(dto.getGroupTitle(), dto.getMemberCode());
//        if (exists) {
//            return 0; // 중복됨
//        }
//        wishGroupRepo.save(new WishGroupEntity(dto));
//        return 1;
//    }



//    // 위시 등록
//    public String registerWish(WishDTO dto) {
//
//boolean exists = wishRepo.existsByMemberAndProductCode(dto.getMemberCode(), dto.getProductCode());
//    if (exists) {
//        return "이미 찜한 상품입니다.";
//    }
//
//        WishEntity existing = wishRepo.findByGroupCodeAndProductCode(dto.getGroupCode(), dto.getProductCode());
//
//        if (existing != null) {
//            wishRepo.delete(existing);
//            return "좋아요가 취소되었습니다.";
//        } else {
//            wishRepo.save(new WishEntity(dto));
//            return "좋아요 누르셨습니다.";
//        }
//    }



    // 위시 그룹 자동 생성
    @Transactional
    public void autoCreateWishGroups(long memberCode) {
        MemberEntity member = memberRepo.findByMemberCode(memberCode)
                .orElseThrow(() -> new NoSuchElementException("회원이 존재하지 않습니다."));

        // 해당 회원이 찜한 상품 목록 가져오기
        List<WishEntity> wishList = wishRepo.findByMember_MemberCode(memberCode);

        Set<String> cityNames = wishList.stream()
                .map(w -> w.getProduct().getCityCode().getCityName())
                .collect(Collectors.toSet());

        for (String cityName : cityNames) {
            // 동일한 이름의 그룹이 이미 있는지 확인
            boolean exists = wishGroupRepo.existsByGroupTitleAndMember_MemberCode(cityName, memberCode);
            if (!exists) {
                WishGroupEntity newGroup = new WishGroupEntity(member, cityName);
                wishGroupRepo.save(newGroup);
            }
        }

//        List<Product> products = productRepository.findByMemberCode(memberCode);
//
//        for (Product product : products) {
//            City city = cityRepository.findByCityCode(product.getCityCode());
//            String cityName = city.getCityName();
//
//            // 위시 그룹이 존재하지 않으면 생성
//            Optional<WishGroup> existingGroup = wishGroupRepository.findByGroupNameAndMemberCode(cityName, memberCode);
//            if (!existingGroup.isPresent()) {
//                WishGroup newGroup = new WishGroup();
//                newGroup.setGroupName(cityName);
//                newGroup.setMemberCode(memberCode);
//                wishGroupRepository.save(newGroup);
//            }
//        }
    }

    @Transactional
    public void updateWishCounts() {
        wishGroupRepo.updateWishCountByQuery();
    }
}
