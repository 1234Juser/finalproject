package com.hello.travelogic.order.service;

import com.hello.travelogic.order.dto.ProductOrderStatDTO;
import com.hello.travelogic.order.repo.OrderRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class BookingChartService {

    private final OrderRepo orderRepo;

    public List<ProductOrderStatDTO> getProductOrderStats() {
        List<Object[]> rawStats = orderRepo.getProductOrderStats();

        return rawStats.stream()
                .map(row -> new ProductOrderStatDTO(
                        (Long) row[0],
                        (String) row[1],
                        (Long) row[2]
                ))
                .toList();
    }
}
