package com.hello.travelogic.companion.dto;

import com.hello.travelogic.companion.domain.CompanionEntity;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanionDetailDTO {
    private Integer companionId;
    private String companionTitle;
    private String companionContent;
    private String authorName; // 작성자 이름
    private Long authorMemberCode; // 작성자 회원 코드 추가
    private String authorProfileImageUrl; // 작성자 프로필 이미지 URL
    private LocalDateTime companionCreatedAt;
    private Integer companionViewCount;
    private List<CompanionCommentDTO> comments; // 댓글 목록
    private boolean companionNotice; // 공지사항 여부 필드 추가
    private LocalDateTime companionModifiedAt; // 수정 시간 추가
    private List<String> companionImageUrls; // 이미지 URL 목록 필드 추가


    public static CompanionDetailDTO fromEntity(CompanionEntity entity, List<CompanionCommentDTO> comments) {
        if (entity == null) return null;

        List<String> imageUrls = Collections.emptyList();
        if (entity.getCompanionImageUrls() != null && !entity.getCompanionImageUrls().isEmpty()) {
            imageUrls = Arrays.stream(entity.getCompanionImageUrls().split(","))
                    .map(String::trim)
                    .collect(Collectors.toList());
        }

        return CompanionDetailDTO.builder()
                .companionId(entity.getCompanionId())
                .companionTitle(entity.getCompanionTitle())
                .companionContent(entity.getCompanionContent())
                .authorName(entity.getMember() != null ? entity.getMember().getMemberName() : null)
                .authorMemberCode(entity.getMember() != null ? entity.getMember().getMemberCode() : null) // memberCode 매핑
                .authorProfileImageUrl(entity.getMember() != null ? entity.getMember().getMemberProfileImageUrl() : null)
                .companionCreatedAt(entity.getCompanionCreatedAt())
                .companionViewCount(entity.getCompanionViewCount())
                .comments(comments)
                .companionNotice(entity.isCompanionNotice()) // entity의 공지사항 여부 매핑
                .companionModifiedAt(entity.getCompanionModifiedAt()) // 수정 시간 매핑
                .companionImageUrls(imageUrls) // 변환된 이미지 URL 리스트 매핑
                .build();
    }

}

