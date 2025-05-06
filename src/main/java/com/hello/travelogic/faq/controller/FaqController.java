package com.hello.travelogic.faq.controller;

import com.hello.travelogic.faq.domain.FaqEntity;
import com.hello.travelogic.faq.service.FaqService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/faq")
@RequiredArgsConstructor
public class FaqController {

    private final FaqService faqService;

    // faq조회
    @GetMapping
    public Page<FaqEntity> getFaqs(@RequestParam(defaultValue = "0") int page){
        return faqService.getFaqList(page, 10);
    }
    //faq등록
    @PostMapping
    public ResponseEntity<?> registerFaq(@RequestBody FaqEntity faq){
        faqService.save(faq);
        return ResponseEntity.ok().build();
    }
}
