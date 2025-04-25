package com.hello.travelogic.product.dto;

import com.hello.travelogic.product.domain.CityEntity;
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
    private CityEntity cityCode;
    private ThemeEntity themeCode;
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

    public ProductDTO(ProductEntity product) {
        this.productCode = product.getProductCode();
        this.productUid = product.getProductUid();
        this.cityCode = product.getCityCode();
        this.themeCode = product.getThemeCode();
        this.productTitle = product.getProductTitle();
        this.productContent = product.getProductContent();
        this.productAdult = product.getProductAdult();
        this.productChild = product.getProductChild();
        this.productStartDate = product.getProductStartDate().toString();
        this.productEndDate = product.getProductEndDate().toString();
        this.productMinParticipants = product.getProductMinParticipants();
        this.productMaxParticipants = product.getProductMaxParticipants();
        this.productStatus = product.getProductStatus();
        this.productThumbnail = product.getProductThumbnail();
        this.productType = product.getProductType();
    }
}
