import React from "react";
import {
    PwModalBox,
    PwTitle,
    PwDesc,
    PwForm,
    PwInputRow,
    PwInput,
    PwSubmit,
    PwResult,
    PwError,
    PwClose,
    PwLabelIconUser,
    PwLabelIconId,
    PwLabelIconMail,
    PwLabelIconKey,
    PwCloseBtn
} from "../../style/member/FindPwStyle";

function FindPwCom({ form, onChange, onSubmit, loading, result, error, onClose }) {
    return (
        <PwModalBox>
            <PwClose aria-label="닫기" onClick={onClose}>×</PwClose>
            <PwTitle>
                <PwLabelIconKey /> 비밀번호 찾기
            </PwTitle>
            <PwDesc>
                회원정보를 입력하면 <b>임시 비밀번호</b>를 보내 드려요.
            </PwDesc>
            <PwForm onSubmit={onSubmit}>
                <div style={{display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '-6px'}}>
                    <PwLabelIconUser />
                    <span style={{fontWeight: 'bold'}}>이름</span>
                </div>
                <PwInputRow>
                        <PwInput
                        type="text"
                        name="name"
                        placeholder="이름을 입력하세요"
                        value={form.name}
                        onChange={onChange}
                        autoComplete="off"
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
                        value={form.id}
                        onChange={onChange}
                        autoComplete="off"
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
                        value={form.email}
                        onChange={onChange}
                        autoComplete="off"
                    />
                </PwInputRow>
                {result && <PwResult>{result}</PwResult>}
                {error && <PwError>{error}</PwError>}
                <PwSubmit type="submit" disabled={loading}>
                    {loading ? "처리중..." : "임시 비밀번호 발급"}
                </PwSubmit>
                <PwCloseBtn type="button" onClick={onClose}>
                    닫기
                </PwCloseBtn>
            </PwForm>
        </PwModalBox>
    );
}

export default FindPwCom;