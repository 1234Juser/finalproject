package com.hello.travelogic.chat.repo;

import com.hello.travelogic.chat.domain.ChatRoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRoomRepo extends JpaRepository<ChatRoomEntity, Long> {

    // 생성 날짜 기준으로 모든 채팅방을 내림차순(최신순)으로 조회
    List<ChatRoomEntity> findAllByOrderByChatRoomCreateAtDesc();

    // 채팅방 식별자(UID)로 채팅방 조회
    Optional<ChatRoomEntity> findByChatRoomUid(String chatRoomUid);
}
