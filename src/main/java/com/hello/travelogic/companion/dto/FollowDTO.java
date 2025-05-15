package com.hello.travelogic.companion.dto;

import com.hello.travelogic.member.domain.MemberEntity;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FollowDTO {
    private Long memberCode;
    private String memberName;
    private String memberProfileImageUrl;

    public static FollowDTO fromEntity(MemberEntity memberEntity) {
        if (memberEntity == null) {
            return null;
        }
        return FollowDTO.builder()
                .memberCode(memberEntity.getMemberCode())
                .memberName(memberEntity.getMemberName())
                .memberProfileImageUrl(memberEntity.getMemberProfileImageUrl())
                .build();
    }

}
