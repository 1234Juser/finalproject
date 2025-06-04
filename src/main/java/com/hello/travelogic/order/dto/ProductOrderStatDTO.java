package com.hello.travelogic.order.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ProductOrderStatDTO {

    private Long productCode;
    private String productTitle;

    // 쿼리 결과를 담을 임시필드
    private Long orderCount;
}
