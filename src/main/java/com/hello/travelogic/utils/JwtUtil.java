package com.hello.travelogic.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
@Slf4j
public class JwtUtil {

    // application.properties에 등록한 값 주입
    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long expiration;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }


    public String generateToken(String memberId, List<String> roles, Long memberCode
    ) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expiration);

        List<String> prefixedRoles = roles.stream()
                .map(role -> role.startsWith("ROLE_") ? role : "ROLE_" + role)
                .collect(Collectors.toList());

        return Jwts.builder()
                .setSubject(memberId)
                .claim("roles", roles)
                .claim("memberCode", memberCode)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String getMemberIdFromToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey()) // 새 메서드
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims.getSubject();
    }

    // long타입 멤버코드용
    public Long getMemberCodeFromToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey()) // 새 메서드
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claims.get("memberCode", Long.class);
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(token);
            log.trace("Token validation successful for token: {}", token); // 성공 시 TRACE 로그
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | io.jsonwebtoken.MalformedJwtException e) {
            log.warn("Invalid JWT signature or structure for token [{}]: {}", token, e.getMessage());
        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            log.warn("Expired JWT token [{}]: {}", token, e.getMessage());
        } catch (io.jsonwebtoken.UnsupportedJwtException e) {
            log.warn("Unsupported JWT token [{}]: {}", token, e.getMessage());
        } catch (IllegalArgumentException e) {
            // 이 예외는 Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token) 에서 token이 null이거나 비었을 때 주로 발생
            log.warn("JWT claims string is empty or null for token [{}]: {}", token, e.getMessage());
        } catch (Exception e) {
            log.error("Token validation failed for an unexpected reason for token [{}]: {}", token, e.getMessage(), e);
        }
        // 실패 시 WARN 로그는 JwtChannelInterceptor에서 이미 찍고 있으므로 여기서는 생략하거나 TRACE로 변경 가능
        // log.warn("Token validation failed for token: {}", token);
        return false;
    }


    public List<String> getRolesFromToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims.get("roles", List.class);
    }


    // 사용자 이름 (memberName) 클레임 추출
    public String getMemberNameFromToken(String token) {
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            return claims.get("memberName", String.class); // ★ memberName 클레임 가져오기 ★
        } catch (Exception e) {
            // 토큰 파싱 또는 클레임 추출 실패 시
            return null;
        }
    }
}