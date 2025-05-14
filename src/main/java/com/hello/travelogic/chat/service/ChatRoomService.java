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
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
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


    // 채팅방 참가자 추가
    @Transactional
    public void addMemberToRoom(String roomId, String memberName) {

        ChatRoomEntity room = chatRoomRepo.findByChatRoomUid(roomId)
                .orElseThrow(() -> new RuntimeException("채팅방을 찾을 수 없습니다."));
        log.debug("room = {}", room.getChatRoomId());
        MemberEntity member = memberRepository.findByMemberName(memberName)
                .orElseThrow(() -> new RuntimeException("회원을 찾을 수 없습니다."));
        log.debug("member = {}", member.getMemberName());

        // 1. 해당 채팅방에서 해당 멤버의 *가장 최근* 참여 기록을 찾습니다.
        // 퇴장했든 안 했든 일단 기록이 있는지 확인하는 것이 목적입니다.
        Optional<ChatRoomMemberEntity> latestMembership = chatRoomMemberRepo.findTopByChatRoomIdAndMemberCodeOrderByCrmJoinedAtDesc(room, member);

        if (latestMembership.isPresent()) {
            // 기록이 존재하는 경우 (처음 참여하든, 나갔다가 다시 들어왔든)
            ChatRoomMemberEntity existingEntry = latestMembership.get();

            // 이미 참여 중인 상태라면 (중복 참여 시도)
            if (!existingEntry.getCrmIsExited()) {
                log.debug(">>>>>> 이미 참여 중인 멤버 {} 가 채팅방 {}에 있습니다", memberName, roomId);
                // 여기서는 추가적인 처리가 필요 없으므로 return 합니다.
                // (프론트엔드에서 이미 참여 중인 방에는 진입 시도를 막는 것이 일반적입니다.)
                return;
            } else {
                // 퇴장했던 기록이 있는 경우 (재진입)
                log.debug(">>>>>> 퇴장했던 멤버 {} 가 채팅방 {}에 재진입 시도합니다.", memberName, roomId);

                // 최대 인원 확인 (재진입 시에도 체크 필요)
                long currentCount = chatRoomMemberRepo.countByChatRoomIdAndCrmIsExited(room, false);
                if (currentCount >= room.getChatRoomMaxParticipants()) {
                    log.warn(">>>>>> 재진입 실패: 채팅방 {} 최대 인원 초과. 현재 {}명, 최대 {}명", roomId, currentCount, room.getChatRoomMaxParticipants());
                    throw new IllegalStateException("채팅방 최대 인원을 초과했습니다.");
                }

                // 기존 퇴장 기록 업데이트하여 다시 참여 상태로 변경
                existingEntry.setCrmIsExited(false);      // 퇴장 상태 해제
                existingEntry.setCrmJoinedAt(LocalDateTime.now(ZoneId.of("Asia/Seoul"))); // 참여 시간 업데이트 (혹은 기존 시간 유지 정책에 따라 변경)
                existingEntry.setCrmExitedAt(null);       // 퇴장 시간 초기화

                chatRoomMemberRepo.save(existingEntry); // 변경된 엔티티 저장 (Transactional에 의해 자동 저장될 수도 있습니다.)

                log.debug(">>>>>> 퇴장했던 멤버 {}가 채팅방 {}에 재참가 처리되었습니다. 현재 참여 인원: {}", memberName, roomId, currentCount + 1);
            }

        } else {
            // 기록이 없는 경우 (최초 참여)
            log.debug(">>>>>> 새로운 멤버 {} 가 채팅방 {}에 최초 진입 시도합니다.", memberName, roomId);

            // 최대 인원 확인 (퇴장하지 않은 멤버)
            long currentCount = chatRoomMemberRepo.countByChatRoomIdAndCrmIsExited(room, false);
            if (currentCount >= room.getChatRoomMaxParticipants()) {
                log.warn(">>>>>> 최초 진입 실패: 채팅방 {} 최대 인원 초과. 현재 {}명, 최대 {}명", roomId, currentCount, room.getChatRoomMaxParticipants());
                throw new IllegalStateException("채팅방 최대 인원을 초과했습니다.");
                // 이 예외는 ChatController에서 잡아서 클라이언트에게 적절한 메시지를 보내야 합니다.
            }

/* 이 메소드가 문제
        // 중복 참여 확인 (채팅방-회원 조합)
        if (chatRoomMemberRepo.existsByChatRoomIdAndMemberCode(room, member)) {
            log.debug(">>>>>> 이미 참여 중인 멤버 {} 가 채팅방 {}에 있습니다", memberName, roomId);
            // 결과가 true면 이미 참여중이란 뜻. (또 넣으면 안되니까 return)
            return;
        }*/


            // 중간 테이블에 멤버 저장
            ChatRoomMemberEntity newEntry = new ChatRoomMemberEntity();
            newEntry.setChatRoomId(room);    // ChatRoomMemberEntity가 ChatRoomEntity 객체 전체를 참조하게 만듦. (ChatRoomId는 내부적으로 @ManyToOne 관계에 있는 필드이기 때문에, ChatRoomId로 가져온 엔티티 객체를 넣어줌)
            newEntry.setMemberCode(member);     // 마찬가지로, memberName 같은 문자열이 아니라 memberEntity 객체 전체를 참조하게 만듦.
            newEntry.setCrmJoinedAt(LocalDateTime.now(ZoneId.of("Asia/Seoul"))); // 참여 시간 설정
            newEntry.setCrmIsExited(false);      // 퇴장 여부 초기값 설정
            newEntry.setMemberName(memberName);  // memberName String 값 저장 (부가 정보)
            newEntry.setCreator(false); // isCreator 필드가 있다면 필요에 따라 설정

            chatRoomMemberRepo.save(newEntry);
            log.debug(">>>>>> 새로운 멤버 {}가 채팅방 {}에 추가되었습니다. 현재 참여 인원: {}", memberName, roomId, currentCount + 1);
        }
    }


    // 퇴장 처리 및 DB 업데이트
    @Transactional
    public void exitChatRoom(String roomId, String memberName) {

        log.debug(">>>>>> 멤버 퇴장 처리 요청: memberCode {} from room {}", roomId);

        // ChatRoomEntity 조회 (ChatRoomMemberEntity 조회를 위해 필요)
        ChatRoomEntity room = chatRoomRepo.findByChatRoomUid(roomId)
                .orElseThrow(() -> new RuntimeException("채팅방을 찾을 수 없습니다."));

        // MemberEntity 조회 (ChatRoomMemberEntity 조회를 위해 필요하며, 퇴장 메시지에 이름 사용)
        MemberEntity member = memberRepository.findByMemberName(memberName)
                .orElseThrow(() -> new RuntimeException("회원을 찾을 수 없습니다."));

        // 퇴장하지 않은 상태의 ChatRoomMemberEntity를 찾습니다.
        ChatRoomMemberEntity chatRoomMember = chatRoomMemberRepo.findByChatRoomIdAndMemberCodeAndCrmIsExited(room, member, false)
                .orElseThrow(() -> new RuntimeException("해당 채팅방에 참여 중인 기록이 없습니다.")); // 참여 중이 아니면 예외 발생

        log.debug("---퇴장처리하는 메소드(exitChatRoom)---- chatRoomMember = {}", chatRoomMember);

//        if (chatRoomMember.getCrmIsExited()) {
//            log.warn("이미 퇴장한 사용자: {}", memberName);
//        }
            chatRoomMember.setCrmIsExited(true);
            chatRoomMember.setCrmExitedAt(LocalDateTime.now(ZoneId.of("Asia/Seoul"))); // 퇴장 시간 기록
            // chatRoomMemberRepo.save(chatRoomMember);    // @Transactional 덕분에 변경 감지 (Dirty Checking)로 자동 저장될 가능성 높음
            log.debug(">>>>>> 멤버 {} (memberCode: {})가 채팅방 {}에서 퇴장 처리되었습니다.", member.getMemberName(), roomId);
            log.info("채팅방 [{}]에서 {} 퇴장 처리 완료", roomId, memberName);
    }


}