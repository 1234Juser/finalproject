package com.hello.travelogic.event.repository;

import com.hello.travelogic.event.domain.EventEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<EventEntity, Integer> {
}
