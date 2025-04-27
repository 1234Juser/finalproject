package com.hello.travelogic.product.dto;

import com.hello.travelogic.product.domain.CityEntity;
import com.hello.travelogic.product.domain.CountryEntity;
import com.hello.travelogic.product.domain.ProductEntity;
import com.hello.travelogic.product.domain.ThemeEntity;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProductDTO {

    private Long productCode;
    private String productUid;
    private Long countryCode;
    private Long cityCode;
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

    public ProductDTO(ProductEntity productDTO) {
        this.productCode = productDTO.getProductCode();
        this.productUid = productDTO.getProductUid();
        this.countryCode = productDTO.getCountryCode().getCountryCode();
        this.cityCode = productDTO.getCityCode().getCityCode();
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
    }
}
