package com.hello.travelogic.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.security.config.annotation.web.messaging.MessageSecurityMetadataSourceRegistry;
import org.springframework.security.config.annotation.web.socket.AbstractSecurityWebSocketMessageBrokerConfigurer;
import org.springframework.security.config.annotation.web.socket.EnableWebSocketSecurity;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketSecurity        // WebSocket 접근을 인증/인가 처리로 보호 (보안용)
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig extends AbstractSecurityWebSocketMessageBrokerConfigurer {
    /* AbstractSecurityWebSocketMessageBrokerConfigurer :
        Spring Security가 웹소켓, 특히 STOMP 기반의 메시지 브로커 환경에서 보안 설정을 쉽게 할 수 있도록 제공하는 추상 클래스입니다.
        WebSocketMessageBrokerConfigurer를 직접 구현하는 것보다 더 보안에 특화된 설정을 편리하게 할 수 있도록 도와줍니다.
        이 클래스를 상속받으면, 웹소켓 연결 시점, 메시지 수신/발신 시점 등 다양한 단계에서 인증/인가 규칙을 적용할 수 있습니다.
     */

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
    
    // STOMP 메시지 경로별 접근 권한 설정
    @Override
    protected void configureInbound( MessageSecurityMetadataSourceRegistry messages) {
        messages
        /* configureInbound(MessageSecurityMetadataSourceRegistry messages) :
            AbstractSecurityWebSocketMessageBrokerConfigurer를 상속받을 때 오버라이드하여 사용하는 핵심 메소드 중 하나입니다.
            "Inbound" 라는 단어는 "안으로 들어오는", "수신되는"이라는 뜻입니다.
            즉, 이 메소드는 클라이언트에서 서버로 들어오는 STOMP 메시지에 대한 보안 규칙을 설정하는 곳입니다.
         */
        
        
        // 모든 사용자가 웹소켓에 연결(CONNECT)하고 구독 해제(UNSUBSCRIBE), 연결 종료(DISCONNECT)할 수 있도록 허용
        .simpTypeMatchers(SimpMessageType.CONNECT, SimpMessageType.HEARTBEAT, SimpMessageType.UNSUBSCRIBE, SimpMessageType.DISCONNECT).permitAll()
        // 비회원도 메시지를 보내고 참여할 수 있도록 "/app/inquiry/chat.sendMessage/**" 및 "/app/inquiry/join/**" 경로 허용
        .simpDestMatchers("/app/inquiry/chat.sendMessage/**", "/app/inquiry/join/**").permitAll()
        // 모든 사용자가 "/topic/inquiry/chat/**" 경로를 구독(SUBSCRIBE)하여 메시지를 받을 수 있도록 허용
        .simpSubscribeDestMatchers("/topic/inquiry/chat/**").permitAll()
        // 그 외 다른 /app/** 경로로 시작하는 메시지는 인증된 사용자만 허용 (필요에 따라 규칙 추가/변경)
        // .simpDestMatchers("/app/someOtherFeature/**").authenticated()
        // 기본적으로 다른 모든 메시지는 거부하거나 인증을 요구 (선택)
        .anyMessage().permitAll(); // 현재는 비회원 기능을 위해 우선 모든 메시지 허용
        // 더 엄격하게 하려면 .authenticated() 또는 .denyAll() 후 필요한 것만 permitAll()
    }
    
    // CSRF 보호를 웹소켓에서 사용하지 않으려면 true로 설정합니다.
    // SecurityConfig에서 CSRF를 disable 했으므로 true로 설정하는 것이 일반적입니다.
    @Override
    protected boolean sameOriginDisabled() {
        return true;
    }
}
