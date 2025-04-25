package com.hello.travelogic.member.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name="tbl_authority")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthorityEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "authority_code")
    private Integer authorityCode;

    @Column(name = "authority_name", nullable = false, length = 20, unique = true)
    private String authorityName;

    // 연관관계 매핑 (해당 권한을 가진 회원들)
    @OneToMany(mappedBy = "authority", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<MemberRoleEntity> memberRoles;
}
