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
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.List;
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

    //비밀번호찾기(첫번째방법)
    @PostMapping("/find-password")
    public ResponseEntity<FindPasswordResponseDTO> findPassword(@RequestBody FindPasswordRequestDTO dto){
        FindPasswordResponseDTO response = memberService.findPassword(dto);
        return ResponseEntity.ok(response);
    }

    //비밀번호찾기(두번째방법) : 인증코드 발송
    @PostMapping("/find-password/mail-auth")
    public ResponseEntity<?> sendPasswordResetEmail(@RequestBody FindPasswordAuthRequestDTO dto){
        boolean result = memberService.sendPasswordResetAuthCode(dto);
        if(result){
            return ResponseEntity.ok().body("인증번호가 발송되었습니다.");
        }else{
            return ResponseEntity.badRequest().body("입력하신 정보와 일치하는 회원이 없습니다");
        }
    }

    //2) 인증코드 확인
    @PostMapping("/find-password/verify-code")
    public ResponseEntity<?> verifyEmailAuthCode(@RequestBody EmailAuthVerifyRequestDTO dto){
        boolean success = memberService.verifyAuthCode(dto.getMemberEmail(), dto.getAuthCode());
        return ResponseEntity.ok(success);
    }

    //3. 비밀번호 변경
    @PostMapping("/find-password/reset")
    public ResponseEntity<?> resetPassword(@RequestBody PasswordResetRequestDTO dto){
        boolean changed = memberService.resetPassword(dto);
        return ResponseEntity.ok(changed);
    }

    //관리자마이페이지회원정보전체조회
    @GetMapping("/all")
    public ResponseEntity<List<MemberAllDTO>> getAllMembers(){
        List<MemberAllDTO> members = memberService.getAllMembers();
        return ResponseEntity.ok(members);
    }
    //관리자마이페이지회원상태변경
    @PutMapping("/update-endstatus/{memberId}")
    public ResponseEntity<String> updateMemberEndstatus(
            @PathVariable String memberId,
            @RequestBody Map<String, String> payload){
        String newStatus = payload.get("memberEndstatus");
        memberService.updateMemberEndstatus(memberId, newStatus);
        return ResponseEntity.ok("상태가 변경되었습니다.");
    }
}
