package com.hello.travelogic.product.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "tbl_product_detail")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDetailEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_detail_code", nullable = false, length = 20)
    private Long productDetailCode;

    @Column(name = "product_Info", columnDefinition = "TEXT")
    private String productInfo;

    @Column(name = "product_meeting_info", columnDefinition = "TEXT")
    private String productMeetingInfo;

    @Column(name = "product_course_info", columnDefinition = "TEXT")
    private String productCourseInfo;

    @Column(name = "product_notice", columnDefinition = "TEXT")
    private String productNotice;

    // 상품 목록 역방향 (양방향 필요할 경우)
    @OneToMany(mappedBy = "productDetail", fetch = FetchType.LAZY)
    private List<ProductEntity> products;
}
