package com.hello.travelogic.member.controller;

import com.hello.travelogic.member.dto.LoginRequestDTO;
import com.hello.travelogic.member.dto.LoginResponseDTO;
import com.hello.travelogic.member.dto.MemberDTO;
import com.hello.travelogic.member.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
