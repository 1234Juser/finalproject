package com.hello.travelogic.companion.service;

import com.hello.travelogic.companion.domain.CompanionCommentEntity;
import com.hello.travelogic.companion.domain.CompanionEntity;
import com.hello.travelogic.companion.domain.LikeEntity;
import com.hello.travelogic.companion.dto.CompanionCommentDTO;
import com.hello.travelogic.companion.dto.CompanionListDTO;
import com.hello.travelogic.companion.repository.CompanionCommentRepository;
import com.hello.travelogic.companion.repository.CompanionRepository;
import com.hello.travelogic.companion.repository.LikeRepository;
import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.member.repository.MemberRepository;
import com.hello.travelogic.member.service.MemberService;
import com.hello.travelogic.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class LikeService {

    private final LikeRepository likeRepository;
    private final MemberRepository memberRepository;
    private final CompanionRepository companionRepository;
    private final CompanionCommentRepository companionCommentRepository;
    private final JwtUtil jwtUtil;

    //게시물 좋아요 추가/취소
    public boolean toggleCompanionLike(Integer companionId, String token) {
        Long memberCode = jwtUtil.getMemberCodeFromToken(token);
        MemberEntity member = memberRepository.findByMemberCode(memberCode)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보를 찾을 수 없습니다."));

        CompanionEntity companion = companionRepository.findById(companionId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글을 찾을 수 없습니다."));

        Optional<LikeEntity> existingLike = likeRepository.findByMember_MemberCodeAndCompanion_CompanionId(memberCode, companionId);

        if(existingLike.isPresent()){
            //이미 좋아요를 눌렀으면 취소
            likeRepository.delete(existingLike.get());
            return false; //좋아요 취소됨
        }else{
            //좋아요를 누르지 않았으면 추가
            LikeEntity newLike = LikeEntity.createCompanionLike(member, companion);
            likeRepository.save(newLike);
            return true; //좋아요 추가됨
        }
    }

    // 댓글 좋아요 추가/취소
    public boolean toggleCommentLike(Integer commentId, String token) {
        Long memberCode = jwtUtil.getMemberCodeFromToken(token);
        MemberEntity member = memberRepository.findByMemberCode(memberCode)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보를 찾을 수 없습니다."));

        CompanionCommentEntity comment = companionCommentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("해당 댓글을 찾을 수 없습니다."));

        Optional<LikeEntity> existingLike = likeRepository.findByMember_MemberCodeAndCompanionComment_CompanionCommentId(memberCode, commentId);

        if (existingLike.isPresent()) {
            // 이미 좋아요를 눌렀으면 취소
            likeRepository.delete(existingLike.get());
            return false; // 좋아요 취소됨
        } else {
            // 좋아요를 누르지 않았으면 추가
            LikeEntity newLike = LikeEntity.createCommentLike(member, comment);
            likeRepository.save(newLike);
            return true; // 좋아요 추가됨
        }
    }

    // 특정 게시물의 좋아요 수 조회
    @Transactional(readOnly = true)
    public int getCompanionLikeCount(Integer companionId) {
        return likeRepository.countByCompanion_CompanionId(companionId);
    }

    // 특정 댓글의 좋아요 수 조회
    @Transactional(readOnly = true)
    public int getCommentLikeCount(Integer commentId) {
        return likeRepository.countByCompanionComment_CompanionCommentId(commentId);
    }

    // 특정 사용자가 특정 게시물에 좋아요를 눌렀는지 확인
    @Transactional(readOnly = true)
    public boolean isCompanionLikedByUser(Integer companionId, String token) {
        Long memberCode = jwtUtil.getMemberCodeFromToken(token);
        return likeRepository.findByMember_MemberCodeAndCompanion_CompanionId(memberCode, companionId).isPresent();
    }

    // 특정 사용자가 특정 댓글에 좋아요를 눌렀는지 확인
    @Transactional(readOnly = true)
    public boolean isCommentLikedByUser(Integer commentId, String token) {
        Long memberCode = jwtUtil.getMemberCodeFromToken(token);
        return likeRepository.findByMember_MemberCodeAndCompanionComment_CompanionCommentId(memberCode, commentId).isPresent();
    }

    @Transactional(readOnly = true)
    public Page<CompanionListDTO> getLikedCompanions(String token, Pageable pageable) {
        Long memberCode = jwtUtil.getMemberCodeFromToken(token);
        // 좋아요 엔티티의 createdAt 필드를 기준으로 내림차순 정렬을 Pageable에 추가
        Pageable sortedPageable = org.springframework.data.domain.PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                Sort.by(Sort.Direction.DESC, "createdAt")
        );
        Page<LikeEntity> likedCompanionsPage = likeRepository.findByMember_MemberCodeAndCompanionIsNotNull(memberCode, sortedPageable);
        // LikeEntity에서 CompanionEntity를 추출하고 CompanionListDTO로 변환합니다.
        return likedCompanionsPage.map(like -> CompanionListDTO.fromEntity(like.getCompanion()));
    }

    // 사용자가 좋아요한 댓글 목록을 페이징하여 가져오기 (최신순 정렬 추가)
    @Transactional(readOnly = true)
    public Page<CompanionCommentDTO> getLikedComments(String token, Pageable pageable) {
        Long memberCode = jwtUtil.getMemberCodeFromToken(token);
        // 좋아요 엔티티의 createdAt 필드를 기준으로 내림차순 정렬을 Pageable에 추가
        Pageable sortedPageable = org.springframework.data.domain.PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                Sort.by(Sort.Direction.DESC, "createdAt")
        );
        Page<LikeEntity> likedCommentsPage = likeRepository.findByMember_MemberCodeAndCompanionCommentIsNotNull(memberCode, sortedPageable);
        // LikeEntity에서 CompanionCommentEntity를 추출하고 CompanionCommentDTO로 변환합니다.
        return likedCommentsPage.map(like -> CompanionCommentDTO.fromEntity(like.getCompanionComment()));
    }


}
