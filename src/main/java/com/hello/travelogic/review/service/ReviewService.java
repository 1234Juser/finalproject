package com.hello.travelogic.review.service;

import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.member.repository.MemberRepository;
import com.hello.travelogic.order.domain.OptionEntity;
import com.hello.travelogic.order.domain.OrderEntity;
import com.hello.travelogic.order.repo.OptionRepo;
import com.hello.travelogic.order.repo.OrderRepo;
import com.hello.travelogic.product.domain.ProductEntity;
import com.hello.travelogic.product.repo.ProductRepo;
import com.hello.travelogic.product.service.ProductService;
import com.hello.travelogic.review.domain.ReviewEntity;
import com.hello.travelogic.review.domain.ReviewStatus;
import com.hello.travelogic.review.dto.ReviewDTO;
import com.hello.travelogic.review.repo.ReviewRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReviewService {

    private final ReviewRepo reviewRepo;
    private final MemberRepository memberRepo;
    private final OrderRepo orderRepo;
    private final ProductService productService;
    private final OptionRepo optionRepo;
    private final ProductRepo productRepo;

    //    final String DIR = "upload/review/";
//    private static final String UPLOAD_DIR = "C:/Users/hi/Desktop/hello_travelogic/upload/review/";
    private static final String REVIEW_DIR = "upload/review/";
//    final String DIR = "C:/Users/hi/Desktop/hello_travelogic/upload/review/";

    public List<ReviewDTO> getReviewsByProductCode(long productCode, String sortOption) {
        List<ReviewEntity> entities;

        if ("rating".equalsIgnoreCase(sortOption)) {
            entities = reviewRepo.findByOrder_Product_ProductCodeOrderByReviewRatingDesc(productCode); // 평점 높은순
        } else {
            // order_code 타고 찾은 product_code
//            entities = reviewRepo.findByOrder_Product_ProductCodeOrderByReviewDateDesc(productCode); // 최신순
            // product_code가 직접 FK로 들어온 거로 수정 한 후
            entities = reviewRepo.findByProduct_ProductCodeOrderByReviewDateDesc(productCode); // 최신순
        }

        return entities
                .stream()
                .map(ReviewDTO::new)
                .collect(Collectors.toList());
    }

    public ReviewDTO getReviewByMemberCodeAndOrderCode(long memberCode, long orderCode) {

        return reviewRepo.findByMemberMemberCodeAndOrderOrderCode(memberCode, orderCode)
//                .map(ReviewDTO::new)
//                .orElseThrow(() -> new RuntimeException("해당 주문에 대한 리뷰가 존재하지 않습니다."));
                .map(review -> {
                    ReviewDTO dto = new ReviewDTO();
                    dto.setReviewCode(review.getReviewCode());
                    dto.setMemberCode(review.getMember().getMemberCode());
                    dto.setProductCode(review.getProduct().getProductCode());
                    dto.setOrderCode(review.getOrder().getOrderCode());
                    dto.setReviewRating(review.getReviewRating());
                    dto.setReviewContent(review.getReviewContent());
                    dto.setReviewDate(review.getReviewDate());
                    dto.setReviewPic(review.getReviewPic());

                    // 임시 필드 설정
                    dto.setProductTitle(review.getProduct().getProductTitle());
                    dto.setReservationDate(review.getOption().getReservationDate());

                    return dto;
                })
                .orElse(null);
    }

    public List<ReviewDTO> getAllReviews() {

        return reviewRepo.findAll(Sort.by(Sort.Direction.DESC, "reviewDate"))
                .stream()
                .map(ReviewDTO::new)
                .collect(Collectors.toList());
    }

    public List<ReviewDTO> getReviewsByProductCodeForAdmin(long productCode) {
        // order_code 타고 찾은 product_code
//        return reviewRepo.findByOrder_Product_ProductCodeOrderByReviewDateDesc(productCode)
        // product_code가 직접 FK로 들어온 거로 수정 한 후
        return reviewRepo.findByProduct_ProductCodeOrderByReviewDateDesc(productCode)
                .stream()
                .map(ReviewDTO::new)
                .collect(Collectors.toList());
    }

    public ReviewDTO getInfoForWriteReview(Long orderCode, Long memberCode) {
        OrderEntity order = orderRepo.findById(orderCode)
                .orElseThrow(() -> new IllegalArgumentException("주문을 찾을 수 없습니다."));

        if (!order.getMember().getMemberCode().equals(memberCode)) {
            throw new IllegalArgumentException("권한이 없습니다.");
        }

        ReviewDTO reviewDTO = new ReviewDTO();
        reviewDTO.setOrderCode(order.getOrderCode());
        reviewDTO.setProductTitle(order.getProduct().getProductTitle());
//        reviewDTO.setReservationDate(order.getReservationDate());

        return reviewDTO;
    }

    @Transactional
    public int writeReview(ReviewDTO reviewDTO, MultipartFile file) {
//        try {
        // 파일 저장
//            String reviewPic = saveFile(file, REVIEW_DIR);
//            reviewDTO.setReviewPic(reviewPic);
//            reviewDTO.setReviewDate(LocalDateTime.now());
//            reviewDTO.setReviewStatus(ReviewStatus.ACTIVE);

        reviewDTO.setReviewDate(LocalDateTime.now());
        reviewDTO.setReviewStatus(ReviewStatus.ACTIVE);

        log.debug("memberCode: {}", reviewDTO.getMemberCode());
        log.debug("orderCode: {}", reviewDTO.getOrderCode());

        try {
            // MemberEntity와 OrderEntity를 DB에서 조회
            MemberEntity member = memberRepo.findById(reviewDTO.getMemberCode())
                    .orElseThrow(() -> new RuntimeException("Member not found"));
            OrderEntity order = orderRepo.findById(reviewDTO.getOrderCode())
                    .orElseThrow(() -> new RuntimeException("Order not found"));
            OptionEntity optionEntity = optionRepo.findById(reviewDTO.getOrderCode())
                    .orElseThrow(() -> new IllegalArgumentException("옵션이 존재하지 않습니다. - orderCode: " + reviewDTO.getOrderCode()));
            ProductEntity productEntity = productRepo.findById(optionEntity.getProduct().getProductCode())
                    .orElseThrow(() -> new IllegalArgumentException("상품이 존재하지 않습니다. - productCode: " + optionEntity.getProduct().getProductCode()));

            if (reviewRepo.existsByMemberAndOrder(member, order)) {
                return 0; // 이미 작성된 리뷰가 있음
            }

            String reviewPic = null;
            if (file != null && !file.isEmpty()) {
                log.debug("파일 이름: {}", file.getOriginalFilename());
                reviewPic = saveFile(file, REVIEW_DIR);
            }

            // ReviewEntity 객체 생성
//            ReviewEntity reviewEntity = new ReviewEntity(reviewDTO, member, order);
            ReviewEntity reviewEntity = new ReviewEntity();
            reviewEntity.setMember(member);
            reviewEntity.setProduct(productEntity);
            reviewEntity.setOption(optionEntity);
            reviewEntity.setOrder(order);
            reviewEntity.setReviewRating(reviewDTO.getReviewRating());
            reviewEntity.setReviewContent(reviewDTO.getReviewContent());
            reviewEntity.setReviewPic(reviewPic);
            reviewEntity.setReviewDate(LocalDateTime.now());
            reviewEntity.setReviewStatus(ReviewStatus.ACTIVE);

            reviewRepo.save(reviewEntity);
            log.debug("DB에 저장된 리뷰: reviewPic = {}", reviewEntity.getReviewPic());

            // review_count 갱신
//            productService.updateReviewCount(reviewEntity.getProduct().getProductCode());
            ProductEntity product = order.getProduct();
            productService.updateReviewCount(product.getProductCode());

            return 1;
        } catch (Exception e) {
            log.error("리뷰 작성 중 오류 발생", e);
            return 0;
        }
    }

    @Transactional
    public String modifyReview (Long reviewCode, ReviewDTO reviewDTO, MultipartFile file) {
        try {
            ReviewEntity review = reviewRepo.findById(reviewCode)
                    .orElseThrow(() -> new RuntimeException("해당 리뷰가 존재하지 않습니다."));

            // 수정 가능한 시간인지 확인
            if (review.getReviewDate().plusHours(48).isBefore(LocalDateTime.now())) {
                throw new RuntimeException("리뷰는 작성 후 48시간 이내에만 수정할 수 있습니다.");
            }

            // 수정 가능한 항목만 입력한다.
            review.setReviewRating(reviewDTO.getReviewRating());
            review.setReviewContent(reviewDTO.getReviewContent());

            if (file != null && !file.isEmpty()) {
                deleteFile(review.getReviewPic(), REVIEW_DIR);
                String newFileName = saveFile(file, REVIEW_DIR);
                review.setReviewPic(newFileName);
            }
            // 수정 후 저장
            reviewRepo.save(review);
            return "수정 성공";
        } catch(Exception e){
            log.error("리뷰 수정 중 오류 발생", e);
            throw new RuntimeException("리뷰 수정 중 오류 발생", e);
        }
    }

    @Transactional
    public void deleteMyReview(long reviewCode, long memberCode) {
        ReviewEntity review = reviewRepo.findById(reviewCode)
                .orElseThrow(() -> new NoSuchElementException("리뷰를 찾을 수 없습니다."));

        if (!review.getMember().getMemberCode().equals(memberCode)) {
            throw new IllegalArgumentException("자신의 리뷰만 삭제할 수 있습니다.");
        }

        OrderEntity order = review.getOrder();
        if (order != null) {
            order.setReviewed(false);
            order.setReview(null); // Order와 Review의 관계 해제
        }

        deleteFile(review.getReviewPic(), REVIEW_DIR);
        reviewRepo.delete(review);

        // 리뷰 카운트 갱신
        productService.updateReviewCount(review.getProduct().getProductCode());
    }

    @Transactional
    public void deleteReviewByAdmin(long reviewCode) {

        ReviewEntity review = reviewRepo.findById(reviewCode)
                .orElseThrow(() -> new NoSuchElementException("리뷰를 찾을 수 없습니다."));

        review.setReviewStatus(ReviewStatus.DELETE_BY_ADMIN);
        review.setReviewContent("관리자에 의해 삭제된 리뷰입니다.");

        deleteFile(review.getReviewPic(), REVIEW_DIR);
        review.setReviewPic(null); // DB에서도 이미지 제거
        reviewRepo.save(review);
    }

    private String saveFile(MultipartFile file, String directory) throws IOException {
        if (file == null || file.isEmpty()) {
            return null;
        }

        // 파일명 생성 (UUID + 확장자)
        String originalFileName = file.getOriginalFilename();
        String newFileName = UUID.randomUUID().toString() + "-" + originalFileName;
        Path filePath = Paths.get(directory, newFileName);

        // 디렉토리 생성 (없으면 생성)
        Files.createDirectories(filePath.getParent());

        // 파일 저장
        file.transferTo(filePath.toFile());
        log.info("파일 저장 완료: {}", filePath);

        return newFileName;
    }

    private void deleteFile(String fileName, String directory) {
        if (fileName == null || fileName.equals("nan")) return;

        try {
            Path filePath = Paths.get(directory, fileName);
            Files.deleteIfExists(filePath);
            log.info("파일 삭제 완료: {}", fileName);
        } catch (IOException e) {
            log.error("파일 삭제 실패: {}", fileName, e);
            throw new RuntimeException("파일 삭제 실패", e);
        }
    }

    //파일 다운로드
    public byte[] getImage(String reviewPic) {

        // 로컬버전
        Path filePath = Paths.get(REVIEW_DIR + reviewPic);
        byte[] imageBytes = {0};
        try {
            imageBytes = Files.readAllBytes(filePath);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return imageBytes;
    }
}