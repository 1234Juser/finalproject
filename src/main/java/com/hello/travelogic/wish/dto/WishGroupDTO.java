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

    public WishGroupDTO(WishGroupEntity entity) {
        this.groupCode = entity.getGroupCode();
        this.memberCode = entity.getMember().getMemberCode();  // Entity에서 memberCode 꺼냄
        this.groupTitle = entity.getGroupTitle();

        this.wishCount = entity.getWishCount();
    }
}
