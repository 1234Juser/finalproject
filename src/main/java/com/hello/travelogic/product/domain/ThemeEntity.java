package com.hello.travelogic.product.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tbl_theme")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ThemeEntity {

    @Id
    @Column(name = "theme_code", nullable = false)
    private Long themeCode;

    @Column(name = "theme_uid", nullable = false, length = 20)
    private String themeUid;

    @Column(name = "theme_name", nullable = false, length = 20)
    private String themeName;

    @Column(name = "theme_condition", nullable = false, length = 20)
    private String themeCondition;

    // 양방향 매핑
    @OneToMany(mappedBy = "themeCode", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductThemeEntity> productThemes = new ArrayList<>();
}
