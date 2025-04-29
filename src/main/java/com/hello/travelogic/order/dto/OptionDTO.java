package com.hello.travelogic.order.dto;

import com.hello.travelogic.order.domain.OptionEntity;
import lombok.*;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class OptionDTO {

    private long productCode;
    private LocalDate reservationDate;
    private int adultCount;
    private Integer childCount;

    public OptionDTO(OptionEntity entity) {
        this.productCode = entity.getProductCode();
        this.reservationDate = entity.getReservationDate();
        this.adultCount = entity.getAdultCount();
        this.childCount = entity.getChildCount();
    }
}
