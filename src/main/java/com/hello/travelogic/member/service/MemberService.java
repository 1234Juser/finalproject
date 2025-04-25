package com.hello.travelogic.member.service;

import com.hello.travelogic.member.domain.AuthorityEntity;
import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.member.domain.MemberRoleEntity;
import com.hello.travelogic.member.dto.MemberDTO;
import com.hello.travelogic.member.repository.AuthorityRepository;
import com.hello.travelogic.member.repository.MemberRepository;
import com.hello.travelogic.member.repository.MemberRoleRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final AuthorityRepository authorityRepository;
    private final MemberRoleRepository memberRoleRepository;
    private final PasswordEncoder passwordEncoder;

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
}
