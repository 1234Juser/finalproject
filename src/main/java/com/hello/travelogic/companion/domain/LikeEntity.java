package com.hello.travelogic.companion.domain;

import com.hello.travelogic.member.domain.MemberEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_like")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LikeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id", nullable = false)
    private Integer likeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_code", nullable = false)
    private MemberEntity member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "companion_id")
    private CompanionEntity companion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "companion_comment_id")
    private CompanionCommentEntity companionComment;

    @CreationTimestamp // 추가된 부분: 엔티티 생성 시 자동으로 현재 시간 설정
    @Column(name = "created_at", nullable = false, updatable = false)
    @CreatedDate // 생성일 자동 관리를 위해 추가
    private LocalDateTime createdAt;

    // 게시물 좋아요 생성 팩토리 메서드
    public static LikeEntity createCompanionLike(MemberEntity member, CompanionEntity companion) {
        return LikeEntity.builder()
                .member(member)
                .companion(companion)
                .build();
    }

    // 댓글 좋아요 생성 팩토리 메서드
    public static LikeEntity createCommentLike(MemberEntity member, CompanionCommentEntity companionComment) {
        return LikeEntity.builder()
                .member(member)
                .companionComment(companionComment)
                .build();
    }
}
