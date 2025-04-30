import React from "react";
import {
    PwModalBox,
    PwTitle,
    PwDesc,
    PwForm,
    PwInputRow,
    PwInput,
    PwSubmit,
    PwError,
    PwClose,
    PwLabelIconUser,
    PwLabelIconId,
    PwLabelIconMail,
    PwLabelIconKey,
    PwCloseBtn
} from "../../style/member/FindPwByEmailStyle";

function FindPwByEmailCom({ input, onInputChange, sending, sendDone, onSendAuth, success, error, onClose }) {
    return (
        <PwModalBox>
            <PwClose aria-label="닫기" onClick={onClose}>×</PwClose>
            <PwTitle>
                <PwLabelIconKey /> 비밀번호 찾기
            </PwTitle>
            <PwDesc>
                회원정보를 입력하면 <b>이메일 인증번호</b>를 보내 드려요.
            </PwDesc>
            <PwForm onSubmit={onSendAuth}>
                <div style={{display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '-6px'}}>
                    <PwLabelIconUser />
                    <span style={{fontWeight: 'bold'}}>이름</span>
                </div>
                <PwInputRow>
                    <PwInput
                        type="text"
                        name="name"
                        placeholder="이름을 입력하세요"
                        value={input.name}
                        onChange={onInputChange}
                        autoComplete="off"
                        disabled={sendDone}
                    />
                </PwInputRow>
                <div style={{display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '-6px'}}>
                    <PwLabelIconId />
                    <span style={{fontWeight: 'bold'}}>아이디</span>
                </div>
                <PwInputRow>
                    <PwInput
                        type="text"
                        name="id"
                        placeholder="아이디를 입력하세요"
                        value={input.id}
                        onChange={onInputChange}
                        autoComplete="off"
                        disabled={sendDone}
                    />
                </PwInputRow>
                <div style={{display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '-6px'}}>
                    <PwLabelIconMail />
                    <span style={{fontWeight: 'bold'}}>이메일</span>
                </div>
                <PwInputRow>
                    <PwInput
                        type="email"
                        name="email"
                        placeholder="이메일을 입력하세요"
                        value={input.email}
                        onChange={onInputChange}
                        autoComplete="off"
                        disabled={sendDone}
                    />
                </PwInputRow>
                {success && (<div style={{ color: "#20c997", fontWeight: "bold", fontSize: "1.03rem", marginTop: "14px" }}
                dangerouslySetInnerHTML={{__html:success}}></div>)}
                {error && <PwError>{error}</PwError>}
                <PwSubmit type="submit" disabled={sending || sendDone}>
                    {sending ? "전송중..." : "이메일로 인증번호 받기"}
                </PwSubmit>
                <PwCloseBtn type="button" onClick={onClose}>
                    닫기
                </PwCloseBtn>
            </PwForm>
        </PwModalBox>
    );
}
export default FindPwByEmailCom;