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
    PwClose
} from "../../style/member/FindPwByEmailStyle";

function EmailAuthCodeCom({
                              email,
                              code,
                              onCodeChange,
                              verifying,
                              verifyError,
                              verifySuccess,
                              onVerify,
                              onClose,
                          }) {
    return (
        <PwModalBox>
            <PwClose aria-label="닫기" onClick={onClose}>×</PwClose>
            <PwTitle>이메일 인증번호 확인</PwTitle>
            <PwDesc>
                {email}로 전송된 인증번호를 입력하세요.
            </PwDesc>
            <PwForm onSubmit={onVerify}>
                <PwInputRow>
                    <PwInput
                        type="text"
                        placeholder="인증번호 6자리"
                        value={code}
                        onChange={onCodeChange}
                        autoComplete="one-time-code"
                        disabled={verifying}
                        maxLength={10}
                    />
                </PwInputRow>
                {verifyError && <PwError>{verifyError}</PwError>}
                {verifySuccess && <div style={{ color: "#20c997", marginTop: "10px" }}>{verifySuccess}</div>}
                <PwSubmit type="submit" disabled={verifying || !code}>
                    {verifying ? "확인중..." : "확인"}
                </PwSubmit>
            </PwForm>
        </PwModalBox>
    );
}
export default EmailAuthCodeCom;