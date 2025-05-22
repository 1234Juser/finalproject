package com.hello.travelogic.product.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "country_id", nullable = false)
    private Long countryId;

    @Column(name = "country_code", nullable = false, unique = true)
    private Long countryCode;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "region_code", nullable = false)
    private RegionEntity regionCode;

    @Column(name = "country_uid", nullable = false, length = 20)
    private String countryUid;

    @Column(name = "country_name", nullable = false, length = 20)
    private String countryName;

    @Column(name = "country_name_kr", nullable = false, length = 20)
    private String countryNameKr;

}
