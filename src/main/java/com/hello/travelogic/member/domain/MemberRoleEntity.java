package com.hello.travelogic.member.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="tbl_member_role")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberRoleEntity {

    @EmbeddedId
    private MemberRoleId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("memberCode")
    @JoinColumn(name="member_code")
    private MemberEntity member;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("authorityCode")
    @JoinColumn(name="authority_code")
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
