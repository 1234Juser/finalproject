package com.hello.travelogic.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FindPasswordAuthRequestDTO {
    private String memberName;
    private String memberId;
    private String memberEmail;
}
