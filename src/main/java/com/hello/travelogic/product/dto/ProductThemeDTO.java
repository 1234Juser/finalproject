package com.hello.travelogic.product.dto;

import com.hello.travelogic.product.domain.ProductEntity;
import com.hello.travelogic.product.domain.ProductThemeEntity;
import com.hello.travelogic.product.domain.ThemeEntity;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProductThemeDTO {

    private Long ptId;
    private Long productCode;
    private Long themeCode;

    public ProductThemeDTO(ProductThemeEntity productThemeDTO) {
        this.ptId = productThemeDTO.getPtId();
        this.productCode = productThemeDTO.getProductCode().getProductCode();
        this.themeCode = productThemeDTO.getThemeCode().getThemeCode();
    }
}
