package com.hello.travelogic.companion.repository;

import com.hello.travelogic.companion.domain.CompanionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanionRepository extends JpaRepository<CompanionEntity, Integer> {
    // 필요에 따라 추가적인 쿼리 메서드를 정의할 수 있습니다.
    // 예: 작성자로 게시글 찾기, 제목으로 게시글 검색 등
}

