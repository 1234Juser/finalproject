package com.hello.travelogic.product.dto;

import com.hello.travelogic.product.domain.ProductDetailEntity;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class ProductDetailDTO {

    private Long productDetailCode;
    private Long productCode;
    private String productInfo;
    private String productMeetingInfo;
    private String productCourseInfo;
    private String productNotice;


    public ProductDetailDTO(ProductDetailEntity entity) {
        this.productDetailCode = entity.getProductDetailCode();
        this.productCode = entity.getProducts() != null && !entity.getProducts().isEmpty()
                ? entity.getProducts().get(0).getProductCode() : null;      // 연결된 여러 개의 상품 중 "첫 번째 상품" 하나만 가져와서 productCode 필드에 넣음
        this.productInfo = entity.getProductInfo();
        this.productMeetingInfo = entity.getProductMeetingInfo();
        this.productCourseInfo = entity.getProductCourseInfo();
        this.productNotice = entity.getProductNotice();
    }
}
