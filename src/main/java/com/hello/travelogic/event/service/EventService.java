package com.hello.travelogic.event.service;

import com.hello.travelogic.event.domain.EventEntity;
import com.hello.travelogic.event.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    //진행중인 이벤트
    public Page<EventEntity> findOngoingEvents(Pageable pageable) {
        LocalDateTime now = LocalDateTime.now();
        return eventRepository.findByEventEnddateGreaterThanEqual(now, pageable);
    }
    //완료된이벤트
    public Page<EventEntity> findFinishedEvents(Pageable pageable) {
        LocalDateTime now = LocalDateTime.now();
        return eventRepository.findByEventEnddateLessThan(now, pageable);
    }



    public Optional<EventEntity> findEventById(Integer id) {
        return eventRepository.findById(id);
    }

    public EventEntity saveEvent(String eventTitle, String eventContent, MultipartFile eventImg, String eventStartdate, String eventEnddate, String eventStatus) {
        String imgFileName = null;
        if (eventImg != null && !eventImg.isEmpty()) {
            // 파일 확장자 추출 (안 넣으면 jpeg 등에서 문제)
            String originalName = eventImg.getOriginalFilename();
            String ext = "";
            if (originalName != null && originalName.contains(".")) {
                ext = originalName.substring(originalName.lastIndexOf('.'));
            }
            // UUID로 파일명 생성
            imgFileName = UUID.randomUUID() + ext;
            // 프로젝트 루트 기준 절대 경로로 저장
            String projectRoot = System.getProperty("user.dir");
            // 저장 경로 - src와 같은 위치의 upload/events
            Path imagePath = Paths.get(projectRoot, "upload", "events", imgFileName);
            try {
                Files.createDirectories(imagePath.getParent());
                eventImg.transferTo(imagePath.toFile());
            } catch (IOException e) {
                throw new RuntimeException("이미지 저장 실패", e);
            }
        }

        // 만약 'date' input이면 LocalDate로 파싱해서 원하는 형태로 시간 정보까지 붙여 LocalDateTime 변환 필요
            LocalDateTime startDateTime = LocalDate.parse(eventStartdate).atStartOfDay();
            LocalDateTime endDateTime = LocalDate.parse(eventEnddate).atStartOfDay();


            EventEntity event = EventEntity.builder()
                    .eventTitle(eventTitle)
                    .eventContent(eventContent)
                    .eventImg(imgFileName) // 파일명을 eventImg에 저장한다고 가정
                    .eventStartdate(startDateTime)
                    .eventEnddate(endDateTime)
                    .eventStatus(eventStatus)
                    .build();
            return eventRepository.save(event);

        }

    //이벤트수정
    public EventEntity updateEvent(Integer id, String eventTitle, String eventContent, MultipartFile eventImg, String eventStartdate, String eventEnddate, String eventStatus) {
        EventEntity event = eventRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("이벤트를 찾을 수 없습니다: " + id));

        event.setEventTitle(eventTitle);
        event.setEventContent(eventContent);
        event.setEventStartdate(LocalDate.parse(eventStartdate).atStartOfDay());
        event.setEventEnddate(LocalDate.parse(eventEnddate).atStartOfDay());
        event.setEventStatus(eventStatus);

        if (eventImg != null && !eventImg.isEmpty()) {
            // 기존 파일 삭제
            if (event.getEventImg() != null) {
                String projectRoot = System.getProperty("user.dir");
                Path oldImagePath = Paths.get(projectRoot, "upload", "events", event.getEventImg());
                try {
                    Files.deleteIfExists(oldImagePath);
                } catch (IOException e) {
                    // 실패해도 치명적이지 않으면 로그만 남기고 넘어가도 됨
                }
            }
            // 파일 확장자 추출
            String originalName = eventImg.getOriginalFilename();
            String ext = "";
            if (originalName != null && originalName.contains(".")) {
                ext = originalName.substring(originalName.lastIndexOf('.'));
            }
            // UUID로 파일명 생성
            String imgFileName = UUID.randomUUID() + ext;
            // 프로젝트 루트 기준 절대 경로로 저장
            String projectRoot = System.getProperty("user.dir");
            Path imagePath = Paths.get(projectRoot, "upload", "events", imgFileName);
            try {
                Files.createDirectories(imagePath.getParent());
                eventImg.transferTo(imagePath.toFile());
                event.setEventImg(imgFileName); // 새 이미지 파일명으로 갱신
            } catch (IOException e) {
                throw new RuntimeException("이미지 저장 실패", e);
            }
        }

        return eventRepository.save(event);
    }
    //이벤트 삭제
    public void deleteEvent(Integer id) {
        eventRepository.deleteById(id);
    }
}

