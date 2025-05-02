package com.hello.travelogic.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberAllDTO {
    private Long memberCode;
    private String memberName;
    private String memberId;
    private String memberEmail;
    private String memberPhone;
    private String memberProfileImageUrl;
    private String socialType;
    private Long socialAccountId;
    private LocalDateTime memberRegisterdate;
    private LocalDateTime memberEnddate;
    private String memberEndstatus;
    private Set<String> roles;




}
