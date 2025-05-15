package com.hello.travelogic.inquiry.repo;

import com.hello.travelogic.inquiry.domain.InquiryChatEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InquiryChatRepo extends JpaRepository<InquiryChatEntity, Long> {

    List<InquiryChatEntity> findByMemberRole_Id_MemberCodeAndMemberRole_Id_AuthorityCode(Long memberCode, Integer authorityCode);
}
