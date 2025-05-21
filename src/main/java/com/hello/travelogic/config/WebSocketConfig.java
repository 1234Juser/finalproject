package com.hello.travelogic.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * WebSocketConfig 클래스는 WebSocket 메시지 구성 및 JWT 기반 인증 관리
 */
@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    // JWT 기반 인증 인터셉터
    private final JwtChannelInterceptor jwtChannelInterceptor;

    /**
     * 메시지 브로커 설정
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic"); // 메시지를 전달할 경로
        registry.setApplicationDestinationPrefixes("/app"); // 클라이언트에서 전송한 메시지를 처리할 경로
    }

    /**
     * WebSocket 엔드포인트 설정
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws") // WebSocket 연결 엔드포인트
                .setAllowedOriginPatterns("*") // 개발 중 모든 오리진 허용 (배포 시 제한)
                .withSockJS(); // SockJS 지원
    }

    /**
     * JWT 인증 인터셉터를 WebSocket Inbound Channel에 추가
     */
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(jwtChannelInterceptor); // JWT 검증 인터셉터 등록
    }
}