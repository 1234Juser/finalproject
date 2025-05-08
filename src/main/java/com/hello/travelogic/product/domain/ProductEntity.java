package com.hello.travelogic.product.domain;

import com.hello.travelogic.product.dto.ProductDTO;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Fetch;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tbl_product")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_code", nullable = false)
    private Long productCode;

    @Column(name = "product_uid", unique = true, nullable = false, length = 20)
    private String productUid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "region_code", nullable = false)
    private RegionEntity regionCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id", nullable = false)
    private CountryEntity countryId;  // 국가 1 - 상품 N 관계

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "city_id", nullable = false)
    private CityEntity cityId;        // 도시 1 - 상품 N 관계

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

    @Column(name = "review_count", nullable = false, columnDefinition = "INT DEFAULT 0")
    private int reviewCount = 0;

    @Enumerated(EnumType.STRING)
    @Column(name = "region_type", nullable = false)
    private RegionEntity.RegionType regionType;

    @Column(name = "city_name", nullable = false, length = 50)
    private String cityName;

    @Column(name = "country_name", nullable = false, length = 50)
    private String countryName;

    @Column(name = "full_location", nullable = false, length = 100)
    private String fullLocation;

    @Column(name = "product_description", nullable = true, columnDefinition = "TEXT")
    private String productDescription;



    // 양방향 매핑 ("product"는 ProductThemeEntity에서 @ManyToOne ProductEntity의 필드명)
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductThemeEntity> productThemes = new ArrayList<>();



    @PrePersist
    public void perPersist() {
        if(this.productThumbnail == null || this.productThumbnail.equals("")) {
            productThumbnail = "nan";
        }
    }



    public ProductEntity(ProductDTO productDTO) {
        this.productCode = productDTO.getProductCode();
        this.productUid = productDTO.getProductUid();
//        this.regionCode = productDTO.getRegionCode();
//        this.countryCode = productDTO.getCountryCode(); // 서비스에서 CountryEntity 매핑
//        this.cityCode = productDTO.getCityCode();       // 서비스에서 CityEntity 매핑
//        this.themeCode = productDTO.getThemeCode();     // 서비스에서 ThemeEntity 매핑
        this.productTitle = productDTO.getProductTitle();
        this.productContent = productDTO.getProductContent();
        this.productAdult = productDTO.getProductAdult();
        this.productChild = productDTO.getProductChild();
//        this.productStartDate = productDTO.getProductStartDate();     // 서비스에서 타입 전환하여 매핑
//        this.productEndDate = productDTO.getProductEndDate();         //          〃
        this.productMinParticipants = productDTO.getProductMinParticipants();
        this.productMaxParticipants = productDTO.getProductMaxParticipants();
        this.productStatus = productDTO.getProductStatus(); // Enum 매핑 필요
        this.productThumbnail = productDTO.getProductThumbnail();
        this.productType = productDTO.getProductType();     // Enum 매핑 필요
//        this.productThemes = productDTO.getProductThemes(); // 연관 엔티티 리스트 매핑 필요
        this.reviewCount = productDTO.getReviewCount();
        this.regionType = productDTO.getRegionType();       // Enum 매핑 불필요
        this.cityName = productDTO.getCityName();
        this.countryName = productDTO.getCountryName();
        this.fullLocation = productDTO.getFullLocation();
        this.productDescription = productDTO.getProductDescription();
    }

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
