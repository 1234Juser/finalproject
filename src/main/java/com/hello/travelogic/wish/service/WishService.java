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
    private final ProductRepo productRepo;
    private final MemberRepository memberRepo;

    // 위시 그룹 조회
    public List<WishGroupDTO> getGroups(long memberCode) {

        return wishGroupRepo.findByMember_MemberCode(memberCode)
                .stream()
                .map(WishGroupDTO::new)
                .collect(Collectors.toList());
    }

    // 특정 위시 그룹의 상품 조회
    public List<WishDTO> getItemsByGroupCode(long groupCode) {

        return wishRepo.findByGroup_GroupCode(groupCode)
                .stream()
                .map(WishDTO::new)
                .collect(Collectors.toList());
    }

    // 위시 그룹 삭제
    @Transactional
    public boolean deleteGroup(long groupCode) {

        Optional<WishGroupEntity> group = wishGroupRepo.findByGroupCode(groupCode); // 그룹을 찾음
        if (group.isPresent()) {
            WishGroupEntity groupE = group.get();

            // 그룹이 있으면 삭제
            wishGroupRepo.delete(groupE);
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

        return wishRepo.findByGroup_GroupCode(groupCode)
                .stream()
                .map(WishDTO::new)
                .collect(Collectors.toList());
    }

    // 찜 등록취소 동시버전
    // 상품 상세페이지에서 사용
    public boolean registerOrCancelWish(WishDTO dto) {

        long memberCode = dto.getMemberCode();
        long productCode = dto.getProductCode();

        MemberEntity member = memberRepo.findByMemberCode(memberCode)
                .orElseThrow(() -> new NoSuchElementException("회원 없음"));

        log.info("===== 찜 등록 시도 =====");
        log.info("memberCode: {}", dto.getMemberCode());
        log.info("productCode: {}", dto.getProductCode());

        ProductEntity product = productRepo.findByProductCode(productCode)
                .orElseThrow(() -> new NoSuchElementException("상품 없음"));

        log.info("상품 이름: {}", product.getProductTitle());

        CityEntity city = product.getCityId();
        if (city == null) {
            log.error("city 정보가 null입니다. productCode: {}", productCode);
            throw new IllegalStateException("상품에 연결된 도시 정보가 없습니다.");
        }
        String cityName = city.getCityName();
        log.info("도시 이름: {}", cityName);

        // 그룹 다시 조회 (자동 생성되었을 수도 있으니까)
        WishGroupEntity group = wishGroupRepo
                .findByGroupTitleAndMember_MemberCode(cityName, memberCode)
                .orElseGet(() -> {
                    // 없으면 자동 생성
                    WishGroupEntity newGroup = new WishGroupEntity(member, cityName);
                    return wishGroupRepo.save(newGroup);
                });

        // 이미 찜한 상품인지 확인
        Optional<WishEntity> existingWish = wishRepo.findByGroup_GroupCodeAndProduct_ProductCode(group.getGroupCode(), productCode);

        if (existingWish.isPresent()) {
            // 찜 취소
            wishRepo.delete(existingWish.get());
            return false;   // UNLIKED
        } else {
            WishEntity newWish = new WishEntity(dto, member, group, product);
            wishRepo.save(newWish);
            return true;
        }
    }

    // 위시 그룹 자동 생성
    @Transactional
    public void autoCreateWishGroups(long memberCode) {
        MemberEntity member = memberRepo.findByMemberCode(memberCode)
                .orElseThrow(() -> new NoSuchElementException("회원이 존재하지 않습니다."));

        // 해당 회원이 찜한 상품 목록 가져오기
        List<WishEntity> wishList = wishRepo.findByMember_MemberCode(memberCode);

        Set<String> cityNames = wishList.stream()
                .map(w -> w.getProduct().getCityId().getCityName())
                .collect(Collectors.toSet());

        for (String cityName : cityNames) {
            // 동일한 이름의 그룹이 이미 있는지 확인
            boolean exists = wishGroupRepo.existsByGroupTitleAndMember_MemberCode(cityName, memberCode);
            if (!exists) {
                WishGroupEntity newGroup = new WishGroupEntity(member, cityName);
                wishGroupRepo.save(newGroup);
            }
        }
    }

    @Transactional
    public void updateWishCounts() {
        wishGroupRepo.updateWishCountByQuery();
    }
}
