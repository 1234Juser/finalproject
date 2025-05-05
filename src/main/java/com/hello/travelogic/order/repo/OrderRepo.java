package com.hello.travelogic.order.repo;

import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.order.domain.OrderEntity;
import com.hello.travelogic.order.domain.OrderStatus;
import com.hello.travelogic.order.dto.OrderDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
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

}
