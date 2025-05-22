package com.hello.travelogic.inquiry.service;

import com.hello.travelogic.inquiry.domain.InquiryChatEntity;
import com.hello.travelogic.inquiry.domain.InquiryChatMessageEntity;
import com.hello.travelogic.inquiry.dto.InquiryChatAdminDTO;
import com.hello.travelogic.inquiry.dto.InquiryChatDTO;
import com.hello.travelogic.inquiry.dto.InquiryChatMessageDTO;
import com.hello.travelogic.inquiry.repo.InquiryChatMessageRepo;
import com.hello.travelogic.inquiry.repo.InquiryChatRepo;
import com.hello.travelogic.member.domain.AuthorityEntity;
import com.hello.travelogic.member.domain.MemberRoleEntity;
import com.hello.travelogic.member.repository.AuthorityRepository;
import com.hello.travelogic.member.repository.MemberRoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class InquiryChatService {

    private final InquiryChatRepo inquiryChatRepo;
    private final InquiryChatMessageRepo inquiryChatMessageRepo;
    private final MemberRoleRepository memberRoleRepository;
    private final InquiryChatWebSocketService inquiryChatWebSocketService;


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


    // 관리자용 채팅방 전체 조회
    public List<InquiryChatAdminDTO> getChatListForAdmin() {
        log.info("getChatListForAdmin 호출");
        List<InquiryChatEntity> chatList = inquiryChatRepo.findAll(); // 필요 시 조건 추가
        log.debug("조회된 채팅방 수: {}", chatList.size());
        log.debug("chatList: {}", chatList);

        // DTO로 변환
        return chatList.stream().map(chat -> InquiryChatAdminDTO.builder()
                        .inquiryChatId(chat.getInquiryChatId())
                        .memberId(chat.getMemberId())
                        .inquiryChatStatus(chat.getInquiryChatStatus().name())
                        .inquiryChatStartDate(chat.getInquiryChatStartDate())
                        .inquiryChatEndDate(chat.getInquiryChatEndDate())
                        .build())
                .collect(Collectors.toList());

    }

    public InquiryChatEntity closeInquiryChat(Long icId) throws Exception {
        InquiryChatEntity chat = inquiryChatRepo.findById(icId)
                .orElseThrow(() -> new Exception("채팅을 찾을 수 없습니다."));
        log.debug("채팅 종료 서비스 호출>>>>> chat: {}", chat);

        if (chat.getInquiryChatStatus() == InquiryChatEntity.ChatStatus.CLOSED) {
            throw new Exception("이미 종료된 채팅입니다.");
        }

        chat.setInquiryChatStatus(InquiryChatEntity.ChatStatus.CLOSED);
        chat.setInquiryChatEndDate(LocalDateTime.now());

            // 시스템 메시지 추가
            InquiryChatMessageEntity systemMessage = new InquiryChatMessageEntity();
            systemMessage.setInquiryChat(chat);
            systemMessage.setInquiryChatMessage("채팅이 종료되었습니다.");
            systemMessage.setInquiryChatMessageSenderType(InquiryChatMessageEntity.SenderType.SYSTEM);
            systemMessage.setInquiryChatMessageType(InquiryChatMessageEntity.MessageType.SYSTEM);
            systemMessage.setInquiryChatMessageSentAt(LocalDateTime.now());


            // ROLE_ADMIN 권한을 가진 모든 관리자 조회
            List<MemberRoleEntity> adminMemberRoles = memberRoleRepository.findByAuthority_AuthorityName("ROLE_ADMIN");

            if (adminMemberRoles.isEmpty()) {
                log.error("ROLE_ADMIN 권한을 가진 관리자가 존재하지 않습니다.");
                throw new Exception("ROLE_ADMIN 권한을 가진 관리자가 없습니다.");
            }

            log.debug("adminMemberRoles: {}", adminMemberRoles);

            // 랜덤으로 한 명의 관리자 선택
            Random random = new Random();
            MemberRoleEntity selectedAdminRole = adminMemberRoles.get(random.nextInt(adminMemberRoles.size()));
            log.debug("선택된 관리자 MemberRole: memberCode={}, authorityCode={}",
                    selectedAdminRole.getMember().getMemberCode(),
                    selectedAdminRole.getAuthority().getAuthorityCode());

            log.debug("selectedAdminRole.getMember().getMemberCode(): {}", selectedAdminRole.getMember().getMemberCode());
            log.debug("selectedAdminRole.getAuthority().getAuthorityCode(): {}", selectedAdminRole.getAuthority().getAuthorityCode());

            systemMessage.setMemberRole(selectedAdminRole); // 선택된 관리자 할당

/*        chat.getMessages().add(systemMessage);
        log.debug("시스템 메시지 추가됨: {}", systemMessage);
        InquiryChatEntity savedChat = inquiryChatRepo.save(chat);
        log.debug("채팅 종료 완료: {}", savedChat);*/

        // 시스템 메시지 저장 및 icmId 확인
        InquiryChatMessageEntity savedSystemMessage = inquiryChatMessageRepo.save(systemMessage);
        log.debug("시스템 메시지 저장 완료: {}", savedSystemMessage);

        // 저장된 메시지를 채팅방에 추가
        chat.getMessages().add(savedSystemMessage);
        InquiryChatEntity savedChat = inquiryChatRepo.save(chat);
        log.debug("채팅 종료 완료: {}", savedChat);



        // 저장된 메시지를 DTO로 변환하여 브로드캐스트
        InquiryChatMessageDTO systemMessageDTO = new InquiryChatMessageDTO(systemMessage);
        inquiryChatWebSocketService.broadcastSystemMessage(icId, systemMessageDTO);

        return savedChat;

    }

}

