package com.hello.travelogic.search.dto;

import com.hello.travelogic.product.domain.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchDTO {
    private String type; // "product", "city", "country", "region", "theme"
    private String title;
    private String description;
    private String extraInfo;

    public static SearchDTO fromProduct(ProductEntity e){
        return builder()
                .type("product")
                .title(e.getProductTitle())
                .description(e.getProductDescription())
                .extraInfo(e.getFullLocation())
                .build();
    }
    public static SearchDTO fromCity(CityEntity e){
        return builder()
                .type("city")
                .title(e.getCityName())
                .description(e.getCityNameKR())
                .extraInfo(e.getCountryId().getCountryName())
                .build();
    }
    public static SearchDTO fromCountry(CountryEntity e){
        return builder()
                .type("country")
                .title(e.getCountryName())
                .description(e.getCountryNameKr())
                .extraInfo(e.getRegionCode().getRegionName())
                .build();
    }
    public static SearchDTO fromRegion(RegionEntity e) {
        return builder()
                .type("region")
                .title(e.getRegionName())
                .description(e.getRegionType().toString())
                .build();
    }
    public static SearchDTO fromTheme(ThemeEntity e) {
        return builder()
                .type("theme")
                .title(e.getThemeName())
                .build();
    }

}
