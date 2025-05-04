package com.hello.travelogic.event.repository;

import com.hello.travelogic.event.domain.EventEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface EventRepository extends JpaRepository<EventEntity, Integer> {
    //진행중인이벤트
    Page<EventEntity> findByEventEnddateGreaterThanEqual(LocalDateTime now, Pageable pageable);
    //완료된이벤트
    Page<EventEntity> findByEventEnddateLessThan(LocalDateTime now, Pageable pageable);
}
