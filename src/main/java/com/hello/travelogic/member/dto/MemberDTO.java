package com.hello.travelogic.member.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberDTO {

    private String memberName;
    private String memberId;
    private String memberPassword;
    private String memberEmail;
    private String memberPhone;

    // 소셜 로그인 관련
    private String socialType;
    private Integer socialAccountId;
    private String socialAccountCi;

    // DTO에는 권한 목록 등은 포함하지 않음.
    // 회원가입 시 무조건 USER 권한만 부여, 추가 권한 부여는 DB 작업을 통해 별도 처리
}

