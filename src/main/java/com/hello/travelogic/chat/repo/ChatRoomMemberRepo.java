package com.hello.travelogic.chat.repo;

import com.hello.travelogic.chat.domain.ChatRoomEntity;
import com.hello.travelogic.chat.domain.ChatRoomMemberEntity;
import com.hello.travelogic.member.domain.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomMemberRepo extends JpaRepository<ChatRoomMemberEntity, Long> {

    // 특정 채팅방(ChatRoomEntity)에 속하고 퇴장하지(crmIsExited = false) 않은 멤버의 수를 카운트
    // 해당 채팅방에 몇 명이 참여중인지
    int countByChatRoomIdAndCrmIsExited(ChatRoomEntity chatRoomId, boolean crmIsExited);

    // 특정 채팅방에 이미 해당 사용자가 참여했는지 확인
    // ChatRoomMemberEntity 내에서 ChatRoomEntity/MemberEntity를 참조하는 필드를 조건으로 걸어야함.
    boolean existsByChatRoomIdAndMemberCode(ChatRoomEntity chatRoomId, MemberEntity memberCode);


}
