import React from "react";
import {
    containerStyle,
    sidebarStyle,
    profileBoxStyle,
    profileInfoStyle,
    profileImageStyle,
    greetingText,
    infoBoxStyle,
    mainStyle,
    infoFieldsGrid,
    infoFieldCard,
    infoFieldLabelRow,
    infoFieldValue,
    followInfoBoxStyle,
    followSectionTitleStyle,
    followListContainerStyle,
    followListWrapperStyle,
    followListTitleStyle,
    followListStyle,
    followItemStyle,
    followItemImageStyle,
    followItemNameStyle,
    noFollowDataStyle
} from '../../style/member/AdminMyPageStyle';
import { FaUser, FaPhone, FaEnvelope, FaIdCard } from "react-icons/fa6";
import AdminSideBarPage from "../../pages/common/AdminSideBarPage";

const DEFAULT_PROFILE_IMAGE = "/img/default-profile.jpg";

function AdminMyPageCom({ memberData, followingList, followerList }) {
    if (!memberData) return <div>로딩중...</div>;

    const phoneMasked = memberData.memberPhone?.replace(/(\d{3})\d{2,3}(\d{3,4})/, '$1****$2');
    const emailMasked = memberData.memberEmail?.replace(/(.{2}).*(@.*)/, '$1***$2');

    const renderFollowList = (list, title) => {
        if (!list || list.length === 0) {
            return <div style={noFollowDataStyle}>{title} 중인 사용자가 없습니다.</div>;
        }
        return (
            <ul style={followListStyle}>
                {list.map(user => (
                    <li key={user.memberCode} style={followItemStyle}>
                        <img
                            src={user.memberProfileImageUrl || DEFAULT_PROFILE_IMAGE}
                            alt={user.memberName}
                            style={followItemImageStyle}
                        />
                        <span style={followItemNameStyle}>{user.memberName}</span>
                    </li>
                ))}
            </ul>
        );
    };


    return (
        <div style={containerStyle}>
            {/* 사이드바 */}
            <aside style={sidebarStyle}>
                <AdminSideBarPage />
            </aside>

            {/* 본문 - 프로필/개인정보 */}
            <main style={mainStyle}>
                <div style={profileBoxStyle}>
                    <div style={profileInfoStyle}>
                        <img
                            src={memberData.memberProfileImageUrl || "/img/default-profile.jpg"}
                            alt="프로필 이미지"
                            style={profileImageStyle}
                        />
                        <div>
                            <div style={greetingText}>
                                {memberData.memberName} 님 ({memberData.memberRole})
                            </div>
                        </div>
                    </div>
                </div>
                <section style={infoBoxStyle}>
                    <div style={{ fontWeight: "bold", fontSize: '18px', marginBottom: 16 }}>개인 정보 (관리자)</div>
                    <div style={infoFieldsGrid}>
                        <div style={infoFieldCard}>
                            <div style={infoFieldLabelRow}><FaUser /> 이름</div>
                            <div style={infoFieldValue}>{memberData.memberName}</div>
                        </div>
                        <div style={infoFieldCard}>
                            <div style={infoFieldLabelRow}><FaIdCard /> 아이디</div>
                            <div style={infoFieldValue}>{memberData.memberId}</div>
                        </div>
                        <div style={infoFieldCard}>
                            <div style={infoFieldLabelRow}><FaEnvelope /> 이메일</div>
                            <div style={infoFieldValue}>{emailMasked}</div>
                        </div>
                        <div style={infoFieldCard}>
                            <div style={infoFieldLabelRow}><FaPhone /> 전화번호</div>
                            <div style={infoFieldValue}>{phoneMasked}</div>
                        </div>
                    </div>
                </section>

                {/* 팔로우/팔로워 정보 섹션 추가 */}
                <section style={followInfoBoxStyle}>
                    <div style={followSectionTitleStyle}>팔로우 정보</div>
                    <div style={followListContainerStyle}>
                        <div style={followListWrapperStyle}>
                            <div style={followListTitleStyle}>팔로잉 ({followingList?.length || 0}명)</div>
                            {renderFollowList(followingList, '팔로잉')}
                        </div>
                        <div style={followListWrapperStyle}>
                            <div style={followListTitleStyle}>팔로워 ({followerList?.length || 0}명)</div>
                            {renderFollowList(followerList, '팔로워')}
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}

export default AdminMyPageCom;
