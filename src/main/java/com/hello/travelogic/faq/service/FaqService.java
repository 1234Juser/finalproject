package com.hello.travelogic.faq.service;

import com.hello.travelogic.faq.domain.FaqEntity;
import com.hello.travelogic.faq.repository.FaqRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class FaqService {

    private final FaqRepository faqRepository;
    //faq조회
    public Page<FaqEntity> getFaqList(int page, int size) {
        log.debug("page = {}, size = {}", page, size);
        return faqRepository.findAll(PageRequest.of(page, size));
    }
    //faq등록
    public void save(FaqEntity faq) {
        faqRepository.save(faq);
    }
}
