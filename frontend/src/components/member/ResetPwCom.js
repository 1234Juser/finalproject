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

function ResetPwCom({
                        pw,
                        confirmPw,
                        onPwChange,
                        onConfirmPwChange,
                        onSubmit,
                        error,
                        success,
                        onClose,
                        submitting
                    }) {
    return (
        <PwModalBox>
            <PwClose aria-label="닫기" onClick={onClose}>×</PwClose>
            <PwTitle>비밀번호 재설정</PwTitle>
            <PwDesc>새 비밀번호를 입력하세요.</PwDesc>
            <PwForm onSubmit={onSubmit}>
                <PwInputRow>
                    <PwInput
                        type="password"
                        name="newPw"
                        placeholder="새 비밀번호"
                        value={pw}
                        onChange={onPwChange}
                        autoComplete="new-password"
                        disabled={submitting}
                    />
                </PwInputRow>
                <PwInputRow>
                    <PwInput
                        type="password"
                        name="confirmPw"
                        placeholder="새 비밀번호 확인"
                        value={confirmPw}
                        onChange={onConfirmPwChange}
                        autoComplete="new-password"
                        disabled={submitting}
                    />
                </PwInputRow>
                {error && <PwError>{error}</PwError>}
                {success && <div style={{ color: "#20c997", marginTop: "12px" }}>{success}</div>}
                <PwSubmit type="submit" disabled={submitting}>
                    {submitting ? "변경중..." : "비밀번호 변경"}
                </PwSubmit>
            </PwForm>
        </PwModalBox>
    );
}
export default ResetPwCom;