package com.hello.travelogic.faq.repository;

import com.hello.travelogic.faq.domain.FaqEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FaqRepository extends JpaRepository<FaqEntity, Integer> {
}
