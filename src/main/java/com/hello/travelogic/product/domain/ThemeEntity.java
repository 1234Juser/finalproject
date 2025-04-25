package com.hello.travelogic.product.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
}
