package com.hello.travelogic.wish.dto;

import com.hello.travelogic.wish.domain.WishEntity;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class WishDTO {

    private Long wishCode;
    private Long memberCode;
    private Long groupCode;
    private Long productCode;
    private String productTitle;
    private String productThumbnail;
    private int reviewCount;
    private double reviewAvg;
    private int productAdult;

    private String productUid;

    public WishDTO(WishEntity entity) {
        this.wishCode = entity.getWishCode();
        this.memberCode = entity.getMember().getMemberCode();
        this.groupCode = entity.getGroup().getGroupCode();
        this.productCode = entity.getProduct().getProductCode();
        this.productTitle = entity.getProduct() != null ? entity.getProduct().getProductTitle() : null;
        this.productThumbnail = entity.getProduct().getProductThumbnail();
        this.reviewCount = entity.getProduct().getReviewCount();
        this.productAdult = entity.getProduct().getProductAdult();
        this.productUid = entity.getProduct().getProductUid();
    }
}
