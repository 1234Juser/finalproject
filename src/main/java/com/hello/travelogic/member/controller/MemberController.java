package com.hello.travelogic.member.controller;

import com.hello.travelogic.member.dto.*;
import com.hello.travelogic.member.service.MemberService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
@Slf4j
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody @Valid MemberDTO memberDTO){
        memberService.signup(memberDTO);
        return ResponseEntity.ok("회원가입이 완료되었습니다.");
    }

    @PostMapping("/check-id")
    public ResponseEntity<Boolean> checkId(@RequestBody Map<String, String> payload) {
        String memberId = payload.get("memberId");
        boolean exists = memberService.isIdDuplicated(memberId);
        return ResponseEntity.ok(exists);
    }

    @PostMapping("/check-email")
    public ResponseEntity<Boolean> checkEmail(@RequestBody Map<String, String> payload) {
        String memberEmail = payload.get("memberEmail");
        // 이메일 정규식(프론트와 동일하게 혹은 서버용 적합한 것으로)
        if (memberEmail == null || !memberEmail.matches("^[\\w-.]+@[\\w-]+\\.[a-zA-Z]{2,}$")) {
            return ResponseEntity.ok(false); // 형식에 안맞으면 무조건 사용불가로 취급
        }
        boolean exists = memberService.isEmailDuplicated(memberEmail);
        return ResponseEntity.ok(exists);
    }

    //로그인
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid LoginRequestDTO loginRequest){
        LoginResponseDTO result = memberService.login(loginRequest);
        return ResponseEntity.ok(result);
    }

    //회원마이페이지
    @GetMapping("/mypage")
    public ResponseEntity<MyPageResponseDTO> getMyPageInfo(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String memberId = (String) authentication.getPrincipal();
        MyPageResponseDTO dto = memberService.getMyPageInfo(memberId);
        return ResponseEntity.ok(dto);
    }

    //관리자 마이페이지
    @GetMapping("/adminmypage")
    public ResponseEntity<AdminMyPageResponseDTO> getAdminMyPageInfo(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String memberId = (String) authentication.getPrincipal();
        AdminMyPageResponseDTO dto = memberService.getAdminMyPageInfo(memberId);
        return ResponseEntity.ok(dto);
    }
    //회원 마이페이지 수정    
    @PutMapping("/mypage/update")
    public ResponseEntity<String> updateMyPageInfo(@RequestBody @Valid MemberUpdateDTO dto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String memberId = (String) authentication.getPrincipal();
        memberService.updateProfile(memberId, dto);
        return ResponseEntity.ok("회원 정보가 수정되었습니다.");
    }
    
    // 회원 프로필이미지 수정
    @PostMapping("/mypage/profile-image")
    public ResponseEntity<String> updateProfileImage(@RequestParam("file") MultipartFile file){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String memberId = (String) authentication.getPrincipal();
        String savedUrl = memberService.updateProfileImage(memberId,file);
        return ResponseEntity.ok(savedUrl);
    }
    //회원탈퇴
    @PutMapping("/withdraw")
    public ResponseEntity<String> withdraw(@RequestBody Map<String, String> payload){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String memberId = (String) authentication.getPrincipal();
        String password = payload.get("password");
        memberService.withdrawMember(memberId, password);
        return ResponseEntity.ok("회원 탈퇴가 처리되었습니다.");
    }

    //아이디찾기
    @PostMapping("/find-id")
    public ResponseEntity<FindIdResponseDTO> findId(@RequestBody FindIdRequestDTO dto){
        FindIdResponseDTO response = memberService.findId(dto);
        return ResponseEntity.ok(response);
    }
}
