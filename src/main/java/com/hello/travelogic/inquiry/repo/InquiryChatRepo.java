package com.hello.travelogic.inquiry.repo;

import com.hello.travelogic.inquiry.domain.InquiryChatEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InquiryChatRepo extends JpaRepository<InquiryChatEntity, Long> {

    // 기존 쿼리 메소드명 너무 길어서 아래 @Query 어노테이션 사용
//    List<InquiryChatEntity> findByMemberRole_Id_MemberCodeAndMemberRole_Id_AuthorityCode(Long memberCode, Integer authorityCode);

    // 특정 멤버의 채팅 목록 조회 (JPQL 쿼리 사용)
    @Query("SELECT ic FROM InquiryChatEntity ic WHERE ic.memberRole.id.memberCode = :memberCode AND ic.memberRole.id.authorityCode = :authorityCode")
    List<InquiryChatEntity> findChatsByMember(@Param("memberCode") Long memberCode, @Param("authorityCode") Integer authorityCode);


}
