package com.hello.travelogic.member.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MyPageResponseDTO {
    private Long memberCode;
    private String memberName;
    private String memberId;
    private String memberEmail;
    private String memberPhone;
    private String memberProfileImageUrl;
    private String memberPassword; // 보안상 실제 값 노출은 지양. 필요한 경우 마스킹 처리
    private String socialType;


}
