package com.hello.travelogic.chat.service;

import com.hello.travelogic.chat.domain.ChatRoomEntity;
import com.hello.travelogic.chat.domain.ChatRoomMemberEntity;
import com.hello.travelogic.chat.dto.ChatRoomCreateRequest;
import com.hello.travelogic.chat.dto.ChatRoomCreateResponse;
import com.hello.travelogic.chat.repo.ChatRoomMemberRepo;
import com.hello.travelogic.chat.repo.ChatRoomRepo;
import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.member.repository.MemberRepository;
import com.hello.travelogic.utils.JwtUtil;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatRoomService {

    private final ChatRoomRepo chatRoomRepo;
    private final ChatRoomMemberRepo chatRoomMemberRepo;
    private final MemberRepository memberRepository;
    private final JwtUtil jwtUtil;


    // 채팅방 전체 목록
    @Transactional(readOnly = true)
    public List<ChatRoomCreateResponse> getAllChatRooms() {
        List<ChatRoomEntity> chatRooms = chatRoomRepo.findAllByOrderByChatRoomCreateAtDesc();
        return chatRooms.stream()
                .map(chatRoomEntity -> {
                    // 각 채팅방의 현재 참여자 수를 조회 (퇴장하지 않은 멤버만 카운트)
                    // ChatRoomMemberEntity의 chatRoomId 필드가 ChatRoomEntity 타입이라고 가정합니다.
                    int currentParticipants = chatRoomMemberRepo.countByChatRoomIdAndCrmIsExited(chatRoomEntity, false);
                    return new ChatRoomCreateResponse(chatRoomEntity, currentParticipants);
                })
                .collect(Collectors.toList());
    }


    // 채팅방 생성
    @Transactional
    public ChatRoomCreateResponse createChatRoom(ChatRoomCreateRequest request, String token) {
        log.debug("채팅방 생성 요청 수신: {}", request);
        log.debug("token = {}", token.replace("Bearer ", ""));
        try {
            // 1. 유효성 검사
            if (request.getChatRoomTitle() == null || request.getChatRoomTitle().trim().isEmpty()) {
                log.warn("채팅방 제목 누락");
                throw new IllegalArgumentException("채팅방 제목은 필수입니다.");
            }
            if (request.getChatRoomMaxParticipants() == null || request.getChatRoomMaxParticipants() < 2) {
                log.warn("채팅방 참여 인원 수 오류: {}", request.getChatRoomMaxParticipants());
                throw new IllegalArgumentException("참여 인원은 2명 이상이어야 합니다.");
            }

            // 2. JWT 토큰에서 사용자 정보 추출
            Long memberCode = jwtUtil.getMemberCodeFromToken(token);
            if (memberCode == null) {
                log.warn("토큰에서 memberCode를 추출할 수 없음");
                throw new IllegalArgumentException("유효하지 않은 토큰 또는 사용자 정보가 없습니다.");
            }
            MemberEntity member = memberRepository.findByMemberCode(memberCode)
                    .orElseThrow(() -> new IllegalArgumentException("회원 정보를 찾을 수 없습니다."));
            log.debug("채팅방 생성 요청 사용자 : {}", member.getMemberName() + "(" + member.getMemberCode() + ")");


            // 3. 채팅방 Entity 생성 및 저장
            ChatRoomEntity chatRoomE = new ChatRoomEntity();
            String shortUid = UUID.randomUUID().toString().replace("-", "").substring(0, 12);

            chatRoomE.setChatRoomUid(shortUid);
            log.debug("chatRoomE = {}", chatRoomE.getChatRoomUid());
            chatRoomE.setChatRoomTitle(request.getChatRoomTitle());
            chatRoomE.setChatRoomDescription(request.getChatRoomDescription());
            chatRoomE.setChatRoomMaxParticipants(request.getChatRoomMaxParticipants());
            chatRoomE.setChatRoomCreateAt(LocalDateTime.now());
            chatRoomE.setMemberCode(member);    // 방 만든 사람

            chatRoomRepo.save(chatRoomE);
            log.debug("새 채팅방 저장 성공 확인 : {}", chatRoomE);

            //  4. 채팅방 참여자 저장 (생성자 본인 포함)
            ChatRoomMemberEntity chatRoomMemberE = new ChatRoomMemberEntity();
            chatRoomMemberE.setChatRoomId(chatRoomE);   // chatRoomE는 이미 저장된 ChatRoomEntity 객체
            chatRoomMemberE.setMemberCode(member);
            chatRoomMemberE.setCrmJoinedAt(LocalDateTime.now());
            chatRoomMemberE.setCrmIsExited(false);      // 퇴장 여부는 기본값으로 false 설정
            chatRoomMemberE.setCrmExitedAt(null);       // 참여 중이면 기본값으로 null 설정
            chatRoomMemberE.setMemberName(member.getMemberName());
            chatRoomMemberE.setCreator(true);          // 방 생성시 방장으로 설정
            chatRoomMemberRepo.save(chatRoomMemberE);
            log.info("채팅방 생성자 ({}) 멤버로 저장 성공: 방 UID = {}", member.getMemberName(), chatRoomE.getChatRoomUid());


            // 5. 성공 시 응답 DTO 반환
            return new ChatRoomCreateResponse(chatRoomE, 1);

        } catch (IllegalArgumentException e) {
            log.warn("입력값 검증 실패: {}", e.getMessage());
            throw e;
        }
    }


    // 채팅방 삭제
    @Transactional
    public void deleteChatRoom(String chatRoomUid, String token) {

        // 1. 토큰에서 현재 로그인 회원 식별 (예: username 또는 사용자 ID)
        String currentMemberId = jwtUtil.getMemberIdFromToken(token);
        log.debug("currentMemberId = {}", currentMemberId);
        if (currentMemberId == null) {
            throw new IllegalArgumentException("유효하지 않은 토큰입니다.");
        }

        // 2. 채팅방 찾기
        ChatRoomEntity chatRoom = chatRoomRepo.findByChatRoomUid(chatRoomUid)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 채팅방입니다."));
        log.debug("chatRoom 확인 : {}", chatRoom.getChatRoomUid() + " (" + chatRoom.getMemberCode().getMemberName() + ")");

        // 3. 채팅방 생성한 회원 엔티티 (memberCode)에서 memberID 확인
        String ownerMemberId = chatRoom.getMemberCode().getMemberId();
        log.debug("ownerMemberId = {}", ownerMemberId);

        // 4. 현재 로그인 사용자와 방장 비교
        if (!ownerMemberId.equals(currentMemberId)) {
            throw new SecurityException("본인만 채팅방을 삭제할 수 있습니다.");
        }

        // 5. 삭제
        chatRoomRepo.delete(chatRoom);
    }
}