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
    private ProductEntity.ProductType productType;
    private int reviewCount;
    private double reviewAvg;
    private RegionEntity.RegionType regionType;
    private String cityName;
    private String countryName;
    private String cityNameKR;
    private String fullLocation;
    private String productDescription;

    // 찜 여부를 나타내는 임시필드
    @JsonProperty("isWished")
    private boolean wished;

    public ProductDTO(ProductEntity productDTO) {
        this.productCode = productDTO.getProductCode();
        this.productUid = productDTO.getProductUid();
        this.regionCode = productDTO.getRegionCode().getRegionCode();
        this.countryId = productDTO.getCountryId().getCountryId();
        this.cityId = productDTO.getCityId().getCityId();
        this.themeCode = productDTO.getThemeCode().getThemeCode();
        this.productTitle = productDTO.getProductTitle();
        this.productContent = productDTO.getProductContent();
        this.productAdult = productDTO.getProductAdult();
        this.productChild = productDTO.getProductChild();
        this.productStartDate = productDTO.getProductStartDate().toString();
        this.productEndDate = productDTO.getProductEndDate().toString();
        this.productMinParticipants = productDTO.getProductMinParticipants();
        this.productMaxParticipants = productDTO.getProductMaxParticipants();
        this.productStatus = productDTO.getProductStatus();
        this.productThumbnail = productDTO.getProductThumbnail();
        this.productType = productDTO.getProductType();
        this.reviewCount = productDTO.getReviewCount();
        this.regionType = productDTO.getRegionType();
        this.cityName = productDTO.getCityName();
        this.countryName = productDTO.getCountryName();
        this.fullLocation = productDTO.getFullLocation();
        this.productDescription = productDTO.getProductDescription();

        List<ReviewEntity> reviewList = productDTO.getReviews() != null ? productDTO.getReviews() : new ArrayList<>();
        this.reviewAvg = calculateReviewAvg(reviewList);
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
