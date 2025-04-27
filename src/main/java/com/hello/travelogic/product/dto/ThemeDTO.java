package com.hello.travelogic.product.dto;

import com.hello.travelogic.product.domain.ThemeEntity;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ThemeDTO {

    private Long themeCode;
    private String themeUid;
    private String themeName;

    public ThemeDTO(ThemeEntity themeDTO) {
        this.themeCode = themeDTO.getThemeCode();
        this.themeUid = themeDTO.getThemeUid();
        this.themeName = themeDTO.getThemeName();
    }
}
