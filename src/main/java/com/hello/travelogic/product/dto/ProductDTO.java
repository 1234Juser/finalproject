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
    private String fullLocation;
    private String productDescription;

    // 찜 여부를 나타내는 임시필드
    @JsonProperty("isWished")
    private boolean wished;

    public ProductDTO(ProductEntity productDTO) {
        this.productCode = productDTO.getProductCode();
        this.productUid = productDTO.getProductUid();
        this.regionCode = productDTO.getRegionCode().getRegionCode();
        this.countryId = productDTO.getCountryId().getCountryId();
        this.cityId = productDTO.getCityId().getCityId();
        this.themeCode = productDTO.getThemeCode().getThemeCode();
        this.productTitle = productDTO.getProductTitle();
        this.productContent = productDTO.getProductContent();
        this.productAdult = productDTO.getProductAdult();
        this.productChild = productDTO.getProductChild();
        this.productStartDate = productDTO.getProductStartDate().toString();
        this.productEndDate = productDTO.getProductEndDate().toString();
        this.productMinParticipants = productDTO.getProductMinParticipants();
        this.productMaxParticipants = productDTO.getProductMaxParticipants();
        this.productStatus = productDTO.getProductStatus();
        this.productThumbnail = productDTO.getProductThumbnail();
        this.productType = productDTO.getProductType();
        this.reviewCount = productDTO.getReviewCount();
        this.regionType = productDTO.getRegionType();
        this.cityName = productDTO.getCityName();
        this.countryName = productDTO.getCountryName();
        this.fullLocation = productDTO.getFullLocation();
        this.productDescription = productDTO.getProductDescription();
    }
}
