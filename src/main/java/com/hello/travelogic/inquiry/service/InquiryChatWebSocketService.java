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
    private final InquiryChatMessageRepo inquiryChatMessageRepo;    // DB 저장
    private final InquiryChatRepo inquiryChatRepo;      // icId로 InquiryChatEntity 조회
    private final MemberRoleRepository memberRoleRepo;


    // 일반 디버깅 및 정보 로그용
    private static final Logger generalLogger = LoggerFactory.getLogger(ChatService.class);



    // 클라이언트가 1:1 문의 채팅을 구독하는 경로를 처리하는...서비스,,,,
    @Transactional
    public InquiryChatMessageDTO sendInquiryMessage(Long icId, InquiryChatMessageDTO messageDTO) {

        log.debug("sendInquiryMessage icId: {}, message: {}", icId, messageDTO);

        // 1. DTO 유효성 검사 (필요시)
        if (messageDTO.getMemberCode() == null || messageDTO.getMessage() == null) {
            log.warn("Invalid message received for icId {}: memberCode or message is null.", icId);
            // 필요시 에러 메시지를 특정 사용자에게 다시 보낼 수 있음 (SimpMessagingTemplate.convertAndSendToUser)
        }

        // 2. 엔티티 변환 및 정보 설정
        InquiryChatEntity chat = inquiryChatRepo.findById(messageDTO.getIcId())
                .orElseThrow(() -> new RuntimeException("Chat not found with ID: " + messageDTO.getIcId())); // 적절한 예외 처리


        // 3. 메시지를 보낸 사용자의 권한 정보 MemberRole 설정 (memberCode와 authorityCode를 복합키로 조회)
        // (메시지를 보낸 개별 사용자/관리자 정보)
        MemberRoleEntity memberRole = null;
        if (messageDTO.getSenderType() == InquiryChatMessageEntity.SenderType.USER ||
                messageDTO.getSenderType() == InquiryChatMessageEntity.SenderType.ADMIN) {
            if (messageDTO.getMemberCode() == null ) {
                log.warn("MemberCode is null for USER/ADMIN sender in icId: {}", icId);
                // messageDTO 에 memberCode가 없으면 처리가 불가능하므로 예외 발생 또는 오류 처리
                throw new IllegalArgumentException("User/Admin message must have memberCode.");
            }

            String targetAuthorityName;
            if (messageDTO.getSenderType() == InquiryChatMessageEntity.SenderType.ADMIN) {
                targetAuthorityName = "ROLE_ADMIN"; // 관리자로 메시지 보낼 때 사용할 역할 이름
            } else {
                targetAuthorityName = "ROLE_USER";   // 사용자로 메시지 보낼 때 사용할 역할 이름
            }

            // memberCode로 사용자의 모든 역할을 가져와서, senderType에 맞는 역할을 찾는 방식
            // MemberRoleEntity가 AuthorityEntity를 'authority'라는 필드로 참조하고, AuthorityEntity가 'authorityName' 필드를 가진다고 가정합니다.
            final Long memberCode = messageDTO.getMemberCode(); // 로컬 변수로 할당
            memberRole = memberRoleRepo.findByMember_MemberCode(memberCode) // member_memberCode는 MemberEntity의 PK 필드명에 따라 달라질 수 있습니다.
                    .stream()
                    .filter(mr -> mr.getAuthority() != null && mr.getAuthority().getAuthorityName().equals(targetAuthorityName))
                    .findFirst()
                    .orElseThrow(() -> {
                        log.error("MemberRole not found for memberCode: {} with target authorityName: {}", memberCode, targetAuthorityName);
                        // 이 경우, 해당 memberCode를 가진 사용자가 요청된 senderType에 맞는 역할을 가지고 있지 않다는 의미입니다.
                        // 시스템 정책에 따라, 사용자가 문의 시 항상 USER 권한을 갖도록 한다면, USER 조회 실패 시 더 큰 문제일 수 있습니다.
                        return new RuntimeException("Required MemberRole not found for memberCode " + memberCode + " and role " + targetAuthorityName);
                    });
            log.debug("MemberRole found for icId: {}. MemberRole ID: {}", icId, memberRole.getId()); // memberRole 객체 전체 로깅은 순환참조 주의
        }



            MemberRoleEntity.MemberRoleId memberRoleId = new MemberRoleEntity.MemberRoleId(
                    messageDTO.getMemberCode(),
                    messageDTO.getAuthorityCode()
            );
            memberRole = memberRoleRepo.findById(memberRoleId)
                    .orElseThrow(() -> {
                        log.error("MemberRole not found for memberCode: {} and authorityCode: {}", messageDTO.getMemberCode(), messageDTO.getAuthorityCode());
                        return new RuntimeException("MemberRole not found");
                    });
            log.debug("MemberRole found for icId: {}. MemberRole: {}", icId, memberRole);



        // 4. 메시지 entity 생성 및 정보 설정
        InquiryChatMessageEntity messageEntity = new InquiryChatMessageEntity();
        messageEntity.setInquiryChat(chat);
        if (memberRole != null) {
            messageEntity.setMemberRole(memberRole);
        }
        messageEntity.setInquiryChatMessageSenderType(messageDTO.getSenderType());  // USER 또는 ADMIN
        messageEntity.setInquiryChatMessage(messageDTO.getMessage());
        messageEntity.setInquiryChatMessageSentAt(LocalDateTime.now(ZoneId.of("Asia/Seoul")));
        messageEntity.setInquiryChatMessageType(messageDTO.getMessageType());

        // 4-1. 발신자 타입이 ADMIN 이면 상태를 ACTIVE로 변경
        if ((messageDTO.getSenderType() == InquiryChatMessageEntity.SenderType.ADMIN)) {
            chat.setInquiryChatStatus(InquiryChatEntity.ChatStatus.ACTIVE);
            inquiryChatRepo.save(chat);
            log.debug("Chat room icId: {} status updated to ACTIVE by ADMIN message.", icId);
            // 이 부분은 로직에 따라 마지막 save(message)로 충분할 수도 있습니다.
            // chat 엔티티가 message 엔티티와 같은 트랜잭션 내에서 관리된다면, chat의 변경사항은 트랜잭션 커밋 시점에 반영됩니다.
            // 명시적으로 즉시 DB 반영이 필요하거나, message 저장 전에 chat 상태가 확실히 ACTIVE여야 한다면 유지합니다.
        }


        // 5. 메시지 엔티티 DB 저장
        InquiryChatMessageEntity savedMessageEntity = inquiryChatMessageRepo.save(messageEntity);
        log.info("Service: Message saved to DB with icmId: {}", savedMessageEntity.getInquiryChatMessageId());

        // 5. 저장된 엔티티를 DTO로 변환 (클라이언트에 전송할 최종 형태)
        InquiryChatMessageDTO processedMessageDto = new InquiryChatMessageDTO(savedMessageEntity);

        // 6. 해당 채팅방 토픽으로 메시지 발행
        messagingTemplate.convertAndSend("/topic/inquiry/chat.sendMessage/" + icId, processedMessageDto);
        String destination = "/topic/inquiry/chat.sendMessage/" + icId;
        log.debug("Message sent to destination: {}", destination);
        log.debug("sendInquiryMessage icId: {}, message: {}", icId, messageDTO);

        generalLogger.debug("Successfully processed and sent inquiry message for icId: {}. Message ID: {}", icId, messageDTO.getIcId() );


        /*// 5. 메시지 엔티티 저장 (chat의 변경사항도 함께 flush될 수 있음)
        return inquiryChatMessageRepo.save(messageEntity);*/
        return processedMessageDto;
    }


    /*
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
        String welcomeText = String.format(
                "<strong>Whats's up?, Hello, Travelogic!</strong><br />" +
                        "안녕하세요! 무엇을 도와드릴까요?<br /><br />" +
                        "💬 채팅상담 연중무휴 24시간<br />" +
                        "📞 유선상담 평일 09:00~18:00<br />").replace("\n", "<br />");

        // 4. 환영 메시지 DTO 생성 및 DB 저장
        InquiryChatMessageEntity welcomeMessageEntity = new InquiryChatMessageEntity();
        welcomeMessageEntity.setInquiryChat(chatEntity);
        welcomeMessageEntity.setMemberRole(null);    // 시스템 메시지이므로 특정 사용자와 연동 X
        welcomeMessageEntity.setInquiryChatMessageSenderType(InquiryChatMessageEntity.SenderType.SYSTEM);
        welcomeMessageEntity.setInquiryChatMessage(welcomeText);
        welcomeMessageEntity.setInquiryChatMessageSentAt(LocalDateTime.now(ZoneId.of("Asia/Seoul")));
        welcomeMessageEntity.setInquiryChatMessageType(InquiryChatMessageEntity.MessageType.SYSTEM_WELCOME);

        // 5. 환영 메시지 엔티티 DB 저장
        InquiryChatMessageEntity savedWelcomeEntity = inquiryChatMessageRepo.save(welcomeMessageEntity);
        log.info("Service: Welcome message saved to DB with icmId: {}", savedWelcomeEntity.getInquiryChatMessageId());

        // 6. 저장된 엔티티를 DTO로 변환
        InquiryChatMessageDTO welcomeMessageDtoToSend = new InquiryChatMessageDTO(savedWelcomeEntity);

        // 7. 해당 구독 경로로 환영 메시지 전송
        messagingTemplate.convertAndSend("/topic/inquiry/join/" + icId, welcomeMessageDtoToSend);

        String destination = "/topic/inquiry/join/" + icId;
        log.debug("Welcome message sent to destination: {}", destination);
        generalLogger.debug("Broadcasting welcome message for user join in icId: {}. Welcome Message DTO: {}", icId, welcomeMessageDtoToSend);

        return welcomeMessageDtoToSend;
    }
    */

}
