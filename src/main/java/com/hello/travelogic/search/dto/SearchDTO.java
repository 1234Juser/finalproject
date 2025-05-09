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
    private String productUid; // 상품 UID 필드 추가
    // 필요하다면 가격, 이미지 URL, 여행 기간 등의 필드도 추가 가능
    private Integer productAdult;
    private Integer productChild;
    private ProductEntity.ProductStatus productStatus;
    private String productStartDate;
    private String productEndDate;
    private String productThumbnail;



    public static SearchDTO fromProduct(ProductEntity e){
        return builder()
                .type("product")
                .title(e.getProductTitle())
                .description(e.getProductDescription())
                .extraInfo(e.getFullLocation())
                .productUid(e.getProductUid()) // productUid 설정
                .productAdult(e.getProductAdult()) //설정
                .productChild(e.getProductChild())
                .productStatus(e.getProductStatus()) // productStatus 설정
                .productStartDate(e.getProductStartDate() != null ? e.getProductStartDate().toString() : null)
                .productEndDate(e.getProductEndDate() != null ? e.getProductEndDate().toString() : null)
                .productThumbnail(e.getProductThumbnail())
                .build();
    }

    // 다른 fromCity, fromCountry 등의 메소드는 여기에 위치합니다.
    // 예시:
    public static SearchDTO fromCity(CityEntity e){
        return builder()
                .type("city")
                .title(e.getCityName())
                .description(e.getCityNameKR())
                .extraInfo(e.getCountryId().getCountryName())
                // City 검색 결과에는 productUid, productAdult 등이 없을 것이므로 null 또는 기본값 처리
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
