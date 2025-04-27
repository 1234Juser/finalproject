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
    @Column(name = "city_code", nullable = false)
    private Long cityCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_code", nullable = false)
    private CountryEntity countryCode;

    @Column(name = "city_uid", nullable = false, length = 20)
    private String cityUid;

    @Column(name = "city_name", nullable = false, length = 20)
    private String cityName;
}
