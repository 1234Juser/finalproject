package com.hello.travelogic.notification.dto;

import com.hello.travelogic.notification.domain.NotificationEntity;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
//@Builder
public class NotificationResponseDTO {
    // 알림 응답용 DTO

    private Long notiId;
    private Long memberCode;
    private String notiMessage;
    private boolean notiIsRead;
    private LocalDateTime notiCreatedAt;
    private Integer notiTargetPostId;
    private Long notiOrderId;


    // Entity를 DTO로 변환하는 생성자
    public NotificationResponseDTO(NotificationEntity entity) {
        this.notiId = entity.getNotiId();
        this.memberCode = entity.getMemberCode().getMemberCode();  // MemberEntity에서 memberCode 추출
        this.notiMessage = entity.getNotiMessage();
        this.notiIsRead = entity.isNotiIsRead();
        this.notiCreatedAt = entity.getNotiCreatedAt();
        this.notiTargetPostId = entity.getNotiTargetPostId();
        this.notiOrderId = entity.getNotiOrderId();
    }

}
