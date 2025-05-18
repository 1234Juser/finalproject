package com.hello.travelogic.inquiry.service;

import com.hello.travelogic.chat.service.ChatService;
import com.hello.travelogic.inquiry.domain.InquiryChatEntity;
import com.hello.travelogic.inquiry.domain.InquiryChatMessageEntity;
import com.hello.travelogic.inquiry.dto.InquiryChatMessageDTO;
import com.hello.travelogic.inquiry.repo.InquiryChatMessageRepo;
import com.hello.travelogic.inquiry.repo.InquiryChatRepo;
import com.hello.travelogic.member.domain.MemberRoleEntity;
import com.hello.travelogic.member.repository.MemberRoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Service
@RequiredArgsConstructor
@Slf4j
public class InquiryChatWebSocketService {

    private final SimpMessagingTemplate messagingTemplate;
    private final InquiryChatMessageRepo inquiryChatMessageRepo;
    private final InquiryChatRepo inquiryChatRepo;
    private final MemberRoleRepository memberRoleRepo;
    
    
    // 일반 디버깅 및 정보 로그용
    private static final Logger generalLogger = LoggerFactory.getLogger(InquiryChatWebSocketService.class);

    
    // 클라이언트가 1:1 문의 채팅을 구독하는 경로를 처리하는...서비스,,,, (기존 로직 너무 길어서 캡슐화)
    @Transactional
    public InquiryChatMessageDTO sendInquiryMessage(Long icId, InquiryChatMessageDTO messageDTO) {
        
        log.debug ("sendInquiryMessage 호출 - icId: {}, message DTO: {}", icId, messageDTO);
        
        boolean isGuestMessage = (messageDTO.getMemberCode () == null || "GUEST".equals (messageDTO.getSenderType ()));
        log.info ("메시지 발신자 비회원 여부: {}", isGuestMessage);
        
        if (isGuestMessage) {
            return processGuestMessage (icId, messageDTO);
        } else {
            return processMemberMessage (icId, messageDTO);
        }
    }
    
    // 캡슐화 1 - 비회원 메시지 (DB 저장X, 시스템 안내 메시지 생성)
    private InquiryChatMessageDTO processGuestMessage(Long guestIcId, InquiryChatMessageDTO incomingMessageDTO) {
        log.info("비회원 메시지 처리 시작 - guestIcId: {}, 원본 메시지: {}", guestIcId, incomingMessageDTO.getMessage());
        
        InquiryChatMessageDTO systemMessage = InquiryChatMessageDTO.builder()
                                              .icId(guestIcId)
                                              .senderType(InquiryChatMessageEntity.SenderType.SYSTEM) // 시스템 발신
                                              .message("1:1 상담은 회원에게만 제공됩니다. 로그인 혹은 회원가입이 필요합니다.")
                                              .sendAt (LocalDateTime.now(ZoneId.of("Asia/Seoul")))
                                              .messageType(InquiryChatMessageEntity.MessageType.SYSTEM)
                                              .build();
        
        // 해당 비회원 채팅방 토픽으로 시스템 메시지 발행
        String destination = "/topic/inquiry/chat/" + guestIcId; // 프론트 구독 경로와 일치
        messagingTemplate.convertAndSend(destination, systemMessage);
        log.info("비회원에게 시스템 안내 메시지 발송 완료 - destination: {}, 메시지: {}", destination, systemMessage.getMessage());
        
        return systemMessage; // 또는 null을 반환하거나 void 타입으로 변경 고려
    }
    
    // 캡슐화 2 - 회원 메시지 생성
    private InquiryChatMessageDTO processMemberMessage(Long numericIcId, InquiryChatMessageDTO messageDTO) {
        log.info("회원 메시지 처리 시작 - icId: {}, 메시지: {}", numericIcId, messageDTO.getMessage());
        
        // 1. 채팅방 엔티티 조회
        InquiryChatEntity chat = inquiryChatRepo.findById(numericIcId)
                                 .orElseThrow(() -> {
                                     log.error("채팅방을 찾을 수 없습니다. ID: {}", numericIcId);
                                     return new RuntimeException("Chat not found with ID: " + numericIcId);
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
        String destination = "/topic/inquiry/chat/" + numericIcId; // 프론트 구독 경로와 일치
        messagingTemplate.convertAndSend(destination, processedMessageDto);
        log.info("회원 메시지 처리 및 발송 완료 - destination: {}, 메시지 ID: {}", destination, processedMessageDto.getIcmId());
        
        return processedMessageDto;
    }
    
    // 캡슐화 3 - memberRole 찾기
    private MemberRoleEntity getMemberRoleForMessage(InquiryChatMessageDTO messageDTO) {
        if (messageDTO.getMemberCode() == null) {
            log.warn("회원 메시지이나 MemberCode가 없습니다. DTO: {}", messageDTO);
            throw new IllegalArgumentException("Member message must have memberCode.");
        }
        
        String targetAuthorityName = InquiryChatMessageEntity.SenderType.ADMIN.equals(messageDTO.getSenderType())
                                     ? "ROLE_ADMIN" : "ROLE_USER";
        Long memberCode = messageDTO.getMemberCode();
        
        return memberRoleRepo.findByMember_MemberCode(memberCode) // 실제 Member 필드명에 따라 findByMemberMemberCode 등일 수 있음
               .stream()
               .filter(mr -> mr.getAuthority() != null && mr.getAuthority().getAuthorityName().equals(targetAuthorityName))
               .findFirst()
               .orElseThrow(() -> {
                   log.error("요청된 역할({})에 해당하는 MemberRole을 찾을 수 없습니다. memberCode: {}", targetAuthorityName, memberCode);
                   return new RuntimeException("Required MemberRole not found for memberCode " + memberCode + " and role " + targetAuthorityName);
               });
    }
    
    // 캡슐화 4 - 메시지 DB 저장
    private InquiryChatMessageEntity createAndSaveChatMessageEntity(InquiryChatEntity chat, MemberRoleEntity memberRole, InquiryChatMessageDTO messageDTO) {
        InquiryChatMessageEntity messageEntity = new InquiryChatMessageEntity();
        messageEntity.setInquiryChat(chat);
        
        if (memberRole != null) { // 시스템 메시지가 아닌 경우 (회원 또는 관리자 메시지)
            messageEntity.setMemberRole(memberRole);
        }
        messageEntity.setInquiryChatMessageSenderType(messageDTO.getSenderType());
        messageEntity.setInquiryChatMessage(messageDTO.getMessage());
        messageEntity.setInquiryChatMessageSentAt(LocalDateTime.now(ZoneId.of("Asia/Seoul")));
        messageEntity.setInquiryChatMessageType(
            messageDTO.getMessageType() != null ?
            messageDTO.getMessageType() :
            InquiryChatMessageEntity.MessageType.CHAT);
        
        return inquiryChatMessageRepo.save(messageEntity);
    }
    
    // 캡슐화 5 - 채팅 상태 active로 활성화
    private void updateChatStatusToActive(InquiryChatEntity chat) {
        if (!InquiryChatEntity.ChatStatus.ACTIVE.equals(chat.getInquiryChatStatus())) {
            chat.setInquiryChatStatus(InquiryChatEntity.ChatStatus.ACTIVE);
            inquiryChatRepo.save(chat); // 변경된 상태 저장
            log.info("채팅방 ID {}의 상태가 ACTIVE로 변경되었습니다.", chat.getInquiryChatId());
        }
    }

    
    
    // 이 메소드는 프론트에서 처리
    // 채팅 시작 시 안내 메시지 전송
    @Transactional
    public InquiryChatMessageDTO handleUserJoin(Long icId, InquiryChatMessageDTO userJoinMessageInfo, SimpMessageHeaderAccessor headerAccessor) {

        log.debug("handleUserJoin called - icId: {}, userJoinMessageInfo: {}", icId, userJoinMessageInfo);

        // 1. 채팅방 엔티티 조회
        InquiryChatEntity chatEntity = inquiryChatRepo.findById(icId)
                .orElseThrow(() -> {
                    log.error("Chat room not found with ID: {}", icId);
                    return new RuntimeException("Chat not found with ID: " + icId);
                });
        
        // 2. 세션에 사용자 정보 저장
        if (headerAccessor.getSessionAttributes() != null) {
            headerAccessor.getSessionAttributes().put("memberCode", userJoinMessageInfo.getMemberCode());
            headerAccessor.getSessionAttributes().put("authorityCode", userJoinMessageInfo.getAuthorityCode());
            headerAccessor.getSessionAttributes().put("currentInquiryChatId", icId);
            log.debug("Session attributes updated for user join. icId: {}, memberCode: {}", icId, (userJoinMessageInfo != null ? userJoinMessageInfo.getMemberCode() : "N/A"));
        }

        // 3. 환영 메시지 내용 정의
        // 4. 환영 메시지 DTO 생성 및 DB 저장
        // 5. 환영 메시지 엔티티 DB 저장
        // 6. 저장된 엔티티를 DTO로 변환
        // 7. 해당 구독 경로로 환영 메시지 전송
       
        return null;
    }


}
