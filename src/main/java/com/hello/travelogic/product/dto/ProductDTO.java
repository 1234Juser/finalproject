package com.hello.travelogic.product.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hello.travelogic.product.domain.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProductDTO {

    private Long productCode;
    private String productUid;
    private Long regionCode;
    private Long countryId;
    private Long cityId;
    private Long themeCode;
    private String productTitle;
    private String productContent;
    private Integer productAdult;
    private Integer productChild;
    private String productStartDate;
    private String productEndDate;
    private Integer productMinParticipants;
    private Integer productMaxParticipants;
    private ProductEntity.ProductStatus productStatus;
    private String productThumbnail;
    private ProductEntity.ProductType productType;
    private int reviewCount;
    private RegionEntity.RegionType regionType;
    private String cityName;
    private String countryName;
    private String cityNameKR;
    private String fullLocation;
    private String productDescription;

    // 찜 여부를 나타내는 임시필드
    @JsonProperty("isWished")
    private boolean wished;

    public ProductDTO(ProductEntity productEntity) {
        this.productCode = productEntity.getProductCode();
        this.productUid = productEntity.getProductUid();
        this.regionCode = productEntity.getRegionCode().getRegionCode();
        this.countryId = productEntity.getCountryId().getCountryId();
        this.cityId = productEntity.getCityId().getCityId();
        this.themeCode = productEntity.getThemeCode().getThemeCode();
        this.productTitle = productEntity.getProductTitle();
        this.productContent = productEntity.getProductContent();
        this.productAdult = productEntity.getProductAdult();
        this.productChild = productEntity.getProductChild();
        this.productStartDate = productEntity.getProductStartDate().toString();
        this.productEndDate = productEntity.getProductEndDate().toString();
        this.productMinParticipants = productEntity.getProductMinParticipants();
        this.productMaxParticipants = productEntity.getProductMaxParticipants();
        this.productStatus = productEntity.getProductStatus();
        this.productThumbnail = productEntity.getProductThumbnail();
        this.productType = productEntity.getProductType();
        this.reviewCount = productEntity.getReviewCount();
        this.regionType = productEntity.getRegionType();
        this.cityName = productEntity.getCityName();
        this.countryName = productEntity.getCountryName();
        this.cityNameKR = productEntity.getCityId().getCityNameKR();
        this.fullLocation = productEntity.getFullLocation();
        this.productDescription = productEntity.getProductDescription();
    }
}
