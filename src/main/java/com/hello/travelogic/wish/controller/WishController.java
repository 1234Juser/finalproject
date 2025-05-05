package com.hello.travelogic.wish.controller;

import com.hello.travelogic.wish.dto.WishDTO;
import com.hello.travelogic.wish.dto.WishGroupDTO;
import com.hello.travelogic.wish.repo.WishGroupRepo;
import com.hello.travelogic.wish.service.WishService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@Slf4j
public class WishController {

    private final WishService wishService;
    private final WishGroupRepo wishGroupRepo;

    // 위시 그룹 불러오기
    @GetMapping("/wish/groups/{memberCode}")
    public ResponseEntity<List<WishGroupDTO>> getGroups(@PathVariable("memberCode") long memberCode) {
        log.debug("회원 {}의 위시 그룹 조회 요청", memberCode);
        List<WishGroupDTO> groupList = wishService.getGroups(memberCode);
        return ResponseEntity.ok(groupList);
    }

    // 위시 상품 불러오기
    @GetMapping("/wish/groups/{groupCode}/items")
    public ResponseEntity getItemsInGroup(@PathVariable("groupCode") long groupCode) {

        if (!wishGroupRepo.existsByGroupCode(groupCode)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        List<WishDTO> items = wishService.getItemsByGroupCode(groupCode);
        return ResponseEntity.ok(items);
    }

    // 위시 그룹 삭제하기
    @DeleteMapping("/wish/groups/{groupCode}")
    public ResponseEntity deleteGroup(@PathVariable("groupCode") long groupCode, @RequestParam("memberCode") long memberCode) {
        try {
            boolean isDeleted = wishService.deleteGroup(groupCode);
            if (isDeleted) {
                // 삭제 후 성공적으로 그룹리스트를 다시 불러와서 반환 (리스트 조회를 위해 수정)
                List<WishGroupDTO> groupList = wishService.getGroups(memberCode);
                // 그룹 삭제하고나면 다시 그룹리스트를 보여줘야함
                return ResponseEntity.ok(groupList);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("그룹을 찾을 수 없습니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류가 발생했습니다.");
        }
    }

    // 위시 등록취소하기
    @DeleteMapping("/wish/list/{wishCode}")
    public ResponseEntity cancelWish(@PathVariable long wishCode) {

        log.debug("delete {}", wishCode);
        try {
            List<WishDTO> updatedList = wishService.cancelWish(wishCode);

            return ResponseEntity.ok(updatedList);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("좋아요 취소에 실패하였습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류가 발생했습니다.");
        }
    }

    // 찜 등록취소 동시버전
    @PostMapping("/wish/toggle/{productCode}")
    public ResponseEntity<String> registerOrCancelWish(@RequestBody WishDTO dto, @PathVariable long productCode) {
        try {
            log.debug(">>> 찜 등록 또는 취소 시도: memberCode={}, productCode={}", dto.getMemberCode(), productCode);
            dto.setProductCode(productCode);
            // 찜 등록/취소 로직
            boolean isWishSuccessful = wishService.registerOrCancelWish(dto);
            // 이건 프론트에서 JSON형태 사용시 좋음.
            return ResponseEntity.ok(isWishSuccessful ? "LIKED" : "UNLIKED");
//            return ResponseEntity.ok(Map.of("status", isLiked ? "LIKED" : "UNLIKED"));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 정보가 존재하지 않습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("찜 등록/취소 중 오류 발생");
        }
    }

    // 위시 그룹 자동 생성
    @PostMapping("/wish/groups/auto-create")
    public ResponseEntity autoCreateWishGroups(@RequestParam long memberCode) {
        try {
            wishService.autoCreateWishGroups(memberCode); // 위시 그룹 자동 생성 서비스 호출
            return ResponseEntity.ok().body("위시 그룹이 도시 기준으로 자동 생성되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("자동 생성 중 오류 발생");
        }
    }

    @GetMapping("/wish/groups/fix-count")
    public ResponseEntity<String> fixWishGroupCounts() {
        wishService.updateWishCounts();
        return ResponseEntity.ok("wishCount 일괄 갱신 완료");
    }
}