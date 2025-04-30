package com.hello.travelogic.member.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="tbl_password_reset_code")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PasswordResetAuthCodeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="auth_id")
    private Long authId;

    @Column(name="member_email", nullable = false, length=30)
    private String memberEmail;

    @Column(name="auth_code", nullable = false, length = 10)
    private String authCode;

    @Column(name="expired_at", nullable = false)
    private LocalDateTime expiredAt;
}
