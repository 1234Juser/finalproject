package com.hello.travelogic.order.service;


import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.member.repository.MemberRepository;
import com.hello.travelogic.order.domain.OptionEntity;
import com.hello.travelogic.order.domain.OrderEntity;
import com.hello.travelogic.order.domain.OrderStatus;
import com.hello.travelogic.order.dto.OrderDTO;
import com.hello.travelogic.order.repo.OptionRepo;
import com.hello.travelogic.order.repo.OrderRepo;
import com.hello.travelogic.payment.domain.PaymentEntity;
import com.hello.travelogic.payment.domain.PaymentStatus;
import com.hello.travelogic.payment.repo.PaymentRepo;
import com.hello.travelogic.payment.service.PaymentService;
import com.hello.travelogic.product.domain.ProductEntity;
import com.hello.travelogic.product.dto.ProductDTO;
import com.hello.travelogic.product.repo.ProductRepo;
import com.hello.travelogic.review.repo.ReviewRepo;
import com.siot.IamportRestClient.request.CancelData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Hibernate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;


@Service
@Slf4j
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepo orderRepo;
    private final OptionRepo optionRepo;
    private final ProductRepo productRepo;
    private final MemberRepository memberRepo;
    private final PaymentRepo paymentRepo;
    private final PaymentService paymentService;

    // 관리자의 주문조회
    @Transactional
    public Map<String, Object> getAllMemberBookingList(int start) {

        start = start > 0? start -1 : start;

        int size = 10;
        Pageable pageable = PageRequest.of(start, 10, Sort.by("orderDate").descending());
        Page<OrderEntity> page = orderRepo.findAllWithJoins(pageable);

        LocalDate today = LocalDate.now();
        List<OrderEntity> orderList = page.getContent();
        for (OrderEntity order : page.getContent()) {
            LocalDate resDate = order.getOption().getReservationDate();
            if (order.getOrderStatus() == OrderStatus.SCHEDULED && resDate != null && resDate.isBefore(today)) {
                order.setOrderStatus(OrderStatus.COMPLETED);
                orderRepo.save(order); // 자동 갱신
            }
        }

        List<OrderDTO> reservationList = page.getContent().stream()
                .map(order -> {
                    PaymentEntity payment = paymentRepo.findTopByOrder_OrderCode(order.getOrderCode()).orElse(null);
                    return new OrderDTO(order, payment);
                })
                .collect(Collectors.toList());

        Map<String, Object> map = new HashMap<>();
        map.put("reservations", reservationList);
        map.put("totalPages", page.getTotalPages());
        map.put("currentPage", page.getNumber() + 1);

        return map;
    }

    // 로그인 된 회원의 주문내역 조회 + reservationDate 기준으로 내림차순 정렬 추가
    @Transactional(readOnly = true)
    public List<OrderDTO> getRecentOrders(long memberCode) {
        MemberEntity member = memberRepo.findById(memberCode).orElseThrow();
        LocalDate cutoff = LocalDate.now().minusMonths(6);

        List<OrderEntity> orders = orderRepo.findRecentOrders(member, cutoff);
        return orders.stream()
                .map(order -> {
                    PaymentEntity payment = paymentRepo.findTopByOrder_OrderCode(order.getOrderCode()).orElse(null);
                    return new OrderDTO(order, payment);
                })
                .sorted((o1, o2) -> o2.getReservationDate().compareTo(o1.getReservationDate()))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<OrderDTO> getOldOrders(long memberCode) {
        MemberEntity member = memberRepo.findById(memberCode).orElseThrow();
        LocalDate cutoff = LocalDate.now().minusMonths(6);

        List<OrderEntity> orders = orderRepo.findOldOrders(member, cutoff);
        return orders.stream()
                .map(order -> {
                    PaymentEntity payment = paymentRepo.findTopByOrder_OrderCode(order.getOrderCode()).orElse(null);
                    return new OrderDTO(order, payment);
                })
                .sorted((o1, o2) -> o2.getReservationDate().compareTo(o1.getReservationDate()))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<OrderDTO> getOldOrdersByStatus(Long memberCode, String status, String startDateStr, String endDateStr) {
        MemberEntity member = memberRepo.findById(memberCode)
                .orElseThrow(() -> new NoSuchElementException("회원 없음: " + memberCode));

        OrderStatus orderStatus = OrderStatus.valueOf(status.toUpperCase()); // 대소문자 허용

        LocalDate startDate = LocalDate.parse(startDateStr);
        LocalDate endDate = LocalDate.parse(endDateStr);

        List<OrderEntity> orders = orderRepo.findOldOrdersByStatusInRange(member, orderStatus, startDate, endDate);

        return orders.stream()
                .map(order -> {
                    PaymentEntity payment = paymentRepo.findTopByOrder_OrderCode(order.getOrderCode()).orElse(null);
                    return new OrderDTO(order, payment);
                })
                .sorted((o1, o2) -> o2.getReservationDate().compareTo(o1.getReservationDate()))
                .collect(Collectors.toList());
    }

    @Transactional
    public List<OrderEntity> findAllWithAutoUpdate() {
        List<OrderEntity> orders = orderRepo.findAll();

        for (OrderEntity order : orders) {

            Hibernate.initialize(order.getOption());
            Hibernate.initialize(order.getMember());

            LocalDate resDate = order.getOption().getReservationDate();
            LocalDate today = LocalDate.now();

            // 예약일이 지났고 아직 상태가 SCHEDULED인 경우
            if (resDate != null && resDate.isBefore(today) && order.getOrderStatus() == OrderStatus.SCHEDULED) {
                order.setOrderStatus(OrderStatus.COMPLETED);
                orderRepo.save(order);
            }
        }
        return orders;
    }

    @Transactional
    public void cancelOrdersByAdmin(List<Long> orderCodeList) {

        for (Long orderCode : orderCodeList) {
            OrderEntity order = orderRepo.findById(orderCode)
                    .orElseThrow(() -> new IllegalArgumentException("해당 주문이 없습니다: " + orderCode));
            OrderStatus currentStatus = order.getOrderStatus();
            if (currentStatus != OrderStatus.SCHEDULED && currentStatus != OrderStatus.WAITING_BANK_TRANSFER) {
                throw new IllegalStateException("예약된 상태(SCHEDULED, 무통장 입금 대기)만 취소할 수 있습니다.");
            }
            if (currentStatus == OrderStatus.COMPLETED) {
                throw new IllegalStateException("완료된 주문은 취소할 수 없습니다.");
            }

            order.setOrderStatus(OrderStatus.CANCELED);

            PaymentEntity payment = paymentRepo.findTopByOrder_OrderCode(orderCode)
                    .orElseThrow(() -> new IllegalArgumentException("결제 정보 없음"));

            if (payment.getPaymentStatus() != PaymentStatus.COMPLETED
                    && payment.getPaymentStatus() != PaymentStatus.WAITING_BANK_TRANSFER) {
                throw new IllegalStateException("결제 완료 또는 무통장 입금 대기 상태에서만 취소할 수 있습니다.");
            }
            payment.setPaymentStatus(PaymentStatus.CANCELED);

            CancelData cancelData = new CancelData(payment.getImpUid(), false);
            cancelData.setReason("사용자 예약 취소로 인한 환불");

            paymentService.cancelPaymentByOrderCode(orderCode);

            orderRepo.save(order);
            paymentRepo.save(payment);
        }
    }

    @Transactional
    public void cancelOrderByMember(Long orderCode, Long memberCode) {

        OrderEntity order = orderRepo.findById(orderCode)
                .orElseThrow(() -> new IllegalArgumentException("주문이 존재하지 않습니다."));
        if (!order.getMember().getMemberCode().equals(memberCode)) {
            throw new SecurityException("본인의 예약만 취소할 수 있습니다.");
        }
        if (order.getOrderStatus() != OrderStatus.SCHEDULED
                && order.getOrderStatus() != OrderStatus.WAITING_BANK_TRANSFER) {
            throw new IllegalStateException("예약된 상태(SCHEDULED, 무통장 입금 대기)만 취소할 수 있습니다.");
        }
        if (order.getOrderStatus() == OrderStatus.COMPLETED) {
            throw new IllegalStateException("완료된 주문은 취소할 수 없습니다.");
        }
//        if (order.getOrderStatus() == OrderStatus.SCHEDULED) {
//            throw new IllegalStateException("예약된 상태(SCHEDULED)만 취소할 수 있습니다.");
//        }
        // 시연용 더미 예약 취소를 위해 주석처리
//        PaymentEntity payment = paymentRepo.findTopByOrder_OrderCode(orderCode)
//                .orElseThrow(() -> new IllegalArgumentException("결제 정보 없음"));
//        if (payment.getPaymentStatus() != PaymentStatus.COMPLETED
//                && payment.getPaymentStatus() != PaymentStatus.WAITING_BANK_TRANSFER) {
//            throw new IllegalStateException("결제 완료 또는 무통장 입금 대기 상태에서만 취소할 수 있습니다.");
//        }
        order.setOrderStatus(OrderStatus.CANCELED);
//        paymentService.cancelPaymentByOrderCode(orderCode);
        orderRepo.save(order);
        // 결제 상태도 같이 취소 처리 (더미 처리)
        paymentService.cancelPaymentByOrderCode(orderCode);
    }

    // 필터링
    public Map<String, Object> getReservationsByProduct(Long productCode, int start) {
        int page = (start <= 0) ? 0 : start - 1;
        Pageable pageable = PageRequest.of(page, 10, Sort.by(Sort.Direction.DESC, "orderDate"));

        Page<OrderEntity> pageResult = orderRepo.findByProduct_ProductCode(productCode, pageable);

        List<OrderDTO> dtoList = pageResult.getContent().stream()
                .map(order -> {
                    PaymentEntity payment = paymentRepo.findTopByOrder_OrderCode(order.getOrderCode()).orElse(null);
                    return new OrderDTO(order, payment);
                })
                .collect(Collectors.toList());

        Map<String, Object> result = new HashMap<>();
        result.put("list", dtoList);
        result.put("totalPages", pageResult.getTotalPages());
        result.put("currentPage", pageResult.getNumber() + 1); // 페이지 번호는 0부터 시작하므로 +1

        return result;
    }

    // 필터링 해서 상품별 조회
    public List<ProductDTO> getProductListForFilter() {
        return productRepo.findAll().stream()
                .sorted(Comparator.comparing(ProductEntity::getProductTitle))
                // 대소문자 무시
//                .sorted(Comparator.comparing(
//                        product -> product.getProductTitle().toLowerCase(),
//                        String.CASE_INSENSITIVE_ORDER))
                .map(ProductDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public Map<String, Object> createOrder(OrderDTO orderDTO) {
        if (orderDTO.getProductCode() == 0 || orderDTO.getOptionCode() == 0 || orderDTO.getMemberCode() == 0) {
            throw new IllegalArgumentException("상품 코드, 옵션 코드, 회원 코드는 필수입니다.");
        }
        ProductEntity product = productRepo.findById(orderDTO.getProductCode())
                .orElseThrow(() -> new IllegalArgumentException("상품이 존재하지 않습니다."));
        OptionEntity option = optionRepo.findById(orderDTO.getOptionCode())
                .orElseThrow(() -> new IllegalArgumentException("옵션이 존재하지 않습니다."));
        MemberEntity member = memberRepo.findById(orderDTO.getMemberCode())
                .orElseThrow(() -> new IllegalArgumentException("회원이 존재하지 않습니다."));

        String bookingUid = BookingUidUtil.generateBookingUid();

        OrderEntity order = new OrderEntity();
        order.setProduct(product);
        order.setOption(option);
        order.setMember(member);
        order.setBookingUid(bookingUid);
        order.setOrderAdultPrice(orderDTO.getOrderAdultPrice());
        order.setOrderChildPrice(orderDTO.getOrderChildPrice());
        order.setTotalPrice(orderDTO.getTotalPrice());
        order.setOrderDate(LocalDateTime.now());
        order.setOrderStatus(OrderStatus.PENDING); // 기본 상태는 결제 대기

        orderRepo.save(order);

        Map<String, Object> result = new HashMap<>();
        result.put("orderCode", order.getOrderCode());
        result.put("bookingUid", order.getBookingUid());

        return result;
    }

    // 주문 생성
    @Transactional(readOnly = true)
    public OrderDTO getOrder(Long orderCode) {
        OrderEntity order = orderRepo.findById(orderCode)
                .orElseThrow(() -> new IllegalArgumentException("주문이 존재하지 않습니다."));
        PaymentEntity payment = paymentRepo.findTopByOrder_OrderCode(orderCode).orElse(null);
        return new OrderDTO(order, payment);
    }

    // 주문 완료 처리 (결제 대기 상태에서 결제 완료로)
    @Transactional
    public void completeOrder(Long orderCode, String paymentMethod, int totalPrice) {
        OrderEntity order = orderRepo.findById(orderCode)
                .orElseThrow(() -> new IllegalArgumentException("해당 주문을 찾을 수 없습니다."));

        // PENDING 상태가 아니면 결제 불가
        if (order.getOrderStatus() != OrderStatus.PENDING) {
            throw new IllegalStateException("PENDING 상태의 주문만 결제할 수 있습니다.");
        }

        // 결제 완료 처리
        if (paymentMethod.equals("BANK_TRANSFER")) {
            order.setOrderStatus(OrderStatus.WAITING_BANK_TRANSFER);
        } else {
            order.setOrderStatus(OrderStatus.SCHEDULED);
        }
        order.setTotalPrice(totalPrice);
        orderRepo.save(order);
    }

    // PENDING 상태의 주문 삭제 (결제 실패 or 취소)
    @Transactional
    public void deletePendingOrder(Long orderCode) {
        // 중복요청 방지 버전
        try {
            Optional<OrderEntity> optionalOrder = orderRepo.findById(orderCode);

            if (optionalOrder.isEmpty()) {
                return;
            }
            OrderEntity order = optionalOrder.get();

            // PENDING 상태가 아닌 경우 삭제 불가
            if (order.getOrderStatus() != OrderStatus.PENDING) {
                return;
            }

            try {
                Long optionCode = order.getOption().getOptionCode();
                // 삭제 처리
                orderRepo.delete(order);
                optionRepo.deleteById(optionCode);
            } catch (ObjectOptimisticLockingFailureException e) {
                log.warn("중복 삭제 요청 감지");
            }

        } catch (Exception e) {
            System.err.println("주문 삭제 중 오류 발생: orderCode = " + orderCode);
        }
    }

    // orderStatus가 PENDING인경우 어느정도 대기시간을 주다가 orderCode삭제
    @Scheduled(cron = "0 0 * * * *") // 매 시간마다
    public void cleanUpPendingOrders() {
        List<OrderEntity> pendingOrders = orderRepo.findAllByOrderStatusAndOrderDateBefore(
                OrderStatus.PENDING,
                LocalDateTime.now().minusMinutes(5) // 5분 이상 된 PENDING
        );

        for (OrderEntity order : pendingOrders) {
            orderRepo.delete(order);
        }
    }

    // bookingUid로 예약 명세서페이지 출력
    @Transactional(readOnly = true)
    public OrderDTO getOrderByBookingUid(String bookingUid, Long memberCode) {
        OrderEntity order = orderRepo.findByBookingUid(bookingUid)
                .orElseThrow(() -> new IllegalArgumentException("해당 주문을 찾을 수 없습니다."));
        if (!order.getMember().getMemberCode().equals(memberCode)) {
            throw new AccessDeniedException("해당 예약에 대한 접근 권한이 없습니다.");
        }
        PaymentEntity payment = paymentRepo.findTopByOrder_OrderCode(order.getOrderCode()).orElse(null);
        return new OrderDTO(order, payment);
    }

    // 메인페이지 리뷰 작성 요청에 사용
    @Transactional(readOnly = true)
    public Optional<OrderDTO> getLatestUnreviewedCompletedOrder(Long memberCode) {
        return orderRepo
                .findFirstByMember_MemberCodeAndOrderStatusAndIsReviewedFalseOrderByOrderDateDesc(
                        memberCode, OrderStatus.COMPLETED)
                .map(order -> {
                    PaymentEntity payment = paymentRepo.findTopByOrder_OrderCode(order.getOrderCode()).orElse(null);
                    return new OrderDTO(order, payment);
                });
    }
}