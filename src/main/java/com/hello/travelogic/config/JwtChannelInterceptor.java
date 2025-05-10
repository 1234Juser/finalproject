//package com.hello.travelogic.config;
//
//import com.hello.travelogic.utils.JwtUtil;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.messaging.Message;
//import org.springframework.messaging.MessageChannel;
//import org.springframework.messaging.simp.stomp.StompCommand;
//import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
//import org.springframework.messaging.support.ChannelInterceptor;
//import org.springframework.messaging.support.MessageHeaderAccessor;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.stereotype.Component;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Slf4j
//@RequiredArgsConstructor
//@Component
//public class JwtChannelInterceptor implements ChannelInterceptor {
//// 인증된 사용자만 채팅이 가능하도록 하는 JWT 토큰 검증용 인터셉터
//
//    private final JwtUtil jwtUtil;
//
//    @Override
//    public Message<?> preSend(Message<?> message, MessageChannel channel) {
//        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
//
//        if (accessor != null && StompCommand.CONNECT.equals(accessor.getCommand())) {
//            log.debug("STOMP CONNECT 시도 - 토큰 검증 시작");
//            // STOMP 헤더에서 "Authorization" 값 가져오기
//            String authHeader = accessor.getFirstNativeHeader("Authorization");
//
//            if (authHeader != null && authHeader.startsWith("Bearer ")) {
//                String jwtToken = authHeader.substring(7);
//                log.debug("추출된 JWT: {}", jwtToken);
//
//                // JwtUtil의 토큰 유효성 검증 메소드
//                if (jwtUtil.validateToken(jwtToken)) {
//                    String username = jwtUtil.extractUsername(jwtToken);    // JwtUtil의 사용자 정보 추출 메소드
//                    if (username != null) {
//                        log.info("사용자 '{}' 인증 성공 (WebSocket)", username);
//
//                        // Spring Security의 Authentication 객체 생성하여 Principal로 설정 (인증된 사용자 정보 설정)
//                        // 토큰에서 권한 정보를 추출하
//                        List<GrantedAuthority> authorities = new ArrayList<>();
//                        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
//                        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
//                        accessor.setUser(authentication);   // 인증된 사용자 정보 설정
//
//                        // 필요하다면 세션 속성에도 사용자 정보 저장
//                        // if (accessor.getSessionAttributes() != null) {
//                        //     accessor.getSessionAttributes().put("username", username); }
//
//                        return message; // 인증 성공, 메시지 계속 처리
//                    } else {
//                        log.warn("JWT 토큰은 유효하나 사용자 이름을 추출할 수 없습니다.");
//                        throw new BadCredentialsException("토큰에서 사용자 정보를 찾을 수 없습니다. 로그인이 필요합니다.");
//                    }
//                } else {
//                    // 인증 실패
//                    log.warn("유효하지 않은 JWT 토큰: {}", jwtToken);
//                    throw new SecurityException("유효하지 않은 JWT 토큰입니다. 로그인이 필요합니다.");
//                }
//            } else {
//                // 토큰이 없거나 "Bearer " 형식이 아닌 경우
//                log.warn("Authorization 헤더가 없거나 Bearer 타입이 아닙니다.");
//                throw new BadCredentialsException("인증 헤더가 누락되었거나 형식이 올바르지 않습니다. 로그인이 필요합니다.");
//            }
//        }
//        // CONNECT 이외의 메시지(SEND, SUBSCRIBE 등)는 이미 인증된 세션으로 간주하고 통과시킴
//        return message;
//    }
//
//}
