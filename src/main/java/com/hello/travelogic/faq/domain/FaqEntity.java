package com.hello.travelogic.faq.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tbl_faq")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FaqEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "faq_code", nullable = false, updatable = false, columnDefinition = "INT COMMENT 'FAQ 번호'")
    private Integer faqCode;

    @Column(name = "faq_title", nullable = false, length = 50, columnDefinition = "VARCHAR(50) COMMENT '제목'")
    private String faqTitle;

    @Column(name = "faq_content", nullable = false, length = 255, columnDefinition = "VARCHAR(255) COMMENT '내용'")
    private String faqContent;
}

