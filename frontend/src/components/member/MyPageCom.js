import React, {useState} from 'react';
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
    infoFieldValue
} from '../../style/member/MyPageStyle';
import { FaUser, FaPhone, FaLock, FaEnvelope, FaIdCard} from "react-icons/fa6";



function MyPageCom({ memberData, onEditProfileImage, onEditInfo }) {

    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({
        memberName: memberData?.memberName || "",
        memberPhone: memberData?.memberPhone || "",
        currentPassword: "",
        newPassword: ""
    });
    const [errors, setErrors] = useState({});
    // 포커스 시 border 색 변환용
    const [focus, setFocus] = useState("");
    if (!memberData) return <div>로딩중...</div>;

    // 마스킹 처리
    const phoneMasked = memberData.memberPhone?.replace(/(\d{3})\d{2,3}(\d{3,4})/, '$1****$2');
    const emailMasked = memberData.memberEmail?.replace(/(.{2}).*(@.*)/, '$1***$2');



    // 검증 예시
    const validate = () => {
        let errs = {};
        if (!form.memberName.trim()) errs.memberName = "이름을 입력해주세요.";
        if (!form.memberPhone.match(/^01[016789]-?\d{3,4}-?\d{4}$/))
            errs.memberPhone = "올바른 휴대폰 번호를 입력하세요.";
        if (!form.currentPassword)
            errs.currentPassword = "현재 비밀번호를 입력하세요.";
        else if (form.currentPassword.length < 4)
            errs.currentPassword = "비밀번호는 4자 이상 입력";
        if (form.newPassword && form.newPassword.length < 4)
            errs.newPassword = "새 비밀번호는 4자 이상 입력";
        return errs;
    };


    const handleChange = e => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };
    const handleFocus = e => setFocus(e.target.name);
    const handleBlur = () => setFocus("");

    const handleEditClick = () => setEditMode(true);

    const handleCancel = () => setEditMode(false);

    const handleSubmit = e => {
        e.preventDefault();
        // 수정 요청(axios 등) 구현 필요: 현재비밀번호/새비밀번호, 이름, 전화 등
        const v = validate();
        if(Object.keys(v).length) { setErrors(v); return; }
        onEditInfo(form);
        setEditMode(false);
        setErrors({});
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
                            <div style={greetingText}>{memberData.memberName} 님, 환영합니다!</div>
                            <button style={profileButton} onClick={onEditProfileImage}>프로필 이미지 변경</button>
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
                </section>

            </main>

            {/* 수정 모달 */}
            {editMode && (
                <div style={popupOverlay}>
                    <form style={editPopupCard} onSubmit={handleSubmit} autoComplete="off">
                        <button style={closeEditBtn} onClick={handleCancel} tabIndex={-1} type="button">&times;</button>
                        <div style={{fontWeight:700, fontSize:'21px', marginBottom:14, letterSpacing:"-.5px"}}>개인정보 수정</div>

                        <div style={fieldRow}>
                            <span><FaUser color="#7747e8"/></span>
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
                                    required
                                    placeholder="이름을 입력"
                                />
                                {errors.memberName && <div style={editErrorTxt}>{errors.memberName}</div>}
                            </div>
                        </div>
                        <div style={fieldRow}>
                            <span><FaPhone color="#7747e8"/></span>
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
                                    required
                                    placeholder="예: 010-1234-5678"
                                />
                                {errors.memberPhone && <div style={editErrorTxt}>{errors.memberPhone}</div>}
                            </div>
                        </div>
                        <div style={fieldRow}>
                            <span><FaLock color="#7747e8"/></span>
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
                                    placeholder="필수 입력"
                                    required
                                />
                                {errors.currentPassword && <div style={editErrorTxt}>{errors.currentPassword}</div>}
                            </div>
                        </div>
                        <div style={fieldRow}>
                            <span><FaLock color="#bbb"/></span>
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


