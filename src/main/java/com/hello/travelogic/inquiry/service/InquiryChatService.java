package com.hello.travelogic.inquiry.service;

import com.hello.travelogic.inquiry.domain.InquiryChatEntity;
import com.hello.travelogic.inquiry.domain.InquiryChatMessageEntity;
import com.hello.travelogic.inquiry.dto.InquiryChatDTO;
import com.hello.travelogic.inquiry.dto.InquiryChatMessageDTO;
import com.hello.travelogic.inquiry.repo.InquiryChatMessageRepo;
import com.hello.travelogic.inquiry.repo.InquiryChatRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InquiryChatService {

    private final InquiryChatRepo inquiryChatRepo;
    private final InquiryChatMessageRepo inquiryChatMessageRepo;

    public InquiryChatEntity startChat(InquiryChatDTO inquiryChatDTO) {
        InquiryChatEntity chat = new InquiryChatEntity();
        return inquiryChatRepo.save(chat);
    }

    public InquiryChatMessageEntity saveMessage(InquiryChatMessageDTO inquiryChatMessageDTO) {
        InquiryChatMessageEntity message = new InquiryChatMessageEntity();
        return inquiryChatMessageRepo.save(message);
    }

    public List<InquiryChatMessageEntity> getMessages(Integer inquiryChatDTO) {
        return inquiryChatMessageRepo.findByInquiryChatId_InquiryChatIdOrderByInquiryChatMessageSentAtAsc(inquiryChatDTO);
    }

    public List<InquiryChatEntity> getChatListForAdmin() {
        return inquiryChatRepo.findAll(); // 필요 시 조건 추가
    }
}

