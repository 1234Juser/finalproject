package com.hello.travelogic.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDTO {
    private String accessToken; //jwt토큰
    private String memberName;
    private String memberProfileImageUrl;  // 프로필 사진 전달
    private List<String> roles;        // 권한 리스트 전달
    private Long memberCode;
    private String kakaoAccessToken;
    private String googleAccessToken;

    //필요시 추가 정보 반환가능
}
