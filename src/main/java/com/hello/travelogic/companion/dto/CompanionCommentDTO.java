package com.hello.travelogic.companion.dto;

import com.hello.travelogic.companion.domain.CompanionCommentEntity;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanionCommentDTO {
    private Integer companionCommentId;
    private Integer companionId; // 게시글 ID 추가
    private String companionTitle; // 게시글 제목 추가
    private String authorName; // 댓글 작성자 이름
    private Long authorMemberCode; // 댓글 작성자 회원 코드 추가
    private String authorProfileImageUrl; // 댓글 작성자 프로필 이미지 URL
    private String companionCommentContent;
    private LocalDateTime companionCommentCreatedAt;
    private LocalDateTime companionCommentModifiedAt; // 댓글 수정 시간 추가


    public static CompanionCommentDTO fromEntity(CompanionCommentEntity entity) {
        if (entity == null) return null;
        return CompanionCommentDTO.builder()
                .companionCommentId(entity.getCompanionCommentId())
                .companionId(entity.getCompanion().getCompanionId())
                .companionTitle(entity.getCompanion().getCompanionTitle())
                .authorName(entity.getMember() != null ? entity.getMember().getMemberName() : null)
                .authorMemberCode(entity.getMember() != null ? entity.getMember().getMemberCode() : null) // memberCode 매핑 추가
                .authorProfileImageUrl(entity.getMember() != null ? entity.getMember().getMemberProfileImageUrl() : null)
                .companionCommentContent(entity.getCompanionCommentContent())
                .companionCommentCreatedAt(entity.getCompanionCommentCreatedAt())
                .companionCommentModifiedAt(entity.getCompanionCommentModifiedAt()) // 수정 시간 매핑
                .build();
    }

}
