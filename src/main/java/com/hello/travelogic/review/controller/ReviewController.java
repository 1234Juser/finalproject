//package com.hello.travelogic.review.controller;
//
//import com.hello.travelogic.review.domain.ReviewStatus;
//import com.hello.travelogic.review.dto.ReviewDTO;
//import com.hello.travelogic.review.service.ReviewService;
//import jakarta.validation.Valid;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.util.List;
//
//@Controller
//@RequiredArgsConstructor
//@Slf4j
//public class ReviewController {
//
//    private final ReviewService reviewService;
//
//    // 상품 상세페이지 내 리뷰 조회
//    @GetMapping("/review/product/{productCode}")
//    public ResponseEntity<List<ReviewDTO>> getReviewListByProductCode(@PathVariable("productCode") long productCode,
//                                                                    @RequestParam(defaultValue = "date") String sort) {
//        log.debug("받은 productCode: {}", productCode);
//        List<ReviewDTO> reviews = reviewService.getReviewsByProductCode(productCode, sort);
//        log.debug("가져온 리뷰 개수: {}", reviews.size());
//        return ResponseEntity.ok(reviews);
//    }
//
//    // 로그인 된 회원의 선택 주문에 대한 리뷰 조회
//    @GetMapping("/review/mytravel/{memberCode}/{orderCode}")
//    public ResponseEntity<ReviewDTO> getMyReviewForOrder(@PathVariable("memberCode") long memberCode,
//                                                        @PathVariable("orderCode") long orderCode) {
//        try {
//            ReviewDTO reviewDTO = reviewService.getReviewByMemberCodeAndOrderCode(memberCode, orderCode);
//            if (reviewDTO == null) {
//                return ResponseEntity.notFound().build();
//            }
//            return ResponseEntity.ok(reviewDTO);
//        } catch (RuntimeException e) {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
//    // 관리자는 모든 상품에 대한 모든 회원의 리뷰를 조회 가능
//    @GetMapping("/admin/manage/review")
//    public ResponseEntity<List<ReviewDTO>> getAllReviews() {
//        List<ReviewDTO> allReviews = reviewService.getAllReviews();
//        return ResponseEntity.ok(allReviews);
//    }
//
//    // 관리자의 상품별 리뷰 조회
//    @GetMapping("/admin/manage/review/by-product/{productCode}")
//    public ResponseEntity<List<ReviewDTO>> getReviewsByProductForAdmin(@PathVariable long productCode) {
//        List<ReviewDTO> reviews = reviewService.getReviewsByProductCodeForAdmin(productCode);
//        return ResponseEntity.ok(reviews);
//    }
//
//    // OrderStatus가 COMPLETED인 회원만 리뷰 작성하기
//    @PostMapping(value = "/review/write", consumes = "multipart/form-data")
//    public ResponseEntity writeReview(@RequestParam("memberCode") Long memberCode,
//                                      @RequestParam("orderCode") Long orderCode,
//                                      @RequestParam("reviewRating") Integer reviewRating,
//                                      @RequestParam("reviewContent") String reviewContent,
//                                      @RequestPart(value = "file", required = false) MultipartFile file) {
//        ReviewDTO reviewDTO = new ReviewDTO();
//        reviewDTO.setMemberCode(memberCode);
//        reviewDTO.setOrderCode(orderCode);
//        reviewDTO.setReviewRating(reviewRating);
//        reviewDTO.setReviewContent(reviewContent);
//
//        int result = reviewService.writeReview(reviewDTO, file);
//        if(result == 1)
//            return ResponseEntity.status(HttpStatus.CREATED).body("추가 성공");
//        return ResponseEntity.status(HttpStatus.CONFLICT).body("존재하는 id 임");
//    }
//
//    // 리뷰 수정하기
//    @PutMapping(value = "/review/edit/{reviewCode}")
//    public ResponseEntity modifyReview(@PathVariable("reviewCode") long reviewCode,
//                                                    @RequestParam("reviewRating") int reviewRating,
//                                                    @RequestParam("reviewContent") String reviewContent,
//                                                    @RequestPart(value = "file", required = false) MultipartFile file) {
//
//        ReviewDTO reviewDTO = new ReviewDTO();
//        reviewDTO.setReviewRating(reviewRating);
//        reviewDTO.setReviewContent(reviewContent);
//
//        try {
//            String result = reviewService.modifyReview(reviewCode, reviewDTO, file);
//            return ResponseEntity.ok(result);
//        } catch (RuntimeException e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
//        }
//    }
//
//    // 리뷰 삭제하기
//    @DeleteMapping("/review/mytravel/{reviewCode}")
//    public ResponseEntity<Void> deleteMyReview(@PathVariable("reviewCode") long reviewCode) {
//        reviewService.deleteMyReview(reviewCode);
//        return ResponseEntity.ok().build();
//    }
//
//    // 관리자가 리뷰 삭제하면 삭제가 아니라 UPDATE
//    @PatchMapping("/admin/manage/reviews/{reviewCode}")
//    public ResponseEntity deleteByAdmin(@PathVariable("reviewCode") long reviewCode) {
//        reviewService.deleteReviewByAdmin(reviewCode);
//        return ResponseEntity.ok("리뷰가 관리자에 의해 삭제되었습니다.");
//    }
//
//    @GetMapping("/review/{reviewPic}/image")
//    public ResponseEntity getImage(@PathVariable(value="fileName") String reviewPic) {
//        byte[] imageByte = reviewService.getImage(reviewPic);
//        return ResponseEntity.ok()
//                .header(HttpHeaders.CONTENT_TYPE, "image/jpeg")
//                .body(imageByte);
//    }
//}
