package com.hello.travelogic.companion.repository;

import com.hello.travelogic.companion.domain.CompanionEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanionRepository extends JpaRepository<CompanionEntity, Integer> {

    // 예: 작성자로 게시글 찾기, 제목으로 게시글 검색 등
    // 게시글 제목으로 부분 일치 검색 (페이징 처리)
    Page<CompanionEntity> findByCompanionTitleContaining(String title, Pageable pageable);

    // 작성자 이름(MemberEntity의 memberName 필드 기준)으로 부분 일치 검색 (페이징 처리, 대소문자 무시)
    Page<CompanionEntity> findByMember_MemberNameContainingIgnoreCase(String memberName, Pageable pageable);


}

