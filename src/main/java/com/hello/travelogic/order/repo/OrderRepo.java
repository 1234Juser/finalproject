package com.hello.travelogic.order.repo;

import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.order.domain.OrderEntity;
import com.hello.travelogic.order.domain.OrderStatus;
import com.hello.travelogic.order.dto.OrderDTO;
import com.hello.travelogic.payment.domain.PaymentStatus;
import com.hello.travelogic.product.domain.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OrderRepo extends JpaRepository<OrderEntity, Long> {
    List<OrderEntity> findAllByMember_MemberCode(long memberCode);

    List<OrderEntity> findAllByMember_MemberCodeAndOrderStatus(long memberCode, OrderStatus orderStatus);

    // 리뷰기능에 사용
    Optional<OrderEntity> findByOrderCode(long orderCode);

    // 본인 예약내역 조회에 사용
    List<OrderEntity> findByMember(MemberEntity member);

    Page<OrderEntity> findByMember(MemberEntity member, Pageable pageable);

    List<OrderEntity> findByOrderStatus(OrderStatus orderStatus);

    List<OrderEntity> findByMemberAndOrderStatus(MemberEntity member, OrderStatus orderStatus);

    // Order와 Product를 OneToOne에서 ManyToOne으로 바꾸며 생긴 오류
    @Query("SELECT o FROM OrderEntity o JOIN FETCH o.product JOIN FETCH o.member")
    List<OrderEntity> findAllWithProductAndMember();

    // Option와 Product를 OneToOne에서 ManyToOne으로 바꾸며 생긴 오류
    @Query("SELECT o FROM OrderEntity o JOIN FETCH o.option JOIN FETCH o.product JOIN FETCH o.member")
    List<OrderEntity> findAllWithJoins();
//    @EntityGraph(attributePaths = {"option", "product", "member"})
//    List<OrderEntity> findAll()

    // 6개월 이내 주문만 보기
    @Query("SELECT o FROM OrderEntity o JOIN FETCH o.option WHERE o.member = :member AND o.option.reservationDate >= :cutoffDate ORDER BY o.orderDate DESC")
    List<OrderEntity> findRecentOrders(@Param("member") MemberEntity member, @Param("cutoffDate") LocalDate cutoffDate);

    // 더 이전 주문 보기
    @Query("SELECT o FROM OrderEntity o JOIN FETCH o.option WHERE o.member = :member AND o.option.reservationDate < :cutoffDate ORDER BY o.orderDate DESC")
    List<OrderEntity> findOldOrders(@Param("member") MemberEntity member, @Param("cutoffDate") LocalDate cutoffDate);

    // 관리자의 상품별 예약 조회
    Page<OrderEntity> findByProduct_ProductCode(Long productCode, Pageable pageable);

    @Query(value = "SELECT o FROM OrderEntity o JOIN FETCH o.option JOIN FETCH o.product JOIN FETCH o.member",
            countQuery = "SELECT COUNT(o) FROM OrderEntity o")
    Page<OrderEntity> findAllWithJoins(Pageable pageable);

    // 한 사람이 한 날에 같은 상품의 옵션 여러개 생성하는거 방지
    boolean existsByMemberAndProductAndOption_ReservationDate(MemberEntity member, ProductEntity product, LocalDate reservationDate);

    // PENDING으로 오랜시간 존재 시 삭제
    List<OrderEntity> findAllByOrderStatusAndOrderDateBefore(OrderStatus orderStatus, LocalDateTime localDateTime);

    // bookingUid로 명세서 출력
    Optional<OrderEntity> findByBookingUid(String bookingUid);

    // 예약일자와 주문상태 조회
    List<OrderEntity> findByOrderStatusAndOptionReservationDate (OrderStatus orderStatus, LocalDate tomorrow);

    // 주문상태, 옵션 예약일자, 결제 상태를 기준으로 orderEntity 목록 조회
    @Query("SELECT o FROM OrderEntity o JOIN o.option opt JOIN PaymentEntity p ON o.orderCode = p.order.orderCode WHERE o.orderStatus = :orderStatus AND opt.reservationDate = :optionReservationDate AND p.paymentStatus = :paymentStatus")
    List<OrderEntity> findOrdersByOrderStatusAndOptionReservationDateAndPaymentStatus(
            @Param("orderStatus") OrderStatus orderStatus,
            @Param("optionReservationDate") LocalDate optionReservationDate,
            @Param("paymentStatus") PaymentStatus paymentStatus
    );

    // 가장 최신의 리뷰 미작성 주문 조회 (1건)
    Optional<OrderEntity> findFirstByMember_MemberCodeAndOrderStatusAndIsReviewedFalseOrderByOrderDateDesc(
            Long memberCode, OrderStatus orderStatus);

    // 예약 상태별 조회
    @Query("SELECT o FROM OrderEntity o JOIN FETCH o.option " +
            "WHERE o.member = :member AND o.orderStatus = :status " +
            "AND o.option.reservationDate BETWEEN :startDate AND :endDate " +
            "ORDER BY o.orderDate DESC")
    List<OrderEntity> findOldOrdersByStatusInRange(
            @Param("member") MemberEntity member,
            @Param("status") OrderStatus status,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    // 관리자의 상품별 예약조회에 상태별 추가
    Page<OrderEntity> findByProduct_ProductCodeAndOrderStatus(Long productCode, OrderStatus orderStatus, Pageable pageable);
    Page<OrderEntity> findByOrderStatus(OrderStatus orderStatus, Pageable pageable);
}
