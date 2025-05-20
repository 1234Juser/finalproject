package com.hello.travelogic.member.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="tbl_member_role")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})      // Jackson의 Hibernate 프록시 속성 무시
public class MemberRoleEntity {

    @EmbeddedId
    private MemberRoleId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("memberCode")
    @JoinColumn(name="member_code")
    @JsonIgnore         // 서버에서 클라이언트로 전송되는 JSON 응답의 순환 참조로 인한 무한 루프 방지(authority 필드 동일)
    private MemberEntity member;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("authorityCode")
    @JoinColumn(name="authority_code")
    @JsonIgnore
    private AuthorityEntity authority;

    //복합키용 임베디드 아이디
    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MemberRoleId implements java.io.Serializable{
        private Long memberCode;
        private Integer authorityCode;
    }
}
