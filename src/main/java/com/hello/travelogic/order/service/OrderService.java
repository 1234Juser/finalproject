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
    // 관리자 상품별 추가하면서 수정됐음
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
                .map(OrderDTO::new)
                .collect(Collectors.toList());

        Map<String, Object> map = new HashMap<>();
        map.put("reservations", reservationList);
        map.put("totalPages", page.getTotalPages());
        map.put("currentPage", page.getNumber() + 1);

        return map;
    }

    // 관리자의 주문조회
    // 구버전인데 안지우고..
//    @Transactional
//    public Map<String, Object> getAllMemberBookingList(int start) {
//
//        start = start > 0? start -1 : start;
//
//        int size = 10;
//        Pageable pageable = PageRequest.of(start, size, Sort.by(Sort.Order.desc("orderDate")));
//        Page<OrderEntity> page = orderRepo.findAll(pageable);
//        List<OrderEntity> listE = page.getContent();
//
//        LocalDate today = LocalDate.now();
//        for (OrderEntity order : page.getContent()) {
//            LocalDate resDate = order.getOption().getReservationDate();
//            if (order.getOrderStatus() == OrderStatus.SCHEDULED && resDate != null && resDate.isBefore(today)) {
//                order.setOrderStatus(OrderStatus.COMPLETED);
//                orderRepo.save(order); // 자동 갱신
//            }
//        }
//
//        Map<String, Object> map = new HashMap<>();
//        map.put("list", listE.stream().map(entity -> new OrderDTO(entity)).toList());
//        map.put("totalPages", page.getTotalPages());
//        map.put("currentPage", page.getNumber() + 1);
//
//        return map;
//    }

    // 로그인 된 회원의 주문내역 조회
    @Transactional(readOnly = true)
    public List<OrderDTO> getRecentOrders(long memberCode) {
        MemberEntity member = memberRepo.findById(memberCode).orElseThrow();
        LocalDate cutoff = LocalDate.now().minusMonths(6);
        return orderRepo.findRecentOrders(member, cutoff).stream()
                .map(OrderDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<OrderDTO> getOldOrders(long memberCode) {
        MemberEntity member = memberRepo.findById(memberCode).orElseThrow();
        LocalDate cutoff = LocalDate.now().minusMonths(6);
        return orderRepo.findOldOrders(member, cutoff).stream()
                .map(OrderDTO::new)
                .collect(Collectors.toList());
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

//    @Transactional(readOnly = true)
//    public List<OrderDTO> getOrdersByUsername(String username) {
//        MemberEntity member = memberRepo.findByMemberId(username)
//                .orElseThrow(() -> new UsernameNotFoundException("회원이 존재하지 않습니다."));
//
//        Pageable pageable = PageRequest.of(0, 4); // 예: 첫 페이지, 100개씩
//        Page<OrderEntity> orderPage = orderRepo.findByMember(member, pageable);
//
//        return orderPage.getContent().stream()
//                .map(OrderDTO::new)
//                .collect(Collectors.toList());
//    }

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
    public void cancelOrderByMember(Long orderCode, Long memberCode) {

        OrderEntity order = orderRepo.findById(orderCode)
                .orElseThrow(() -> new IllegalArgumentException("주문이 존재하지 않습니다."));
        if (!order.getMember().getMemberCode().equals(memberCode)) {
            throw new SecurityException("본인의 예약만 취소할 수 있습니다.");
        }
        if (order.getOrderStatus() != OrderStatus.SCHEDULED) {
            throw new IllegalStateException("예약된 상태(SCHEDULED)만 취소할 수 있습니다.");
        }
        if (order.getOrderStatus() == OrderStatus.SCHEDULED) {
            order.setOrderStatus(OrderStatus.CANCELED);
            orderRepo.save(order);
        }
    }

    // 필터링
    public Map<String, Object> getReservationsByProduct(Long productCode, int start) {
        int page = (start <= 0) ? 0 : start - 1;
        Pageable pageable = PageRequest.of(page, 10, Sort.by(Sort.Direction.DESC, "orderDate"));

        Page<OrderEntity> pageResult = orderRepo.findByProduct_ProductCode(productCode, pageable);

        List<OrderDTO> dtoList = pageResult.getContent().stream()
                .map(OrderDTO::new)
                .collect(Collectors.toList());

        Map<String, Object> result = new HashMap<>();
        result.put("list", dtoList);
        result.put("totalPages", pageResult.getTotalPages());
        result.put("currentPage", pageResult.getNumber() + 1); // 페이지 번호는 0부터 시작하므로 +1

        return result;
    }

    // 필터링 해서 상품별 조회
    public List<Map<String, Object>> getProductListForFilter() {
        return productRepo.findAll().stream()
                .map(product -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("productCode", product.getProductCode());
                    map.put("productTitle", product.getProductTitle());
                    return map;
                })
                .collect(Collectors.toList());
    }
}