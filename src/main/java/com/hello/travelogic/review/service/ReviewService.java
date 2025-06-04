package com.hello.travelogic.review.service;

import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.member.repository.MemberRepository;
import com.hello.travelogic.order.domain.OptionEntity;
import com.hello.travelogic.order.domain.OrderEntity;
import com.hello.travelogic.order.repo.OptionRepo;
import com.hello.travelogic.order.repo.OrderRepo;
import com.hello.travelogic.product.domain.ProductEntity;
import com.hello.travelogic.product.dto.ProductDTO;
import com.hello.travelogic.product.repo.ProductRepo;
import com.hello.travelogic.product.service.ProductService;
import com.hello.travelogic.review.domain.ReviewEntity;
import com.hello.travelogic.review.domain.ReviewStatus;
import com.hello.travelogic.review.dto.ReviewDTO;
import com.hello.travelogic.review.repo.ReviewRepo;
import com.hello.travelogic.utils.FileUploadUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.*;
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
    private final FileUploadUtils fileUploadUtils;

    private static final String REVIEW_DIR = "upload/review/";

    public List<ReviewDTO> getReviewsByProductCode(String ProductUid, String sortOption) {
        List<ReviewEntity> entities;

        if ("rating".equalsIgnoreCase(sortOption)) {
//            entities = reviewRepo.findByProduct_ProductUidOrderByReviewRatingDesc(ProductUid); // 평점 높은순
            entities = reviewRepo.findFullReviewsByProductUidOrderByRating(ProductUid);
        } else {
//            entities = reviewRepo.findByProduct_ProductUidOrderByReviewDateDesc(ProductUid); // 최신순
            entities = reviewRepo.findFullReviewsByProductUidOrderByDate(ProductUid);
        }

        return entities
                .stream()
                .map(ReviewDTO::new)
                .collect(Collectors.toList());
    }

    public ReviewDTO getReviewByMemberCodeAndOrderCode(long memberCode, long orderCode) {

        return reviewRepo.findByMemberMemberCodeAndOrderOrderCode(memberCode, orderCode)
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
                    // ENUM -> 문자열 변환
                    dto.setReviewStatus(review.getReviewStatus().name());

                    // 임시 필드 설정
                    dto.setMemberName(review.getMember().getMemberName());
                    dto.setProductTitle(review.getProduct().getProductTitle());
                    dto.setProductUid(review.getProduct().getProductUid());
                    dto.setReservationDate(review.getOption().getReservationDate());

                    return dto;
                })
                .orElse(null);
    }

    public Map<String, Object> getAllReviews(int start) {

        start = start > 0? start -1 : start;

        int size = 10;
        Pageable pageable = PageRequest.of(start, 10, Sort.by("reviewDate").descending());
        Page<ReviewEntity> page = reviewRepo.findAllWithJoins(pageable);

        List<ReviewDTO> reviewList = page.getContent().stream()
                .map(ReviewDTO::new)
                .collect(Collectors.toList());

        Map<String, Object> map = new HashMap<>();
        map.put("reviews", reviewList);
        map.put("totalPages", page.getTotalPages());
        map.put("currentPage", page.getNumber() + 1);

        return map;
    }

    public List<ReviewDTO> getReviewsByProductCodeForAdmin(long productCode) {
        return reviewRepo.findByProduct_ProductCodeOrderByReviewDateDesc(productCode)
                .stream()
                .map(ReviewDTO::new)
                .collect(Collectors.toList());
    }

    public ReviewDTO getInfoForWriteReview(Long orderCode, Long memberCode) {
        OrderEntity order = orderRepo.findById(orderCode)
                .orElseThrow(() -> new IllegalArgumentException("주문을 찾을 수 없습니다."));

        if (!order.getMember().getMemberCode().equals(memberCode)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "리뷰 작성 권한이 없습니다.");
        }

        ReviewDTO reviewDTO = new ReviewDTO();
        reviewDTO.setOrderCode(order.getOrderCode());
        reviewDTO.setProductTitle(order.getProduct().getProductTitle());
        reviewDTO.setOptionCode(order.getOption().getOptionCode());

        return reviewDTO;
    }

    @Transactional
    public int writeReview(ReviewDTO reviewDTO, MultipartFile reviewPic) {
        try {
            // MemberEntity와 OrderEntity를 DB에서 조회
            MemberEntity member = memberRepo.findById(reviewDTO.getMemberCode())
                    .orElseThrow(() -> new RuntimeException("Member not found"));
            OrderEntity order = orderRepo.findById(reviewDTO.getOrderCode())
                    .orElseThrow(() -> new RuntimeException("주문이 존재하지 않습니다."));
            OptionEntity optionEntity = order.getOption();
            if (optionEntity == null) {
                throw new IllegalArgumentException("옵션이 존재하지 않습니다. - orderCode: " + order.getOrderCode());
            }
//            ProductEntity productEntity = productRepo.findById(optionEntity.getProduct().getProductCode())
//                    .orElseThrow(() -> new IllegalArgumentException("상품이 존재하지 않습니다. - productCode: " + optionEntity.getProduct().getProductCode()));
            ProductEntity productEntity = order.getProduct();

            // 정확한 중복 검사 (회원 + 주문 조합으로 확인)
            if (reviewRepo.existsByMemberMemberCodeAndOrderOrderCode(member.getMemberCode(), order.getOrderCode())) {
                throw new IllegalStateException("이미 작성된 리뷰가 있습니다.");
            }

            reviewDTO.setReviewDate(LocalDateTime.now());
            reviewDTO.setReviewStatus(ReviewStatus.ACTIVE.name());
            reviewDTO.setProductCode(productEntity.getProductCode());
            reviewDTO.setOptionCode(optionEntity.getOptionCode());
            reviewDTO.setReservationDate(optionEntity.getReservationDate());

            if (reviewPic != null && !reviewPic.isEmpty()) {
//                String savedFileName= FileUploadUtils.saveReviewFile(reviewPic);
//                reviewDTO.setReviewPic(savedFileName);
                try {
                    // S3에 파일 업로드
                    String s3Url = fileUploadUtils.uploadToS3(reviewPic);
                    log.debug("s3Url : {}", s3Url);
                    reviewDTO.setReviewPic(s3Url);
                } catch (IOException e) {
                    log.error("파일 업로드 실패 : ", e);
                }
            }

            // ReviewEntity 객체 생성
            ReviewEntity reviewEntity = new ReviewEntity(reviewDTO, member, order);
            reviewEntity.setMember(member);
            reviewEntity.setProduct(productEntity);
            reviewEntity.setOption(optionEntity);
            reviewEntity.setOrder(order);
            reviewEntity.setReviewRating(reviewDTO.getReviewRating());
            reviewEntity.setReviewContent(reviewDTO.getReviewContent());
            reviewEntity.setReviewPic(reviewEntity.getReviewPic());
            reviewEntity.setReviewDate(LocalDateTime.now());
            reviewEntity.setReviewStatus(ReviewStatus.ACTIVE);

            reviewRepo.save(reviewEntity);

            if (!order.isReviewed()) {
                order.setReviewed(true);
                orderRepo.save(order);
            }

            // review_count 갱신
            productService.updateReviewCount(order.getProduct().getProductCode());

            return 1;
        } catch (Exception e) {
            return 0;
        }
    }

    public ReviewDTO findReviewByCodeAndMember(Long reviewCode, Long memberCode) {
        ReviewEntity review = reviewRepo.findById(reviewCode)
                .orElseThrow(() -> new IllegalArgumentException("리뷰를 찾을 수 없습니다."));
        if (!review.getMember().getMemberCode().equals(memberCode)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "리뷰를 조회할 권한이 없습니다.");
        }
        return new ReviewDTO(review);
    }

    @Transactional
    public String modifyReview (Long reviewCode, Long memberCode, ReviewDTO reviewDTO, MultipartFile reviewPic) {
        try {
            ReviewEntity review = reviewRepo.findById(reviewCode)
                    .orElseThrow(() -> new RuntimeException("해당 리뷰가 존재하지 않습니다."));
            if (!review.getMember().getMemberCode().equals(memberCode)) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "리뷰 수정 권한이 없습니다.");
            }

            // 수정 가능한 시간인지 확인
            if (review.getReviewDate().plusHours(48).isBefore(LocalDateTime.now())) {
                throw new IllegalArgumentException("리뷰는 작성 후 48시간 이내에만 수정할 수 있습니다.");
            }

            // 수정 가능한 항목만 입력한다.
            review.setReviewRating(reviewDTO.getReviewRating());
            review.setReviewContent(reviewDTO.getReviewContent());

            // 파일 처리 로직 수정
            // 새로운 이미지 파일이 있을 경우(교체)
            String existingPic = review.getReviewPic();
            if (reviewPic != null && !reviewPic.isEmpty()) {
                // 기존 파일 삭제
//                if (review.getReviewPic() != null && !review.getReviewPic().equals("nan")) {
//                    deleteFile(review.getReviewPic(), REVIEW_DIR);
//                }
                // 기존의 파일이 S3에 존재한다면 삭제한다
                if (existingPic != null && !existingPic.isEmpty() && !existingPic.equals("nan")) {
                    fileUploadUtils.deleteS3File(existingPic);
                }
                // 새 이미지 파일 저장
                String newS3Url = fileUploadUtils.uploadToS3(reviewPic);
                review.setReviewPic(newS3Url);
//                String newFileName = FileUploadUtils.saveReviewFile(reviewPic);
//                review.setReviewPic(newFileName);
            // 새 파일 없이 기존 파일만 삭제할 경우
//            } else if (reviewPic == null) {
            // S3 버전에선 빈 파일을 업로드해 기존이미지를 제거한다는 논리
            } else if (reviewPic != null && reviewPic.isEmpty()) {
                // 파일 삭제 요청 (빈 파일로 초기화)
//                if (review.getReviewPic() != null && !review.getReviewPic().equals("nan")) {
//                    deleteFile(review.getReviewPic(), REVIEW_DIR);
                if (existingPic != null && !existingPic.isEmpty() && !existingPic.equals("nan")) {
                    fileUploadUtils.deleteS3File(existingPic);
                }
                review.setReviewPic(null);
            }
            // 수정 후 저장
            reviewRepo.save(review);
            return "수정 성공";
        } catch (IOException e) {
            log.error("S3 파일 업로드 중 오류 발생: {}", e.getMessage(), e);
            return "리뷰 이미지 파일 수정에 실패했습니다";
        } catch(Exception e){
            throw new RuntimeException("리뷰 수정 중 오류 발생", e);
        }
    }

    @Transactional
    public void deleteMyReview(long reviewCode, long memberCode) {
        try {
            ReviewEntity review = reviewRepo.findById(reviewCode)
                    .orElseThrow(() -> new NoSuchElementException("리뷰를 찾을 수 없습니다."));

            if (!review.getMember().getMemberCode().equals(memberCode)) {
                throw new IllegalArgumentException("자신의 리뷰만 삭제할 수 있습니다.");
            }

            OrderEntity order = review.getOrder();
            if (order != null) {
                order.setReviewed(false);
                order.setReview(null); // Order와 Review의 관계 해제
                orderRepo.save(order);
            }

//            deleteFile(review.getReviewPic(), REVIEW_DIR);
            String s3ReviewPic = review.getReviewPic();

            // S3 파일이 존재한다면 진행
            if (s3ReviewPic != null && !s3ReviewPic.isEmpty()) {
                try {
                    fileUploadUtils.deleteS3File (s3ReviewPic);
                    log.debug ("S3 파일 삭제 성공: {}", s3ReviewPic);
                } catch (Exception e) {
                    log.error ("S3 파일 삭제 중 오류 발생. DB 작업이 진행되지 않습니다.: {}", e.getMessage (), e);
                    throw new RuntimeException ("S3 파일 삭제 실패하여 리뷰 삭제가 중단됩니다.", e);
                }
            }
            reviewRepo.delete(review);

            // 리뷰 카운트 갱신
            productService.updateReviewCount(review.getProduct().getProductCode());
        } catch (NoSuchElementException e) {
            throw new RuntimeException("리뷰 삭제 실패: 리뷰를 찾을 수 없습니다.");
        } catch (IllegalArgumentException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("리뷰 삭제 실패", e);
        }
    }

    @Transactional
    public void deleteReviewByAdmin(long reviewCode) {

        ReviewEntity review = reviewRepo.findById(reviewCode)
                .orElseThrow(() -> new NoSuchElementException("리뷰를 찾을 수 없습니다."));

        review.setReviewStatus(ReviewStatus.DELETE_BY_ADMIN);
        review.setReviewContent("관리자에 의해 삭제된 리뷰입니다.");

//        String reviewPic = review.getReviewPic();
//        if (reviewPic != null && !reviewPic.equals("nan")) {
//            deleteFile(reviewPic, REVIEW_DIR);
//            review.setReviewPic("nan"); // 이미지 필드를 비워줌
//        }
        String s3ReviewPic = review.getReviewPic();
        // S3 파일이 존재한다면 진행
        if (s3ReviewPic != null && !s3ReviewPic.isEmpty()) {
            try {
                fileUploadUtils.deleteS3File (s3ReviewPic);
                log.debug ("S3 파일 삭제 성공: {}", s3ReviewPic);
            } catch (Exception e) {
                log.error ("S3 파일 삭제 중 오류 발생. DB 작업이 진행되지 않습니다.: {}", e.getMessage (), e);
                throw new RuntimeException ("S3 파일 삭제 실패하여 리뷰 삭제가 중단됩니다.", e);
            }
        }
        reviewRepo.save(review);
        // 리뷰 카운트 갱신
        productService.updateReviewCount(review.getProduct().getProductCode());
    }

    private String saveFile(MultipartFile file, String directory) throws IOException {
        if (file == null || file.isEmpty()) {
            return null;
        }

        // 파일명 생성 (UUID + 확장자)
        String originalFileName = file.getOriginalFilename();
        String newFileName = UUID.randomUUID().toString() + "-" + originalFileName;
        File dir = new File(directory);

        // 디렉토리 생성 (없으면 생성)
        if (!dir.exists()) {
            dir.mkdirs();
        }

        // 최종 파일 경로
        Path filePath = Paths.get(dir.getAbsolutePath(), newFileName);

        // 파일 저장
        file.transferTo(filePath.toFile());

        return newFileName;
    }

    private void deleteFile(String fileName, String directory) {
        if (fileName == null || fileName.equals("nan")) return;

        try {
            Path filePath = Paths.get(directory, fileName);
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            throw new RuntimeException("파일 삭제 실패", e);
        }
    }

    //파일 다운로드
    public byte[] getImage(String reviewPic) throws IOException {

        // 로컬버전
        Path filePath = Paths.get(REVIEW_DIR + reviewPic);
        if (!Files.exists(filePath)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "파일이 존재하지 않습니다.");
        }
        // 파일 읽기
        return Files.readAllBytes(filePath);
    }

    public double getAverageRatingByProductUid(String productUid) {
        // productUid로 productCode 찾기
        ProductEntity product = productRepo.findByProductUid(productUid)
                .orElseThrow(() -> new IllegalArgumentException("상품을 찾을 수 없습니다."));

        Long productCode = product.getProductCode();

        // 해당 productCode로 리뷰 평균 평점 계산하기
        List<ReviewEntity> reviews = reviewRepo.findByProduct_ProductCode(productCode);
        if (reviews.isEmpty()) {
            return 0.0;
        }

        double sum = reviews.stream().mapToInt(ReviewEntity::getReviewRating).sum();
        return sum / reviews.size();
    }

    public int getReviewCountByProductUid(String productUid) {

        ProductEntity product = productRepo.findByProductUid(productUid)
                .orElseThrow(() -> new IllegalArgumentException("상품을 찾을 수 없습니다."));

        Long productCode = product.getProductCode();
        return reviewRepo.countByProduct_ProductCode(productCode);
    }

    public Map<String, Object> getReviewsByProduct(Long productCode, int start) {
        int page = (start <= 0) ? 0 : start - 1;
        Pageable pageable = PageRequest.of(page, 10, Sort.by(Sort.Direction.DESC, "reviewDate"));

        Page<ReviewEntity> pageResult = reviewRepo.findPageByProduct_ProductCode(productCode, pageable);

        List<ReviewDTO> reviewList = pageResult.getContent().stream()
                .map(ReviewDTO::new)
                .collect(Collectors.toList());

        Map<String, Object> map = new HashMap<>();
        map.put("list", reviewList);
        map.put("totalPages", pageResult.getTotalPages());
        map.put("currentPage", pageResult.getNumber() + 1); // 페이지 번호는 0부터 시작하므로 +1

        return map;
    }

    public List<ProductDTO> getReviewListForFilter() {
        return productRepo.findAll().stream()
                .sorted(Comparator.comparing(ProductEntity::getProductTitle))
                .map(ProductDTO::new)
                .collect(Collectors.toList());
    }
}