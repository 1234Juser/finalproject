package com.hello.travelogic.exchange.controller;

import com.hello.travelogic.exchange.service.ExchangeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/exchange")
@Slf4j
public class ExchangeController {
    private final ExchangeService exchangeService;

    //환율 api 및 db저장
    @GetMapping("/rate")
    public Map<String, Object> getExchangeRate(){
        return exchangeService.getExchangeRate();
    }

    //메인페이지 표시
    @GetMapping("/main")
    public Map<String, Object> getMainRates(){
        return exchangeService.getLastSaveMainRates();
    }

}
