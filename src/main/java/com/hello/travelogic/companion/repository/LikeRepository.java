package com.hello.travelogic.companion.repository;

import com.hello.travelogic.companion.domain.LikeEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<LikeEntity, Integer> {

    // 특정 사용자가 특정 게시물에 좋아요를 눌렀는지 확인
    Optional<LikeEntity> findByMember_MemberCodeAndCompanion_CompanionId(Long memberCode, Integer companionId);

    // 특정 사용자가 특정 댓글에 좋아요를 눌렀는지 확인
    Optional<LikeEntity> findByMember_MemberCodeAndCompanionComment_CompanionCommentId(Long memberCode, Integer companionCommentId);

    // 특정 게시물의 좋아요 수 계산
    int countByCompanion_CompanionId(Integer companionId);

    // 특정 댓글의 좋아요 수 계산
    int countByCompanionComment_CompanionCommentId(Integer companionCommentId);

    // 사용자가 좋아요한 게시글 목록을 페이징하여 가져오는 메서드
    Page<LikeEntity> findByMember_MemberCodeAndCompanionIsNotNull(Long memberCode, Pageable pageable);

    // 사용자가 좋아요한 댓글 목록을 페이징하여 가져오는 메서드
    Page<LikeEntity> findByMember_MemberCodeAndCompanionCommentIsNotNull(Long memberCode, Pageable pageable);


}
