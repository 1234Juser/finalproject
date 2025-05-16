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
import org.springframework.util.StringUtils;

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
    private final JwtUtil jwtUtil;

    // 게시글 목록 조회 (누구나 가능, 공지사항 상단, 최신순)
    public Page<CompanionListDTO> getAllCompanions(String searchKeyword, String searchType, Pageable pageable) {
        // 정렬 조건: isNotice 내림차순 (true가 먼저), companionCreatedAt 내림차순 (최신글 먼저)
        Pageable newPageable = PageRequest.of(
                pageable.getPageNumber(),
                10, // 기본 페이지 크기 유지
                Sort.by(Sort.Order.desc("companionNotice"), Sort.Order.desc("companionCreatedAt")) // companionNotice로 필드명 수정
        );
        Page<CompanionEntity> companions;

        if (StringUtils.hasText(searchKeyword)) { // 검색어가 있는 경우
            if ("author".equalsIgnoreCase(searchType)) {
//                log.info("작성자 검색 : {}", searchKeyword);
                companions = companionRepository.findByMember_MemberNameContainingIgnoreCaseAndIsNoticeSorted(searchKeyword, newPageable);
            } else {
//                log.info("게시글 제목 검색: {}", searchKeyword);
                companions = companionRepository.findByCompanionTitleContainingAndIsNoticeSorted(searchKeyword, newPageable);
            }
        } else { // 검색어가 없는 경우
//            log.info("모든 게시판");
            companions = companionRepository.findAllSortedByNoticeAndDate(newPageable);
        }

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

        // CompanionDetailDTO 에도 isNotice 필드가 필요하다면 추가하고 여기서 매핑해야 합니다.
        // 현재는 CompanionListDTO에만 추가되어 있습니다. 필요시 CompanionDetailDTO도 수정하세요.
        return CompanionDetailDTO.fromEntity(companion, comments);
    }


    // 게시글 등록 (ROLE_ADMIN 또는 ROLE_USER 권한 필요)
    @Transactional
    public CompanionEntity createCompanion(String companionTitle, String companionContent, String token, Boolean isNoticeRequest) {
        if (token == null || token.isEmpty()) {
            log.warn(" - 토큰이 null이거나 비어있다!");
            throw new IllegalArgumentException("토큰이 null이거나 비어있다.");
        }

        Long memberCode = jwtUtil.getMemberCodeFromToken(token);
        List<String> roles = jwtUtil.getRolesFromToken(token); // 역할 정보 가져오기

        MemberEntity author = memberRepository.findByMemberCode(memberCode)
                .orElseThrow(() -> new IllegalArgumentException("작성자 정보를 찾을 수 없습니다. MemberCode: " + memberCode));

        if (companionTitle == null || companionTitle.trim().isEmpty()) {
            throw new IllegalArgumentException("게시글 제목이 비어있을 수 없습니다..");
        }
        if (companionContent == null || companionContent.trim().isEmpty()) {
            throw new IllegalArgumentException("게시글 내용이 비어있을 수 없습니다.");
        }

        boolean noticeFlag = false;
        if (isNoticeRequest != null && isNoticeRequest) {
            if (roles.contains("ROLE_ADMIN")) {
                noticeFlag = true;
                log.info("관리자 권한으로 공지사항으로 등록합니다.");
            } else {
                log.warn("관리자 권한이 없어 공지사항으로 등록할 수 없습니다. 일반 게시글로 등록됩니다.");
                // 관리자가 아닌 경우 isNoticeRequest 값을 무시하고 false로 처리하거나, 예외를 발생시킬 수 있습니다.
                // 여기서는 경고 로그만 남기고 false로 유지합니다.
            }
        }


        CompanionEntity newCompanion = CompanionEntity.builder()
                .member(author)
                .companionTitle(companionTitle)
                .companionContent(companionContent)
                .companionCreatedAt(LocalDateTime.now())
                .companionViewCount(0)
                .companionNotice(noticeFlag) // 공지사항 여부 설정
                .build();

        return companionRepository.save(newCompanion);
    }

    // 게시글 수정 (작성자 본인만 가능, 공지사항 변경은 관리자만)
    @Transactional
    public CompanionEntity updateCompanion(Integer companionId, String companionTitle, String companionContent, String token, Boolean isNoticeRequest) {
        Long memberCode = jwtUtil.getMemberCodeFromToken(token);
        List<String> roles = jwtUtil.getRolesFromToken(token); // 역할 정보 가져오기

        CompanionEntity companion = companionRepository.findById(companionId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글을 찾을 수 없습니다. ID: " + companionId));

        // 작성자 본인 또는 관리자만 수정 가능하도록 변경 (공지사항 변경은 관리자만)
        boolean isAdmin = roles.contains("ROLE_ADMIN");
        boolean isAuthor = companion.getMember().getMemberCode().equals(memberCode);

        if (!isAuthor && !isAdmin) { // 작성자도 아니고 관리자도 아니면 수정 불가
            throw new SecurityException("게시글 수정 권한이 없습니다. 게시글 ID: " + companionId);
        }

        if (companionTitle == null || companionTitle.trim().isEmpty()) {
            throw new IllegalArgumentException("게시글 제목이 비어있을 수 없습니다..");
        }
        if (companionContent == null || companionContent.trim().isEmpty()) {
            throw new IllegalArgumentException("게시글 내용이 비어있을 수 없습니다.");
        }

        companion.setCompanionTitle(companionTitle);
        companion.setCompanionContent(companionContent);
        companion.setCompanionModifiedAt(LocalDateTime.now());

        // 공지사항 여부 변경 로직
        if (isNoticeRequest != null) {
            if (isAdmin) { // 관리자만 공지사항 여부 변경 가능
                companion.setCompanionNotice(isNoticeRequest);
                log.info("관리자 권한으로 공지사항 여부를 {}로 변경합니다.", isNoticeRequest);
            } else if (companion.isCompanionNotice() != isNoticeRequest) {
                // 관리자가 아닌 사용자가 공지사항 상태를 변경하려고 할 때
                log.warn("관리자 권한이 없어 공지사항 여부를 변경할 수 없습니다. 현재 상태 유지됩니다.");
                // 여기서 예외를 발생시키거나, 요청을 무시하고 현재 상태를 유지할 수 있습니다.
                // 현재는 로그만 남기고 기존 상태를 유지합니다.
            }
        }


        return companionRepository.save(companion);
    }

    // 게시글 삭제 (작성자 본인 또는 ROLE_ADMIN만 가능)
    @Transactional
    public void deleteCompanion(Integer companionId, String token) {
        Long memberCode = jwtUtil.getMemberCodeFromToken(token);
        List<String> roles = jwtUtil.getRolesFromToken(token);

        CompanionEntity companion = companionRepository.findById(companionId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글을 찾을 수 없습니다. ID: " + companionId));

        boolean isAdmin = roles.contains("ROLE_ADMIN"); // getRolesFromToken 반환값에 따라 수정
        boolean isAuthor = companion.getMember().getMemberCode().equals(memberCode);

        if (!isAdmin && !isAuthor) {
            throw new SecurityException("게시글 삭제 권한이 없습니다. 게시글 ID: " + companionId);
        }

        companionRepository.delete(companion);
    }
}