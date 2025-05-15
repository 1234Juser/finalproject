package com.hello.travelogic.inquiry.controller;


import com.hello.travelogic.inquiry.dto.InquiryChatDTO;
import com.hello.travelogic.inquiry.dto.InquiryChatMessageDTO;
import com.hello.travelogic.inquiry.service.InquiryChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inquiry")
@RequiredArgsConstructor
public class InquiryChatController {

    private final InquiryChatService inquiryChatService;

    @PostMapping("/start")
    public ResponseEntity startChat(@RequestBody InquiryChatDTO inquiryChatDTO) {
        return ResponseEntity.ok(inquiryChatService.startChat(inquiryChatDTO));
    }

    @PostMapping("/message")
    public ResponseEntity sendMessage(@RequestBody InquiryChatMessageDTO inquiryChatMessageDTO) {
        return ResponseEntity.ok(inquiryChatService.saveMessage(inquiryChatMessageDTO));
    }

    @GetMapping("/messages/{icId}")
    public ResponseEntity getMessages(@PathVariable Integer icId) {
        return ResponseEntity.ok(inquiryChatService.getMessages(icId));
    }

    @GetMapping("/admin/chats")
    public ResponseEntity getAllChatsForAdmin() {
        return ResponseEntity.ok(inquiryChatService.getChatListForAdmin());
    }
}

