package com.hello.travelogic.product.repo;

import com.hello.travelogic.product.domain.ThemeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ThemeRepo extends JpaRepository<ThemeEntity, Long> {

    List<ThemeEntity> findByThemeCode(Long themeCode);
}
