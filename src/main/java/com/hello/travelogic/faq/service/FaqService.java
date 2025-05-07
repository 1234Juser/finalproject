package com.hello.travelogic.faq.service;

import com.hello.travelogic.faq.domain.FaqEntity;
import com.hello.travelogic.faq.repository.FaqRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
    //faq 단일조회
    public Optional<FaqEntity> findById(Integer faqCode) {
        return faqRepository.findById(faqCode);
    }
    //faq수정
    public void update(Integer faqCode, FaqEntity faqDto) {
        FaqEntity faq = faqRepository.findById(faqCode)
                .orElseThrow(()-> new RuntimeException("FAQ없음"));
        faq.setFaqTitle(faqDto.getFaqTitle());
        faq.setFaqContent(faqDto.getFaqContent());
        faqRepository.save(faq); // 더티체킹으로 저장 가능하지만, 명확하게 save 호출
    }

    //faq삭제
    public void deleteById(Integer faqCode) {
        if(!faqRepository.existsById(faqCode)) {
            throw new RuntimeException("FAQ없음");
        }
        faqRepository.deleteById(faqCode);
    }
}
