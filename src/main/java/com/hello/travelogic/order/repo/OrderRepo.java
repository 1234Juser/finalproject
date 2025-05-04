package com.hello.travelogic.order.repo;

import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.order.domain.OrderEntity;
import com.hello.travelogic.order.domain.OrderStatus;
import com.hello.travelogic.order.dto.OrderDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

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
}
