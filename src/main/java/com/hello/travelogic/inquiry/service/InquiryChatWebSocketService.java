package com.hello.travelogic.inquiry.service;

import com.hello.travelogic.inquiry.dto.InquiryChatMessageDTO;
import com.hello.travelogic.inquiry.domain.InquiryChatEntity;
import com.hello.travelogic.inquiry.domain.InquiryChatMessageEntity;
import com.hello.travelogic.inquiry.repo.InquiryChatMessageRepo;
import com.hello.travelogic.inquiry.repo.InquiryChatRepo;
import com.hello.travelogic.member.domain.MemberRoleEntity;
import com.hello.travelogic.member.repository.MemberRoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class InquiryChatWebSocketService {

    private final SimpMessagingTemplate messagingTemplate;
    private final InquiryChatMessageRepo inquiryChatMessageRepo;
    private final InquiryChatRepo inquiryChatRepo;
    private final MemberRoleRepository memberRoleRepo;


    // 일반 디버깅 및 정보 로그용
//    private static final generalLogger = LoggerFactory.getLogger(InquiryChatWebSocketService.class);


    // 클라이언트 메시지 처리 (기존 로직 너무 길어서 캡슐화)
    @Transactional
    public InquiryChatMessageDTO handleUserMessage(Long icId, InquiryChatMessageDTO messageDTO) {
        log.debug("사용자 메시지 처리 - icId: {}, 메시지 DTO: {}", icId, messageDTO);

        // 비회원 메시지 처리
        if (isGuestMessage(messageDTO)) {
            return processGuestMessage(icId, messageDTO);
        }

        // 회원 메시지 처리
        return processMemberMessage(icId, messageDTO);
    }

    // 관리자 메시지 처리
    @Transactional
    public InquiryChatMessageDTO handleAdminMessage(Long icId, InquiryChatMessageDTO messageDTO, SimpMessageHeaderAccessor headerAccessor) {
        log.debug("관리자 메시지 처리 - icId: {}, 메시지 DTO: {}", icId, messageDTO);
        
        // 추가적인 관리자 권한 확인 로직이 필요할 경우 구현
        // 예: headerAccessor를 통해 관리자 인증 확인
        // 브로드캐스트
/*        String destination = "/topic/admin/inquiry/" + icId + "/send";
        log.info("관리자 메시지 브로드캐스트 완료 - destination: {}", destination);


        return processMemberMessage(icId, messageDTO);*/

        // 메시지 처리
        InquiryChatMessageDTO processedMessage = processMemberMessage(icId, messageDTO);

        // 브로드캐스트
        String destination = "/topic/admin/inquiry/" + icId + "/send";
        messagingTemplate.convertAndSend(destination, processedMessage);
        log.info("관리자 메시지 브로드캐스트 완료 - destination: {}, 메시지 ID: {}", destination, processedMessage.getIcmId());

        return processedMessage;

    }

    // 캡슐화 1 - 비회원 메시지 (DB 저장X, 시스템 안내 메시지 생성)
    private InquiryChatMessageDTO processGuestMessage(Long guestIcId, InquiryChatMessageDTO incomingMessageDTO) {
        log.info("비회원 메시지 처리 - icId: {}, 메시지: {}", guestIcId, incomingMessageDTO.getMessage());

        InquiryChatMessageDTO systemMessage = InquiryChatMessageDTO.builder()
                .icId(guestIcId)
                .senderType(InquiryChatMessageEntity.SenderType.SYSTEM)
                .message("1:1 상담은 회원에게만 제공됩니다. 로그인 혹은 회원가입이 필요합니다.")
                .sendAt(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
                .messageType(InquiryChatMessageEntity.MessageType.SYSTEM)
                .memberId("GUEST")
                .build();

        String destination = "/topic/inquiry/" + guestIcId + "/send";
        messagingTemplate.convertAndSend(destination, systemMessage);
        log.info("비회원에게 시스템 메시지 발송 - destination: {}, 메시지: {}", destination, systemMessage.getMessage());

        return systemMessage;
    }

    // 캡슐화 2 - 회원 메시지 처리
    private InquiryChatMessageDTO processMemberMessage(Long icId, InquiryChatMessageDTO messageDTO) {
        log.info("회원 메시지 처리 시작 - icId: {}, 메시지: {}", icId, messageDTO.getMessage());

        // 1. 채팅방 엔티티 조회
        InquiryChatEntity chat = inquiryChatRepo.findById(icId)
                .orElseThrow(() -> {
                    log.error("채팅방을 찾을 수 없습니다 - icId: {}", icId);
                    return new RuntimeException("Chat not found with ID: " + icId);
                });

        // 2. 발신자 MemberRole 엔티티 조회
        MemberRoleEntity memberRole = getMemberRoleForMessage(messageDTO);

        // 3. 메시지 엔티티 생성 및 DB 저장
        InquiryChatMessageEntity messageEntity = createAndSaveChatMessageEntity(chat, memberRole, messageDTO);

        // 4. 관리자 메시지인 경우 채팅방 상태 업데이트
        if (InquiryChatMessageEntity.SenderType.ADMIN.equals(messageDTO.getSenderType())) {
            updateChatStatusToActive(chat);
        }

        // 5. 저장된 엔티티를 DTO로 변환하여 반환 및 브로드캐스트
        InquiryChatMessageDTO processedMessageDto = new InquiryChatMessageDTO(messageEntity);
        String destination = "/topic/inquiry/" + icId + "/send";
        messagingTemplate.convertAndSend(destination, processedMessageDto);
        log.info("회원 메시지 발송 완료 - destination: {}, 메시지 ID: {}", destination, processedMessageDto.getIcmId());

        return processedMessageDto;
    }

    // 캡슐화 3 - memberRole 찾기
    private MemberRoleEntity getMemberRoleForMessage(InquiryChatMessageDTO messageDTO) {
        if (messageDTO.getMemberCode() == null) {
            log.warn("회원 메시지이나 MemberCode가 없습니다 - DTO: {}", messageDTO);
            throw new IllegalArgumentException("Member message must have memberCode.");
        }

        String targetAuthorityName = InquiryChatMessageEntity.SenderType.ADMIN.equals(messageDTO.getSenderType())
                ? "ROLE_ADMIN" : "ROLE_USER";
        Long memberCode = messageDTO.getMemberCode();

        return memberRoleRepo.findByMember_MemberCode(memberCode)
                .stream()
                .filter(mr -> mr.getAuthority() != null && mr.getAuthority().getAuthorityName().equals(targetAuthorityName))
                .findFirst()
                .orElseThrow(() -> {
                    log.error("MemberRole을 찾을 수 없습니다 - memberCode: {}, role: {}", memberCode, targetAuthorityName);
                    return new RuntimeException("Required MemberRole not found for memberCode " + memberCode + " and role " + targetAuthorityName);
                });
    }

    // 캡슐화 4 - 메시지 DB 저장
    private InquiryChatMessageEntity createAndSaveChatMessageEntity(InquiryChatEntity chat, MemberRoleEntity memberRole, InquiryChatMessageDTO messageDTO) {
        InquiryChatMessageEntity messageEntity = new InquiryChatMessageEntity();
        messageEntity.setInquiryChat(chat);
        messageEntity.setMemberRole(memberRole);
        messageEntity.setInquiryChatMessageSenderType(messageDTO.getSenderType());
        messageEntity.setInquiryChatMessage(messageDTO.getMessage());
        messageEntity.setInquiryChatMessageSentAt(LocalDateTime.now(ZoneId.of("Asia/Seoul")));
        messageEntity.setInquiryChatMessageType(
                messageDTO.getMessageType() != null ?
                        messageDTO.getMessageType() :
                        InquiryChatMessageEntity.MessageType.CHAT
        );

        return inquiryChatMessageRepo.save(messageEntity);
    }

    // 캡슐화 5 - 채팅 상태 active로 활성화
    private void updateChatStatusToActive(InquiryChatEntity chat) {
        if (!InquiryChatEntity.ChatStatus.ACTIVE.equals(chat.getInquiryChatStatus())) {
            chat.setInquiryChatStatus(InquiryChatEntity.ChatStatus.ACTIVE);
            inquiryChatRepo.save(chat);
            log.info("채팅방 상태 업데이트 - icId: {}, 상태: ACTIVE", chat.getInquiryChatId());
        }
    }

    // 비회원 메시지 여부 확인
    private boolean isGuestMessage(InquiryChatMessageDTO messageDTO) {
        return messageDTO.getMemberCode() == null || "GUEST".equals(messageDTO.getSenderType().name());
    }


    // 채팅 종료시 시스템 메시지 전송
    public void broadcastSystemMessage(Long icId, InquiryChatMessageDTO systemMessage) {
        String destination = "/topic/inquiry/" + icId + "/send";
        messagingTemplate.convertAndSend(destination, systemMessage);
        log.debug("시스템 메시지 브로드캐스트 완료 - destination: {}, 메시지: {}", destination, systemMessage.getMessage());
    }

}