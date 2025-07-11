package com.hello.travelogic.inquiry.repo;

import com.hello.travelogic.inquiry.domain.InquiryChatMessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InquiryChatMessageRepo extends JpaRepository<InquiryChatMessageEntity, Long> {

    // 기존 쿼리 메소드명 너무 길어서 아래 @Query 어노테이션 사용
    // InquiryChatMessageEntity의 inquiryChatId 필드 안에 있는 "InquiryChatEntity 객체의 숫자 inquiryChatId"를 사용해서, 메시지를 보낸 시간 기준으로 정렬
    // 기존 메소드명이 findByInquiryChatIdOrderBySentAtAsc 였는데, 여기서 쓰인 InquiryChatId는 "InquiryChatId가 숫자"라고 인식했기 때문에 런타임 에러 발생.
    // 사실 InquiryChatId는 "InquiryChatEntity" 라는 객체이기 때문에, 객체임을 정확히 명시해줘야 함.
//    List<InquiryChatMessageEntity> findByInquiryChatId_InquiryChatIdOrderByInquiryChatMessageSentAtAsc(Integer inquiryChatId);

    // 특정 채팅방 메시지 조회 (시간 순 정렬, JPQL 쿼리 사용)
    @Query("SELECT icm FROM InquiryChatMessageEntity icm WHERE icm.inquiryChat.inquiryChatId = :chatId ORDER BY icm.inquiryChatMessageSentAt ASC")
    List<InquiryChatMessageEntity> findMessagesByChatId(@Param("chatId") Long chatId);
}
