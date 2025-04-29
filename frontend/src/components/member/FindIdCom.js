import React, { useState } from "react";
import axios from "axios";
import {
    FindIdRelativeContainer,
    FindIdCloseIconBtn,
    FindIdCloseBtn,
    FindIdTitle,
    FindIdForm,
    FindIdInputBox,
    FindIdLabelBox,
    FindIdLabelIconUser,
    FindIdLabelIconMail,
    FindIdLabel,
    FindIdInput,
    FindIdButton,
    ResultBox,
    ErrorMsg,
} from "../../style/member/FindIdStyle";

function FindIdCom({ onClose }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResult(""); setError("");
        if (!name.trim() || !email.trim()) {
            setError("이름과 이메일을 모두 입력하세요.");
            return;
        }
        setLoading(true);
        try {
            const resp = await axios.post("/member/find-id", {
                memberName: name,
                memberEmail: email
            });
            if (resp.data?.memberId) {
                setResult(`회원님의 아이디는 [${resp.data.memberId}] 입니다.`);
            } else {
                setError("일치하는 정보가 없습니다.");
            }
        } catch (err) {
            setError("조회 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <FindIdRelativeContainer>
            <FindIdCloseIconBtn onClick={onClose} aria-label="닫기">×</FindIdCloseIconBtn>
            <FindIdTitle>아이디 찾기</FindIdTitle>
            <FindIdForm onSubmit={handleSubmit}>
                <FindIdInputBox>
                    <FindIdLabelBox>
                        <FindIdLabelIconUser />
                        <FindIdLabel htmlFor="findid-name">이름</FindIdLabel>
                    </FindIdLabelBox>
                    <FindIdInput
                        id="findid-name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="이름을 입력하세요"
                        autoFocus
                    />
                </FindIdInputBox>
                <FindIdInputBox>
                    <FindIdLabelBox>
                        <FindIdLabelIconMail />
                        <FindIdLabel htmlFor="findid-email">이메일</FindIdLabel>
                    </FindIdLabelBox>
                    <FindIdInput
                        id="findid-email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="이메일을 입력하세요"
                    />
                </FindIdInputBox>
                {result && <ResultBox>{result}</ResultBox>}
                {error && <ErrorMsg>{error}</ErrorMsg>}
                <FindIdButton type="submit" disabled={loading}>
                    {loading ? "조회 중..." : "아이디 찾기"}
                </FindIdButton>
                <FindIdCloseBtn type="button" onClick={onClose}>
                    닫기
                </FindIdCloseBtn>
            </FindIdForm>
        </FindIdRelativeContainer>
    );
}

export default FindIdCom;