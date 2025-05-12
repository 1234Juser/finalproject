package com.hello.travelogic.companion.service;

import com.hello.travelogic.companion.domain.CompanionEntity;
import com.hello.travelogic.companion.dto.CompanionCommentDTO;
import com.hello.travelogic.companion.dto.CompanionDetailDTO;
import com.hello.travelogic.companion.dto.CompanionListDTO;
import com.hello.travelogic.companion.repository.CompanionCommentRepository;
import com.hello.travelogic.companion.repository.CompanionRepository;
import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.member.repository.MemberRepository;
import com.hello.travelogic.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class CompanionService {

    private final CompanionRepository companionRepository;
    private final CompanionCommentRepository companionCommentRepository;
    private final MemberRepository memberRepository;
    private final JwtUtil jwtUtil; // JwtUtil 주입

    // 게시글 목록 조회 (누구나 가능)
    public Page<CompanionListDTO> getAllCompanions(Pageable pageable) {
        // 기본 페이지 크기를 10으로 설정하고, 최신순으로 정렬
        Pageable newPageable = PageRequest.of(pageable.getPageNumber(), 10, Sort.by(Sort.Direction.DESC, "companionCreatedAt"));
        Page<CompanionEntity> companions = companionRepository.findAll(newPageable);
        return companions.map(CompanionListDTO::fromEntity);
    }

    // 게시글 상세 조회 (누구나 가능, 조회수 증가 포함)
    @Transactional
    public CompanionDetailDTO getCompanionById(Integer companionId) {
        CompanionEntity companion = companionRepository.findById(companionId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글을 찾을 수 없습니다. ID: " + companionId));

        companion.setCompanionViewCount(companion.getCompanionViewCount() + 1);

        List<CompanionCommentDTO> comments = companionCommentRepository.findByCompanion_CompanionId(companionId)
                .stream()
                .map(CompanionCommentDTO::fromEntity)
                .collect(Collectors.toList());

        return CompanionDetailDTO.fromEntity(companion, comments);
    }


    // 게시글 등록 (ROLE_ADMIN 또는 ROLE_USER 권한 필요)
    @Transactional
    public CompanionEntity createCompanion(String companionTitle, String companionContent, String token) {
        if (token == null || token.isEmpty()) {
            log.warn(" - 토큰이 null이거나 비어있다!");
            throw new IllegalArgumentException("토큰이 null이거나 비어있다.");
        }

        Long memberCode = jwtUtil.getMemberCodeFromToken(token);

        MemberEntity author = memberRepository.findByMemberCode(memberCode)
                .orElseThrow(() -> {
                    return new IllegalArgumentException("작성자 정보를 찾을 수 없습니다. MemberCode: " + memberCode);
                });

        // companionTitle과 companionContent에 대한 null 또는 빈 문자열 체크 추가
        if (companionTitle == null || companionTitle.trim().isEmpty()) {
            throw new IllegalArgumentException("Companion title cannot be null or empty.");
        }
        if (companionContent == null || companionContent.trim().isEmpty()) {
            throw new IllegalArgumentException("Companion content cannot be null or empty.");
        }

        CompanionEntity newCompanion = CompanionEntity.builder()
                .member(author)
                .companionTitle(companionTitle)
                .companionContent(companionContent)
                .companionCreatedAt(LocalDateTime.now())
                .companionViewCount(0)
                .build();

        CompanionEntity savedCompanion = companionRepository.save(newCompanion);
        return savedCompanion;
    }

    // 게시글 수정 (작성자 본인만 가능)
    @Transactional
    public CompanionEntity updateCompanion(Integer companionId, String companionTitle, String companionContent, String token) {
        Long memberCode = jwtUtil.getMemberCodeFromToken(token);
        CompanionEntity companion = companionRepository.findById(companionId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글을 찾을 수 없습니다. ID: " + companionId));

        if (!companion.getMember().getMemberCode().equals(memberCode)) {
            throw new SecurityException("게시글 수정 권한이 없습니다. 게시글 ID: " + companionId);
        }

        companion.setCompanionTitle(companionTitle);
        companion.setCompanionContent(companionContent);
        companion.setCompanionModifiedAt(LocalDateTime.now()); // 수정 시간 업데이트

        return companionRepository.save(companion);
    }
    // 게시글 삭제 (작성자 본인 또는 ROLE_ADMIN만 가능)
    @Transactional
    public void deleteCompanion(Integer companionId, String token) {
        Long memberCode = jwtUtil.getMemberCodeFromToken(token);
        List<String> roles = jwtUtil.getRolesFromToken(token);

        CompanionEntity companion = companionRepository.findById(companionId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글을 찾을 수 없습니다. ID: " + companionId));

        boolean isAdmin = roles.stream().anyMatch(role -> role.equals("ROLE_ADMIN"));
        boolean isAuthor = companion.getMember().getMemberCode().equals(memberCode);

        if (!isAdmin && !isAuthor) {
            throw new SecurityException("게시글 삭제 권한이 없습니다. 게시글 ID: " + companionId);
        }

        companionRepository.delete(companion);
    }
}