package com.hello.travelogic.companion.service;

import com.hello.travelogic.companion.domain.CompanionEntity;
import com.hello.travelogic.companion.dto.CompanionCommentDTO;
import com.hello.travelogic.companion.dto.CompanionDetailDTO;
import com.hello.travelogic.companion.dto.CompanionListDTO;
import com.hello.travelogic.companion.repository.CompanionCommentRepository;
import com.hello.travelogic.companion.repository.CompanionRepository;
import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.member.repository.MemberRepository;
import com.hello.travelogic.utils.FileUtil;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
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
    private final FileUtil fileUtil; // FileUtil 주입

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
    public CompanionEntity createCompanion(String companionTitle, String companionContent, String token, Boolean isNoticeRequest, List<MultipartFile> images) {
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
        //이미지로직
        List<String> imageUrls = null;
        if (images != null && !images.isEmpty()) {
            try {
                imageUrls = fileUtil.saveFiles(images);
            } catch (IOException e) {
                log.error("이미지 파일 저장 중 오류 발생", e);
                // 에러 처리 로직 추가 (예: 예외 발생시키거나, 파일 저장 실패를 알림)
                throw new RuntimeException("이미지 파일 저장에 실패했습니다.", e);
            }
        }

        CompanionEntity newCompanion = CompanionEntity.builder()
                .member(author)
                .companionTitle(companionTitle)
                .companionContent(companionContent)
                .companionCreatedAt(LocalDateTime.now())
                .companionViewCount(0)
                .companionNotice(noticeFlag) // 공지사항 여부 설정
                .companionImageUrls((imageUrls != null && !imageUrls.isEmpty()) ? String.join(",", imageUrls) : null) // 이미지 URL 목록 저장, null 체크 추가
                .build();

        return companionRepository.save(newCompanion);
    }

    // 게시글 수정 (작성자 본인만 가능, 공지사항 변경은 관리자만)
    // 게시글 수정 (작성자 본인만 가능, 공지사항 변경은 관리자만)
    @Transactional
    public CompanionEntity updateCompanion(Integer companionId,
                                           String companionTitle,
                                           String companionContent,
                                           String token,
                                           Boolean isNoticeRequest,
                                           List<MultipartFile> newImages, // 새로 추가된 이미지 파일 목록
                                           List<String> deletedImageUrls) { // 삭제 요청된 기존 이미지 URL 목록 (예: "upload/community/uuid.jpg")

        Long memberCode = jwtUtil.getMemberCodeFromToken(token);
        MemberEntity member = memberRepository.findById(memberCode)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        CompanionEntity companion = companionRepository.findById(companionId)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));

        // 작성자 본인 또는 관리자만 수정 가능
        List<String> roles = jwtUtil.getRolesFromToken(token);
        boolean isAdmin = roles.contains("ROLE_ADMIN");

        if (!isAdmin && !companion.getMember().getMemberCode().equals(memberCode)) {
            throw new SecurityException("게시글 수정 권한이 없습니다.");
        }

        companion.setCompanionTitle(companionTitle);
        companion.setCompanionContent(companionContent);
        companion.setCompanionModifiedAt(LocalDateTime.now());

        // 공지사항 설정은 관리자만 가능
        if (isAdmin && isNoticeRequest != null) {
            companion.setCompanionNotice(isNoticeRequest);
        } else if (!isAdmin && isNoticeRequest != null && isNoticeRequest != companion.isCompanionNotice()) {
            // 관리자가 아닌 사용자가 공지사항 상태를 변경하려고 하면 무시하거나 예외 처리
            log.warn("일반 사용자는 공지사항 상태를 변경할 수 없습니다. 게시글 ID: {}, 사용자 ID: {}", companionId, memberCode);
        }


        // 기존 이미지 URL 문자열을 리스트로 변환
        List<String> currentImageUrls = new ArrayList<>();
        if (companion.getCompanionImageUrls() != null && !companion.getCompanionImageUrls().isEmpty()) {
            currentImageUrls.addAll(Arrays.asList(companion.getCompanionImageUrls().split(",")));
        }

        // 1. 삭제 요청된 기존 이미지 처리
        if (deletedImageUrls != null && !deletedImageUrls.isEmpty()) {
            List<String> urlsToRemoveFromFileSystem = new ArrayList<>();
            for (String deletedUrl : deletedImageUrls) {
                // DB에 저장된 URL 형식과 deletedUrl 형식이 일치해야 합니다.
                // companionImageUrls 에는 "upload/community/filename.jpg" 형태로 저장되어 있다고 가정합니다.
                // deletedUrl도 동일한 형식으로 넘어온다고 가정합니다. (프론트에서 그렇게 보내도록 수정했음)
                if (currentImageUrls.contains(deletedUrl)) {
                    currentImageUrls.remove(deletedUrl);
                    urlsToRemoveFromFileSystem.add(deletedUrl);
                    log.info("DB에서 이미지 URL 제거 예정: {}", deletedUrl);
                } else {
                    log.warn("삭제 요청된 이미지 URL '{}'이(가) 기존 이미지 목록에 없어 DB에서 제거하지 못했습니다.", deletedUrl);
                }
            }

            // 파일 시스템에서 실제 파일 삭제
            for (String filePathToDelete : urlsToRemoveFromFileSystem) {
                // FileUtil.deleteFile은 실제 파일 시스템 경로를 받아야 합니다.
                // filePathToDelete가 "upload/community/filename.jpg"와 같은 상대 경로라면,
                // FileUtil.deleteFile 내부에서 이를 올바르게 처리하거나, 여기서 절대 경로로 만들어 전달해야 합니다.
                // 현재 FileUtil.deleteFile은 Paths.get(filePath)를 사용하므로,
                // 애플리케이션 실행 위치 기준으로 상대 경로가 올바르게 해석되어야 합니다.
                // 만약 application.properties의 file.upload-dir이 절대경로가 아니라면,
                // Paths.get(uploadDir, filename) 형태로 구성하는 것이 더 안전할 수 있습니다.
                // 지금은 FileUtil이 제공된 경로로 잘 삭제한다고 가정합니다.
                boolean deleted = fileUtil.deleteFile(filePathToDelete);
                if (deleted) {
                    log.info("파일 시스템에서 이미지 삭제 성공: {}", filePathToDelete);
                } else {
                    log.warn("파일 시스템에서 이미지 삭제 실패: {}", filePathToDelete);
                }
            }
        }

        // 2. 새로 추가된 이미지 처리
        if (newImages != null && !newImages.isEmpty() && !newImages.stream().allMatch(MultipartFile::isEmpty)) {
            try {
                List<String> savedNewImagePaths = fileUtil.saveFiles(newImages); // "upload/community/new_filename.jpg" 형태의 경로 반환
                currentImageUrls.addAll(savedNewImagePaths); // DB에 저장될 전체 URL 리스트에 추가
                log.info("새 이미지 추가 완료, 경로: {}", savedNewImagePaths);
            } catch (IOException e) {
                log.error("새 이미지 파일 저장 중 오류 발생", e);
                // 필요시 사용자에게 알릴 수 있는 예외 처리 추가
                throw new RuntimeException("이미지 저장에 실패했습니다.", e);
            }
        }

        // 업데이트된 이미지 URL 리스트를 다시 쉼표로 구분된 문자열로 변환하여 엔티티에 저장
        if (currentImageUrls.isEmpty()) {
            companion.setCompanionImageUrls(null);
        } else {
            companion.setCompanionImageUrls(String.join(",", currentImageUrls));
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

        // 게시글 삭제 시 연결된 이미지 파일도 삭제
        if (companion.getCompanionImageUrls() != null && !companion.getCompanionImageUrls().isEmpty()) {
            String[] imageUrls = companion.getCompanionImageUrls().split(",");
            for (String imageUrl : imageUrls) {
                fileUtil.deleteFile(imageUrl.trim());
            }
        }


        companionRepository.delete(companion);
    }

    //내가 작성한 게시글 목록 조회(최신순, 페이징)
    public Page<CompanionListDTO> getMyCompanions(String token, Pageable pageable) {
        if(token == null || token.isEmpty()) {
            throw new IllegalArgumentException("토큰이 유효하지 않습니다.");
        }
        Long memberCode = jwtUtil.getMemberCodeFromToken(token);
        Pageable newPageable = PageRequest.of(pageable.getPageNumber(), 10, Sort.by(Sort.Direction.DESC, "companionCreatedAt"));
        Page<CompanionEntity> companions = companionRepository.findByMember_MemberCodeOrderByCompanionCreatedAtDesc(memberCode, newPageable);

        return companions.map(CompanionListDTO::fromEntity);

    }
}