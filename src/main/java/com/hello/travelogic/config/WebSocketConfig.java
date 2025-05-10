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
@EnableWebSocketMessageBroker       // WebSocket 메시지 브로커 활성화
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // 메시지 브로커가 /topic으로 시작하는 대상(destination)을 가진 메시지를 처리하도록 설정합니다.
        // 즉, /topic 경로로 메시지를 보내면 해당 경로를 구독하는 클라이언트들에게 메시지가 전달됩니다.
        config.enableSimpleBroker("/topic");  // 구독 경로

        // 클라이언트가 메시지를 서버로 보낼 때 사용할 경로의 접두사를 설정합니다.
        // 예를 들어, 클라이언트가 /app/chat.sendMessage 경로로 메시지를 보내면,
        // @MessageMapping("/chat.sendMessage") 어노테이션이 붙은 핸들러 메소드가 이를 처리합니다.
        config.setApplicationDestinationPrefixes("/app");  // 메시지 보낼 경로
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")  // 프론트가 연결할 엔드포인트
                .setAllowedOriginPatterns("*")  // 개발 중이므로 모든 도메인 허용
                .withSockJS();  // SockJS 사용
    }
}
