package com.hello.travelogic.product.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hello.travelogic.product.domain.*;
import com.hello.travelogic.review.domain.ReviewEntity;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProductDTO {

    private Long productCode;
    private String productUid;
    private Long regionCode;
    private Long countryId;
    private Long cityId;
    private Long themeCode;
    private String themeName; // themeName으로 추가
    private String productTitle;
    private String productContent;
    private Integer productAdult;
    private Integer productChild;
    private String productStartDate;
    private String productEndDate;
    private Integer productMinParticipants;
    private Integer productMaxParticipants;
    private ProductEntity.ProductStatus productStatus;
    private String productThumbnail;
    private int reviewCount;
    private double reviewAvg;
    private RegionEntity.RegionType regionType;
    private String cityName;
    private String countryName;
    private String fullLocation;
    private ProductDetailDTO productDescription;

    // 찜 여부를 나타내는 임시필드
    @JsonProperty("isWished")
    private boolean wished;

    public ProductDTO(ProductEntity productEntity) {
        this.productCode = productEntity.getProductCode();
        this.productUid = productEntity.getProductUid();
        this.regionCode = productEntity.getRegionCode() != null ? productEntity.getRegionCode().getRegionCode() : null;
        this.countryId = productEntity.getCountryId() != null ? productEntity.getCountryId().getCountryId() : null;
        this.cityId = productEntity.getCityId() != null ? productEntity.getCityId().getCityId() : null;
        this.themeCode = productEntity.getThemeCode() != null ? productEntity.getThemeCode().getThemeCode() : null;
        this.themeName = productEntity.getThemeCode() != null ? productEntity.getThemeCode().getThemeName() : null; // themeCode 대신 themeName 사용

        this.productTitle = productEntity.getProductTitle();
        this.productContent = productEntity.getProductContent();
        this.productAdult = productEntity.getProductAdult();
        this.productChild = productEntity.getProductChild();
        this.productStartDate = productEntity.getProductStartDate().toString();
        this.productEndDate = productEntity.getProductEndDate().toString();
        this.productMinParticipants = productEntity.getProductMinParticipants();
        this.productMaxParticipants = productEntity.getProductMaxParticipants();
        this.productStatus = productEntity.getProductStatus();
        this.productThumbnail = productEntity.getProductThumbnail();
        this.reviewCount = productEntity.getReviewCount();
        this.regionType = productEntity.getRegionType();
        this.cityName = productEntity.getCityName();
        this.countryName = productEntity.getCountryName();
        this.fullLocation = productEntity.getFullLocation();

        List<ReviewEntity> reviewList = productEntity.getReviews() != null ? productEntity.getReviews() : new ArrayList<>();
        this.reviewAvg = calculateReviewAvg(reviewList);

        if (productEntity.getProductDetail() != null) {
            this.productDescription = new ProductDetailDTO(productEntity.getProductDetail());
        } else {
            this.productDescription = null;
        }
    }

//    private double calculateReviewAvg(ProductEntity product) {
//        List<ReviewEntity> reviews = product.getReviews();
//        if (reviews == null || reviews.isEmpty()) return 0.0;
//        double sum = reviews.stream().mapToInt(ReviewEntity::getReviewRating).sum();
//        return sum / reviews.size();
//    }
    private double calculateReviewAvg(List<ReviewEntity> reviews) {
        if (reviews == null || reviews.isEmpty()) return 0.0;
        double sum = reviews.stream().mapToInt(ReviewEntity::getReviewRating).sum();
        return sum / reviews.size();
    }
}
