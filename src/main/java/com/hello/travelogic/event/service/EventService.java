package com.hello.travelogic.event.service;

import com.hello.travelogic.event.domain.EventEntity;
import com.hello.travelogic.event.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;


    public List<EventEntity> findAllEvents() {
        return eventRepository.findAll();
    }


    public Optional<EventEntity> findEventById(Integer id) {
        return eventRepository.findById(id);
    }
}
