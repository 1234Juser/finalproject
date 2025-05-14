package com.hello.travelogic.member.service;

import com.hello.travelogic.member.domain.AuthorityEntity;
import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.member.domain.MemberRoleEntity;
import com.hello.travelogic.member.domain.PasswordResetAuthCodeEntity;
import com.hello.travelogic.member.dto.*;
import com.hello.travelogic.member.repository.AuthorityRepository;
import com.hello.travelogic.member.repository.MemberRepository;
import com.hello.travelogic.member.repository.MemberRoleRepository;
import com.hello.travelogic.member.repository.PasswordResetAuthCodeRepository;
import com.hello.travelogic.utils.JwtUtil;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final AuthorityRepository authorityRepository;
    private final MemberRoleRepository memberRoleRepository;
    private final PasswordResetAuthCodeRepository passwordResetAuthCodeRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final JavaMailSender mailSender;

    @Transactional
    public void signup(MemberDTO memberDTO) {
        if (memberRepository.existsByMemberId(memberDTO.getMemberId())) {
            throw new IllegalArgumentException("이미 사용중인 아이디입니다.");
        }
        if (memberRepository.existsByMemberEmail(memberDTO.getMemberEmail())) {
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
                .adminActive("Y")
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
    public boolean isIdDuplicated(String memberId) {
        return memberRepository.existsByMemberId(memberId);
    }

    public boolean isEmailDuplicated(String memberEmail) {
        return memberRepository.existsByMemberEmail(memberEmail);
    }

    //로그인
    public LoginResponseDTO login(LoginRequestDTO dto) {
        MemberEntity member = memberRepository.findByMemberId(dto.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("해당아이디가 존재하지않습니다."));



        if ("Y".equals(member.getMemberEndstatus())) {
            throw new RuntimeException("탈퇴한 회원은 로그인할 수 없습니다.");
        }


        // 소셜 로그인(카카오 등)은 비밀번호 체크를 하지 않음
        if (member.getSocialType() == null || member.getSocialType().isEmpty()) {
            // 일반회원만 비밀번호 검사
            if (!passwordEncoder.matches(dto.getMemberPassword(), member.getMemberPassword())) {
                throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
            }
        }
        // 1. roles를 먼저 추출

        List<String> roles = Optional.ofNullable(member.getRoles())
                .orElse(Collections.emptySet()) // null이면 빈 Set으로 대체
                .stream()
                .map(role -> role.getAuthority().getAuthorityName())
                .collect(Collectors.toList());

        // 2. roles를 담아 token 생성

        String token = jwtUtil.generateToken(member.getMemberId(), roles, member.getMemberCode());

        // 3. 프로필 이미지가 없으면 기본 이미지 사용
        String profileUrl = member.getMemberProfileImageUrl();
        if (profileUrl == null || profileUrl.isEmpty()) {
            profileUrl = "/img/default-profile.jpg"; // static 폴더 기준 경로로 작성
        }
        return new LoginResponseDTO(token, member.getMemberName(), profileUrl, roles, member.getMemberCode(), null, null);

    }

    //회원마이페이지
    public MyPageResponseDTO getMyPageInfo(String memberId) {
        MemberEntity member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new IllegalArgumentException("회원정보가 존재하지 않습니다."));
        return MyPageResponseDTO.builder()
                .memberName(member.getMemberName())
                .memberId(member.getMemberId())
                .memberEmail(member.getMemberEmail())
                .memberPhone(member.getMemberPhone())
                .memberProfileImageUrl(member.getMemberProfileImageUrl())
                .memberPassword("***") // 보안상 필요시 마스킹처리
                .socialType(member.getSocialType())
                .build();
    }

    //관리자 마이페이지
    public AdminMyPageResponseDTO getAdminMyPageInfo(String memberId) {
        MemberEntity member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new IllegalArgumentException("회원정보가 존재하지 않습니다."));
        // 권한 확인 (실제 프로젝트에서는 hasRole 등 검증 추가 권장)
        boolean isAdmin = member.getRoles().stream()
                .anyMatch(role -> "ROLE_ADMIN".equals(role.getAuthority().getAuthorityName()));
        if (!isAdmin) {
            throw new SecurityException("관리자 권한이 없습니다.");
        }
        String defaultProfileUrl = "/img/default-profile.jpg";
        String roleName = member.getRoles().stream()
                .map(role -> role.getAuthority().getAuthorityName())
                .filter("ROLE_ADMIN"::equals)
                .findFirst()
                .orElse("");
        return AdminMyPageResponseDTO.builder()
                .memberName(member.getMemberName())
                .memberId(member.getMemberId())
                .memberEmail(member.getMemberEmail())
                .memberPhone(member.getMemberPhone())
                .memberRole(roleName)
                .memberProfileImageUrl(defaultProfileUrl)
                .build();
    }

    @Transactional
    public void updateProfile(String memberId, @Valid MemberUpdateDTO dto) {
        MemberEntity member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new IllegalArgumentException("회원정보가 존재하지 않습니다."));
        //관리자차단
        boolean isAdmin = member.getRoles().stream()
                .anyMatch(role -> "ROLE_ADMIN".equals(role.getAuthority().getAuthorityName()));
        if (isAdmin) {
            throw new SecurityException("일반회원만 변경가능합니다.");
        }
        // '이름' 또는 '전화번호' 중 하나라도 변경값이 있을 때 수정
        boolean nameChanged = dto.getMemberName() != null && !dto.getMemberName().isBlank()
                && !dto.getMemberName().equals(member.getMemberName());
        boolean phoneChanged = dto.getMemberPhone() != null && !dto.getMemberPhone().isBlank()
                && !dto.getMemberPhone().equals(member.getMemberPhone());

        // 비밀번호 변경 로직
        if (dto.getNewPassword() != null && !dto.getNewPassword().isBlank()) {
            // 현재 비밀번호는 필수
            if (dto.getCurrentPassword() == null || dto.getCurrentPassword().isBlank()) {
                throw new IllegalArgumentException("비밀번호 변경 시 현재 비밀번호를 입력해야 합니다.");
            }
            if (!passwordEncoder.matches(dto.getCurrentPassword(), member.getMemberPassword())) {
                throw new IllegalArgumentException("현재 비밀번호가 올바르지 않습니다.");
            }
            if (passwordEncoder.matches(dto.getNewPassword(), member.getMemberPassword())) {
                throw new IllegalArgumentException("새 비밀번호가 현재 비밀번호와 같습니다.");
            }
            if (dto.getNewPassword().length() < 4) {
                throw new IllegalArgumentException("새 비밀번호는 4자 이상이어야 합니다.");
            }
            // 비번 변경
            member.setMemberPassword(passwordEncoder.encode(dto.getNewPassword()));
        } else if (dto.getCurrentPassword() != null && !dto.getCurrentPassword().isBlank()) {
            // 비밀번호 변경이 아니라 정보수정 시에도 현재 비밀번호 확인(옵션)
            if (!passwordEncoder.matches(dto.getCurrentPassword(), member.getMemberPassword())) {
                throw new IllegalArgumentException("현재 비밀번호가 올바르지 않습니다.");
            }
        }

        // 이름/전화번호 업데이트 (필요 시)
        if (nameChanged) {
            member.setMemberName(dto.getMemberName());
        }
        if (phoneChanged) {
            member.setMemberPhone(dto.getMemberPhone());
        }

        // 실제 저장은 @Transactional로 처리됨


    }
    //프로필이미지변경
    @Transactional
    public String updateProfileImage(String memberId, MultipartFile file) {
        MemberEntity member = memberRepository.findByMemberId(memberId)
                .orElseThrow(()-> new IllegalArgumentException("회원정보가 존재하지않습니다."));

        //파일 실제 저장로직
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        String uploadDir = new File("upload/img/").getAbsolutePath() + File.separator;
        File dir = new File(uploadDir);
        if(!dir.exists()) dir.mkdirs();

        File targetFile = new File(uploadDir + fileName);
        try {
            file.transferTo(targetFile);
        } catch (IOException e) {
            throw new RuntimeException("파일 업로드 중 오류가 발생했습니다.", e);
        }

        String imageUrl = "/img/" + fileName;
        member.setMemberProfileImageUrl(imageUrl);

        return imageUrl;
    }

    //회원탈퇴
    @Transactional
    public void withdrawMember(String memberId, String password) {
        MemberEntity member = memberRepository.findByMemberId(memberId)
                .orElseThrow(()-> new EntityNotFoundException("회원이 존재하지 않습니다."));

        //비밀번호 검증
        if(!passwordEncoder.matches(password, member.getMemberPassword())){
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
        member.setMemberEndstatus("Y");
        member.setMemberEnddate(LocalDateTime.now());

        memberRepository.save(member);

    }
    //아이디찾기
    public FindIdResponseDTO findId(FindIdRequestDTO dto) {
        MemberEntity member = memberRepository.findByMemberNameAndMemberEmail(dto.getMemberName(), dto.getMemberEmail())
                .orElseThrow(()-> new EntityNotFoundException("일치하는 정보 없음"));

        FindIdResponseDTO response = new FindIdResponseDTO();
        response.setMemberId(member.getMemberId());
        return response;
    }
    //비밀번호찾기(첫번째방법)
    @Transactional
    public FindPasswordResponseDTO findPassword(FindPasswordRequestDTO dto) {
        MemberEntity member = memberRepository.findByMemberNameAndMemberIdAndMemberEmail(
                dto.getMemberName(), dto.getMemberId(), dto.getMemberEmail()
        ).orElseThrow(() -> new EntityNotFoundException("일치하는 회원이 없습니다."));
        String tempPassword = generateRandomPassword(6);
        member.setMemberPassword(passwordEncoder.encode(tempPassword));
        memberRepository.save(member);
        return new FindPasswordResponseDTO(tempPassword);
    }
    //랜덤6자리
    private String generateRandomPassword(int length) {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder sb = new StringBuilder();
        for(int i = 0; i < length; i++) {
            int index = (int)(Math.random() * chars.length());
            sb.append(chars.charAt(index));
        }
        return sb.toString();
    }

    // 비밀번호 찾기(두번째 방법)
    // 1. 이메일로 인증번호 발송
    public boolean sendPasswordResetAuthCode(FindPasswordAuthRequestDTO dto) {
        //1. 회원 db에 해당 이메일이 존재하는지 확인
        Optional<MemberEntity> memberOpt = memberRepository.findByMemberNameAndMemberIdAndMemberEmail(
                dto.getMemberName(), dto.getMemberId(), dto.getMemberEmail());
        if(memberOpt.isEmpty()) {
            return false;
        }
        //2. 인증코드 생성
        String code = generateCode();
        // 인증번호는 Redis, DB or 임시 Map에 보관 필요
        //3. 인증코드 엔티티빌드
        PasswordResetAuthCodeEntity entity = PasswordResetAuthCodeEntity.builder()
                .memberEmail(dto.getMemberEmail())
                .authCode(code)
                .expiredAt(LocalDateTime.now().plusMinutes(5))
                .build();
        //4. 저장(이메일 중복 시 update 실행)
        passwordResetAuthCodeRepository.save(entity);

        // 5.인증번호 발송
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(dto.getMemberEmail());
        message.setSubject("[여행로직] 비밀번호 변경 인증번호");
        message.setText("인증번호: " + code);
        mailSender.send(message);

        // 인증코드 저장 로직 필요!
        return true;
    }
    // 2.인증번호 검증 + 성공 시 삭제
    @Transactional
    public boolean verifyAuthCode(String memberEmail, String authCode) {
        PasswordResetAuthCodeEntity entity =
                passwordResetAuthCodeRepository.findTopByMemberEmailOrderByExpiredAtDesc(memberEmail)
                        .orElse(null);

        // 없는 경우 or 만료된 경우 false
        if (entity == null || entity.getExpiredAt().isBefore(LocalDateTime.now())) {
            return false;
        }
        // 인증번호 일치 여부 확인
        if (!entity.getAuthCode().equals(authCode)) {
            return false;
        }
        // 인증성공 → 인증코드 삭제
        passwordResetAuthCodeRepository.delete(entity);
        // 또는 passwordResetAuthCodeRepository.deleteByMemberEmailAndAuthCode(memberEmail, authCode);

        return true;
    }


    //3. 비밀번호 변경
    public boolean resetPassword(PasswordResetRequestDTO dto) {
        Optional<MemberEntity> memberOpt = memberRepository.findByMemberId(dto.getMemberId());
        if(memberOpt.isEmpty()) {
            return false;
        }
        MemberEntity member = memberOpt.get();

        //이메일 일치여부
        if(!member.getMemberEmail().equals(dto.getMemberEmail())) {
            return false;
        }
        // 비밀번호 암호화 후 변경
        member.setMemberPassword(passwordEncoder.encode(dto.getNewPassword()));
        memberRepository.save(member);
        return true;
    }

    private String generateCode() {
        int len = 6;
        String chars = "0123456789";
        StringBuilder code = new StringBuilder();
        Random r = new Random();
        for (int i = 0; i < len; i++) code.append(chars.charAt(r.nextInt(chars.length())));
        return code.toString();
    }

    //만료된 인증번호 삭제
    @Scheduled(cron = "0 */10 * * * *") // 10분마다 실행
    @Transactional
    public void deleteExpiredAuthCodes() {
        passwordResetAuthCodeRepository.deleteByExpiredAtBefore(LocalDateTime.now());
    }
    //관리자마이페이지회원전체정보조회
    public List<MemberAllDTO> getAllMembers() {
        List<MemberEntity> allMembers = memberRepository.findAll();
        return allMembers.stream()
                .map(member -> {
                    Set<String> roleNames = member.getRoles().stream()
                            .map(role -> role.getAuthority().getAuthorityName())
                            .collect(Collectors.toSet());
                    return new MemberAllDTO(
                            member.getMemberCode(),
                            member.getMemberName(),
                            member.getMemberId(),
                            member.getMemberEmail(),
                            member.getMemberPhone(),
                            member.getMemberProfileImageUrl(),
                            member.getSocialType(),
                            member.getSocialAccountId(),
                            member.getMemberRegisterdate(),
                            member.getMemberEnddate(),
                            member.getMemberEndstatus(),
                            roleNames
                    );
                })
                .collect(Collectors.toList());
    }

    //관리자마이페이지회원상태변경
    @Transactional
    public void updateMemberEndstatus(String memberId, String newStatus) {
        MemberEntity member = memberRepository.findByMemberId(memberId)
                .orElseThrow(()-> new RuntimeException("해당 회원 없음"));
        member.setMemberEndstatus(newStatus);

        //활성화/비활성화
        if("Y".equals(newStatus)) {
            member.setAdminActive("N"); //비활성화상태(관리자의권한)
        }else{
            member.setAdminActive("Y"); //다시활성화
        }
        memberRepository.save(member);
    }


    // 프로필 이미지 URL 조회 메소드 추가
    public String getProfileImageUrl(String memberName) {

        return memberRepository.findByMemberName(memberName)
                .map(memberEntity -> memberEntity.getMemberProfileImageUrl())
                .orElse(null);
    }

}