package com.hello.travelogic.realtime.domain;

import com.hello.travelogic.product.domain.CityEntity;
import jakarta.persistence.*;
import jakarta.persistence.OneToOne;
import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_city_view_count", indexes = {
        @Index(name = "idx_city_view_count_view_count", columnList = "view_count DESC")
}) // indexes 속성 추가
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder // 필요에 따라 Builder 패턴 추가
public class CityViewCountEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY) // UNIQUE 제약 조건이 있으므로 OneToOne으로 매핑
    @JoinColumn(name = "city_id", nullable = false, unique = true) // unique = true 추가
    private CityEntity city; // tbl_city 테이블의 CityEntity와 관계 매핑

    @Column(name = "view_count", nullable = false, columnDefinition = "INT DEFAULT 0") // NOT NULL과 DEFAULT 값 설정
    private Integer viewCount = 0; // 초기값 설정

    @Column(name = "last_updated", nullable = false) // NOT NULL 설정
    @UpdateTimestamp // 엔티티 업데이트 시 자동 업데이트
    private LocalDateTime lastUpdated; // TIMESTAMP에 해당하는 자바 타입
}