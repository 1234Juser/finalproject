package com.hello.travelogic.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.security.config.annotation.web.socket.EnableWebSocketSecurity;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
//@EnableWebSocketSecurity        // WebSocket 접근을 인증/인가 처리로 보호 (보안용)
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {

        config.enableSimpleBroker("/topic");    // 구독 경로
        config.setApplicationDestinationPrefixes("/app");       // 메시지 보낼 경로
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")  // 프론트가 연결할 엔드포인트
                .setAllowedOriginPatterns("*")  // 개발 중이므로 모든 도메인 허용
                .withSockJS();
    }
}
