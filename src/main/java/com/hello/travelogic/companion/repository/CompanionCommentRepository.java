package com.hello.travelogic.companion.repository;

import com.hello.travelogic.companion.domain.CompanionCommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompanionCommentRepository extends JpaRepository<CompanionCommentEntity, Integer> {
    // 특정 게시글의 댓글 목록을 가져오는 메서드
    List<CompanionCommentEntity> findByCompanion_CompanionId(Integer companionId);
}

