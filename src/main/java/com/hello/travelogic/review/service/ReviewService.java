package com.hello.travelogic.review.service;

import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.member.repository.MemberRepository;
import com.hello.travelogic.order.domain.OrderEntity;
import com.hello.travelogic.order.domain.OrderStatus;
import com.hello.travelogic.order.repo.OrderRepo;
import com.hello.travelogic.review.domain.ReviewEntity;
import com.hello.travelogic.review.domain.ReviewStatus;
import com.hello.travelogic.review.dto.ReviewDTO;
import com.hello.travelogic.review.repo.ReviewRepo;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
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

    public List<ReviewDTO> getReviewsByProductCode(long productCode) {

        return reviewRepo.findByOrder_Product_ProductCode(productCode)
                .stream()
                .map(ReviewDTO::new)
                .collect(Collectors.toList());
    }

    public ReviewDTO getReviewByMemberCodeAndOrderCode(long memberCode, long orderCode) {

        return reviewRepo.findByMemberMemberCodeAndOrderOrderCode(memberCode, orderCode)
                .map(ReviewDTO::new)
                .orElse(null);
    }

    public List<ReviewDTO> getAllReviews() {

        return reviewRepo.findAll()
                .stream()
                .map(ReviewDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void writeReview(long memberCode, long orderCode, int reviewRating, String reviewContent, String reviewDate, MultipartFile file) {

        MemberEntity member = memberRepo.findByMemberCode(memberCode)
                .orElseThrow(() -> new NoSuchElementException("회원이 존재하지 않습니다."));
        OrderEntity order = orderRepo.findByOrderCode(orderCode)
                .orElseThrow(() -> new NoSuchElementException("주문이 존재하지 않습니다."));

        if (order.getOrderStatus() != OrderStatus.COMPLETED) {
            throw new IllegalStateException("상품 이용이 완료된 회원만 리뷰를 작성할 수 있습니다.");
//            return 0;
        }
        if (order.isReviewed()) {
            throw new IllegalStateException("이미 리뷰를 작성한 주문입니다.");
        }

        String filePath = null;
        if (file != null && !file.isEmpty()) {
            // 파일 저장 메서드 호출 (ex. S3 또는 서버 디렉토리 업로드)
            filePath = saveFile(file);
        }

        order.setReviewed(true);

        ReviewEntity review = new ReviewEntity();
        review.setMember(member);
        review.setOrder(order);
        review.setReviewRating(reviewRating);
        review.setReviewContent(reviewContent);
        review.setReviewPic(filePath);
        review.setReviewDate(LocalDate.now());
        review.setReviewStatus(ReviewStatus.ACTIVE);

        reviewRepo.save(review);
        orderRepo.save(order);
//        return 1;
    }

    private String saveFile(MultipartFile file) {

        try {
            String uploadFolder = new File("upload/review/").getAbsolutePath();
            File uploadDir = new File(uploadFolder);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
//            String savePath = "/upload/review/" + fileName;
            String savePath = uploadFolder + File.separator + fileName;

//            String savePath = uploadFolder + fileName;
            file.transferTo(new File(savePath));
//            return savePath;
//            return "/review/" + fileName;
            return "/review/" + fileName;
        } catch (IOException e) {
            e.printStackTrace();
            return null; // 저장 실패 시 null 반환
        }
    }

    @Transactional
    public ReviewDTO modifyReview(long reviewCode, @Valid ReviewDTO reviewDTO, MultipartFile file) {

        ReviewEntity review = reviewRepo.findById(reviewCode)
                .orElseThrow(() -> new NoSuchElementException("리뷰를 찾을 수 없습니다."));

        if (review.getReviewStatus() != ReviewStatus.ACTIVE) {
            throw new IllegalStateException("활성 상태의 리뷰만 수정할 수 있습니다.");
        }

        if (file != null && !file.isEmpty()) {
            // 새 파일 업로드
            String newFilePath = saveFile(file);
            // 기존 파일 삭제
            if (newFilePath != null) {
                deleteFile(review.getReviewPic());
                review.setReviewPic(newFilePath);
            }
        }

        review.setReviewRating(reviewDTO.getReviewRating());
        review.setReviewContent(reviewDTO.getReviewContent());
//        review.setReviewPic(reviewDTO.getReviewPic());
        review.setReviewDate(LocalDate.now()); // 수정일자로 업데이트

        reviewRepo.save(review);

        return new ReviewDTO(review);
//        return new ReviewDTO(reviewRepo.save(review));
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
    public void deleteMyReview(long reviewCode) {

        ReviewEntity review = reviewRepo.findById(reviewCode)
                .orElseThrow(() -> new NoSuchElementException("리뷰를 찾을 수 없습니다."));

        OrderEntity order = review.getOrder();

        review.setOrder(null); // order_code = null로 만들기
        reviewRepo.save(review); // 끊은 상태 저장

        order.setReviewed(false);
        orderRepo.save(order);

        reviewRepo.delete(review);
    }

    @Transactional
    public void deleteByAdmin(long reviewCode) {

        ReviewEntity review = reviewRepo.findById(reviewCode)
                .orElseThrow(() -> new NoSuchElementException("리뷰를 찾을 수 없습니다."));

        review.setReviewContent("관리자에 의해 삭제된 리뷰입니다.");
        review.setReviewStatus(ReviewStatus.DELETE_BY_ADMIN);
    }
}
