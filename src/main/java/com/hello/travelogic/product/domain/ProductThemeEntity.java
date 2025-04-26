package com.hello.travelogic.product.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tbl_product_theme")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductThemeEntity {

    @Id
    @Column(name = "pt_id", nullable = false)
    private Long ptId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_code", nullable = false)
    private ProductEntity productCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "theme_code", nullable = false)
    private ThemeEntity themeCode;
}
