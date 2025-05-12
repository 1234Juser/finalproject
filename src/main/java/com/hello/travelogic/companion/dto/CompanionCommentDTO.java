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
    private String authorName; // 댓글 작성자 이름
    private String authorProfileImageUrl; // 댓글 작성자 프로필 이미지 URL
    private String companionContent;
    private LocalDateTime companionCreatedAt;

    public static CompanionCommentDTO fromEntity(CompanionCommentEntity entity) {
        if (entity == null) return null;
        return CompanionCommentDTO.builder()
                .companionCommentId(entity.getCompanionCommentId())
                .authorName(entity.getMember() != null ? entity.getMember().getMemberName() : null)
                .authorProfileImageUrl(entity.getMember() != null ? entity.getMember().getMemberProfileImageUrl() : null)
                .companionContent(entity.getCompanionContent())
                .companionCreatedAt(entity.getCompanionCreatedAt())
                .build();
    }

}
