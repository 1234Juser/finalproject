package com.hello.travelogic.order.domain;

import com.hello.travelogic.order.dto.OptionDTO;
import com.hello.travelogic.product.domain.ProductEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "tbl_option")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class OptionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long optionCode;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_code", nullable = false)
    private ProductEntity product;      // 상품1 - 옵션N

    @Null
    @Column( name = "reservation_date", nullable = true )
    private LocalDate reservationDate;

    @NotNull
    @Column( name = "adult_count", nullable = false )
    private int adultCount;

    @Null
    @Column( name = "child_count", nullable = true )
    private Integer childCount;

    public OptionEntity(OptionDTO dto, ProductEntity product) {
        this.product = product;
        this.reservationDate = dto.getReservationDate();
        this.adultCount = dto.getAdultCount();
        this.childCount = dto.getChildCount();
    }
}
