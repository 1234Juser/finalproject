package com.hello.travelogic.notification.service;

import com.hello.travelogic.member.domain.MemberEntity;
import com.hello.travelogic.member.repository.MemberRepository;
import com.hello.travelogic.notification.SseEmitters;
import com.hello.travelogic.notification.domain.NotificationEntity;
import com.hello.travelogic.notification.dto.NotificationRequestDTO;
import com.hello.travelogic.notification.dto.NotificationResponseDTO;
import com.hello.travelogic.notification.repo.NotificationRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final NotificationRepo notificationRepo;
    private final MemberRepository memberRepository;
    private final SseEmitters sseEmitters; // SseEmitters 주입



    // 새로운 알림 생성
    public NotificationResponseDTO createNotification(NotificationRequestDTO requestDTO) {
        MemberEntity member = memberRepository.findById(requestDTO.getMemberCode())
                .orElseThrow(() -> new IllegalArgumentException("회원이 존재하지 않습니다."));
        log.debug("createNotification member::::::: {}", member);

        NotificationEntity notification = NotificationEntity.builder()
                .memberCode(member)
                .notiMessage(requestDTO.getNotiMessage())
                // notiIsRead는 기본값 false, notiCreatedAt는 @CreationTimestamp로 자동 설정
                .build();
        log.debug("createNotification notification::::::: {}", notification);

        NotificationEntity savedNotification = notificationRepo.save(notification);
        log.debug("createNotification savedNotification::::::: {}", savedNotification);

        NotificationResponseDTO responseDTO = new NotificationResponseDTO(savedNotification);

        sendSseNotification(responseDTO.getMemberCode(), responseDTO); // 이 메소드는 SseEmitter를 관리하는 곳에서 호출

        return responseDTO;
    }


    // 새로운 알림 저장
    // sseEmitters 맵을 관리하는 서비스 또는 NotificationController에서 직접 접근할 수 있도록 설계

    public void sendSseNotification(Long memberCode, NotificationResponseDTO notificationResponseDTO) {
        sseEmitters.send(memberCode, notificationResponseDTO); // 인스턴스 메소드 호출
    }


    // 특정 회원의 모든 알림 조회
    public List<NotificationResponseDTO> getNotifications(Long memberCode) {
        List<NotificationEntity> notiList = notificationRepo.findByMemberCode_MemberCodeOrderByNotiCreatedAtDesc(memberCode);

        // NotificationEntity를 NotificationResponseDTO로 변환
        List<NotificationResponseDTO> resonseList = notiList.stream()
                .map(n -> new NotificationResponseDTO(
                        n.getNotiId(),
                        n.getMemberCode().getMemberCode(),
                        n.getNotiMessage(),
                        n.isNotiIsRead(),
                        n.getNotiCreatedAt()
                )).collect(Collectors.toList());

        log.debug("getNotifications resonseList::::::: {}", resonseList);

        return resonseList;
    }


    /**
     * 특정 회원의 모든 알림 조회
     */
/*    @Transactional(readOnly = true)
    public List<NotificationResponseDTO> getNotificationsByMemberCode(Integer memberCode) {
        return notificationRepository.findByMemberCodeOrderByNotiCreatedAtDesc(memberCode)
                .stream()
                .map(n -> new NotificationResponseDto(
                        n.getId(),
                        n.getMessage(),
                        "GENERIC", // 타입 구분 필요시 수정 가능
                        n.getIsRead(),
                        n.getCreatedAt()
                )).toList();
    }*/

    /**
     * 특정 회원의 읽지 않은 알림 조회
     */
/*    @Transactional(readOnly = true)
    public List<NotificationResponseDTO> getUnreadNotificationsByMemberCode(Integer memberCode) {
        return notificationRepository.findByMemberCodeAndNotiIsReadOrderByNotiCreatedAtDesc(memberCode, false)
                .stream()
                .map(NotificationResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }*/

    /**
     * 알림 읽음 처리
     */
/*    @Transactional
    public boolean markAsRead(Integer notiId, Integer memberCode) { // memberCode는 소유권 확인용
        Notification notification = notificationRepository.findById(notiId)
                .orElseThrow(() -> new IllegalArgumentException("알림이 존재하지 않습니다."));

              // 1.
                notification.markAsRead();
              // 2.또는 아래걸로
        if (notification != null && notification.getMemberCode().equals(memberCode)) {
            notification.setNotiIsRead(true);
            notificationRepository.save(notification);
            return true;
        }
        return false;
    }*/

    /**
     * 특정 회원의 읽지 않은 알림 개수 조회
     */
/*    @Transactional(readOnly = true)
    public long getUnreadNotificationCount(Integer memberCode) {
        return notificationRepository.countByMemberCodeAndNotiIsRead(memberCode, false);
    }*/
}
