package com.hello.travelogic.product.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tbl_city")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CityEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "city_id", nullable = false)
    private Long cityId;

    @Column(name = "city_code", nullable = false, unique = true)
    private Long cityCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id", nullable = false)
    private CountryEntity countryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "region_code", nullable = false)
    private RegionEntity regionCode;

    @Column(name = "city_uid", nullable = false, length = 20)
    private String cityUid;

    @Column(name = "city_name", nullable = false, length = 20)
    private String cityName;

    @Column(name = "city_name_kr", nullable = false)
    private String cityNameKR;
}
