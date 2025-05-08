package com.hello.travelogic.exchange.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_exchange_rates", uniqueConstraints = @UniqueConstraint(
        name = "unique_rate",
        columnNames = {"base_currency", "target_currency", "updated_date"}
))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExchangeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "base_currency", length=6, nullable = false)
    private String baseCurrency;

    @Column(name = "target_currency", length = 6, nullable = false)
    private String targetCurrency;

    @Column(name = "rate", precision = 19, scale = 6, nullable = false)
    private java.math.BigDecimal rate;

    @Column(name = "updated_date", nullable = false)
    private LocalDateTime updatedDate;
}
