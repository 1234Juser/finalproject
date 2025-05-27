package com.hello.travelogic.product.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductStatusScheduler {

    private final ProductService productService;

    @Scheduled(cron = "0 * * * * *", zone = "Asia/Seoul")
    public void runScheduler() {
        log.info("[스케줄러 실행됨] updateExpiredProductStatus()");
        try {
            productService.updateExpiredProductStatus();
        } catch (Exception e) {
            log.error("[스케줄러 에러] 상품 상태 업데이트 실패", e);
            throw e;
        }
    }
}
