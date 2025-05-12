package com.hello.travelogic.companion.domain;

import com.hello.travelogic.member.domain.MemberEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;


@Entity
@Table(name = "tbl_follow", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"follower_member_code", "following_member_code"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FollowEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "follow_id", nullable = false)
    private Integer followId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "follower_member_code", nullable = false)
    private MemberEntity followerMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "following_member_code", nullable = false)
    private MemberEntity followingMember;

    @Column(name = "followed_at", nullable = false)
    private LocalDateTime followedAt;

}

