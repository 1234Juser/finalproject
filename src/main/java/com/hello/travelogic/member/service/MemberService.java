package com.hello.travelogic.member.service;

import com.hello.travelogic.member.domain.AuthorityEntity;
import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.member.domain.MemberRoleEntity;
import com.hello.travelogic.member.dto.LoginRequestDTO;
import com.hello.travelogic.member.dto.LoginResponseDTO;
import com.hello.travelogic.member.dto.MemberDTO;
import com.hello.travelogic.member.repository.AuthorityRepository;
import com.hello.travelogic.member.repository.MemberRepository;
import com.hello.travelogic.member.repository.MemberRoleRepository;
import com.hello.travelogic.utils.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final AuthorityRepository authorityRepository;
    private final MemberRoleRepository memberRoleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Transactional
    public void signup(MemberDTO memberDTO){
        if(memberRepository.existsByMemberId(memberDTO.getMemberId())){
            throw new IllegalArgumentException("이미 사용중인 아이디입니다.");
        }
        if(memberRepository.existsByMemberEmail(memberDTO.getMemberEmail())){
            throw new IllegalArgumentException("이미 사용중인 이메일입니다.");
        }

        //1. dto-> entity 변환 및 암호화
        MemberEntity memberEntity = MemberEntity.builder()
                .memberName(memberDTO.getMemberName())
                .memberId(memberDTO.getMemberId())
                .memberPassword(passwordEncoder.encode(memberDTO.getMemberPassword()))
                .memberEmail(memberDTO.getMemberEmail())
                .memberPhone(memberDTO.getMemberPhone())
                .memberRegisterdate(LocalDateTime.now())
                .memberEndstatus("N")
                .socialType(memberDTO.getSocialType())
                .socialAccountId(memberDTO.getSocialAccountId())
                .socialAccountCi(memberDTO.getSocialAccountCi())
                .build();

        MemberEntity savedMember = memberRepository.save(memberEntity);

        //2. 회원가입시 user권한만 부여
        AuthorityEntity userRole = authorityRepository.findByAuthorityName("ROLE_USER");
        // 권한 조회 (필수 권한이 없을 경우 예외)
        if (userRole == null) {
            throw new IllegalStateException("기본 권한이 존재하지 않습니다: ROLE_USER");
        }
        MemberRoleEntity memberRole = MemberRoleEntity.builder()
                .id(new MemberRoleEntity.MemberRoleId(savedMember.getMemberCode(), userRole.getAuthorityCode()))
                .member(savedMember)
                .authority(userRole)
                .build();
        memberRoleRepository.save(memberRole);
    }
    //회원가입중복관련코드
    public boolean isIdDuplicated(String memberId){
        return memberRepository.existsByMemberId(memberId);
    }
    public boolean isEmailDuplicated(String memberEmail){
        return memberRepository.existsByMemberEmail(memberEmail);
    }

    //로그인
    public LoginResponseDTO login(LoginRequestDTO dto){
        MemberEntity member = memberRepository.findByMemberId(dto.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("해당아이디가 존재하지않습니다."));

        if(!passwordEncoder.matches(dto.getMemberPassword(), member.getMemberPassword())){
            throw new IllegalArgumentException("비밀번호가 맞지 않습니다.");
        }

        String token = jwtUtil.generateToken(member.getMemberId());

        // 1. 프로필 이미지가 없으면 기본 이미지 사용
        String profileUrl = member.getMemberProfileImageUrl();
        if (profileUrl == null || profileUrl.isEmpty()) {
            profileUrl = "/img/default-profile.jpg"; // static 폴더 기준 경로로 작성
        }

        // 2. 권한(roles) 리스트 추출
        List<String> roles = member.getRoles().stream()
                .map(role -> role.getAuthority().getAuthorityName())
                .collect(Collectors.toList());

        return new LoginResponseDTO(token, member.getMemberName(), profileUrl, roles);

    }
}
