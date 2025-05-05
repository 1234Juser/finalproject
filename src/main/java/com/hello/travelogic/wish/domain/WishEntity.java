package com.hello.travelogic.wish.domain;

import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.product.domain.ProductEntity;
import com.hello.travelogic.wish.dto.WishDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(
        name = "tbl_wish",
        uniqueConstraints = @UniqueConstraint(
                name = "unique_wish",  // 제약 조건 이름
                columnNames = {"member_code", "product_code"}
        )
)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = "group")  // 무한참조 방지
public class WishEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wishCode;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_code", nullable = false)
    private MemberEntity member;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_code", nullable = false)
    private WishGroupEntity group;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_code", nullable = false)
    private ProductEntity product;

    public WishEntity(WishDTO dto, MemberEntity member, WishGroupEntity group, ProductEntity product) {
        this.member = member;
        this.group = group;
        this.product = product;
    }
}
