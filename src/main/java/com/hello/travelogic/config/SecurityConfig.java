package com.hello.travelogic.config;

import com.hello.travelogic.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtUtil jwtUtil;


    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring()
                // 스프링 부트의 일반적인 정적 리소스 위치를 무시합니다.
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations())
                // 추가적으로 특정 경로의 정적 리소스들도 무시하도록 설정합니다.
                .requestMatchers("/css/**", "/js/**", "/img/**", "/favicon.ico", "/static/**",
                        "/upload/**", "/events/**");
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    // 요청을 허용할 오리진(도메인)을 설정합니다.
                    config.setAllowedOrigins(List.of("http://localhost:3000"));
                    // 허용할 HTTP 메서드를 설정합니다.
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
                    // 허용할 헤더를 설정합니다. 모든 헤더를 허용합니다.
                    config.setAllowedHeaders(List.of("*"));
                    // 클라이언트에게 노출할 헤더를 설정합니다. 주로 'Authorization' 헤더를 노출하여 클라이언트가 접근할 수 있도록 합니다.
                    config.setExposedHeaders(List.of("Authorization"));
                    // 자격 증명(쿠키, HTTP 인증 헤더 등)을 포함한 요청을 허용할지 여부를 설정합니다.
                    config.setAllowCredentials(true);
                    return config;
                }))
//                .cors(withDefaults()) // Spring Boot의 기본 CORS 설정을 사용하려면 이 주석을 해제할 수 있습니다.
                // CSRF(Cross-Site Request Forgery) 보호 기능을 비활성화합니다.
                // REST API 서버의 경우 토큰 기반 인증(JWT 등)을 사용하므로 CSRF 보호가 필요 없거나 충돌할 수 있어 비활성화하는 경우가 많습니다.
                .csrf(AbstractHttpConfigurer::disable)
//                .csrf(csrf -> csrf.disable()) // 다른 CSRF 비활성화 방식 (동일한 기능)
                // HTTP 요청에 대한 인가(Authorization) 규칙을 설정합니다.
                .authorizeHttpRequests(auth -> auth
                                // 다음 경로들은 인증 없이(누구나) 접근을 허용합니다.
                                .requestMatchers("/member/**", "/api/inquiry/**","/main", "/","/customize/search", "/search",
                                        "/about", "/ceo","/faq", "/faq/{id}","/domestic", "/international",
                                        "/city/ranking", "/city/all-view-counts","/exchange/main",
                                        "/event","/event/{id}","/event/ongoing-slider",
                                        "/companions",  "/companions/{id}", "/likes/companion/{id}/count", "/likes/comment/{id}/count",
                                        "/cities/region/**", "/products/city", "/country/**", "/cities/**","/products/**",
                                        "/review/product/**",   "/payments/methods","/orders/cancel-pending", "/api/chatrooms",
                                        "/review/*/image", "/review/product/*/average", "/review/product/*/count", "/review/{reviewPic}/image",
                                        "/payments/methods", "/users/getToken", "/iamport/webhook", "/reservations/receipt/**",
                                        "/products/*/option/create", "/products/*/reservation", "/products/*/option", "/products/*/reservation-date",
                                        "/products/*/option/*", "/products/ads",
                                        "/orders/cancel-pending", "/products/country/**", "/products/city/**", "/products/**",
                                        "/country/{regionCode}", "/city/{cityId}", "/cities/{countryId}", "/cities/region/{regionCode}",
                                        "/domestic", "/international", "/region/{regionType}", "/themes"

                                ).permitAll()
                                //  경로는 인증된 사용자만 접근을 허용합니다.
                                .requestMatchers("/member/mypage","/wish/**",
                                        "/review/view/**", "/review/write/info/**", "/review/write/**", "/review/edit/**", "/review/delete/**",
                                        "/payments/create", "/payments/**", "/my/reservations/**", "/my/reservations/cancel/**",
                                        "/order/create", "/order/*/complete","/order/*/delete", "/order/*", "/payments/**", "/payments/cancel/**"
                                ).authenticated()
                                // 경로는 'ADMIN' 역할을 가진 사용자만 접근을 허용합니다.
                                .requestMatchers("/member/adminmypage", "/admin/**").hasRole("ADMIN")
                                //  경로는 'ADMIN' 권한을 가진 사용자만 접근을 허용합니다. (hasRole은 'ROLE_' 접두사를 자동으로 붙여줌)
                                .requestMatchers("/event/register", "/event/edit/**","/member/all",
                                        "/admin/**", "/admin/booking/**").hasAnyAuthority("ROLE_ADMIN")
                                //  경로는 'ADMIN' 역할을 가진 사용자만 접근을 허용합니다.
                                .requestMatchers("/admin/**", "/admin/booking/**").hasRole("ADMIN")
                                //  경로는 'USER' 또는 'ADMIN' 역할을 가진 사용자만 접근을 허용합니다.
                                .requestMatchers(HttpMethod.PATCH, "/my/reservations/cancel/*").hasAnyRole("USER", "ADMIN")
                                .requestMatchers("/my/**").hasAnyRole("USER", "ADMIN")
                                // 웹소켓 핸드셰이크 경로('/ws/**')는 인증 없이(누구나) 접근을 허용합니다.
                                .requestMatchers("/ws/**").permitAll()
                                // 위에서 명시적으로 허용한 경로를 제외한 모든 나머지 요청은 인증된 사용자만 접근을 허용합니다.
                                .anyRequest().authenticated()
                        // 모든 요청을 허용하려면 위 줄 대신 아래 주석 처리된 줄을 사용합니다. (보안상 위험하므로 주의)
//                      .anyRequest().permitAll()
                )

                // 이 필터에서 요청 헤더의 JWT를 검증하고 SecurityContext에 인증 정보를 설정합니다.
                .addFilterBefore(new JwtFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);

        // 구성된 HttpSecurity 객체를 빌드하여 SecurityFilterChain을 반환합니다.
        return http.build();
    }
}