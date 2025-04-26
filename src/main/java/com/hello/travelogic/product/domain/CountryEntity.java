package com.hello.travelogic.product.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tbl_country")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CountryEntity {

    @Id
    @Column(name = "country_code", nullable = false)
    private Long countryCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "region_code", nullable = false)
    private RegionEntity regionCode;

    @Column(name = "country_uid", nullable = false, length = 20)
    private String countryUid;

    @Column(name = "country_name", nullable = false, length = 20)
    private String countryName;

}
