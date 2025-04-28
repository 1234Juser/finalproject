package com.hello.travelogic.member.dto;

import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberUpdateDTO {
    private String memberName;
    private String memberPhone;
    private String currentPassword;
    private String newPassword;
}
