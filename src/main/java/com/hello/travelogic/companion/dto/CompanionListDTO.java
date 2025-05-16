package com.hello.travelogic.companion.dto;

import com.hello.travelogic.companion.domain.CompanionEntity;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanionListDTO {
    private Integer companionId;
    private String companionTitle;
    private String authorName; // 작성자 이름 (MemberEntity에서 가져옴)
    private String authorProfileImageUrl; // 작성자 프로필 이미지 URL
    private LocalDateTime companionCreatedAt;
    private Integer companionViewCount;
    private boolean companionNotice;

    public static CompanionListDTO fromEntity(CompanionEntity entity) {
        if (entity == null) return null;
        return CompanionListDTO.builder()
                .companionId(entity.getCompanionId())
                .companionTitle(entity.getCompanionTitle())
                .authorName(entity.getMember() != null ? entity.getMember().getMemberName() : null)
                .authorProfileImageUrl(entity.getMember() != null ? entity.getMember().getMemberProfileImageUrl() : null)
                .companionCreatedAt(entity.getCompanionCreatedAt())
                .companionViewCount(entity.getCompanionViewCount())
                .companionNotice(entity.isCompanionNotice())
                .build();
    }

}

