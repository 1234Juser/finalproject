package com.hello.travelogic.event.service;

import com.hello.travelogic.event.domain.EventEntity;
import com.hello.travelogic.event.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final S3Client s3Client;

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    // 생성자를 통해 의존성 주입
    @Autowired
    public EventService(EventRepository eventRepository, S3Client s3Client) {
        this.eventRepository = eventRepository;
        this.s3Client = s3Client;
    }

    // S3에 이미지 업로드 (헬퍼 메서드)
    private String uploadImageToS3(MultipartFile file) {
        // S3에 저장될 파일 이름 생성 (events/ 폴더 안에 저장)
        String fileName = "events/" + UUID.randomUUID() + "_" + file.getOriginalFilename();

        try {
            // S3에 업로드 요청 객체 생성
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .contentType(file.getContentType())
                    .contentLength(file.getSize())
                    .build();

            // 파일 업로드
            s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

            // 업로드된 파일의 S3 URL 반환
            return s3Client.utilities().getUrl(builder -> builder.bucket(bucketName).key(fileName)).toString();

        } catch (IOException e) {
            throw new RuntimeException("S3 파일 업로드 중 오류가 발생했습니다.", e);
        }
    }

    // S3에서 이미지 삭제 (헬퍼 메서드)
    private void deleteImageFromS3(String imageUrl) {
        if (imageUrl == null || imageUrl.isBlank()) {
            return;
        }
        try {
            // S3 URL에서 객체 키(파일 경로) 추출
            String key = URLDecoder.decode(imageUrl.substring(imageUrl.indexOf("events/")), StandardCharsets.UTF_8);

            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();

            s3Client.deleteObject(deleteObjectRequest);
        } catch (Exception e) {
            // 로그를 남기거나 예외 처리를 할 수 있습니다.
            System.err.println("S3 이미지 삭제 실패: " + imageUrl + ", 오류: " + e.getMessage());
        }
    }

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
        String imageUrl = null;
        if (eventImg != null && !eventImg.isEmpty()) {
            imageUrl = uploadImageToS3(eventImg); // S3에 이미지 업로드 후 URL 받기
        }

        LocalDateTime startDateTime = LocalDate.parse(eventStartdate).atStartOfDay();
        LocalDateTime endDateTime = LocalDate.parse(eventEnddate).atStartOfDay();

        EventEntity event = EventEntity.builder()
                .eventTitle(eventTitle)
                .eventContent(eventContent)
                .eventImg(imageUrl) // S3 이미지 URL을 저장
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

        // 새 이미지가 업로드된 경우
        if (eventImg != null && !eventImg.isEmpty()) {
            // 기존 이미지가 있으면 S3에서 삭제
            if (event.getEventImg() != null) {
                deleteImageFromS3(event.getEventImg());
            }
            // 새 이미지를 S3에 업로드하고 URL을 업데이트
            String newImageUrl = uploadImageToS3(eventImg);
            event.setEventImg(newImageUrl);
        }

        return eventRepository.save(event);
    }

    //이벤트 삭제
    public void deleteEvent(Integer id) {
        // DB에서 이벤트를 삭제하기 전에 연결된 S3 이미지를 먼저 삭제
        eventRepository.findById(id).ifPresent(event -> {
            if (event.getEventImg() != null) {
                deleteImageFromS3(event.getEventImg());
            }
        });
        eventRepository.deleteById(id);
    }

    // 메인 슬라이드용 진행 중인 이벤트 조회 (최신 6개)
    public List<EventEntity> findOngoingEventsForMainSlider() {
        Pageable pageable = PageRequest.of(0, 6, Sort.by(Sort.Direction.DESC, "eventCode"));
        LocalDateTime now = LocalDateTime.now();
        return eventRepository.findByEventEnddateGreaterThanEqual(now, pageable).getContent();
    }
}