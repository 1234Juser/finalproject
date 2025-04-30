package com.hello.travelogic.review.controller;

import com.hello.travelogic.review.domain.ReviewStatus;
import com.hello.travelogic.review.dto.ReviewDTO;
import com.hello.travelogic.review.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ReviewController {

    private final ReviewService reviewService;

    // 상품 상세페이지 내 리뷰 조회
    @GetMapping("review/product/{productCode}")
    public ResponseEntity<List<ReviewDTO>> getReviewListByProductCode(@PathVariable("productCode") long productCode) {
        List<ReviewDTO> reviews = reviewService.getReviewsByProductCode(productCode);
        return ResponseEntity.ok(reviews);
    }

    // 로그인 된 회원의 선택 주문에 대한 리뷰 조회
    @GetMapping("review/mytravel/{memberCode}/{orderCode}")
    public ResponseEntity<ReviewDTO> getMyReviewForOrder(@PathVariable("memberCode") long memberCode,
                                                        @PathVariable("orderCode") long orderCode) {
        try {
            ReviewDTO reviewDTO = reviewService.getReviewByMemberCodeAndOrderCode(memberCode, orderCode);
            return ResponseEntity.ok(reviewDTO); // 200 OK
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // 관리자는 모든 상품에 대한 모든 회원의 리뷰를 조회 가능
    @GetMapping("admin/manage/review")
    public ResponseEntity<List<ReviewDTO>> getAllReviews() {
        List<ReviewDTO> allReviews = reviewService.getAllReviews();
        return ResponseEntity.ok(allReviews);
    }

    // OrderStatus가 COMPLETED인 회원만 리뷰 작성하기
    @PostMapping("/review/write")
    public ResponseEntity<Void> writeReview(@RequestParam("memberCode") long memberCode,
                                            @RequestParam("orderCode") long orderCode,
                                            @RequestParam("reviewRating") int reviewRating,
                                            @RequestParam("reviewContent") String reviewContent,
                                            @RequestParam(value = "reviewDate", required = false) String reviewDate, // (Optional) 오늘 날짜 쓰고 싶으면 서버에서 처리해도 되고
                                            @RequestPart(value = "file", required = false) MultipartFile file
    ) {
        reviewService.writeReview(memberCode, orderCode, reviewRating, reviewContent, reviewDate, file);
        return ResponseEntity.ok().build();
    }
//    @PostMapping("/review")
//    public ResponseEntity writeReview(@ModelAttribute ReviewDTO reviewDTO, @RequestPart(value = "file", required = false) MultipartFile file) {
//        log.debug("dto : {}", dto);
//        int result = reviewService.writeReview(reviewDTO, file);
//        if(result == 1)
//            return ResponseEntity.status(HttpStatus.CREATED).body("추가 성공");
//        return ResponseEntity.status(HttpStatus.CONFLICT).body("존재하는 id 임");
//    }

    // 리뷰 수정하기
    @PutMapping("review/edit/{reviewCode}")
    public ResponseEntity<ReviewDTO> modifyReview(@PathVariable("reviewCode") long reviewCode,
                                                  @RequestParam("reviewRating") int reviewRating,
                                                  @RequestParam("reviewContent") String reviewContent,
                                                  @RequestPart(value = "file", required = false) MultipartFile file) {

        ReviewDTO reviewDTO = new ReviewDTO();
        reviewDTO.setReviewRating(reviewRating);
        reviewDTO.setReviewContent(reviewContent);

        ReviewDTO updatedReview = reviewService.modifyReview(reviewCode, reviewDTO, file);
        return ResponseEntity.ok(updatedReview);
    }

    // 리뷰 삭제하기
    @DeleteMapping("review/mytravel/{reviewCode}")
    public ResponseEntity<Void> deleteMyReview(@PathVariable("reviewCode") long reviewCode) {
        reviewService.deleteMyReview(reviewCode);
        return ResponseEntity.ok().build();
    }

    // 관리자가 리뷰 삭제하면 삭제가 아니라 UPDATE
    @PatchMapping("admin/manage/reviews/{reviewCode}")
    public ResponseEntity deleteByAdmin(@PathVariable("reviewCode") long reviewCode) {
        reviewService.deleteByAdmin(reviewCode);
        return ResponseEntity.ok().build();
    }
}
