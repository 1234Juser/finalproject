package com.hello.travelogic.order.service;

import com.hello.travelogic.order.domain.OrderStatus;
import com.hello.travelogic.order.dto.ProductOrderStatDTO;
import com.hello.travelogic.order.repo.OrderRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class BookingChartService {

    private final OrderRepo orderRepo;

    public List<ProductOrderStatDTO> getProductRevenueStats(LocalDateTime startDate, LocalDateTime endDate) {
        List<OrderStatus> targetStatuses = List.of(OrderStatus.SCHEDULED, OrderStatus.CANCELED);
        return orderRepo.findTotalRevenueByProductAndPeriod(startDate, endDate, targetStatuses);
    }
}
