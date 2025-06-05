package com.hello.travelogic.chat.controller;

import com.hello.travelogic.chat.dto.ChatRoomCreateRequest;
import com.hello.travelogic.chat.dto.ChatRoomCreateResponse;
import com.hello.travelogic.chat.service.ChatRoomService;
import com.hello.travelogic.member.service.MemberService;
import com.hello.travelogic.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chatrooms")
@Slf4j
public class ChatRoomController {

    private final ChatRoomService chatRoomService;
    private final JwtUtil jwtUtil;
    private final MemberService memberService;


    // 모든 채팅방 목록 조회
    @GetMapping("")
    public ResponseEntity<List<ChatRoomCreateResponse>> getAllChatRooms() {
        try {
            List<ChatRoomCreateResponse> rooms = chatRoomService.getAllChatRooms();
            log.info("-------------Final DTO Response: {}", rooms);

            if (rooms.isEmpty() || rooms == null) {
                log.info("조회된 채팅방 없음");
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }
            log.info("채팅방 {}개 조회 성공", rooms.size());
            return ResponseEntity.status(HttpStatus.OK).body(rooms);
        } catch (Exception e) {
            log.error("채팅방 목록 조회 중 서버 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    // 특정 채팅방 세부 정보 조회
    @GetMapping("/detail/{chatRoomUid}")
    public ResponseEntity<ChatRoomCreateResponse> getChatRoomDetails(@PathVariable String chatRoomUid,
                                                                     @RequestHeader(value = "Authorization", required = false) String token) {
        try {
            ChatRoomCreateResponse response = chatRoomService.getChatRoomDetails(chatRoomUid, token);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (RuntimeException e) {
            log.warn("채팅방 세부 정보 조회 실패: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            log.error("채팅방 세부 정보 조회 중 오류 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }



    // 채팅방 생성
    @PostMapping("")
    public ResponseEntity<ChatRoomCreateResponse> createChatRoom(@RequestBody ChatRoomCreateRequest request,
                                                                 @RequestHeader("Authorization") String token) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                log.warn("Authorization 헤더가 없거나 Bearer 타입이 아님");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ChatRoomCreateResponse());
            }
            String parsedToken = token.replace("Bearer ", "");   // "Bearer " 제거

            log.debug("createChatRoom 요청 확인 : {}", request);
            ChatRoomCreateResponse response = chatRoomService.createChatRoom(request, parsedToken);
            log.info("채팅방 생성 성공: {}", response.getChatRoomUid());
            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (IllegalArgumentException e) {
            log.warn("채팅방 생성 유효성 검사 실패 또는 사용자 정보 오류: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ChatRoomCreateResponse());
        } catch (Exception e) {
            log.error("채팅방 생성 중 예상치 못한 서버 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ChatRoomCreateResponse());
        }
    }


    // 채팅방 삭제
    @DeleteMapping("/{chatRoomUid}")
    public ResponseEntity<Void> deleteChatRoom(@PathVariable String chatRoomUid,
                                               @RequestHeader("Authorization") String token) {
        try {
            String parsedToken = token.replace("Bearer ", "");
            chatRoomService.deleteChatRoom(chatRoomUid, parsedToken);
            return ResponseEntity.noContent().build();
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 권한 없음
        } catch (Exception e) {
            log.error("채팅방 삭제 실패", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }


    // 채팅방 퇴장
    @PostMapping("/leave/{chatRoomUid}")
    public ResponseEntity<Void> exitChatRoom(@PathVariable String chatRoomUid,
                                             @RequestHeader("Authorization") String token) {
        try {
            String parsedToken = token.replace("Bearer ", "");

            // 토큰에서 사용자 정보 (memberName) 추출  (jwtUtil에서 memberName을 가져오는 메소드가 없으므로 memberCode로 DB에서 memberName 조회)
            Long memberCode = jwtUtil.getMemberCodeFromToken(parsedToken);
            String memberName = memberService.findByMemberCode(memberCode); // DB에서 이름 조회
            log.debug("-----------memberName : {}", memberName);

            if (memberName == null) {
                log.warn("토큰에서 사용자 이름(memberName) 추출 실패 (퇴장)");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401 Unauthorized
            }
            log.debug("Received exit request for room: {} from user: {}", chatRoomUid, memberName);

            chatRoomService.exitChatRoom(chatRoomUid, memberName);

            log.info("채팅방 {} 퇴장 처리 성공 (요청 사용자: {})", chatRoomUid, memberName);
            return ResponseEntity.noContent().build(); // 204 No Content (성공)

        } catch (SecurityException e) {
            log.error("채팅방 퇴장 권한 없음: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 권한 없음
        } catch (Exception e) {
            log.error("채팅방 퇴장 로직 오류: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);    // 400 Bad Request (클라이언트에게 오류 메시지 전달 필요 시 body에 담을 수 있음)
        }
    }
}
