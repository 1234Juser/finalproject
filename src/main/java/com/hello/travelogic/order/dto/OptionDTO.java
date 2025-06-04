package com.hello.travelogic.order.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hello.travelogic.order.domain.OptionEntity;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Slf4j
public class OptionDTO {

    private long optionCode;
    private long productCode;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate reservationDate;
    private Integer adultCount = 0;
    private Integer childCount = 0;
    private int totalPrice = 0;

    // 옵션 폼 출력을 위한 임시 필드
    private String productTitle;
    private Integer productAdult;
    private Integer productChild;
    private int productMaxParticipants;
    private String productThumbnail;
    private String availableStartDate;
    private String availableEndDate;

    public OptionDTO(OptionEntity entity) {
        this.optionCode = entity.getOptionCode();
        this.productCode = entity.getProduct().getProductCode();
        this.reservationDate = entity.getReservationDate();
        this.adultCount = entity.getAdultCount();
        this.childCount = entity.getChildCount();
        this.totalPrice = entity.getTotalPrice();

        if (entity.getProduct() != null) {
            this.productCode = entity.getProduct().getProductCode();
            this.productTitle = entity.getProduct().getProductTitle();
            this.productAdult = entity.getProduct().getProductAdult();
            this.productChild = entity.getProduct().getProductChild();
            this.productMaxParticipants = entity.getProduct().getProductMaxParticipants();
            this.productThumbnail = entity.getProduct().getProductThumbnail();
            if (this.productThumbnail != null && !this.productThumbnail.isBlank()) {
                if (!this.productThumbnail.startsWith("http") && !this.productThumbnail.startsWith("static") && !this.productThumbnail.startsWith("/img/")) {
                    this.productThumbnail = "https://hellotravelogic-img-s3.s3.ap-northeast-2.amazonaws.com/" + this.productThumbnail;
                }
            }
            log.debug("🟡 ProductEntity 로드 완료 - productCode: {}, productTitle: {}", this.productCode, this.productTitle);
        }
    }
}
