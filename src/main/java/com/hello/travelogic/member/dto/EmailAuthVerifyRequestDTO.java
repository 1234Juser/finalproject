package com.hello.travelogic.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmailAuthVerifyRequestDTO {
    private String memberEmail;
    private String authCode; // 사용자가 입력한 인증번호

}
