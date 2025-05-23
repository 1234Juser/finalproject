package com.hello.travelogic.customize.dto;

import com.hello.travelogic.product.domain.ProductEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomizeDTO {
    private LocalDate startDate; //시작날짜
    private LocalDate endDate; //종료날짜
    private Long countryId; //국가id
    private Long cityId; //도시id
    private String themeName; // 여행 테마
    private Integer adultCount; //성인인원
    private Integer childCount; // 아동인원
    private Integer minPrice; //최소가격
    private Integer maxPrice; //최대가격
    private String productType; // 여행 타입 추가

}

