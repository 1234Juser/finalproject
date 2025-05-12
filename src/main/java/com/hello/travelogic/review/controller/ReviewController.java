package com.hello.travelogic.review.controller;

import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.member.repository.MemberRepository;
import com.hello.travelogic.order.domain.OptionEntity;
import com.hello.travelogic.order.domain.OrderEntity;
import com.hello.travelogic.order.domain.OrderStatus;
import com.hello.travelogic.order.repo.OptionRepo;
import com.hello.travelogic.order.repo.OrderRepo;
import com.hello.travelogic.product.domain.ProductEntity;
import com.hello.travelogic.product.dto.ProductDTO;
import com.hello.travelogic.review.domain.ReviewStatus;
import com.hello.travelogic.review.dto.ReviewDTO;
import com.hello.travelogic.review.repo.ReviewRepo;
import com.hello.travelogic.review.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ReviewController {

    private final ReviewService reviewService;
    private final MemberRepository memberRepository;
    private final OptionRepo optionRepo;
    private final ReviewRepo reviewRepo;
    private final OrderRepo orderRepo;

    // 상품 상세페이지 내 리뷰 조회
    @GetMapping("/review/product/{productUid}")
    public ResponseEntity<List<ReviewDTO>> getReviewListByProductUid(@PathVariable("productUid") String productUid,
                                                                     @RequestParam(defaultValue = "date") String sort) {
        log.debug("받은 productCode: {}", productUid);
//        List<ReviewDTO> reviews = reviewService.getReviewsByProductCode(productCode, sort);
//        log.debug("가져온 리뷰 개수: {}", reviews.size());
//        return ResponseEntity.ok(reviews);
        // 합친 버전
        return ResponseEntity.ok(reviewService.getReviewsByProductCode(productUid, sort));
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
    @GetMapping("/admin/review")
    public ResponseEntity getAllReviews(@RequestParam(value="start", defaultValue="0")int start,
                                        @RequestParam(value="productCode", required=false)Long productCode,
                                        Authentication authentication) {
        String memberId = authentication.getPrincipal().toString();
        boolean isAdmin = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(role -> role.equals("ROLE_ADMIN"));

        if (!isAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("접근 권한이 없습니다.");
        }
//        List<ReviewDTO> allReviews = reviewService.getAllReviews();
//        return ResponseEntity.ok(allReviews);
        try {
            Map<String, Object> result;
            if (productCode != null) {
                result = reviewService.getReviewsByProduct(productCode, start);
            } else {
                result = reviewService.getAllReviews(start);
            }
            return ResponseEntity.ok(result);
//            log.info("🟢 /admin/review 요청 시작");
//            List<ReviewDTO> reviews = reviewService.getAllReviews(productCode, start);
//            log.info("🟢 리뷰 목록 반환 완료 - 개수: {}", reviews.size());
//            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("🔴 리뷰 목록 조회 중 오류 발생", e);
            return ResponseEntity.status(500).body("리뷰 목록 조회 실패");
        }
//        return ResponseEntity.ok(reviewService.getAllReviews());
    }
    // 관리자의 상품별 리뷰 조회
    @GetMapping("/admin/review/by-product/{productCode}")
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
    @PostMapping(value = "/review/write/{orderCode}", consumes = "multipart/form-data")
    public ResponseEntity writeReview(@PathVariable Long orderCode,
//                                      @RequestParam("orderCode") Long orderCode,
                                      @RequestParam("reviewRating") Integer reviewRating,
                                      @RequestParam("reviewContent") String reviewContent,
                                      @RequestPart(value = "reviewPic", required = false) MultipartFile reviewPic,
                                      Authentication authentication) {
        try {
            String memberId = authentication.getPrincipal().toString();
            MemberEntity member = memberRepository.findByMemberId(memberId)
                    .orElseThrow(() -> new IllegalArgumentException("회원정보가 존재하지 않습니다."));
            OrderEntity orderEntity = orderRepo.findById(orderCode)
                    .orElseThrow(() -> new IllegalArgumentException("주문이 존재하지 않습니다."));
            if (!orderEntity.getOrderStatus().equals(OrderStatus.COMPLETED)) {
                throw new IllegalArgumentException("완료된 주문에 대해서만 리뷰를 작성할 수 있습니다.");
            }
            boolean alreadyReviewed = reviewRepo.existsByMemberMemberCodeAndOrderOrderCode(member.getMemberCode(), orderEntity.getOrderCode());
            if (alreadyReviewed) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 작성된 리뷰가 있습니다.");
            }
            ProductEntity productEntity = orderEntity.getProduct();

            ReviewDTO reviewDTO = new ReviewDTO();
            reviewDTO.setMemberCode(member.getMemberCode());
            reviewDTO.setOrderCode(orderCode);
            reviewDTO.setReviewRating(reviewRating);
            reviewDTO.setReviewContent(reviewContent);
            reviewDTO.setProductEntity(productEntity);

//            OptionEntity optionEntity = optionRepo.findById(orderCode)
//                    .orElseThrow(() -> new IllegalArgumentException("옵션이 존재하지 않습니다."));


            int result = reviewService.writeReview(reviewDTO, reviewPic);
            if(result == 1) {
                return ResponseEntity.status(HttpStatus.CREATED).body("리뷰가 성공적으로 작성되었습니다.");
            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("리뷰 등록 중 충돌 발생");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("리뷰 등록 실패: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 에러로 리뷰 등록 실패");
        }
    }

    // 리뷰 수정을 위한 리뷰 데이터 가져오기
    @GetMapping("/review/edit/{reviewCode}")
    public ResponseEntity<?> getReviewByReviewCode(@PathVariable Long reviewCode,
                                                   Authentication authentication) {
        try {
            String memberId = authentication.getPrincipal().toString();
            Long memberCode = memberRepository.findByMemberId(memberId)
                    .orElseThrow(() -> new IllegalArgumentException("회원정보가 존재하지 않습니다."))
                    .getMemberCode();
            ReviewDTO review = reviewService.findReviewByCodeAndMember(reviewCode, memberCode);
            return ResponseEntity.ok(review);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("리뷰 조회 실패");
        }
    }

    // 리뷰 수정하기
    @PutMapping(value = "/review/edit/{reviewCode}", consumes = "multipart/form-data")
    public ResponseEntity modifyReview(@PathVariable("reviewCode") long reviewCode,
                                       @RequestParam("reviewRating") Integer reviewRating,
                                       @RequestParam("reviewContent") String reviewContent,
                                       @RequestPart(value = "reviewPic", required = false) MultipartFile reviewPic,
                                       Authentication authentication) {
        try {
            String memberId = authentication.getPrincipal().toString();
            Long memberCode = memberRepository.findByMemberId(memberId)
                    .orElseThrow(() -> new IllegalArgumentException("회원정보가 존재하지 않습니다."))
                    .getMemberCode();
            if (reviewRating == null || reviewContent == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("평점과 리뷰 내용이 필요합니다.");
            }

            ReviewDTO reviewDTO = new ReviewDTO();
//            reviewDTO.setReviewRating(reviewRating);
//            reviewDTO.setReviewContent(reviewContent);
            if (reviewRating != null) {
                reviewDTO.setReviewRating(reviewRating);
            }
            if (reviewContent != null) {
                reviewDTO.setReviewContent(reviewContent);
            }

            String result = reviewService.modifyReview(reviewCode, reviewDTO, reviewPic);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("리뷰 수정 실패");
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

        try {
            reviewService.deleteMyReview(reviewCode, memberCode);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("리뷰 삭제 중 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 관리자가 리뷰 삭제하면 삭제가 아니라 UPDATE
    @PatchMapping("/admin/review/delete/{reviewCode}")
    public ResponseEntity deleteByAdmin(@PathVariable("reviewCode") long reviewCode,
                                        Authentication authentication) {
        try {
            boolean isAdmin = authentication.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .anyMatch(role -> role.equals("ROLE_ADMIN"));

            if (!isAdmin) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("접근 권한이 없습니다.");
            }
            reviewService.deleteReviewByAdmin(reviewCode);
            return ResponseEntity.ok("리뷰가 관리자에 의해 삭제되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("리뷰 삭제 실패");
        }
    }

    @GetMapping("/review/{reviewPic}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable(value="reviewPic") String reviewPic) {
        try {
            if (reviewPic == null || reviewPic.equals("nan")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            Path filePath = Paths.get("upload/review/" + reviewPic);
            if (!Files.exists(filePath)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            byte[] imageByte = Files.readAllBytes(Paths.get("upload/review/" + reviewPic));
            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.IMAGE_JPEG); // 기본은 JPEG로 설정

            // 파일 확장자에 따라 Content-Type 동적 설정
            String extension = reviewPic.substring(reviewPic.lastIndexOf(".") + 1).toLowerCase();
            if (extension.equals("png")) {
                headers.setContentType(MediaType.IMAGE_PNG);
            } else if (extension.equals("gif")) {
                headers.setContentType(MediaType.IMAGE_GIF);
            } else {
                headers.setContentType(MediaType.IMAGE_JPEG); // 기본은 JPEG
            }

            return new ResponseEntity<>(imageByte, headers, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // 관리자 권한 체크
    private boolean isAdmin(Authentication authentication) {
        return authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(role -> role.equals("ROLE_ADMIN"));
    }

    // 리뷰 평균내기
    @GetMapping("/review/product/{productUid}/average")
    public ResponseEntity<Double> getAverageRatingByProductUid(@PathVariable String productUid) {
        try {
            double averageRating = reviewService.getAverageRatingByProductUid(productUid);
            return ResponseEntity.ok(averageRating);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(0.0);
        }
    }

    // 리뷰 개수
    @GetMapping("/review/product/{productUid}/count")
    public ResponseEntity<Integer> getReviewCountByProductUid(@PathVariable String productUid) {
        try {
            int reviewCount = reviewService.getReviewCountByProductUid(productUid);
            return ResponseEntity.ok(reviewCount);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(0);
        }
    }

    // 관리자의 상품별 필터링
    @GetMapping("/admin/review/filter")
    public ResponseEntity<?> getReviewsByProductCode(
            @RequestParam(value = "productCode", required = false) Long productCode,
            @RequestParam(value = "start", defaultValue = "0") int start,
            Authentication authentication) {

        boolean isAdmin = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(role -> role.equals("ROLE_ADMIN"));

        if (!isAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("접근 권한이 없습니다.");
        }

        Map<String, Object> result = reviewService.getReviewsByProduct(productCode, start);
        return ResponseEntity.ok(result);
    }

    // 필터링 해서 상품별 조회
    @GetMapping("/admin/review/products")
    public ResponseEntity<?> getAllReviewListForFilter(Authentication authentication) {
        boolean isAdmin = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(role -> role.equals("ROLE_ADMIN"));

        if (!isAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("접근 권한이 없습니다.");
        }
        List<ProductDTO> productList = reviewService.getReviewListForFilter();
        return ResponseEntity.ok(productList);
    }
}
