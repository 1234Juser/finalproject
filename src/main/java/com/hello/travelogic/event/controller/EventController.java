package com.hello.travelogic.event.controller;

import com.hello.travelogic.event.domain.EventEntity;
import com.hello.travelogic.event.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/event")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;

    //전체이벤트 진행중인 목록조회
    @GetMapping
    public ResponseEntity<Page<EventEntity>> findOngoingEvents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        return ResponseEntity.ok(eventService.findOngoingEvents(PageRequest.of(page, size)));
    }
    //전체이벤트 완료된 이벤트조회
    @GetMapping("/finished")
    public ResponseEntity<Page<EventEntity>> findFinishedEvents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        return ResponseEntity.ok(eventService.findFinishedEvents(PageRequest.of(page, size)));
    }

    //단일이벤트조회
    @GetMapping("/{id}")
    public ResponseEntity<EventEntity> getEvent(@PathVariable Integer id){
        return ResponseEntity.of(eventService.findEventById(id));
    }

    //이벤트 등록
    @PostMapping
    public ResponseEntity<EventEntity> registerEvent(
            @RequestParam String eventTitle,
            @RequestParam String eventContent,
            @RequestParam("eventImg") MultipartFile eventImg,
            @RequestParam String eventStartdate,
            @RequestParam String eventEnddate,
            @RequestParam String eventStatus
    ){
        EventEntity savedEvent = eventService.saveEvent(
                eventTitle, eventContent, eventImg, eventStartdate, eventEnddate, eventStatus
        );
        return ResponseEntity.ok(savedEvent);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventEntity> updateEvent(
            @PathVariable Integer id,
            @RequestParam String eventTitle,
            @RequestParam String eventContent,
            @RequestParam(value = "eventImg", required = false) MultipartFile eventImg,
            @RequestParam String eventStartdate,
            @RequestParam String eventEnddate,
            @RequestParam String eventStatus
    ) {
        EventEntity updatedEvent = eventService.updateEvent(
                id, eventTitle, eventContent, eventImg, eventStartdate, eventEnddate, eventStatus
        );
        return ResponseEntity.ok(updatedEvent);
    }


}
