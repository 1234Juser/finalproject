package com.hello.travelogic.companion.service;

import com.hello.travelogic.companion.domain.CompanionCommentEntity;
import com.hello.travelogic.companion.domain.CompanionEntity;
import com.hello.travelogic.companion.dto.CompanionCommentDTO;
import com.hello.travelogic.companion.repository.CompanionCommentRepository;
import com.hello.travelogic.companion.repository.CompanionRepository;
import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.member.repository.MemberRepository;
import com.hello.travelogic.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class CompanionCommentService {

    private final CompanionCommentRepository companionCommentRepository;
    private final CompanionRepository companionRepository;
    private final MemberRepository memberRepository;
    private final JwtUtil jwtUtil;

    // 특정 게시글의 댓글 목록 조회 (만약 CompanionController에서 댓글 목록을 함께 가져오지 않는다면 이 함수를 사용)
//    @Transactional(readOnly = true)
//    public List<CompanionCommentDTO> getCommentsByCompanionId(Integer companionId) {
//        return companionCommentRepository.findByCompanion_CompanionId(companionId)
//                .stream()
//                .map(CompanionCommentDTO::fromEntity)
//                .collect(Collectors.toList());
//    }

    //댓글 등록(로그인한 사용자)
    public CompanionCommentDTO createComment(Integer companionId, String content, String token) {
        if (token == null || token.isEmpty()) {
            throw new IllegalArgumentException("토큰이 유효하지 않습니다.");
        }

        Long memberCode = jwtUtil.getMemberCodeFromToken(token);
        MemberEntity author = memberRepository.findByMemberCode(memberCode)
                .orElseThrow(() -> new IllegalArgumentException("작성자 정보를 찾을 수 없습니다."));

        CompanionEntity companion = companionRepository.findById(companionId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글을 찾을 수 없습니다."));
        // 전달받은 content 값을 로깅하여 확인
        log.info("댓글을 위한 내용: '{}'", content);


        if (content == null || content.trim().isEmpty()) {
            throw new IllegalArgumentException("댓글 내용은 비어 있을 수 없습니다.");
        }

        CompanionCommentEntity comment = CompanionCommentEntity.builder()
                .member(author)
                .companion(companion)
                .companionCommentContent(content)
                .companionCommentCreatedAt(LocalDateTime.now())
                .build();

        CompanionCommentEntity savedComment = companionCommentRepository.save(comment);
        return CompanionCommentDTO.fromEntity(savedComment);
    }


    // 댓글 수정 (작성자 본인)
    public CompanionCommentDTO updateComment(Integer companionId, Integer commentId, String content, String token) {
        if (token == null || token.isEmpty()) {
            throw new IllegalArgumentException("토큰이 유효하지 않습니다.");
        }

        Long memberCode = jwtUtil.getMemberCodeFromToken(token);
        MemberEntity author = memberRepository.findByMemberCode(memberCode) // 작성자 정보가 필요하다면 가져옴
                .orElseThrow(() -> new IllegalArgumentException("작성자 정보를 찾을 수 없습니다."));


        CompanionCommentEntity comment = companionCommentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("해당 댓글을 찾을 수 없습니다."));

        // 해당 댓글이 요청된 게시글에 속하는지 확인 (선택 사항이지만 데이터 무결성 위해 권장)
        if (!comment.getCompanion().getCompanionId().equals(companionId)) {
            throw new IllegalArgumentException("해당 댓글은 이 게시글에 속하지 않습니다.");
        }

        // 작성자 본인 확인
        if (!comment.getMember().getMemberCode().equals(memberCode)) {
            throw new SecurityException("댓글 수정 권한이 없습니다.");
        }

        if (content == null || content.trim().isEmpty()) {
            throw new IllegalArgumentException("댓글 내용은 비어 있을 수 없습니다.");
        }

        comment.setCompanionCommentContent(content);
        // 댓글 수정 시간 필드 업데이트
        comment.setCompanionCommentModifiedAt(LocalDateTime.now());

        CompanionCommentEntity updatedComment = companionCommentRepository.save(comment);
        return CompanionCommentDTO.fromEntity(updatedComment);
    }


    // 댓글 삭제 (작성자 본인 또는 관리자)
    public void deleteComment(Integer companionId, Integer commentId, String token) {
        if (token == null || token.isEmpty()) {
            throw new IllegalArgumentException("토큰이 유효하지 않습니다.");
        }

        Long memberCode = jwtUtil.getMemberCodeFromToken(token);
        List<String> roles = jwtUtil.getRolesFromToken(token);

        CompanionCommentEntity comment = companionCommentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("해당 댓글을 찾을 수 없습니다."));

        // 해당 댓글이 요청된 게시글에 속하는지 확인 (선택 사항이지만 데이터 무결성 위해 권장)
        if (!comment.getCompanion().getCompanionId().equals(companionId)) {
            throw new IllegalArgumentException("해당 댓글은 이 게시글에 속하지 않습니다.");
        }

        boolean isAdmin = roles.contains("ROLE_ADMIN"); // 역할 목록에 'ROLE_ADMIN'이 있는지 확인
        boolean isAuthor = comment.getMember().getMemberCode().equals(memberCode);

        if (!isAdmin && !isAuthor) {
            throw new SecurityException("댓글 삭제 권한이 없습니다.");
        }

        companionCommentRepository.delete(comment);
    }

    // CompanionDetailDTO에 comments 필드를 추가했으므로, CompanionService의 getCompanionById에서도 댓글 목록을 함께 가져오도록 수정해야 합니다.
    // 이미 제공된 CompanionService.java 코드에서는 이 부분이 구현되어 있습니다.

}