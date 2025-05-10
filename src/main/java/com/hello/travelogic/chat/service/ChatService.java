//package com.hello.travelogic.chat.service;
//
//import com.hello.travelogic.chat.domain.ChatEntity;
//import com.hello.travelogic.chat.domain.ChatRoomMemberEntity;
//import com.hello.travelogic.chat.dto.ChatDTO;
//import com.hello.travelogic.chat.dto.ChatRoomMemberDTO;
//import com.hello.travelogic.chat.repo.ChatRepo;
//import com.hello.travelogic.member.domain.MemberEntity;
//import com.hello.travelogic.member.dto.MemberDTO;
//import com.hello.travelogic.member.repository.MemberRepository;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.Optional;
//import java.util.UUID;
//import java.util.stream.Collectors;
//
//@Service
//@RequiredArgsConstructor
//@Slf4j
//public class ChatService {
//
//    private final ChatRepo chatRepo;
//    private final MemberRepository memberRepo;
//
//
//    // 채팅방 생성
////    @Transactional
////    public ChatDTO createChatRoom(Long creatorMemberCode, ChatDTO chatDTO) {
////
////        Optional<MemberEntity> memberDTO = memberRepo.findByMemberCode(chatDTO.getMemberCode());
////        log.info(">>>>> memberDTO: {}", memberDTO);
////
////        chatDTO.setChatUid(UUID.randomUUID().toString());
////        chatDTO.setChatCreateAt(LocalDateTime.now());
////
////        ChatEntity chatEntity = toEntity(chatDTO, creator); // toEntity에 creator 정보 전달
////        ChatEntity savedEntity = chatRepo.save(chatEntity);
////
////        ChatDTO savedChatDTO = toDTO(savedEntity);
////        savedChatDTO.setCreatorName(creator.getMemberName()); // DTO에 생성자 이름 설정 (가정)
////        return savedChatDTO;
////    }
//
//    // 모든 채팅방 목록 조회
//    /*public List<ChatDTO> getAllChatRooms() {
//        List<ChatEntity> chatEntities = chatRepo.findAll();
//        return chatEntities.stream()
//                .map(this::toDTO)
//                .collect(Collectors.toList());
//    }
//    */
//
//
//    // ChatDTO를 ChatEntity로 변환
//    private ChatEntity toEntity(ChatDTO chatDTO, MemberEntity creator) {
//        ChatEntity chatEntity = new ChatEntity();
//
//        chatEntity.setChatId(chatDTO.getChatId());
//        chatEntity.setCreator(creator); // 생성자 정보 설정
//        chatEntity.setChatUid(chatDTO.getChatUid());
//        chatEntity.setChatTitle(chatDTO.getChatTitle());
//        chatEntity.setChatCreateAt(chatDTO.getChatCreateAt());
//        chatEntity.setChatDescription(chatDTO.getChatDescription());
//        chatEntity.setChatMaxParticipants(chatDTO.getChatMaxParticipants());
//        return chatEntity;
//    }
//
//
//    //
//    private ChatDTO toDTO(ChatEntity chatEntity) {
//        ChatDTO chatDTO = new ChatDTO();
//
//        chatDTO.setChatId(chatEntity.getChatId());
//        chatDTO.setMemberCode(chatEntity.getCreator() != null ? chatEntity.getCreator().getMemberCode() : null);
//        chatDTO.setChatUid(chatEntity.getChatUid());
//        chatDTO.setChatTitle(chatEntity.getChatTitle());
//        chatDTO.setChatCreateAt(chatEntity.getChatCreateAt());
//        chatDTO.setChatDescription(chatEntity.getChatDescription());
//        chatDTO.setChatMaxParticipants(chatEntity.getChatMaxParticipants());
//        return chatDTO;
//    }
//}
