package com.hello.travelogic.exchange.service;

import com.hello.travelogic.exchange.domain.ExchangeEntity;
import com.hello.travelogic.exchange.repository.ExchangeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExchangeService {
    private final ExchangeRepository exchangeRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${exchange.api-key}")
    private String apiKey;

    /**
     * 매일 오전 3시에 환율 자동 업데이트 (cron: 초 분 시 일 월 요일)
     */
    @Scheduled(cron = "0 0 3 * * *", zone = "Asia/Seoul")
    public void scheduledUpdateExchangeRate() {
        log.info("=== 환율 스케줄링 업데이트 시작 ===");
        getExchangeRate();
    }


    // 환율 api USD기준, apilayer 사용
    public Map<String, Object> getExchangeRate() {
        String currencies = "KRW,EUR,GBP,CNY,JPY";
        String url = "https://apilayer.net/api/live?access_key=" + apiKey +
                "&currencies=" + currencies +
                "&source=USD&format=1";
        log.debug("url = {}", url);
        Map<String, Object> response = null;

        try {
            response = restTemplate.getForObject(url, Map.class);
        } catch (RestClientException e) {
            log.error("환율 API 호출 중 오류 발생: {}", e.getMessage());
        }
        Map<String, Object> result = new LinkedHashMap<>();

        if(response != null && Boolean.TRUE.equals(response.get("success"))) {
            String base = "USD";
            Object timestampObj = response.get("timestamp");
            String dateStr = null;
            if (timestampObj != null) {
                long timestamp = Long.parseLong(String.valueOf(timestampObj));
                dateStr = java.time.Instant.ofEpochSecond(timestamp)
                        .atZone(java.time.ZoneId.of("Asia/Seoul"))
                        .toLocalDate()
                        .toString();
            }

            Map<String, Double> quotes = null;
            Object quotesObj = response.get("quotes");
            if (quotesObj instanceof Map) {
                quotes = (Map<String, Double>) quotesObj;
            }

            if (quotes != null && !quotes.isEmpty()) {
                List<ExchangeEntity> entities = new ArrayList<>();
                LocalDateTime now = LocalDateTime.now();
                Map<String, Double> rates = new LinkedHashMap<>();
                for (String key : quotes.keySet()) {
                    // 예: key = "USDKRW", value = 1350.11 등
                    if(key.startsWith("USD")) {
                        String target = key.substring(3); // "USD" 이후 3글자부터
                        rates.put(target, quotes.get(key));
                        ExchangeEntity entity = ExchangeEntity.builder()
                                .baseCurrency(base)
                                .targetCurrency(target)
                                .rate(BigDecimal.valueOf(quotes.get(key)))
                                .updatedDate(now)
                                .build();
                        entities.add(entity);
                    }
                }
                exchangeRepository.saveAll(entities);
                result.put("base", base);
                result.put("date", dateStr);
                result.put("rates", rates);
            } else {
                log.error("환율 데이터가 없습니다 (API 응답 quotes null 혹은 빈 값).");
                result.put("error", "환율 정보가 없습니다. API 응답 오류 또는 API키 만료 여부를 확인해 주세요.");
                result.put("base", base);
                result.put("date", dateStr);
                result.put("rates", Collections.emptyMap());
            }
        } else {
            log.error("외부 API로부터 응답을 받지 못했습니다.");
            result.put("error", "외부 환율 API 연결 및 데이터 수신 실패");
            result.put("base", "USD");
            result.put("date", null);
            result.put("rates", Collections.emptyMap());
        }
        return result;
    }

    // db에서 최신 환율 조회 (base: USD)
    public Map<String, Object> getLastSaveMainRates() {
        List<ExchangeEntity> rates = exchangeRepository.findTop5ByBaseCurrencyOrderByUpdatedDateDesc("USD");
        if (rates.isEmpty()) {
            // DB에 값 없음 -> 최초 한번 API에서 데이터 가져와 저장
            getExchangeRate();
            rates = exchangeRepository.findTop5ByBaseCurrencyOrderByUpdatedDateDesc("USD");
        }
        Map<String, Object> map = new LinkedHashMap<>();
        Map<String, BigDecimal> rateMap = new LinkedHashMap<>();
        LocalDateTime date = null;

        for(ExchangeEntity entity : rates){
            rateMap.put(entity.getTargetCurrency(), entity.getRate());
            if(date == null || entity.getUpdatedDate().isAfter(date)){
                date = entity.getUpdatedDate();
            }
        }
        map.put("base", "USD");
        map.put("date", date!=null? date.toLocalDate().toString() : null);
        map.put("rates", rateMap);
        return map;
    }
}