package com.hello.travelogic.review.controller;

import com.hello.travelogic.member.repository.MemberRepository;
import com.hello.travelogic.order.domain.OptionEntity;
import com.hello.travelogic.order.repo.OptionRepo;
import com.hello.travelogic.product.domain.ProductEntity;
import com.hello.travelogic.review.domain.ReviewStatus;
import com.hello.travelogic.review.dto.ReviewDTO;
import com.hello.travelogic.review.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ReviewController {

    private final ReviewService reviewService;
    private final MemberRepository memberRepository;
    private final OptionRepo optionRepo;

    // 상품 상세페이지 내 리뷰 조회
    @GetMapping("/review/product/{productCode}")
    public ResponseEntity<List<ReviewDTO>> getReviewListByProductCode(@PathVariable("productCode") long productCode,
                                                                      @RequestParam(defaultValue = "date") String sort) {
        log.debug("받은 productCode: {}", productCode);
//        List<ReviewDTO> reviews = reviewService.getReviewsByProductCode(productCode, sort);
//        log.debug("가져온 리뷰 개수: {}", reviews.size());
//        return ResponseEntity.ok(reviews);
        // 합친 버전
        return ResponseEntity.ok(reviewService.getReviewsByProductCode(productCode, sort));
    }

    // 로그인 된 회원의 선택 주문에 대한 리뷰 조회
    @GetMapping("/review/view/{orderCode}")
    public ResponseEntity<ReviewDTO> getMyReviewForOrder(@PathVariable("orderCode") long orderCode,
                                                         Authentication authentication) {
        String memberId = authentication.getPrincipal().toString();
        Long memberCode = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new IllegalArgumentException("회원정보가 존재하지 않습니다."))
                .getMemberCode();
        try {
            ReviewDTO reviewDTO = reviewService.getReviewByMemberCodeAndOrderCode(memberCode, orderCode);
            if (reviewDTO == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(reviewDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // 관리자는 모든 상품에 대한 모든 회원의 리뷰를 조회 가능
    @GetMapping("/admin/manage/review")
    public ResponseEntity getAllReviews(Authentication authentication) {
        String memberId = authentication.getPrincipal().toString();
        boolean isAdmin = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(role -> role.equals("ROLE_ADMIN"));

        if (!isAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("접근 권한이 없습니다.");
        }
//        List<ReviewDTO> allReviews = reviewService.getAllReviews();
//        return ResponseEntity.ok(allReviews);
        return ResponseEntity.ok(reviewService.getAllReviews());
    }

    // 관리자의 상품별 리뷰 조회
    @GetMapping("/admin/manage/review/by-product/{productCode}")
    public ResponseEntity getReviewsByProductForAdmin(@PathVariable long productCode,
                                                      Authentication authentication) {
        boolean isAdmin = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(role -> role.equals("ROLE_ADMIN"));

        if (!isAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("접근 권한이 없습니다.");
        }
        return ResponseEntity.ok(reviewService.getReviewsByProductCodeForAdmin(productCode));
//        List<ReviewDTO> reviews = reviewService.getReviewsByProductCodeForAdmin(productCode);
//        return ResponseEntity.ok(reviews);
    }

    // 리뷰 작성을 위한 주문 정보 가지고 오기
    @GetMapping("/review/write/info/{orderCode}")
    public ResponseEntity<ReviewDTO> getInfoForWriteReview(@PathVariable Long orderCode, Authentication authentication) {
        String memberId = authentication.getPrincipal().toString();
        Long memberCode = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new IllegalArgumentException("회원정보가 존재하지 않습니다."))
                .getMemberCode();

        ReviewDTO reviewDTO = reviewService.getInfoForWriteReview(orderCode, memberCode);
        return ResponseEntity.ok(reviewDTO);
    }

    // OrderStatus가 COMPLETED인 회원만 리뷰 작성하기
    @PostMapping(value = "/review/write", consumes = "multipart/form-data")
    public ResponseEntity writeReview(@RequestParam("orderCode") Long orderCode,
                                      @RequestParam("reviewRating") Integer reviewRating,
                                      @RequestParam("reviewContent") String reviewContent,
                                      @RequestPart(value = "file", required = false) MultipartFile file,
                                      Authentication authentication) {
        try {
            String memberId = authentication.getPrincipal().toString();
            Long memberCode = memberRepository.findByMemberId(memberId)
                    .orElseThrow(() -> new IllegalArgumentException("회원정보가 존재하지 않습니다."))
                    .getMemberCode();

            ReviewDTO reviewDTO = new ReviewDTO();
            reviewDTO.setMemberCode(memberCode);
            reviewDTO.setOrderCode(orderCode);
            reviewDTO.setReviewRating(reviewRating);
            reviewDTO.setReviewContent(reviewContent);

            OptionEntity optionEntity = optionRepo.findById(orderCode)
                    .orElseThrow(() -> new IllegalArgumentException("옵션이 존재하지 않습니다."));
            ProductEntity productEntity = optionEntity.getProduct();

            reviewDTO.setOption(optionEntity);
            reviewDTO.setProduct(productEntity);

            int result = reviewService.writeReview(reviewDTO, file);
            if(result == 1) {
                return ResponseEntity.status(HttpStatus.CREATED).body("리뷰가 성공적으로 작성되었습니다.");
            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 작성된 리뷰가 있습니다.");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("리뷰 등록 실패");
        }
    }

    // 리뷰 수정하기
    @PutMapping(value = "/review/edit/{reviewCode}", consumes = "multipart/form-data")
    public ResponseEntity modifyReview(@PathVariable("reviewCode") long reviewCode,
                                       @RequestParam("reviewRating") int reviewRating,
                                       @RequestParam("reviewContent") String reviewContent,
                                       @RequestPart(value = "file", required = false) MultipartFile file,
                                       Authentication authentication) {
        String memberId = authentication.getPrincipal().toString();
        Long memberCode = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new IllegalArgumentException("회원정보가 존재하지 않습니다."))
                .getMemberCode();

        try {
            ReviewDTO reviewDTO = new ReviewDTO();
            reviewDTO.setReviewRating(reviewRating);
            reviewDTO.setReviewContent(reviewContent);

            String result = reviewService.modifyReview(reviewCode, reviewDTO, file);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // 리뷰 삭제하기
    @DeleteMapping("/review/delete/{reviewCode}")
    public ResponseEntity<Void> deleteMyReview(@PathVariable("reviewCode") long reviewCode,
                                               Authentication authentication) {
        String memberId = authentication.getPrincipal().toString();
        Long memberCode = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new IllegalArgumentException("회원정보가 존재하지 않습니다."))
                .getMemberCode();

        reviewService.deleteMyReview(reviewCode, memberCode);
        return ResponseEntity.ok().build();
    }

    // 관리자가 리뷰 삭제하면 삭제가 아니라 UPDATE
    @PatchMapping("/admin/manage/reviews/{reviewCode}")
    public ResponseEntity deleteByAdmin(@PathVariable("reviewCode") long reviewCode,
                                        Authentication authentication) {
        boolean isAdmin = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(role -> role.equals("ROLE_ADMIN"));

        if (!isAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("접근 권한이 없습니다.");
        }
        reviewService.deleteReviewByAdmin(reviewCode);
        return ResponseEntity.ok("리뷰가 관리자에 의해 삭제되었습니다.");
    }

    @GetMapping("/review/{reviewPic}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable(value="reviewPic") String reviewPic) {
        byte[] imageByte = reviewService.getImage(reviewPic);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, "image/jpeg")
                .body(imageByte);
    }

    // 관리자 권한 체크
    private boolean isAdmin(Authentication authentication) {
        return authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(role -> role.equals("ROLE_ADMIN"));
    }
}
