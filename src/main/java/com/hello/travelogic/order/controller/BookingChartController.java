package com.hello.travelogic.order.controller;

import com.hello.travelogic.order.dto.ProductOrderStatDTO;
import com.hello.travelogic.order.service.BookingChartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class BookingChartController {

    private final BookingChartService bookingChartService;

    @GetMapping("/admin/statistics/orders")
    public ResponseEntity<List<ProductOrderStatDTO>> getProductOrderStats() {
        return ResponseEntity.ok(bookingChartService.getProductOrderStats());
    }
}
