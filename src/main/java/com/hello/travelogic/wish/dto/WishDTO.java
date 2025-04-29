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

    public WishDTO(WishEntity entity) {
        this.wishCode = entity.getWishCode();
        this.memberCode = entity.getMember().getMemberCode();
        this.groupCode = entity.getGroup().getGroupCode();
        this.productCode = entity.getProduct().getProductCode();
    }
}
