package com.hello.travelogic.wish.repo;

import com.hello.travelogic.wish.domain.WishEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface WishRepo extends JpaRepository<WishEntity, Long> {

    // 특정 찜그룹 안의 찜상품들 조회
    List<WishEntity> findByGroup_GroupCode(long groupCode);

    // 위시상품 삭제하려고 위시코드 찾기
    Optional<WishEntity> findByWishCode(Long wishCode);

    // 이미 찜한 상품인지 확인
    // groupCode 내부의 productCode로 찾기
    Optional<WishEntity> findByGroup_GroupCodeAndProduct_ProductCode(long groupCode, long productCode);

    // 선택 회원이 찜한 상품 목록 가져오기(상품의 FK값 city_code에서 city_name 확인 목적)
    List<WishEntity> findByMember_MemberCode(long memberCode);

//    WishEntity findByGroup_GroupCode(long groupCode);
//
//    List<WishEntity> findAllByGroupCode(long groupCode);
//
//    WishEntity findByGroupCodeAndProductCode(long groupCode, long productCode);
}
