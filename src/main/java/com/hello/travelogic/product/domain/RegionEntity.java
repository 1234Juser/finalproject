package com.hello.travelogic.product.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tbl_region")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RegionEntity {

    @Id
    @Column(name = "region_code", nullable = false)
    private Long regionCode;

    @Column(name = "region_uid", nullable = false, length = 20)
    private String regionUid;

    @Enumerated(EnumType.STRING)
    @Column(name = "region_type", nullable = false)
    private RegionType regionType;

    @Column(name = "region_name", nullable = false, length = 20)
    private String regionName;

    public enum RegionType {
        DOMESTIC, INTERNATIONAL
    }
}
