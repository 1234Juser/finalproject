package com.hello.travelogic.inquiry.controller;


import com.hello.travelogic.inquiry.domain.InquiryChatEntity;
import com.hello.travelogic.inquiry.domain.InquiryChatMessageEntity;
import com.hello.travelogic.inquiry.dto.InquiryChatDTO;
import com.hello.travelogic.inquiry.dto.InquiryChatMessageDTO;
import com.hello.travelogic.inquiry.service.InquiryChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inquiry")
@RequiredArgsConstructor
public class InquiryChatController {

    private final InquiryChatService inquiryChatService;


    // 1:1 채팅 시작 (채팅방 생성)
    @PostMapping("/start")
    public ResponseEntity<InquiryChatEntity> startChat(@RequestBody InquiryChatDTO inquiryChatDTO) {
        InquiryChatEntity newChat = inquiryChatService.startChat(inquiryChatDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(newChat);
    }


    // 메시지 DB 저장
    @PostMapping("/message")
    public ResponseEntity<InquiryChatMessageEntity> sendMessage(@RequestBody InquiryChatMessageDTO inquiryChatMessageDTO) {
        InquiryChatMessageEntity savedMessage = inquiryChatService.saveMessage(inquiryChatMessageDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMessage);
    }


    // 특정 채팅방에 대한 모든 메시지 기록 불러오기 (페이지 진입 시 기존 메시지 조회)
    @GetMapping("/messages/{icId}")
    public ResponseEntity<List<InquiryChatMessageEntity>> getMessages(@PathVariable Long icId) {
        List<InquiryChatMessageEntity> messages = inquiryChatService.getMessages(icId);
        return ResponseEntity.status(HttpStatus.OK).body(messages);
    }


    // 관리자용 채팅방 전체 조회
    @GetMapping("/admin/chat-list")
    public ResponseEntity<List<InquiryChatEntity>> getAllChatListForAdmin() {
        List<InquiryChatEntity> chatList = inquiryChatService.getChatListForAdmin();
        return ResponseEntity.status(HttpStatus.OK).body(chatList);
    }
}

