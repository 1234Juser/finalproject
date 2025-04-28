package com.hello.travelogic.member.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminMyPageResponseDTO {
    private String memberName;
    private String memberId;
    private String memberEmail;
    private String memberPhone;
    private String memberRole;
    private String memberProfileImageUrl;

}
