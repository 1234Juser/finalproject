package com.hello.travelogic.payment.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.member.repository.MemberRepository;
import com.hello.travelogic.notification.dto.NotificationRequestDTO;
import com.hello.travelogic.notification.service.NotificationService;
import com.hello.travelogic.order.domain.OrderEntity;
import com.hello.travelogic.order.domain.OrderStatus;
import com.hello.travelogic.order.repo.OrderRepo;
import com.hello.travelogic.payment.domain.PaymentEntity;
import com.hello.travelogic.payment.domain.PaymentStatus;
import com.hello.travelogic.payment.dto.PaymentDTO;
import com.hello.travelogic.payment.repo.PaymentRepo;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.request.CancelData;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class PaymentService {

    private IamportClient iamportClient;

    @Value("${imp.code}")
    private String impCode;

    @Value("${imp.key}")
    private String apiKey;

    @Value("${imp.secret_key}")
    private String secretKey;

    private final PaymentRepo paymentRepo;
    private final OrderRepo orderRepo;
    private final MemberRepository memberRepository;
    private final NotificationService notificationService;

    private static final String IAMPORT_TOKEN_URL = "https://api.iamport.kr/users/getToken";
    private static final String IAMPORT_PAYMENT_URL = "https://api.iamport.kr/payments";
    private static final String IAMPORT_CANCEL_URL = "https://api.iamport.kr/payments/cancel";

    @PostConstruct
    public void init() {
        this.iamportClient = new IamportClient(apiKey, secretKey);
    }

    // accessToken 발급
    public String getAccessToken() throws IOException {
        URL url = new URL(IAMPORT_TOKEN_URL);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("Accept", "application/json");
        connection.setDoOutput(true);

        // 요청 데이터 설정
        Map<String, String> requestData = new HashMap<>();
        requestData.put("imp.key", apiKey);
        requestData.put("imp.secret_key", secretKey);

        // JSON 변환
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonBody = objectMapper.writeValueAsString(requestData);

        // 요청 전송
        connection.getOutputStream().write(jsonBody.getBytes(StandardCharsets.UTF_8));

        // 응답 처리
        int responseCode = connection.getResponseCode();
        if (responseCode != 200) {
            log.error("Access Token 발급 실패 - HTTP 코드: {}", responseCode);
            throw new IOException("Access Token 발급 실패 - HTTP 코드: " + responseCode);
        }

        // JSON 파싱
        JsonNode responseNode = objectMapper.readTree(connection.getInputStream());
        String accessToken = responseNode.path("response").path("access_token").asText();

        if (accessToken == null || accessToken.isEmpty()) {
            log.error("Access Token 발급 실패 - 응답 데이터 없음");
            throw new IOException("Access Token 발급 실패 - 응답 데이터 없음");
        }

        log.info("Access Token 발급 성공 - {}", accessToken);
        return accessToken;
    }

    // 결제 생성(결제 대기 상태로 생성)
    @Transactional
    public PaymentDTO createPayment(PaymentDTO paymentDTO) {
        Long orderCode = paymentDTO.getOrderCode();
        if (orderCode == null || orderCode <= 0) {
            throw new IllegalArgumentException("유효한 orderCode가 필요합니다.");
        }

        // 회원과 주문을 조회
        MemberEntity member = memberRepository.findById(paymentDTO.getMemberCode())
                .orElseThrow(() -> new IllegalArgumentException("회원 정보가 존재하지 않습니다."));

        // order와 연결된 option도 간접참조로 가져옴
        OrderEntity order = orderRepo.findById(paymentDTO.getOrderCode())
                .orElseThrow(() -> new IllegalArgumentException("주문 정보가 존재하지 않습니다."));

        // merchantUid 생성
        String merchantUid = generateMerchantUid(order.getOrderCode());
        paymentDTO.setMerchantUid(merchantUid);

        // 결제 엔티티 생성 및 저장
        PaymentEntity payment = new PaymentEntity(paymentDTO, member, order);
        payment.setPaymentStatus(PaymentStatus.PENDING); // 기본 결제 상태 설정
        payment.setPaymentTime(LocalDateTime.now());

        PaymentEntity savedPayment = paymentRepo.save(payment);
        return new PaymentDTO(savedPayment);
    }

    // merchantUid 생성
    private String generateMerchantUid(Long orderCode) {
        String prefix = "ORD-";
        String datePart = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String uniquePart = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        return prefix + datePart + "-" + orderCode + "-" + uniquePart;
    }

    // 결제 상태 바꿈
    @Transactional
    public boolean updatePaymentStatus(String impUid, PaymentStatus status) {
        try {
            // 아임포트에서 결제 상태 조회
            IamportResponse<Payment> response = iamportClient.paymentByImpUid(impUid);
            Payment payment = response.getResponse();
            if (payment == null) {
                throw new IllegalArgumentException("해당 결제 정보를 찾을 수 없습니다.");
            }

            // 현재 상태와의 일관성 체크
            PaymentEntity paymentEntity = paymentRepo.findByImpUid(impUid);
            if (paymentEntity == null) {
                throw new IllegalArgumentException("해당 결제 정보가 DB에 존재하지 않습니다.");
            }

            // 현재 상태 확인
            PaymentStatus currentStatus = paymentEntity.getPaymentStatus();

            if (!isValidStatusTransition(currentStatus, status)) {
                throw new IllegalStateException("잘못된 상태 전환입니다: " + currentStatus + " -> " + status);
            }

            // 상태 전환 규칙
//        switch (status) {
//            case COMPLETED -> {
//                if (currentStatus != PaymentStatus.PENDING) {
//                    throw new IllegalStateException("결제가 PENDING 상태가 아니면 COMPLETED로 변경할 수 없습니다.");
//                }
//                payment.setPaymentStatus(PaymentStatus.COMPLETED);
//            }
//            case FAILED -> {
//                if (currentStatus != PaymentStatus.PENDING && currentStatus != PaymentStatus.COMPLETED) {
//                    throw new IllegalStateException("PENDING 또는 COMPLETED 상태에서만 FAILED로 변경할 수 있습니다.");
//                }
//                payment.setPaymentStatus(PaymentStatus.FAILED);
//            }
//            case EXPIRED -> {
//                if (currentStatus != PaymentStatus.PENDING) {
//                    throw new IllegalStateException("PENDING 상태에서만 EXPIRED로 변경할 수 있습니다.");
//                }
//                payment.setPaymentStatus(EXPIRED);
//            }
//            case REFUNDED -> {
//                if (currentStatus != PaymentStatus.COMPLETED) {
//                    throw new IllegalStateException("COMPLETED 상태에서만 REFUNDED로 변경할 수 있습니다.");
//                }
//                payment.setPaymentStatus(REFUNDED);
//            }
//            case CANCELED -> {
//                if (currentStatus != PaymentStatus.COMPLETED) {
//                    throw new IllegalStateException("COMPLETED 상태에서만 CANCELED로 변경할 수 있습니다.");
//                }
//                payment.setPaymentStatus(CANCELED);
//            }
//            default -> {
//                throw new IllegalArgumentException("허용되지 않은 결제 상태 전환입니다.");
//            }
//        }

//        payment.setPaymentStatus(status);
//        paymentRepo.save(payment);
//        return new PaymentDTO(payment);
            // 상태 변경 후 저장
//        PaymentEntity updatedPayment = paymentRepo.save(payment);
//        return new PaymentDTO(updatedPayment);
            paymentEntity.setPaymentStatus(status);
            paymentRepo.save(paymentEntity);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    // 상태 전환 규칙 검사
    private boolean isValidStatusTransition(PaymentStatus currentStatus, PaymentStatus Status) {
        return switch (Status) {
            case COMPLETED -> currentStatus == PaymentStatus.PENDING;
            case FAILED -> currentStatus == PaymentStatus.PENDING || currentStatus == PaymentStatus.COMPLETED;
            case EXPIRED -> currentStatus == PaymentStatus.PENDING;
            case REFUNDED -> currentStatus == PaymentStatus.COMPLETED;
            case CANCELED -> currentStatus == PaymentStatus.COMPLETED;
            default -> false;
        };
    }

    // 결제 취소
    // DB와 아임포트 서버 모두 상태변경
    @Transactional
    public boolean cancelPayment(String impUid) {
        try {
            // 결제 취소 데이터 생성
            CancelData cancelData = new CancelData(impUid, false);
            cancelData.setReason("고객 요청에 따른 결제 취소");

            IamportResponse<Payment> response = iamportClient.cancelPaymentByImpUid(cancelData);
            Payment canceledPayment = response.getResponse();

            // 결제 취소 실패
            if (canceledPayment == null) {
                System.out.println("결제 취소 실패: " + response.getMessage());
                return false;
            }
            // DB의 결제 상태도 변경
            PaymentEntity payment = paymentRepo.findByImpUid(impUid);
            if (payment == null) {
                throw new IllegalArgumentException("해당 결제 정보를 찾을 수 없습니다.");
            }
            if (payment != null) {
                payment.setPaymentStatus(PaymentStatus.CANCELED);
                paymentRepo.save(payment);
            }
            // 결제 취소 성공
            System.out.println("결제 취소 성공: " + canceledPayment.getMerchantUid());
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    // 결제 상태 조회
    public PaymentDTO getPaymentByImpUid(String impUid) {
        try {
            // Iamport 서버에서 결제 정보 조회
            IamportResponse<Payment> response = iamportClient.paymentByImpUid(impUid);
            Payment iamportPayment = response.getResponse();

            if (iamportPayment == null) {
                throw new IllegalArgumentException("아임포트에서 해당 결제 정보를 찾을 수 없습니다.");
            }

            // DB에서도 결제 정보 조회
            PaymentEntity paymentEntity = paymentRepo.findByImpUid(impUid);
            if (paymentEntity == null) {
                throw new IllegalArgumentException("DB에서 해당 결제 정보를 찾을 수 없습니다.");
            }

            // DB와 Iamport의 결제 정보 동기화
            PaymentDTO paymentDTO = new PaymentDTO(paymentEntity);
            paymentDTO.setPaymentAmount(iamportPayment.getAmount().intValue());
            paymentDTO.setPaymentStatus(paymentEntity.getPaymentStatus());
            paymentDTO.setPaymentMethod(paymentEntity.getPaymentMethod());
            paymentDTO.setPaymentBrand(iamportPayment.getCardName());
            // 결제 시각 설정 (이미 결제된 경우만)
            if (paymentEntity.getPaymentTime() != null) {
                paymentDTO.setPaymentTime(paymentEntity.getPaymentTime());
            }
            paymentDTO.setReceiptUrl(iamportPayment.getReceiptUrl());

            return paymentDTO;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("결제 정보 조회 중 오류가 발생했습니다.");
        }
    }

    // 결제 정보 조회
    public PaymentDTO getPaymentByMerchantUid(String merchantUid) {
        PaymentEntity payment = paymentRepo.findByMerchantUid(merchantUid);
        if (payment == null) {
            throw new IllegalArgumentException("해당 결제 정보를 찾을 수 없습니다.");
        }
        return new PaymentDTO(payment);
    }

    // 내 여행 페이지에서 사용
    public List<PaymentDTO> getPaymentsByOrderCode(Long orderCode) {
        List<PaymentEntity> payments = paymentRepo.findByOrder_OrderCode(orderCode);
        return payments.stream()
                .map(PaymentDTO::new)
                .collect(Collectors.toList());
    }

    public boolean refundPayment(String impUid, String reason) throws IOException {
        String accessToken = getAccessToken();
        URL url = new URL(IAMPORT_CANCEL_URL);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("Authorization", "Bearer " + accessToken);
        connection.setDoOutput(true);

        // 요청 데이터 설정
        String jsonBody = String.format("{\"imp_uid\":\"%s\",\"reason\":\"%s\"}", impUid, reason);
        connection.getOutputStream().write(jsonBody.getBytes(StandardCharsets.UTF_8));

        // 응답 처리
        int responseCode = connection.getResponseCode();
        if (responseCode != 200) {
            log.error("환불 실패 - HTTP 코드: {}", responseCode);
            return false;
        }

        log.info("환불 성공 - impUid: {}", impUid);
        return true;
    }

    public String getReceiptUrl(String impUid) throws IOException {
        String accessToken = getAccessToken();
        URL url = new URL(IAMPORT_PAYMENT_URL + "/" + impUid);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        connection.setRequestProperty("Authorization", "Bearer " + accessToken);

        // 응답 처리
        int responseCode = connection.getResponseCode();
        if (responseCode != 200) {
            log.error("영수증 발급 실패 - HTTP 코드: {}", responseCode);
            throw new IOException("영수증 발급 실패 - HTTP 코드: " + responseCode);
        }

        // JSON 파싱
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode responseNode = objectMapper.readTree(connection.getInputStream());
        String receiptUrl = responseNode.path("response").path("receipt_url").asText();

        if (receiptUrl == null || receiptUrl.isEmpty()) {
            log.error("영수증 URL 없음 - impUid: {}", impUid);
            throw new IOException("영수증 URL 없음");
        }

        log.info("영수증 발급 성공 - {}", receiptUrl);
        return receiptUrl;
    }

    // 결제 완료시 orderStatus를 예정된으로 변경
    @Transactional
    public void processPaymentSuccess(String impUid, Long orderCode) {
        PaymentEntity payment = paymentRepo.findOptionalByImpUid(impUid)
                .orElseThrow(() -> new RuntimeException("결제 정보를 찾을 수 없습니다."));

        // 결제 상태 업데이트
        payment.setPaymentStatus(PaymentStatus.COMPLETED);
        payment.setPaymentTime(LocalDateTime.now());
        paymentRepo.save(payment);

        // 주문 상태 업데이트
        OrderEntity order = orderRepo.findById(orderCode)
                .orElseThrow(() -> new RuntimeException("주문 정보를 찾을 수 없습니다."));

        if (order.getOrderStatus() == OrderStatus.PENDING) {
            order.setOrderStatus(OrderStatus.SCHEDULED);
            orderRepo.save(order);
            log.info("🟢 결제 성공 처리 - 주문 상태를 SCHEDULED로 변경: orderCode = {}", orderCode);


/*            // 댓글 알림
            if (order.getOrderStatus().equals(OrderStatus.SCHEDULED)) {

                Long memberCode = order.getMember().getMemberCode();
                String message = "주문 번호 " + orderCode + "의 결제가 완료되었습니다.";

                NotificationRequestDTO notificationRequest = NotificationRequestDTO.builder()
                        .memberCode(memberCode)
                        .notiMessage(message)
                        .notiOrderId(orderCode)
                        .build();

                notificationService.createNotification(notificationRequest);
                log.debug("결제 알림  요청 DTO 확인 : {}", notificationRequest);
                log.info("🟢 결제 완료 알림 전송: memberCode = {}, message = {}", memberCode, message);
            }*/

            // 5초 후에 알림 생성 및 전송
            sendDelayedNotification(order);

        } else {
            log.warn("🟠 결제 성공 처리 중단 - 이미 상태가 변경된 주문: orderCode = {}, status = {}", orderCode, order.getOrderStatus());
        }
    }

    // 비동기적으로 5초 지연 후 알림 생성 및 전송
    @Async
    public void sendDelayedNotification(OrderEntity order) {
        try {
            // 5초 지연
            TimeUnit.SECONDS.sleep(5);

            Long memberCode = order.getMember().getMemberCode();
            String message = "주문 번호 " + order.getOrderCode() + "의 결제가 완료되었습니다.";

            NotificationRequestDTO notificationRequest = NotificationRequestDTO.builder()
                    .memberCode(memberCode)
                    .notiMessage(message)
                    .notiOrderId(order.getOrderCode())
                    .build();

            notificationService.createNotification(notificationRequest);
            log.info("🟢 결제 완료 알림 전송 (5초 지연): memberCode = {}, message = {}", memberCode, message);
        } catch (InterruptedException e) {
            log.error("알림 전송 지연 중 오류 발생: {}", e.getMessage());
            Thread.currentThread().interrupt();
        } catch (Exception e) {
            log.error("알림 전송 중 오류 발생: {}", e.getMessage());
        }
    }

}
