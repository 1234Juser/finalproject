package com.hello.travelogic.order.controller;

import com.hello.travelogic.order.dto.ProductOrderStatDTO;
import com.hello.travelogic.order.service.BookingChartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class BookingChartController {

    private final BookingChartService bookingChartService;

    @GetMapping("/admin/booking/product-revenue")
    public List<ProductOrderStatDTO> getProductRevenueChart(@RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                                            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ) {
        return bookingChartService.getProductRevenueStats(startDate.atStartOfDay(), endDate.plusDays(1).atStartOfDay());
    }
}
