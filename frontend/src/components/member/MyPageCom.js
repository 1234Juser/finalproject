import React, {useEffect, useRef, useState} from 'react';
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
    mainStyle,  popupOverlay, editPopupCard, closeEditBtn, fieldLabel, fieldRow, editInput, editErrorTxt, saveBtn, cancelBtn,
    infoFieldsGrid,
    infoFieldCard,
    infoFieldLabelRow,
    infoFieldValue,
    iconWrapper,
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
} from '../../style/member/MyPageStyle';

import { FaUser, FaPhone, FaLock, FaEnvelope, FaIdCard} from "react-icons/fa6";
import { SiKakaotalk} from "react-icons/si";
import { FaGoogle } from "react-icons/fa6";   // 구글 아이콘 추가

const DEFAULT_PROFILE_IMAGE = "/img/default-profile.jpg";


function MyPageCom({ memberData, followingList, followerList, onEditProfileImage, onEditInfo,  onKakaoUnlink, onGoogleUnlink }) {

    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState(memberData);

    const [errors, setErrors] = useState({});
    // 포커스 시 border 색 변환용
    const [focus, setFocus] = useState("");
    const fileInputRef = useRef(null);

    // useEffect(() => {
    //     setForm(memberData); // memberData 변경시 폼도 갱신
    //     console.log(memberData); // socialType 존재여부/값 확인
    // }, [memberData]);

    useEffect(() => {
        if (editMode) {
            setForm(f => ({
                ...f,
                currentPassword: '',
                newPassword: ''
            }));
            setErrors({});
        }
    }, [editMode]);


    if (!memberData) return <div>로딩중...</div>;
    //카카오 소셜로그인 여부
    const isKakaoUser = memberData?.socialType === "kakao";
    const isGoogleUser = memberData?.socialType === "google"; // 구글 소셜 여부


    // 마스킹 처리
    const phoneMasked = memberData.memberPhone?.replace(/(\d{3})\d{2,3}(\d{3,4})/, '$1****$2');
    const emailMasked = memberData.memberEmail?.replace(/(.{2}).*(@.*)/, '$1***$2');

    // 검증 예시
    const validate = () => {
        let errs = {};
        if (
            (!form.memberName || form.memberName === memberData.memberName) &&
            (!form.memberPhone || form.memberPhone === memberData.memberPhone) &&
            !form.newPassword
        ) {
            errs.noChange = "변경할 항목을 입력하세요.";
        }
        if (form.memberName && (form.memberName.trim().length < 2 || form.memberName.trim().length > 6)) {
            errs.memberName = "이름은 2자 이상 6자 이하여야 합니다.";
        }
        if (!form.memberPhone.match(/^01[016789]-?\d{3,4}-?\d{4}$/))
            errs.memberPhone = "올바른 휴대폰 번호를 입력하세요.";
        // 현재 비밀번호: 비밀번호 변경시만 필수
        if (form.newPassword) {
            if (!form.currentPassword) {
                errs.currentPassword = "현재 비밀번호를 입력하세요.";
            }
            if (form.newPassword.length < 4) {
                errs.newPassword = "새 비밀번호는 4자 이상 입력";
            }
        }
        // 현재 비밀번호 입력한 경우만 최소길이
        if (form.currentPassword && form.currentPassword.length < 4) {
            errs.currentPassword = "비밀번호는 4자 이상 입력";
        }
        return errs;
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };
    const handleFocus = e => setFocus(e.target.name);
    const handleBlur = () => setFocus("");

    const handleEditClick = () => setEditMode(true);

    const handleCancel = () => {
        setForm(memberData); // 취소 시 원래 정보로 복구
        setEditMode(false);

    };

    const handleSubmit = e => {
        e.preventDefault();
        // 수정 요청(axios 등) 구현 필요: 현재비밀번호/새비밀번호, 이름, 전화 등
        const v = validate();
        if(Object.keys(v).length) { setErrors(v); return; }
        onEditInfo(form);
        setEditMode(false);
        setErrors({});
    };


    const handleProfileImageBtnClick = () => {
        if(fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    //파일선택시
    const handleChangeProfileImg = (e)=>{
        const file = e.target.files[0];
        if(file){
            onEditProfileImage(file);
        }
    };

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
                            <div style={greetingText}>{memberData.memberName} 님, 환영합니다!
                                {/*카카오 연동뱃지*/}
                                {isKakaoUser &&(
                                    <span style={{
                                        marginLeft: 10,
                                        display: "inline-flex",
                                        alignItems: "center",
                                        background: "#fee500",
                                        color: "#181600",
                                        borderRadius: "12px",
                                        fontWeight: "bold",
                                        fontSize: "15px",
                                        padding: "2px 12px",
                                        gap: "6px"
                                    }}>
                                        <SiKakaotalk style={{ fontSize: "18px" }} />
                                        카카오로그인 연동중인 계정
                                    </span>
                                )}
                                {/* 구글 연동뱃지 */}
                                {isGoogleUser && (
                                    <span style={{
                                        marginLeft: 10,
                                        display: "inline-flex",
                                        alignItems: "center",
                                        background: "#fff",
                                        color: "#181600",
                                        borderRadius: "12px",
                                        fontWeight: "bold",
                                        fontSize: "15px",
                                        border: "1px solid #dadce0",
                                        padding: "2px 12px",
                                        gap: "6px"
                                    }}>
                                    <FaGoogle style={{ fontSize: "18px", color: "#ea4335" }} />
                                    구글로그인 연동중인 계정
                                </span>
                                )}
                            </div>
                            <button style={profileButton} onClick={handleProfileImageBtnClick}
                            type = "button">프로필 이미지 변경</button>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                ref={fileInputRef}
                                onChange={handleChangeProfileImg}
                            />
                        </div>
                    </div>
                </div>
                <section style={infoBoxStyle}>
                    <div style={{fontWeight:"bold", fontSize: '18px', marginBottom:16}}>개인 정보</div>
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
                    <div>
                        <button style={profileButton} onClick={handleEditClick}>개인정보 수정</button>
                    </div>

                    <div>
                        {isKakaoUser && (
                            <button style={{...profileButton, background: "#fee500", color:"#181600", marginTop: 12}}
                                    onClick={onKakaoUnlink}
                                    type="button">
                                카카오 연동 해제
                            </button>
                            )}
                        {isGoogleUser && (
                            <button
                                style={{...profileButton, background: "#fff", color: "#ea4335", border: "1px solid #dadce0", marginTop: 12}}
                                onClick={onGoogleUnlink}
                                type="button">
                                구글 연동 해제
                            </button>
                        )}
                    </div>
                </section>
                {/* 팔로우 정보 섹션 추가 */}
                <section style={followInfoBoxStyle}>
                    <div style={followSectionTitleStyle}>팔로우 정보</div>
                    <div style={followListContainerStyle}>
                        <div style={followListWrapperStyle}>
                            <h3 style={followListTitleStyle}>팔로잉 ({followingList.length})</h3>
                            {renderFollowList(followingList, "팔로잉")}
                        </div>
                        <div style={followListWrapperStyle}>
                            <h3 style={followListTitleStyle}>팔로워 ({followerList.length})</h3>
                            {renderFollowList(followerList, "팔로워")}
                        </div>
                    </div>
                </section>

            </main>

            {/* 수정 모달 */}
            {editMode && (
                <div style={popupOverlay}>
                    <form style={editPopupCard} onSubmit={handleSubmit} autoComplete="off">
                        <button style={closeEditBtn} onClick={handleCancel} tabIndex={-1} type="button">&times;</button>
                        <div style={{fontWeight:700, fontSize:'21px', marginBottom:14, letterSpacing:"-.5px", textAlign: "center"}}>개인정보 수정</div>

                        <div style={fieldRow}>
                            <span style={iconWrapper}><FaUser color="#7747e8"/></span>
                            <div style={{flex:'1'}}>
                                <label style={fieldLabel} htmlFor="editMemberName">이름</label>
                                <input
                                    id="editMemberName"
                                    style={{...editInput, ...(focus==="memberName" ? {border:"1.7px solid #7747e8", background:"#f6f4ff"}:{})}}
                                    name="memberName"
                                    value={form.memberName}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    maxLength={20}
                                    placeholder="이름을 입력"
                                />
                                {errors.memberName && <div style={editErrorTxt}>{errors.memberName}</div>}
                            </div>
                        </div>
                        <div style={fieldRow}>
                            <span style={iconWrapper}><FaPhone color="#7747e8"/></span>
                            <div style={{flex:'1'}}>
                                <label style={fieldLabel} htmlFor="editMemberPhone">전화번호</label>
                                <input
                                    id="editMemberPhone"
                                    style={{...editInput, ...(focus==="memberPhone" ? {border:"1.7px solid #7747e8", background:"#f6f4ff"}:{})}}
                                    name="memberPhone"
                                    value={form.memberPhone}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    maxLength={16}
                                    placeholder="예: 010-1234-5678"
                                />
                                {errors.memberPhone && <div style={editErrorTxt}>{errors.memberPhone}</div>}
                            </div>
                        </div>
                        <div style={fieldRow}>
                            <span style={iconWrapper}><FaLock color="#7747e8"/></span>
                            <div style={{flex:'1'}}>
                                <label style={fieldLabel} htmlFor="editCurPwd">현재 비밀번호</label>
                                <input
                                    id="editCurPwd"
                                    type="password"
                                    style={{...editInput, ...(focus==="currentPassword" ? {border:"1.7px solid #7747e8", background:"#f6f4ff"}:{})}}
                                    name="currentPassword"
                                    value={form.currentPassword}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    autoComplete="new-password"
                                    placeholder={form.newPassword ? "필수 입력" : "비밀번호 변경시만 입력"}
                                    required={!!form.newPassword}
                                />
                                {errors.currentPassword && <div style={editErrorTxt}>{errors.currentPassword}</div>}
                            </div>
                        </div>
                        <div style={fieldRow}>
                            <span style={iconWrapper}><FaLock color="#bbb"/></span>
                            <div style={{flex:'1'}}>
                                <label style={fieldLabel} htmlFor="editNewPwd">새 비밀번호</label>
                                <input
                                    id="editNewPwd"
                                    type="password"
                                    style={{...editInput, ...(focus==="newPassword" ? {border:"1.7px solid #7747e8", background:"#f6f4ff"}:{})}}
                                    name="newPassword"
                                    value={form.newPassword}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    autoComplete="new-password"
                                    placeholder="4자 이상(미입력시 비번변경X)"
                                />
                                {errors.newPassword && <div style={editErrorTxt}>{errors.newPassword}</div>}
                            </div>
                        </div>
                        <div style={{marginTop: '12px', textAlign: "center"}}>
                            <button style={saveBtn} type="submit">저장</button>
                            <button style={cancelBtn} type="button" onClick={handleCancel}>취소</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default MyPageCom;

