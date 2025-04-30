package com.hello.travelogic.wish.domain;

import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.wish.dto.WishDTO;
import com.hello.travelogic.wish.dto.WishGroupDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

    @Entity
    @Table(name = "tbl_wish_group")
    @Getter
    @Setter
    @NoArgsConstructor
    @ToString(exclude = "member")
    public class WishGroupEntity {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "group_code", nullable = false)
        private Long groupCode;

        @NotNull
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "member_code", nullable = false)
        private MemberEntity member;    // 회원1 - 상품N

        @NotNull
        @Column(name = "group_title", nullable = false, length = 255)
        private String groupTitle;

        @Column(name = "wish_count", nullable = false)
        private int wishCount = 0;

        @OneToMany(mappedBy = "group", cascade = CascadeType.ALL, orphanRemoval = true)
        private List<WishEntity> wishes = new ArrayList<>();

        public WishGroupEntity(MemberEntity member, String groupTitle) {
            this.member = member;
            this.groupTitle = groupTitle;
        }

        @Transient
        public int calculateWishCount() {
            return wishes != null ? wishes.size() : 0;
        }
    }
