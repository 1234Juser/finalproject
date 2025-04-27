package com.hello.travelogic.product.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tbl_product")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class ProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_code", nullable = false)
    private Long productCode;

    @Column(name = "product_uid", unique = true, nullable = false, length = 20)
    private String productUid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_code", nullable = false)
    private CountryEntity countryCode;  // 국가 1 - 상품 N 관계

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "city_code", nullable = false)
    private CityEntity cityCode;        // 도시 1 - 상품 N 관계

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "theme_code")
    private ThemeEntity themeCode;      // 테마 1 - 상품 N 관계 (N:M 관계로 변경시 theme_code 컬럼은 삭제할 것)

    @Column(name = "product_title", nullable = false, length = 255)
    private String productTitle;

    @Column(name = "product_content", nullable = false, columnDefinition = "TEXT")
    private String productContent;

    @Column(name = "product_adult", nullable = false)
    private Integer productAdult;

    @Column(name = "product_child", nullable = false, columnDefinition = "INT DEFAULT 0")
    private Integer productChild;

    @Column(name = "product_start_date", nullable = false)
    private LocalDate productStartDate;

    @Column(name = "product_end_date", nullable = false)
    private LocalDate productEndDate;

    @Column(name = "product_min_participants", nullable = false)
    private Integer productMinParticipants;

    @Column(name = "product_max_participants", nullable = false)
    private Integer productMaxParticipants;

    @Enumerated(EnumType.STRING)
    @Column(name = "product_status", nullable = false)
    private ProductStatus productStatus;

    @Column(name = "product_thumbnail", nullable = false, length = 255)
    private String productThumbnail;

    @Enumerated(EnumType.STRING)
    @Column(name = "product_type", nullable = false)
    private ProductType productType;

    // 양방향 매핑
    @OneToMany(mappedBy = "productCode", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductThemeEntity> productThemes = new ArrayList<>();


    public enum ProductStatus {
        ON_SALE,
        SOLD_OUT,
        CLOSED
    }

    public enum ProductType {
        TOUR,
        GOLF,
        CRUISE,
        KIDS,
        HONEYMOON,
        SILVER
    }
}
