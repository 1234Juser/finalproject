package com.hello.travelogic.event.controller;

import com.hello.travelogic.event.domain.EventEntity;
import com.hello.travelogic.event.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/event")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;

    //전체이벤트 목록조회
    @GetMapping
    public ResponseEntity<List<EventEntity>> findAllEvents(){
        return ResponseEntity.ok(eventService.findAllEvents());
    }

    //단일이벤트조회
    @GetMapping("/{id}")
    public ResponseEntity<EventEntity> getEvent(@PathVariable Integer id){
        return ResponseEntity.of(eventService.findEventById(id));
    }
}
