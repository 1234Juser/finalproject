package com.hello.travelogic.companion.domain;

import com.hello.travelogic.member.domain.MemberEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_companion_comment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanionCommentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "companion_comment_id", nullable = false)
    private Integer companionCommentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_code", nullable = false)
    private MemberEntity member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "companion_id", nullable = false)
    private CompanionEntity companion;

    @Column(name = "companion_content", nullable = false, columnDefinition = "TEXT")
    private String companionContent;

    @Column(name = "companion_created_at", nullable = false)
    private LocalDateTime companionCreatedAt;

}

