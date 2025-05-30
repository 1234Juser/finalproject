package com.hello.travelogic.payment.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.member.repository.MemberRepository;
import com.hello.travelogic.notification.dto.NotificationRequestDTO;
import com.hello.travelogic.notification.service.NotificationAsyncService;
import com.hello.travelogic.notification.service.NotificationService;
import com.hello.travelogic.order.domain.OrderEntity;
import com.hello.travelogic.order.domain.OrderStatus;
import com.hello.travelogic.order.repo.OrderRepo;
import com.hello.travelogic.payment.domain.PaymentEntity;
import com.hello.travelogic.payment.domain.PaymentMethod;
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
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
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
    private final NotificationAsyncService notificationAsyncService;
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
            throw new IOException("Access Token 발급 실패 - Iamport 응답코드: " + responseCode);
        }

        // JSON 파싱
        JsonNode responseNode = objectMapper.readTree(connection.getInputStream());
        String accessToken = responseNode.path("response").path("access_token").asText();

        if (accessToken == null || accessToken.isEmpty()) {
            throw new IOException("Access Token 발급 실패 - 응답 데이터 없음");
        }

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

        // merchantUid 생성이었는데 프론트에서 생성해준 값 받기로 변경

        // 결제 엔티티 생성 및 저장
        PaymentEntity payment = new PaymentEntity(paymentDTO, member, order);
        PaymentMethod method = paymentDTO.getPaymentMethod();
        if (method == PaymentMethod.BANK_TRANSFER) {
            payment.setPaymentStatus(PaymentStatus.WAITING_BANK_TRANSFER);
        } else if (paymentDTO.getImpUid() != null && !paymentDTO.getImpUid().isBlank()) {
            payment.setPaymentStatus(PaymentStatus.COMPLETED);  // 기본 결제 상태 설정

            // 3초 후에 결제 알림 전송
            notificationAsyncService.sendDelayedNotification(order);
        } else {
            payment.setPaymentStatus(PaymentStatus.PENDING); // 예외적인 경우만
        }
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

            PaymentEntity paymentEntity = paymentRepo.findOptionalByImpUid(impUid)
                    .orElseThrow(() -> new IllegalArgumentException("해당 결제 정보가 DB에 존재하지 않습니다."));

            // 현재 상태 확인
            PaymentStatus currentStatus = paymentEntity.getPaymentStatus();

            if (!isValidStatusTransition(currentStatus, status)) {
                throw new IllegalStateException("잘못된 상태 전환입니다: " + currentStatus + " -> " + status);
            }
            // 상태 변경 후 저장
            paymentEntity.setPaymentStatus(status);
            paymentRepo.save(paymentEntity);
            paymentRepo.flush();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("결제 상태 변경 중 문제가 발생했습니다.", e);
        }
    }

    // 상태 전환 규칙 검사
    private boolean isValidStatusTransition(PaymentStatus currentStatus, PaymentStatus Status) {
        return switch (Status) {
            case COMPLETED -> currentStatus == PaymentStatus.PENDING || currentStatus == PaymentStatus.WAITING_BANK_TRANSFER;
            case FAILED -> currentStatus == PaymentStatus.PENDING || currentStatus == PaymentStatus.COMPLETED;
            case EXPIRED -> currentStatus == PaymentStatus.PENDING || currentStatus == PaymentStatus.WAITING_BANK_TRANSFER;
            case REFUNDED -> currentStatus == PaymentStatus.COMPLETED;
            case CANCELED -> currentStatus == PaymentStatus.COMPLETED;
            default -> false;
        };
    }

    // 결제 취소 2종
    // DB와 아임포트 서버 모두 상태변경
    @Transactional
    public void cancelPaymentByOrderCode(Long orderCode) {
        PaymentEntity payment = paymentRepo.findTopByOrder_OrderCode(orderCode)
                .orElseThrow(() -> new IllegalArgumentException("결제 정보 없음"));

        Optional<PaymentEntity> paymentOpt = paymentRepo.findTopByOrder_OrderCode(orderCode);

        if (paymentOpt.isEmpty()) {
            log.warn("결제 정보 없음: orderCode = {}", orderCode);
            return; // 실제 결제가 없는 더미 데이터
        }
        PaymentStatus status = payment.getPaymentStatus();

        // 시연용 더미 예약 취소를 위해 주석처리
//        if (status == PaymentStatus.COMPLETED) {
//            // 카드/카카오페이 등의 결제 완료 → 아임포트 서버에 취소 요청
//        CancelData cancelData = new CancelData(payment.getImpUid(), false);
//        cancelData.setReason("예약 취소로 인한 환불");
//
//        try {
//            IamportResponse<Payment> response = iamportClient.cancelPaymentByImpUid(cancelData);
//            if (response.getResponse() == null) {
//                throw new IllegalStateException("아임포트 결제 취소 실패: " + response.getMessage());
//            }
//        } catch (Exception e) {
//            throw new RuntimeException("결제 취소 중 오류 발생", e);
//        }
//
//    } else if (status == PaymentStatus.WAITING_BANK_TRANSFER) {
//        // 무통장 입금은 입금이 안 된 상태이므로 아임포트에 취소 요청 불필요
//    } else {
//        throw new IllegalStateException("결제 완료 또는 무통장 입금 대기 상태만 취소할 수 있습니다.");
//    }
        payment.setPaymentStatus(PaymentStatus.CANCELED);
        paymentRepo.save(payment);
    }

    @Transactional
    public boolean cancelPayment(String impUid) {
        try {
            CancelData cancelData = new CancelData(impUid, false);
            cancelData.setReason("고객 요청에 따른 결제 취소");

            IamportResponse<Payment> response = iamportClient.cancelPaymentByImpUid(cancelData);
            if (response.getResponse() == null) {
                throw new IllegalStateException("아임포트 결제 취소 실패: " + response.getMessage());
            }

            PaymentEntity payment = paymentRepo.findOptionalByImpUid(impUid)
                    .orElseThrow(() -> new IllegalArgumentException("결제 정보 없음"));
            payment.setPaymentStatus(PaymentStatus.CANCELED);
            return true;

        } catch (Exception e) {
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
            return false;
        }

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
            throw new IOException("영수증 발급 실패 - HTTP 코드: " + responseCode);
        }

        // JSON 파싱
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode responseNode = objectMapper.readTree(connection.getInputStream());
        String receiptUrl = responseNode.path("response").path("receipt_url").asText();

        if (receiptUrl == null || receiptUrl.isEmpty()) {
            throw new IOException("영수증 URL 없음");
        }
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
            if (payment.getPaymentMethod() == PaymentMethod.BANK_TRANSFER) {
                // 무통장입금이면 WAITING_BANK_TRANSFER로 상태 설정
                order.setOrderStatus(OrderStatus.WAITING_BANK_TRANSFER);
            } else {
                order.setOrderStatus(OrderStatus.SCHEDULED);
            }
            orderRepo.save(order);
            log.info("🟢 결제 성공 처리 - 주문 상태를 SCHEDULED로 변경: orderCode = {}", orderCode);
        }
    }

    @Transactional
    public void processPaymentWebhook(String impUid) {
        // 아임포트에서 impUid 기반 결제정보 확인
        try {
            IamportResponse<Payment> response = iamportClient.paymentByImpUid(impUid);
            Payment iamportPayment = response.getResponse();
            if (iamportPayment == null) {
                return; // 또는 예외 throw
            }

            // DB 조회
            PaymentEntity payment = paymentRepo.findByImpUid(impUid);
            if (payment == null) {
                throw new IllegalArgumentException("DB 결제 정보 없음");
            }

            if (iamportPayment.getStatus().equals("paid")) {
                payment.setPaymentStatus(PaymentStatus.COMPLETED);
                payment.setPaymentTime(LocalDateTime.now());
                paymentRepo.save(payment);

                OrderEntity order = payment.getOrder();
                if (order.getOrderStatus() == OrderStatus.PENDING) {
                    order.setOrderStatus(OrderStatus.SCHEDULED);
                    orderRepo.save(order);
                }
            } else {
                System.out.println("Webhook 수신: 결제 상태가 paid가 아닙니다. 현재 상태 = " + iamportPayment.getStatus());
            }
        } catch (Exception e) {
            System.err.println("Webhook 처리 중 예외 발생: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @Scheduled(cron = "59 59 23 * * *") // 초 분 시 일 월 요일
    @Transactional
    public void expireUnpaidBankTransfers() {
        LocalDateTime now = LocalDateTime.now();
        List<PaymentEntity> waitingList = paymentRepo.findAllByPaymentMethodAndPaymentStatus(
                PaymentMethod.BANK_TRANSFER,
                PaymentStatus.WAITING_BANK_TRANSFER
        );

        for (PaymentEntity payment : waitingList) {
            // 예: 결제 생성 후 24시간이 지났는지 확인
//            if (payment.getPaymentTime().isBefore(now.minusHours(24))) {
            // 아임포트가 발급해준 입금마감 기한 기준 버전
            if (payment.getVbankDue() != null && payment.getVbankDue().isBefore(now)) {
                payment.setPaymentStatus(PaymentStatus.EXPIRED);
                paymentRepo.save(payment);

                // 주문 상태도 CANCELED로 변경
                OrderEntity order = payment.getOrder();
                if (order.getOrderStatus() == OrderStatus.WAITING_BANK_TRANSFER) {
                    order.setOrderStatus(OrderStatus.CANCELED);
                    orderRepo.save(order);

                    // 🔔 결제 취소 알림 전송
                    String productName = order.getProduct().getProductTitle();
                    String message = "⏰ 무통장입금 기한이 지나 [" + productName + "] 상품이 자동 취소되었습니다.";

                    NotificationRequestDTO notiRequest = NotificationRequestDTO.builder()
                            .memberCode(order.getMember().getMemberCode()) // 사용자 코드
                            .notiMessage(message) // 알림 내용
                            .notiOrderId(order.getOrderCode()) // 연관 주문코드
                            .build();

                    notificationService.createNotification(notiRequest); // 알림 생성 및 SSE 전송
                    log.debug("notiRequest = {}", notiRequest);

                    log.info("🔴 무통장입금 미입금으로 자동 취소: orderCode = {}", order.getOrderCode());
                }
            }
        }
    }

    public PaymentDTO getPaymentByBookingUid(String bookingUid) {
        PaymentEntity payment = paymentRepo.findByOrder_BookingUidWithProduct(bookingUid)
                .orElseThrow(() -> new RuntimeException("해당 bookingUid의 결제 정보를 찾을 수 없습니다."));
        return new PaymentDTO(payment);
    }
}
