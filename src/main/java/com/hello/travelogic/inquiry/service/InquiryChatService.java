package com.hello.travelogic.inquiry.service;

import com.hello.travelogic.inquiry.domain.InquiryChatEntity;
import com.hello.travelogic.inquiry.domain.InquiryChatMessageEntity;
import com.hello.travelogic.inquiry.dto.InquiryChatDTO;
import com.hello.travelogic.inquiry.dto.InquiryChatMessageDTO;
import com.hello.travelogic.inquiry.repo.InquiryChatMessageRepo;
import com.hello.travelogic.inquiry.repo.InquiryChatRepo;
import com.hello.travelogic.member.repository.MemberRoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class InquiryChatService {

    private final InquiryChatRepo inquiryChatRepo;
    private final InquiryChatMessageRepo inquiryChatMessageRepo;
    private final MemberRoleRepository memberRoleRepo;



    // (회원이 1:1문의창을 열고 첫 메시지를 보내면, 새로운 채팅방이 생성되는 것을 처리함)
    @Transactional
    public InquiryChatEntity startChat(InquiryChatDTO inquiryChatDTO) {

        // DTO에서 받은 정보로 Entity 필드 설정
        InquiryChatEntity chat = new InquiryChatEntity();
        chat.setInquiryChatStartDate(LocalDateTime.now());
        chat.setInquiryChatEndDate(null);
        chat.setInquiryChatStatus(InquiryChatEntity.ChatStatus.WAITING);
        chat.setMemberId( inquiryChatDTO.getMemberId() );

        return inquiryChatRepo.save(chat);
    }


    // (전달된 DTO를 통해 메시지 엔티티 만듦 → 해당 메시지르 DB에 저장)
    public InquiryChatMessageEntity saveMessage(InquiryChatMessageDTO inquiryChatMessageDTO) {

        // ------------------InquiryChatWebSocketService로 이동
/*        // 1. 해당 채팅방 Entity 찾기
        InquiryChatEntity chat = inquiryChatRepo.findById(inquiryChatMessageDTO.getIcId())
                .orElseThrow(() -> new RuntimeException("Chat not found with ID: " + inquiryChatMessageDTO.getIcId())); // 적절한 예외 처리


        // 2. DTO 에서 받은 정보로 entity 필드 설정
        InquiryChatMessageEntity message = new InquiryChatMessageEntity();
        message.setInquiryChatId(chat);     // InquiryChatMessageEntity의 inquiryChatId 가 객체이므로, 객체를 직접 할당해야함.
        message.setInquiryChatMessage(inquiryChatMessageDTO.getMessage());

        // 2-1. 발신자 타입이 ADMIN 이면 상태를 ACTIVE로 변경
        if ((inquiryChatMessageDTO.getSenderType() == InquiryChatMessageEntity.SenderType.ADMIN)) {
            chat.setInquiryChatStatus(InquiryChatEntity.ChatStatus.ACTIVE);

            // 상태 변경 후 채팅방 저장 (즉시 반영 위해, 또는 마지막에 message와 함께 flush될 때 같이 반영될 수도 있음)
            inquiryChatRepo.save(chat);
            // 이 부분은 로직에 따라 마지막 save(message)로 충분할 수도 있습니다.
            // chat 엔티티가 message 엔티티와 같은 트랜잭션 내에서 관리된다면,
            // chat의 변경사항은 트랜잭션 커밋 시점에 반영됩니다.
            // 명시적으로 즉시 DB 반영이 필요하거나, message 저장 전에 chat 상태가 확실히 ACTIVE여야 한다면 유지합니다.
        }

        // 2-2. 발신자 타입 할당 (DTO에서 이미 enum 타입으로 가지고 있으므로 문자열로 변환 불필요)
        message.setInquiryChatMessageSenderType(inquiryChatMessageDTO.getSenderType());

        // 2-3. 보낸 시간 설정 (DTO에 sentAt이 있지만, 서버 시간 사용 권장)
        message.setInquiryChatMessageSentAt(LocalDateTime.now());
*/


        // 3. 메시지를 보낸 사용자의 권한 정보 MemberRole 설정 (memberCode와 authorityCode를 복합키로 조회)
  /*      // (메시지를 보낸 개별 사용자/관리자 정보)
        MemberRoleEntity.MemberRoleId memberRoleId = new MemberRoleEntity.MemberRoleId(
                inquiryChatMessageDTO.getMemberCode(),
                inquiryChatMessageDTO.getAuthorityCode()
        );
        MemberRoleEntity memberRole = memberRoleRepo.findById(memberRoleId)
                .orElseThrow(() -> new RuntimeException("MemberRole not found for memberCode: " + inquiryChatMessageDTO.getMemberCode() + " and authorityCode: " + inquiryChatMessageDTO.getAuthorityCode()));
        message.setMemberRole(memberRole);
  */


        // 4. 메시지 엔티티 저장 (chat의 변경사항도 함께 flush될 수 있음)
        return null;
    }


    // (채팅방ID 기준으로 해당 채팅방의 메시지를 보낸 시간 순으로 정렬)
    // 유저가 채팅방을 다시 열었을 때, 이전 대화 내용을 시간 순으로 불러와서 보여주는 기능을 담당.
    public List<InquiryChatMessageEntity> getMessages(Long icId) {
        return inquiryChatMessageRepo.findMessagesByChatId(icId);
    }


    // 관리자가 전체 채팅 목록을 조회할 수 있도록 제공하는 메서드.
    // 현재는 단순히 findAll()로 모든 채팅방을 가져오지만, 나중에 진행중,종료됨,최근 생성순 같은 조건을 붙일 수 있음.
    public List<InquiryChatEntity> getChatListForAdmin() {
        return inquiryChatRepo.findAll(); // 필요 시 조건 추가
    }

}

