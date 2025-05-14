package com.hello.travelogic.member.repository;

import com.hello.travelogic.member.domain.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {
    boolean existsByMemberId(String memberId);
    boolean existsByMemberEmail(String memberEmail);
    //로그인
    Optional<MemberEntity> findByMemberId(String memberId);

    // 찜 등록/취소에 사용
    Optional<MemberEntity> findByMemberCode(Long memberCode);
    //아이디찾기
    Optional<MemberEntity> findByMemberNameAndMemberEmail(String memberName, String memberEmail);
    //비밀번호찾기
    Optional<MemberEntity> findByMemberNameAndMemberIdAndMemberEmail(String memberName, String memberId, String memberEmail);
    //소셜로그인(카카오)
    Optional<MemberEntity> findBySocialTypeAndSocialAccountId(String socialType,  Long socialAccountId);
    //소셜로그인(구글)
    Optional<MemberEntity> findByMemberEmail(String email);
    // 채팅창 프로필 사진
    Optional<MemberEntity> findByMemberName(String memberName);


}
