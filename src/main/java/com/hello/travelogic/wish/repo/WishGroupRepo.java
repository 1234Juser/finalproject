package com.hello.travelogic.wish.repo;

import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.wish.domain.WishEntity;
import com.hello.travelogic.wish.domain.WishGroupEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface WishGroupRepo extends JpaRepository<WishGroupEntity, Long> {

    // 한 회원의 모든 찜그룹 찾기
    List<WishGroupEntity> findByMember_MemberCode(long memberCode);

    //    WishGroupEntity findByMemberCodeAndGroupTitle(Long memberCode, String groupTitle);
    Optional<WishGroupEntity> findByMemberAndGroupTitle(MemberEntity member, String groupTitle);

    // 그룹 삭제하려고 그룹코드 찾기
    Optional<WishGroupEntity> findByGroupCode(long groupCode);
    // 둘중하나
//    Optional<WishGroupEntity> findByGroupCodeAndMember_MemberCode(long groupCode, long memberCode);

//    @Query("SELECT wg FROM WishGroupEntity wg WHERE wg.memberEntity.memberCode = :memberCode")
//    List<WishGroupEntity> findAllByMemberCode(@Param("memberCode") long memberCode);

    boolean existsByGroupCode(long groupCode);
    // 특정 회원이 동일한 이름의 찜 그룹을 이미 가지고 있는지 확인
    boolean existsByGroupTitleAndMember_MemberCode(String groupTitle, long memberCode);

    @Modifying
    @Query(value = """
    UPDATE tbl_wish_group wg
    SET wish_count = (
        SELECT COUNT(*) FROM tbl_wish w
        WHERE w.group_code = wg.group_code
    )
    """, nativeQuery = true)
    void updateWishCountByQuery();

    // 그룹코드 없이 찜 여부 확인
    Optional<WishGroupEntity> findByGroupTitleAndMember_MemberCode(String cityName, Long memberCode);
}
