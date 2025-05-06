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
    //faq수정
    @GetMapping("/{faqCode}")
    public ResponseEntity<FaqEntity> getFaq(@PathVariable Integer faqCode){
        FaqEntity faq = faqService.findById(faqCode)
                .orElseThrow(() -> new RuntimeException("FAQ 없음"));
        return ResponseEntity.ok(faq);

    }
    //faq수정
    @PutMapping("/{faqCode}")
    public ResponseEntity<?> updateFaq(@PathVariable Integer faqCode, @RequestBody FaqEntity faqDto){
        faqService.update(faqCode, faqDto);
        return ResponseEntity.ok().build();
    }
}
