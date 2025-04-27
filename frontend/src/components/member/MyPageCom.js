import React from 'react';
import MyPageSideBarPage from "../../pages/common/MyPageSideBarPage";
import {
    containerStyle,
    sidebarStyle,
    profileBoxStyle,
    profileInfoStyle,
    profileImageStyle,
    greetingText,
    profileButton,
    infoBoxStyle,
    mainStyle,
} from '../../style/member/MyPageStyle';



function MyPageCom({ memberData, onEditProfileImage, onEditInfo }) {
    if (!memberData) return <div>로딩중...</div>;

    // 마스킹 처리
    const phoneMasked = memberData.memberPhone?.replace(/(\d{3})\d{2,3}(\d{3,4})/, '$1****$2');
    const emailMasked = memberData.memberEmail?.replace(/(.{2}).*(@.*)/, '$1***$2');

    return (
        <div style={containerStyle}>
            {/* 왼쪽: 사이드바만 */}
            <aside style={sidebarStyle}>
                <MyPageSideBarPage />
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
                            <div style={greetingText}>{memberData.memberName} 님, 환영합니다!</div>
                            <button style={profileButton} onClick={onEditProfileImage}>프로필 이미지 변경</button>
                        </div>
                    </div>
                </div>
                <section style={infoBoxStyle}>
                    <div style={{fontWeight:"bold", fontSize: '18px', marginBottom:12}}>개인 정보</div>
                    <div style={{marginBottom:8}}><b>아이디</b> : {memberData.memberId}</div>
                    <div style={{marginBottom:8}}><b>이메일</b> : {emailMasked}</div>
                    <div style={{marginBottom:8}}><b>전화번호</b> : {phoneMasked}</div>
                    <div>
                        <button style={profileButton} onClick={onEditInfo}>개인정보 수정</button>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default MyPageCom;

