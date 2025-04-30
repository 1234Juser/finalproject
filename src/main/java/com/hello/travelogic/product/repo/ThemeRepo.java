package com.hello.travelogic.product.repo;

import com.hello.travelogic.product.domain.ThemeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThemeRepo extends JpaRepository<ThemeEntity, Long> {

}
