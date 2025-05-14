package com.hello.travelogic.chat.dto;

import com.hello.travelogic.chat.domain.ChatRoomMemberEntity;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRoomMemberDTO {

    private Long crmId;
    private Long chatRoomId;
    private String chatRoomUid;     // 클라이언트용 고유 식별자
    private Long memberCode;
    private String memberName;      // 채팅방 참여자 이름
    private LocalDateTime crmJoinedAt;
    private Boolean crmIsExited;
    private LocalDateTime crmExitedAt;
    private boolean isCreator;      // 방장 여부


    private ChatRoomMemberDTO(ChatRoomMemberEntity crmDTO) {
        this.crmId = crmDTO.getCrmId();
        this.chatRoomId = crmDTO.getChatRoomId().getChatRoomId();
        this.chatRoomUid = crmDTO.getChatRoomId().getChatRoomUid();
        this.memberCode = crmDTO.getMemberCode().getMemberCode();
        this.memberName = crmDTO.getMemberName();
        this.crmJoinedAt = crmDTO.getCrmJoinedAt();
        this.crmIsExited = crmDTO.getCrmIsExited();
        this.crmExitedAt = crmDTO.getCrmExitedAt();
        this.isCreator = crmDTO.isCreator();
    }
}
