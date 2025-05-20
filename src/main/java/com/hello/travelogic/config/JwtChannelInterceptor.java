package com.hello.travelogic.config;

import com.hello.travelogic.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtChannelInterceptor implements ChannelInterceptor {

    private final JwtUtil jwtUtil;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        if (accessor != null && StompCommand.CONNECT.equals(accessor.getCommand())) {
            String token = accessor.getFirstNativeHeader("Authorization");

            if (token != null && token.startsWith("Bearer ")) {
                token = token.substring(7); // "Bearer " 제거
                if (jwtUtil.validateToken(token)) {
                    String memberId = jwtUtil.getMemberIdFromToken(token);
                    Long memberCode = jwtUtil.getMemberCodeFromToken(token);
                    log.info("✅ 토큰 검증 성공, memberId: {}, memberCode: {}", memberId, memberCode);

                    // 사용자 정보를 WebSocket 세션에 저장
                    accessor.getSessionAttributes().put("memberId", memberId);
                    accessor.getSessionAttributes().put("memberCode", memberCode);
                } else {
                    log.warn("❌ 유효하지 않은 JWT 토큰");
                }
            } else {
                log.warn("⚠️ Authorization 헤더가 없거나 잘못된 형식입니다.");
            }
        }
        return message;
    }
}