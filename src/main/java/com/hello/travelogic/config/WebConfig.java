package com.hello.travelogic.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                // 모든 경로에 대해 CORS 설정을 적용합니다.
                // 즉, /api/**, /login, /member 등 모든 컨트롤러 URL 경로가 대상입니다.

                .allowedOriginPatterns("*")
                // 어떤 Origin(출처, 주소)이든 접근을 허용합니다.
                // 예: http://localhost:3000 (React 개발 서버), http://myfrontend.com 등
                // "allowedOrigins()" 대신 "allowedOriginPatterns()"을 사용한 이유는
                // allowCredentials(true)를 사용할 경우 와일드카드("*")는 allowedOrigins()에서 사용할 수 없기 때문입니다.

                .allowedMethods("GET", "POST", "PUT", "DELETE")
                // HTTP 메서드 중에서 이 네 가지 방식에 대해서만 허용합니다.
                // 예: React에서 GET으로 데이터 요청하거나, POST로 폼 제출 시 허용됨

                .allowedHeaders("*")
                // 요청 시 어떤 헤더든 모두 허용합니다.
                // 예: Content-Type, Authorization 등 다양한 커스텀 헤더 포함 가능

                .allowCredentials(true);
        // 쿠키나 인증 정보(세션, 토큰 등)를 포함한 요청을 허용합니다.
        // 보통 로그인 유지나 인증이 필요한 API 요청에 사용되며,
        // 클라이언트 측 fetch/axios 요청 시 `{ withCredentials: true }` 설정이 함께 필요합니다.
    }
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // /img/** 요청을 upload/img/ 폴더에서 찾아라
        registry.addResourceHandler("/img/**")
                .addResourceLocations("file:" + new File("upload/img/").getAbsolutePath() + "/",
                        "classpath:/static/img/"
                );
        //이벤트사진
        registry.addResourceHandler("/events/**")
                .addResourceLocations("file:" + new File("upload/events/").getAbsolutePath() + "/");
        // 리뷰 사진 저장
        registry.addResourceHandler("/review/**")
                .addResourceLocations("file:" + new File("upload/review/").getAbsolutePath() + "/");
        registry
                .addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/");
    }
}

