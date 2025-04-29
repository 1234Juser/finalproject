package com.hello.travelogic.order.repo;

import com.hello.travelogic.order.domain.OrderEntity;
import com.hello.travelogic.order.domain.OrderStatus;
import com.hello.travelogic.order.dto.OrderDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepo extends JpaRepository<OrderEntity, Long> {
    List<OrderEntity> findAllByMember_MemberCode(long memberCode);

    List<OrderEntity> findAllByMember_MemberCodeAndOrderStatus(long memberCode, OrderStatus orderStatus);

    // 리뷰기능에 사용
    Optional<OrderEntity> findByOrderCode(long orderCode);
}
