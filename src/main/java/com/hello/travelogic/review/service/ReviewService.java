package com.hello.travelogic.review.service;

import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.member.repository.MemberRepository;
import com.hello.travelogic.order.domain.OrderEntity;
import com.hello.travelogic.order.repo.OrderRepo;
import com.hello.travelogic.product.domain.ProductEntity;
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

    //    final String DIR = "upload/review/";
//    private static final String UPLOAD_DIR = "C:/Users/hi/Desktop/hello_travelogic/upload/review/";
    final String DIR = "C:/Users/hi/Desktop/hello_travelogic/upload/review/";

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
                .map(ReviewDTO::new)
                .orElseThrow(() -> new RuntimeException("해당 주문에 대한 리뷰가 존재하지 않습니다."));
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
        int result = 0;
        try {
            // 초기화
            String reviewPic = null;

            if (file != null && !file.isEmpty()) {
                log.debug("파일 이름: {}", file.getOriginalFilename());
                log.debug("file == null? {}", file == null);
                if (file != null) {
                    log.debug("file.isEmpty()? {}", file.isEmpty());
                    log.debug("file.getOriginalFilename(): {}", file.getOriginalFilename());
                }
                // 랜덤한 새로운 이름으로 파일을 저장하겠다~
                reviewPic = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
                reviewDTO.setReviewPic(reviewPic);

                Path path = Paths.get(DIR + reviewPic);
                Files.createDirectories(path.getParent());
                file.transferTo(path);
                log.debug("파일 저장 완료: {}", reviewPic);
            } else {
                reviewDTO.setReviewPic(null);
                log.warn("파일이 전달되지 않았습니다.");
            }
            log.debug("파일 저장 후 reviewPic: {}", reviewDTO.getReviewPic());

            reviewDTO.setReviewDate(LocalDateTime.now());
            reviewDTO.setReviewStatus(ReviewStatus.ACTIVE);

            log.debug("memberCode: {}", reviewDTO.getMemberCode());
            log.debug("orderCode: {}", reviewDTO.getOrderCode());

            // MemberEntity와 OrderEntity를 DB에서 조회
            MemberEntity member = memberRepo.findById(reviewDTO.getMemberCode())
                    .orElseThrow(() -> new RuntimeException("Member not found"));
            OrderEntity order = orderRepo.findById(reviewDTO.getOrderCode())
                    .orElseThrow(() -> new RuntimeException("Order not found"));

            // ReviewEntity 객체 생성
            ReviewEntity reviewEntity = new ReviewEntity(reviewDTO, member, order);

            reviewRepo.save(reviewEntity);
            log.debug("DB에 저장된 리뷰: reviewPic = {}", reviewEntity.getReviewPic());

            // review_count 갱신
            productService.updateReviewCount(reviewEntity.getProduct().getProductCode());

            result = 1;
        } catch (Exception e) {
            log.error("리뷰 작성 중 오류 발생", e);
            e.printStackTrace();
        }
        return result;
    }

    public String modifyReview (Long reviewCode, ReviewDTO reviewDTO, MultipartFile file) {

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
//            String newPic = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
//            Path path = Paths.get("upload/review/" + newPic);
            try {
                // 기존 파일이 존재하고 "nan" 같은 값이 아니라면 삭제
                if (review.getReviewPic() != null && !review.getReviewPic().equals("nan")) {
                    // 기존 파일 경로
                    Path existingFilePath = Paths.get("upload/review/" + review.getReviewPic());
                    // 기존 파일 삭제
                    Files.deleteIfExists(existingFilePath);
                }
                String newFileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
                Path newFilePath = Paths.get("upload/review/" + newFileName);
                Files.createDirectories(newFilePath.getParent());  // 디렉토리 없으면 생성
                file.transferTo(newFilePath);
                review.setReviewPic(newFileName);
            } catch (IOException e) {
                throw new RuntimeException("파일 저장 중 오류 발생", e);
            }
        }

        // 수정 후 저장
        reviewRepo.save(review);
        return "수정 성공";
    }

    private void deleteFile(String filePath) {
        if (filePath == null) return;

        try {
            Path path = Paths.get(filePath);
            Files.deleteIfExists(path);
        } catch (IOException e) {
            throw new RuntimeException("파일 삭제 실패", e);
        }
    }

    @Transactional
    public void deleteMyReview(long reviewCode, long memberCode) {

        ReviewEntity review = reviewRepo.findById(reviewCode)
                .orElseThrow(() -> new NoSuchElementException("리뷰를 찾을 수 없습니다."));
        if (!review.getMember().getMemberCode().equals(memberCode)) {
            throw new IllegalArgumentException("자신의 리뷰만 삭제할 수 있습니다.");
        }

        if (review.getReviewPic() != null && !review.getReviewPic().equals("nan")) {
            String fullPath = "C:/Users/hi/Desktop/hello_travelogic/upload/review/" + review.getReviewPic();
            deleteFile(fullPath);
        }

        // 리뷰 삭제전에 미리 주문번호와 상품번호 확보
        ProductEntity product = review.getProduct();
        OrderEntity order = review.getOrder();

        review.setOrder(null); // order_code = null로 만들기
        reviewRepo.save(review); // 끊은 상태 저장

        order.setReviewed(false);
        orderRepo.save(order);

        reviewRepo.delete(review);

        productService.updateReviewCount(product.getProductCode());
    }

    @Transactional
    public void deleteReviewByAdmin(long reviewCode) {

        ReviewEntity review = reviewRepo.findById(reviewCode)
                .orElseThrow(() -> new NoSuchElementException("리뷰를 찾을 수 없습니다."));

        review.setReviewStatus(ReviewStatus.DELETE_BY_ADMIN);
        review.setReviewContent("관리자에 의해 삭제된 리뷰입니다.");

        if (review.getReviewPic() != null && !review.getReviewPic().equals("nan")) {
            String fullPath = "C:/Users/hi/Desktop/hello_travelogic/upload/review/" + review.getReviewPic();
            deleteFile(fullPath);
            review.setReviewPic(null); // DB에서도 이미지 제거
        }

        reviewRepo.save(review);
    }

    //파일 다운로드
    public byte[] getImage(String reviewPic) {

        // 로컬버전
        Path filePath = Paths.get(DIR + reviewPic);
        byte[] imageBytes = {0};
        try {
            imageBytes = Files.readAllBytes(filePath);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return imageBytes;
    }
}