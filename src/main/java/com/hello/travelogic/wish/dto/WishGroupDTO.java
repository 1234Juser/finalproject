package com.hello.travelogic.wish.dto;

import com.hello.travelogic.wish.domain.WishGroupEntity;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class WishGroupDTO {

    private Long groupCode;
    private Long memberCode;
    private String groupTitle;
    private int wishCount;
    private String imageUrl;

    public WishGroupDTO(WishGroupEntity entity) {
        this.groupCode = entity.getGroupCode();
        this.memberCode = entity.getMember().getMemberCode();  // Entity에서 memberCode 꺼냄
        this.groupTitle = entity.getGroupTitle();
        this.wishCount = entity.getWishCount();

        // 그룹에 담긴 첫 번째 상품의 썸네일이 그룹 이미지
        if (entity.getWishes() != null && !entity.getWishes().isEmpty()) {
            this.imageUrl = entity.getWishes()
                    .get(0)
                    .getProduct()
                    .getProductThumbnail();
        } else {
            // 찜 상품이 하나도 없어도 그룹을 생성시킨 상품의 썸네일 사용
            this.imageUrl = entity.getThumbnail();
        }
    }
}
