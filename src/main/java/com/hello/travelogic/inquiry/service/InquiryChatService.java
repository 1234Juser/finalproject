package com.hello.travelogic.inquiry.service;

import com.hello.travelogic.inquiry.domain.InquiryChatEntity;
import com.hello.travelogic.inquiry.domain.InquiryChatMessageEntity;
import com.hello.travelogic.inquiry.dto.InquiryChatDTO;
import com.hello.travelogic.inquiry.dto.InquiryChatMessageDTO;
import com.hello.travelogic.inquiry.repo.InquiryChatMessageRepo;
import com.hello.travelogic.inquiry.repo.InquiryChatRepo;
import com.hello.travelogic.member.domain.MemberRoleEntity;
import com.hello.travelogic.member.repository.MemberRoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class InquiryChatService {

    private final InquiryChatRepo inquiryChatRepo;
    private final InquiryChatMessageRepo inquiryChatMessageRepo;
    private final MemberRoleRepository memberRoleRepository;
    

    // (회원이 1:1문의창을 열고 첫 메시지를 보내면, 새로운 채팅방이 생성되는 것을 처리함)
    @Transactional
    public InquiryChatDTO startChat(InquiryChatDTO inquiryChatDTO) {
        
        log.debug ("프론트로부터 채팅방 생성 DTO 확인하기 : {}", inquiryChatDTO);
        
        // 비회원 설정
        boolean isGuest = (inquiryChatDTO.getMemberCode() == null); // memberCode로 회원/비회원 구분
        log.info("startChat 호출 - DTO: {}, 비회원 여부: {}", inquiryChatDTO, isGuest);
        
        if (isGuest) {
            // 1. 비회원 처리: 임시 채팅방 DTO 생성 (DB 저장 X)
            Long guestIcId = 0L;
            log.info("비회원용 임시 채팅방 ID 생성: {}", guestIcId);
            return InquiryChatDTO.builder()
                   .icId(guestIcId)
                   .memberId(inquiryChatDTO.getMemberId() != null ? inquiryChatDTO.getMemberId() : "비회원")
                   .icStartDate(LocalDateTime.now())
                   .icChatStatus(InquiryChatEntity.ChatStatus.WAITING.name()) // 상태는 문자열로
                   .build();
            
        } else {
            // 2. 회원 처리: 회원 정보 설정하고 DB에 저장, 엔티티를 DTO로 변환하여 반환
            // 2-1. 회원 정보 설정 및 DB 저장
            InquiryChatEntity chat = new InquiryChatEntity();
            chat.setInquiryChatStartDate(LocalDateTime.now());
            chat.setInquiryChatEndDate(null);
            chat.setInquiryChatStatus(InquiryChatEntity.ChatStatus.WAITING);
            chat.setMemberId(inquiryChatDTO.getMemberId());     // DTO에서 받은 memberId 사용
            
            // -----memberCode, authorityCode 가져오기-------------------------------------------
            Long memberCodeFromDTO = inquiryChatDTO.getMemberCode();
            
            if (memberCodeFromDTO == null) {
                log.error("회원 채팅방 생성 실패: DTO에 memberCode가 없습니다. DTO: {}", inquiryChatDTO);
                throw new IllegalArgumentException("Member chat creation requires memberCode.");
            }
            // MemberRoleRepository를 사용해 해당 memberCode의 모든 MemberRoleEntity를 가져옴
            List<MemberRoleEntity> memberRoles = memberRoleRepository.findByMember_MemberCode(memberCodeFromDTO);
            if (memberRoles.isEmpty()) {
                throw new RuntimeException("해당 memberCode에 맞는 MemberRole을 찾을 수 없습니다. memberCode: " + memberCodeFromDTO);
            }
            // 사용자가 1:1 문의를 시작할 때는 'ROLE_USER' 권한을 기준으로 한다고 가정합니다.
            // 실제 AuthorityEntity에서 권한 이름을 가져오는 getter와 권한명이 'ROLE_USER'인지 확인해야 합니다.
            final String targetRoleName = "ROLE_USER";
            MemberRoleEntity selectedMemberRole = memberRoles.stream()
                                                  .filter(role -> role.getAuthority() != null && targetRoleName.equals(role.getAuthority().getAuthorityName()))
                                                  // MemberRoleEntity 내부의 AuthorityEntity와 그 필드명(getAuthorityName)을 확인하세요.
                                                  .findFirst()
                                                  .orElseThrow(() ->
                                                               new RuntimeException("사용자(ROLE_USER) 권한을 찾을 수 없습니다. memberCode: " + memberCodeFromDTO + ". 사용 가능한 역할: " + memberRoles.stream().map(r -> r.getAuthority().getAuthorityName()).collect(Collectors.toList())));
            
            log.debug("선택된 memberRole ({}): {}", targetRoleName, selectedMemberRole);
            chat.setMemberRole(selectedMemberRole);     // 조회 및 필터링된 MemberRoleEntity 설정
            // -----------------------------------------------------------------------------------------
            
            InquiryChatEntity savedChat = inquiryChatRepo.save(chat);
            log.info("회원용 채팅방 생성 및 저장 완료, ID: {}", savedChat.getInquiryChatId());
            
            // 2-2. 저장된 엔티티를 DTO로 변환하여 반환
            InquiryChatDTO.InquiryChatDTOBuilder dtoBuilder = InquiryChatDTO.builder()
                                                .icId(savedChat.getInquiryChatId())
                                                .memberId(savedChat.getMemberId());
            
            // MemberRole 정보가 성공적으로 chat 엔티티에 설정되었다면 DTO에도 추가
/*            if (savedChat.getMemberRole() != null) {
                // MemberRoleEntity에 getMember()와 getAuthority()가 있고, 각각 getMemberCode(), getAuthorityCode()가 있다고 가정
                // MemberRoleEntity가 Member 객체를 가지고 있고, Member 객체가 memberCode를 가지고 있다고 가정 (가지고 있음 ㅇㅇ)
                 dtoBuilder.memberCode(savedChat.getMemberRole().getMember().getMemberCode());
                 dtoBuilder.authorityCode(savedChat.getMemberRole().getAuthority().getAuthorityCode());
            }*/
            if (savedChat.getMemberRole() != null &&
                savedChat.getMemberRole().getMember() != null &&
                savedChat.getMemberRole().getAuthority() != null) {
                
                dtoBuilder.memberCode(savedChat.getMemberRole().getMember().getMemberCode());
                dtoBuilder.authorityCode(savedChat.getMemberRole().getAuthority().getAuthorityCode());
            }
            
            
            dtoBuilder.icStartDate(savedChat.getInquiryChatStartDate())
                                .icEndDate(savedChat.getInquiryChatEndDate())
                                .icChatStatus(savedChat.getInquiryChatStatus().name());
            
            return dtoBuilder.build();
        }
    }
    


    // (전달된 DTO를 통해 메시지 엔티티 만듦 → 해당 메시지르 DB에 저장)
    // 이 메소드는 현재 WebSocket을 통한 메시지 처리에서는 직접 사용되지 않을 수 있습니다.
    // 만약 REST API로 메시지를 저장해야 한다면 구현이 필요합니다.
    public InquiryChatMessageEntity saveMessage(InquiryChatMessageDTO inquiryChatMessageDTO) {
        log.warn("saveMessage via REST API is called, but typically messages are handled via WebSocket. DTO: {}", inquiryChatMessageDTO);
        // 실제 구현 필요 시 추가
        
        return null;
    }


    // (채팅방ID 기준으로 해당 채팅방의 메시지를 보낸 시간 순으로 정렬)
    // 유저가 채팅방을 다시 열었을 때, 이전 대화 내용을 시간 순으로 불러와서 보여주는 기능을 담당.
    /*public List<InquiryChatMessageEntity> getMessages(Long icId) {
        return inquiryChatMessageRepo.findMessagesByChatId(icId);
    }*/
    public List<InquiryChatMessageEntity> getMessages(Long icId) {
        log.info("getMessages 호출 - icId: {}", icId);
        if (icId == 0) {
            log.info("비회원 채팅방 ({})에 대한 이전 메시지 조회는 지원하지 않습니다.", icId);
            return List.of(); // 비회원은 이전 메시지가 없음 (DB 저장 안 하므로)
        }
        try {
            return inquiryChatMessageRepo.findMessagesByChatId(icId);
        } catch (NumberFormatException e) {
            log.error("잘못된 형식의 icId입니다: {}", icId, e);
            return List.of();
        }
    }


    // 관리자가 전체 채팅 목록을 조회할 수 있도록 제공하는 메서드.
    // 현재는 단순히 findAll()로 모든 채팅방을 가져오지만, 나중에 진행중,종료됨,최근 생성순 같은 조건을 붙일 수 있음.
    public List<InquiryChatEntity> getChatListForAdmin() {
        log.info("getChatListForAdmin 호출");
        return inquiryChatRepo.findAll(); // 필요 시 조건 추가
    }

}

