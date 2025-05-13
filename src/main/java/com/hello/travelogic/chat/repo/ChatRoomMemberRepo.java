package com.hello.travelogic.chat.repo;

import com.hello.travelogic.chat.domain.ChatRoomEntity;
import com.hello.travelogic.chat.domain.ChatRoomMemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomMemberRepo extends JpaRepository<ChatRoomMemberEntity, Long> {

    // 특정 채팅방(ChatRoomEntity)에 속하고 퇴장하지(crmIsExited = false) 않은 멤버의 수를 카운트
    int countByChatRoomIdAndCrmIsExited(ChatRoomEntity chatRoomId, boolean crmIsExited);

    // 만약 ChatRoomEntity의 ID (예: Long 타입의 chatRoomId 필드)를 직접 사용하고 싶다면:
    // int countByChatRoomId_ChatRoomIdAndCrmIsExited(Long chatRoomEntityId, boolean crmIsExited);
    // 이때 ChatRoomMemberEntity 내의 ChatRoomEntity 참조 필드명이 chatRoomId 이고,
    // ChatRoomEntity 내의 ID 필드명이 chatRoomId 라고 가정합니다. (필드명에 따라 메소드명 변경 필요)

}
