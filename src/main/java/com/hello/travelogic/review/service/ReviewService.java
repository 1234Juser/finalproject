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

    //    final String DIR = "upload/review/";
//    private static final String UPLOAD_DIR = "C:/Users/hi/Desktop/hello_travelogic/upload/review/";
    private static final String REVIEW_DIR = "upload/review/";
//    final String DIR = "C:/Users/hi/Desktop/hello_travelogic/upload/review/";

    public List<ReviewDTO> getReviewsByProductCode(String ProductUid, String sortOption) {
        List<ReviewEntity> entities;

        if ("rating".equalsIgnoreCase(sortOption)) {
            entities = reviewRepo.findByOrder_Product_ProductUidOrderByReviewRatingDesc(ProductUid); // 평점 높은순
        } else {
            // order_code 타고 찾은 product_code
//            entities = reviewRepo.findByOrder_Product_ProductCodeOrderByReviewDateDesc(productCode); // 최신순
            // product_code가 직접 FK로 들어온 거로 수정 한 후
            entities = reviewRepo.findByProduct_ProductUidOrderByReviewDateDesc(ProductUid); // 최신순
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

//        try {
//            log.info("🟢 리뷰 조회 시작");
//
//            // 모든 리뷰 엔티티 조회
//            List<ReviewEntity> reviewEntities = reviewRepo.findAllByOrderByReviewDateDesc();
//            log.info("🟢 리뷰 엔티티 로드 완료: {}개", reviewEntities.size());
//
//            List<ReviewDTO> reviewDTOs = reviewEntities.stream()
//                    .map(review -> {
//                        log.debug("🟡 ReviewEntity -> ReviewDTO 변환: {}", review);
//                        return new ReviewDTO(review);
//                    })
//                    .collect(Collectors.toList());
//
//            log.info("🟢 리뷰 DTO 변환 완료: {}개", reviewDTOs.size());
//            return reviewDTOs;
//
//        } catch (Exception e) {
//            log.error("🔴 리뷰 목록 조회 중 오류 발생", e);
//            throw e;
//        }

        List<ReviewDTO> reviewList = page.getContent().stream()
                .map(ReviewDTO::new)
                .collect(Collectors.toList());

        Map<String, Object> map = new HashMap<>();
        map.put("reviews", reviewList);
        map.put("totalPages", page.getTotalPages());
        map.put("currentPage", page.getNumber() + 1);

        return map;

//        return reviewRepo.findAll(Sort.by(Sort.Direction.DESC, "reviewDate"))
//                .stream()
//                .map(ReviewDTO::new)
//                .collect(Collectors.toList());
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
        reviewDTO.setOptionCode(order.getOption().getOptionCode());
//        reviewDTO.setReservationDate(order.getReservationDate());

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
            ProductEntity productEntity = productRepo.findById(optionEntity.getProduct().getProductCode())
                    .orElseThrow(() -> new IllegalArgumentException("상품이 존재하지 않습니다. - productCode: " + optionEntity.getProduct().getProductCode()));

            // 정확한 중복 검사 (회원 + 주문 조합으로 확인)
            if (reviewRepo.existsByMemberMemberCodeAndOrderOrderCode(member.getMemberCode(), order.getOrderCode())) {
                throw new IllegalStateException("이미 작성된 리뷰가 있습니다.");
            }
//            if (reviewRepo.existsByMemberAndOrder(member, order)) {
//                return 0; // 이미 작성된 리뷰가 있음
//            }

            reviewDTO.setReviewDate(LocalDateTime.now());
//            reviewDTO.setReviewStatus(ReviewStatus.ACTIVE);
            reviewDTO.setReviewStatus(ReviewStatus.ACTIVE.name());
            reviewDTO.setProductCode(productEntity.getProductCode());
            reviewDTO.setOptionCode(optionEntity.getOptionCode());
            reviewDTO.setReservationDate(optionEntity.getReservationDate());
//
//            log.debug("memberCode: {}", reviewDTO.getMemberCode());
//            log.debug("orderCode: {}", reviewDTO.getOrderCode());

//            ReviewEntity reviewEntity = new ReviewEntity(reviewDTO, member, order);
//            String reviewPic = null;
            if (reviewPic != null && !reviewPic.isEmpty()) {
//                log.debug("파일 이름: {}", file.getOriginalFilename());
//                reviewPic = saveFile(file, REVIEW_DIR);
                String savedFileName= FileUploadUtils.saveReviewFile(reviewPic);
                reviewDTO.setReviewPic(savedFileName);
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
            log.debug("DB에 저장된 리뷰: reviewPic = {}", reviewEntity.getReviewPic());

            if (!order.isReviewed()) {
                order.setReviewed(true);
                orderRepo.save(order);
                log.debug("주문 상태를 리뷰 완료로 설정 - orderCode: {}", order.getOrderCode());
            }

            // review_count 갱신
//            productService.updateReviewCount(reviewEntity.getProduct().getProductCode());
//            ProductEntity product = order.getProduct();
//            productService.updateReviewCount(product.getProductCode());
            productService.updateReviewCount(order.getProduct().getProductCode());

            return 1;
        } catch (Exception e) {
            log.error("리뷰 작성 중 오류 발생", e);
            return 0;
        }
    }

    public ReviewDTO findReviewByCodeAndMember(Long reviewCode, Long memberCode) {
        ReviewEntity review = reviewRepo.findById(reviewCode)
//        ReviewEntity review = reviewRepo.findWithProductByReviewCode(reviewCode)
                .orElseThrow(() -> new IllegalArgumentException("리뷰를 찾을 수 없습니다."));
        if (!review.getMember().getMemberCode().equals(memberCode)) {
            throw new IllegalArgumentException("리뷰를 조회할 권한이 없습니다.");
        }
        return new ReviewDTO(review);
    }

    @Transactional
    public String modifyReview (Long reviewCode, ReviewDTO reviewDTO, MultipartFile reviewPic) {
        try {
            ReviewEntity review = reviewRepo.findById(reviewCode)
                    .orElseThrow(() -> new RuntimeException("해당 리뷰가 존재하지 않습니다."));

            // 수정 가능한 시간인지 확인
            if (review.getReviewDate().plusHours(48).isBefore(LocalDateTime.now())) {
                throw new IllegalArgumentException("리뷰는 작성 후 48시간 이내에만 수정할 수 있습니다.");
            }

            // 수정 가능한 항목만 입력한다.
            review.setReviewRating(reviewDTO.getReviewRating());
            review.setReviewContent(reviewDTO.getReviewContent());

            // 파일 처리 로직 수정
            if (reviewPic != null && !reviewPic.isEmpty()) {
                // 기존 파일 삭제
                if (review.getReviewPic() != null && !review.getReviewPic().equals("nan")) {
                    deleteFile(review.getReviewPic(), REVIEW_DIR);
                }
                String newFileName = FileUploadUtils.saveReviewFile(reviewPic);
                review.setReviewPic(newFileName);
                log.info("파일 교체 완료: {}", newFileName);
            } else if (reviewPic == null) {
                // 파일 삭제 요청 (빈 파일로 초기화)
                if (review.getReviewPic() != null && !review.getReviewPic().equals("nan")) {
                    deleteFile(review.getReviewPic(), REVIEW_DIR);
                }
                review.setReviewPic(null);
                log.info("기존 파일 삭제 완료");
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

            deleteFile(review.getReviewPic(), REVIEW_DIR);
            reviewRepo.delete(review);

            // 리뷰 카운트 갱신
            productService.updateReviewCount(review.getProduct().getProductCode());
        } catch (NoSuchElementException e) {
            log.error("리뷰 삭제 실패: 리뷰를 찾을 수 없습니다.", e);
            throw new RuntimeException("리뷰 삭제 실패: 리뷰를 찾을 수 없습니다.");
        } catch (IllegalArgumentException e) {
            log.error("리뷰 삭제 실패: 권한이 없습니다.", e);
            throw e;
        } catch (Exception e) {
            log.error("리뷰 삭제 실패", e);
            throw new RuntimeException("리뷰 삭제 실패", e);
        }
    }

    @Transactional
    public void deleteReviewByAdmin(long reviewCode) {

        ReviewEntity review = reviewRepo.findById(reviewCode)
                .orElseThrow(() -> new NoSuchElementException("리뷰를 찾을 수 없습니다."));

        review.setReviewStatus(ReviewStatus.DELETE_BY_ADMIN);
        review.setReviewContent("관리자에 의해 삭제된 리뷰입니다.");

        String reviewPic = review.getReviewPic();
        if (reviewPic != null && !reviewPic.equals("nan")) {
            deleteFile(reviewPic, REVIEW_DIR);
            review.setReviewPic("nan"); // 이미지 필드를 비워줌
        }
//        if (review.getReviewPic() != null) {
//            deleteFile(review.getReviewPic(), REVIEW_DIR);
//            review.setReviewPic(null);
//        }

//        deleteFile(review.getReviewPic(), REVIEW_DIR);
//        review.setReviewPic(null); // DB에서도 이미지 제거
        reviewRepo.save(review);
        productService.updateReviewCount(review.getProduct().getProductCode());
    }

    private String saveFile(MultipartFile file, String directory) throws IOException {
        if (file == null || file.isEmpty()) {
            return null;
        }

        // 파일명 생성 (UUID + 확장자)
        String originalFileName = file.getOriginalFilename();
        String newFileName = UUID.randomUUID().toString() + "-" + originalFileName;
//        Path filePath = Paths.get(directory, newFileName);
        File dir = new File(directory);

        // 디렉토리 생성 (없으면 생성)
//        Files.createDirectories(filePath.getParent());
        if (!dir.exists()) {
            dir.mkdirs();
        }

        // 최종 파일 경로
        Path filePath = Paths.get(dir.getAbsolutePath(), newFileName);

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
    public byte[] getImage(String reviewPic) throws IOException {

        // 로컬버전
        Path filePath = Paths.get(REVIEW_DIR + reviewPic);
//        byte[] imageBytes = {0};
//        try {
//            imageBytes = Files.readAllBytes(filePath);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return imageBytes;
        if (!Files.exists(filePath)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "파일이 존재하지 않습니다.");
        }
        // 파일 읽기
        return Files.readAllBytes(filePath);
    }
//    public byte[] getImage(String reviewPic) {
//        try {
//            // 파일 경로 설정
//            Path filePath = Paths.get(REVIEW_DIR, reviewPic);
//            if (!Files.exists(filePath)) {
//                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "파일이 존재하지 않습니다.");
//            }
//
//            // 파일 확장자 추출
//            String extension = getFileExtension(reviewPic).toLowerCase();
//
//            // 파일 타입 체크 (jpg, jpeg, png, gif만 허용)
//            if (!extension.matches("jpg|jpeg|png|gif")) {
//                throw new ResponseStatusException(HttpStatus.UNSUPPORTED_MEDIA_TYPE, "지원하지 않는 파일 형식입니다.");
//            }
//
//            // 파일 읽기
//            return Files.readAllBytes(filePath);
//        } catch (IOException e) {
//            e.printStackTrace();
//            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 읽기 오류", e);
//        }
//    }
//    private String getFileExtension(String fileName) {
//        int lastIndex = fileName.lastIndexOf(".");
//        if (lastIndex == -1) {
//            return "";
//        }
//        return fileName.substring(lastIndex + 1);
//    }

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
                // 대소문자 무시
//                .sorted(Comparator.comparing(
//                        product -> product.getProductTitle().toLowerCase(),
//                        String.CASE_INSENSITIVE_ORDER))
                .map(ProductDTO::new)
                .collect(Collectors.toList());
    }
}