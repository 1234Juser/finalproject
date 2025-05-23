package com.hello.travelogic.notification.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class NotificationRequestDTO {
    // 알람 생성 요청용 DTO/필요하면 사용

    private Long memberCode;
    private String notiMessage;
    private Integer notiTargetPostId;
}
