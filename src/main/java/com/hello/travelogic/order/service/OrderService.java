package com.hello.travelogic.order.service;


import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.member.repository.MemberRepository;
import com.hello.travelogic.order.domain.OptionEntity;
import com.hello.travelogic.order.domain.OrderEntity;
import com.hello.travelogic.order.domain.OrderStatus;
import com.hello.travelogic.order.dto.OrderDTO;
import com.hello.travelogic.order.repo.OptionRepo;
import com.hello.travelogic.order.repo.OrderRepo;
import com.hello.travelogic.product.domain.ProductEntity;
import com.hello.travelogic.product.repo.ProductRepo;
import com.hello.travelogic.review.repo.ReviewRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
@Slf4j
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepo orderRepo;
    private final OptionRepo optionRepo;
    private final ReviewRepo reviewRepo;
    private final ProductRepo productRepo;
    private final MemberRepository memberRepo;

    // 관리자의 주문조회
    @Transactional
    public Map<String, Object> getAllMemberBookingList(int start) {

        start = start > 0? start -1 : start;

        int size = 10;
        Pageable pageable = PageRequest.of(start, size, Sort.by(Sort.Order.desc("orderDate")));
        Page<OrderEntity> page = orderRepo.findAll(pageable);
        List<OrderEntity> listE = page.getContent();

        LocalDate today = LocalDate.now();
        for (OrderEntity order : page.getContent()) {
            LocalDate resDate = order.getOption().getReservationDate();
            if (order.getOrderStatus() == OrderStatus.SCHEDULED && resDate != null && resDate.isBefore(today)) {
                order.setOrderStatus(OrderStatus.COMPLETED);
                orderRepo.save(order); // 자동 갱신
            }
        }

        Map<String, Object> map = new HashMap<>();
        map.put("list", listE.stream().map(entity -> new OrderDTO(entity)).toList());
        map.put("totalPages", page.getTotalPages());
        map.put("currentPage", page.getNumber() + 1);

        return map;
    }

    // 로그인 된 회원의 주문내역 조회
    @Transactional
    public Map<String, Object> getMyBookingList(long memberCode, int start) {

        MemberEntity member = memberRepo.findById(memberCode)
                .orElseThrow(() -> new IllegalArgumentException("회원이 존재하지 않습니다."));

        start = start > 0? start -1 : start;

        int size = 4;
        Pageable pageable = PageRequest.of(start, size, Sort.by(Sort.Order.desc("orderDate")));
        Page<OrderEntity> page = orderRepo.findByMember(member, pageable);
        List<OrderEntity> listE = page.getContent();

        LocalDate today = LocalDate.now();
        for (OrderEntity order : page.getContent()) {
            LocalDate resDate = order.getOption().getReservationDate();
            if (order.getOrderStatus() == OrderStatus.SCHEDULED && resDate != null && resDate.isBefore(today)) {
                order.setOrderStatus(OrderStatus.COMPLETED);
                orderRepo.save(order); // 자동 갱신
            }
        }

        Map<String, Object> map = new HashMap<>();
        map.put("list", listE.stream().map(entity -> new OrderDTO(entity)).toList());
        map.put("totalPages", page.getTotalPages());
        map.put("currentPage", page.getNumber() + 1);

        return map;
    }

    @Transactional
    public Long createOrder(OrderDTO dto) {
        ProductEntity product = productRepo.findById(dto.getProductCode())
                .orElseThrow(() -> new IllegalArgumentException("상품이 존재하지 않습니다."));
        OptionEntity option = optionRepo.findById(dto.getOptionCode())
                .orElseThrow(() -> new IllegalArgumentException("옵션이 존재하지 않습니다."));
        MemberEntity member = memberRepo.findById(dto.getMemberCode())
                .orElseThrow(() -> new IllegalArgumentException("회원이 존재하지 않습니다."));

        OrderEntity order = new OrderEntity(dto, product, option, member);
        order = orderRepo.save(order);
        return order.getOrderCode();
    }

    @Transactional(readOnly = true)
    public OrderDTO getOrder(Long orderCode) {
        OrderEntity order = orderRepo.findById(orderCode)
                .orElseThrow(() -> new IllegalArgumentException("주문이 존재하지 않습니다."));
//        OptionEntity option = optionRepo.findById(dto.getOptionCode())
//                .orElseThrow(() -> new IllegalArgumentException("옵션이 존재하지 않습니다."));
        return new OrderDTO(order);
    }

    @Transactional(readOnly = true)
    public List<OrderDTO> getOrdersByMemberCode(Long memberCode) {

        MemberEntity member = memberRepo.findById(memberCode)
                .orElseThrow(() -> new IllegalArgumentException("회원이 존재하지 않습니다."));

        Pageable pageable = PageRequest.of(0, 4); // 예: 첫 페이지, 100개씩
        Page<OrderEntity> orderPage = orderRepo.findByMember(member, pageable);

        return orderPage.getContent().stream()
                .map(OrderDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<OrderDTO> getOrdersByUsername(String username) {
        MemberEntity member = memberRepo.findByMemberId(username)
                .orElseThrow(() -> new UsernameNotFoundException("회원이 존재하지 않습니다."));

        Pageable pageable = PageRequest.of(0, 4); // 예: 첫 페이지, 100개씩
        Page<OrderEntity> orderPage = orderRepo.findByMember(member, pageable);

        return orderPage.getContent().stream()
                .map(OrderDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public int updateOrderStatusIfCompleted(Long orderCode) {

        OrderEntity order = orderRepo.findById(orderCode)
                .orElseThrow(() -> new IllegalArgumentException("주문이 존재하지 않습니다."));

        LocalDate resDate = order.getOption().getReservationDate();
        if (resDate != null && resDate.isBefore(LocalDate.now())) {
            order.setOrderStatus(OrderStatus.COMPLETED);
            orderRepo.save(order);
            return 1; // 상태가 바뀐 경우
        }

        return 0;
    }

    @Transactional
    public void cancelOrdersByAdmin(List<Long> orderCodeList) {

        for (Long orderCode : orderCodeList) {
            OrderEntity order = orderRepo.findById(orderCode)
                    .orElseThrow(() -> new IllegalArgumentException("해당 주문이 없습니다: " + orderCode));

            order.setOrderStatus(OrderStatus.CANCELED);
            orderRepo.save(order);
        }
    }

    @Transactional
    public void cancelOrderByMember(Long orderCode) {

        OrderEntity order = orderRepo.findById(orderCode)
                .orElseThrow(() -> new IllegalArgumentException("주문이 존재하지 않습니다."));
        order.setOrderStatus(OrderStatus.CANCELED);
    }

//    public int updateOrdersToCompleted(Long orderCode) {
//        List<OrderEntity> orders = orderRepo.findByOrderStatus(OrderStatus.SCHEDULED);
//
//        int count = 0;
//        LocalDate today = LocalDate.now();
//
//        for (OrderEntity order : orders) {
//            LocalDate reservationDate = order.getOption().getReservationDate();
//            if (reservationDate != null && reservationDate.isBefore(today)) {
//                order.setOrderStatus(OrderStatus.COMPLETED);
//                count++;
//            }
//        }

//        return count;
//    }




//    public List<OrderDTO> getBookingsByMemberCodeAndStatus(String memberId, OrderStatus orderStatus) {
//        List<OrderDTO> bookings;
//        if (orderStatus == null) {
//            bookings = orderRepo.findAllByMemberId(memberId);
//        } else {
//            bookings = orderRepo.findAllByMemberIdAndOrderStatus(memberId, orderStatus);
//        }
//        return orderRepo.findAll()
//                .stream()
//                .map(OrderDTO::new)
//                .collect(Collectors.toList());
//    }

//    public List<OrderDTO> getAllMemberBookingList() {
//        return orderRepo.findAll()
//                .stream()
//                .map(entity -> new OrderDTO(entity))
//                .toList();
//    }

//    @Transactional(readOnly = true)
//    public List<OrderDTO> getCompletedOrders(long memberCode) {
//        List<OrderEntity> orders = orderRepo.findByMember_MemberCodeAndOrderStatus(memberCode, OrderStatus.COMPLETED);
//
//        return orders.stream()
//                .map(order -> {
//                    OrderDTO dto = new OrderDTO(order);
//                    boolean isReviewed = reviewRepo.existsByOrder_OrderCode(order.getOrderCode());
//                    dto.setReviewed(isReviewed);  // 추가
//                    return dto;
//                })
//                .collect(Collectors.toList());
//    }

    // 지난 여행 내역 조회 시 리뷰작성 여부
//    public List<OrderDTO> getPastTripsByMember(long memberCode) {
//        List<OrderEntity> orders = orderRepo.findPastTripsByMember(memberCode);
//
//        return orders.stream()
//                .map(order -> {
//                    OrderDTO dto = new OrderDTO(order);
//                    boolean reviewed = reviewRepo.existsByOrder_OrderCode(order.getOrderCode());
//                    dto.setReviewed(reviewed);
//                    return dto;
//                })
//                .collect(Collectors.toList());
//    }

//    public Map<String, Object> getAllMemberBookingList(int start) {
//        start = start > 0? start -1 : start;
//        int size = 10;   // 한 페이지에 10개 항목
//        Pageable pageable = PageRequest.of(start, size, Sort.by(Sort.Order.desc("orderDate")));
//        Page<OrderEntity> page = orderRepo.findAll(pageable);
//        List<OrderEntity> listE = page.getContent();
//
//        Map<String, Object> map = new HashMap<>();
//        map.put("list", listE.stream().map(entity -> new OrderDTO(entity)).toList());
//        map.put("totalPages", page.getTotalPages());
//        map.put("currentPage", page.getNumber() + 1);
//        return map;
//    }
}
