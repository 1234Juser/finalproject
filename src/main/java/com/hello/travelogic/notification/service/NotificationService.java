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
import org.springframework.transaction.annotation.Transactional;
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
                .notiTargetPostId(requestDTO.getNotiTargetPostId())
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
        List<NotificationResponseDTO> responseList = notiList.stream()
                .map(n -> new NotificationResponseDTO(
                        n.getNotiId(),
                        n.getMemberCode().getMemberCode(),
                        n.getNotiMessage(),
                        n.isNotiIsRead(),
                        n.getNotiCreatedAt(),
                        n.getNotiTargetPostId()
                )).collect(Collectors.toList());

        log.debug("getNotifications resonseList::::::: {}", responseList);

        return responseList;
    }


    // 모든 알림 읽음 처리
    @Transactional
    public void markAllAsRead(Long memberCode) {

        List<NotificationEntity> unreadNotifications = notificationRepo.findByMemberCode_MemberCodeOrderByNotiCreatedAtDesc(memberCode)
                .stream()
                .filter(noti -> !noti.isNotiIsRead())
                .toList();

        // 모든 읽지 않은 알림을 읽음으로 설정
        // notificationRepo.save(noti);는 @Transactional이므로 생략 가능
        unreadNotifications.forEach(NotificationEntity::markAsRead);
        log.debug("markAllAsRead: {}개의 알림을 읽음 처리했습니다.", unreadNotifications.size());

        // 읽음 처리된 알림을 SSE를 통해 클라이언트에 전송
        unreadNotifications.forEach(noti -> {
            NotificationResponseDTO responseDTO = new NotificationResponseDTO(noti);
            sendSseNotification(responseDTO.getMemberCode(), responseDTO);
        });
    }


    // 개별 알림 읽음 처리
    @Transactional
    public void markAsRead(Long notiId) {
        NotificationEntity notification = notificationRepo.findById(notiId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 알림입니다."));

        if (!notification.isNotiIsRead()) {
            notification.markAsRead();
            log.debug("NotificationService: 알림 {}을(를) 읽음 처리했습니다.", notiId);

            // SSE를 통해 클라이언트에 읽음 상태 전송
            NotificationResponseDTO responseDTO = new NotificationResponseDTO(notification);
            sendSseNotification(responseDTO.getMemberCode(), responseDTO);
        }
    }


    // 알림 삭제
    @Transactional
    public void deleteNotification(Long notiId) {
        if (!notificationRepo.existsById(notiId)) {
            throw new IllegalArgumentException("존재하지 않는 알림입니다.");
        }
        notificationRepo.deleteById(notiId);
    }


    // 모든 알림 삭제
    @Transactional
    public void deleteAllNotifications(Long memberCode) {
        List<NotificationEntity> notifications = notificationRepo.findByMemberCode_MemberCode(memberCode);
        if (notifications.isEmpty()) {
            log.debug("NotificationService: 삭제할 알림이 없습니다.");
            return;
        }
        notificationRepo.deleteAll(notifications);
        log.debug("NotificationService: 사용자 {}의 모든 알림을 삭제했습니다.", memberCode);
    }
}
