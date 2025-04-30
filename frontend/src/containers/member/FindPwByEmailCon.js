import React, { useState } from "react";
import axios from "axios";
import FindPwByEmailCom from "../../components/member/FindPwByEmailCom";
import EmailAuthCodeCom from "../../components/member/EmailAuthCodeCom";
import ResetPwCom from "../../components/member/ResetPwCom";

function FindPwByEmailCon({ onClose }) {
    const [step, setStep] = useState("info"); // info, code, reset, done
    const [input, setInput] = useState({ name: "", id: "", email: "" });
    const [sending, setSending] = useState(false);
    const [sendDone, setSendDone] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // 인증코드 입력 상태
    const [code, setCode] = useState("");
    const [verifying, setVerifying] = useState(false);
    const [verifyError, setVerifyError] = useState("");
    const [verifySuccess, setVerifySuccess] = useState("");

    // 비밀번호 재설정 상태
    const [pw, setPw] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [pwError, setPwError] = useState("");
    const [pwSuccess, setPwSuccess] = useState("");
    const [pwSubmitting, setPwSubmitting] = useState(false);

    // 입력 정보
    const handleInputChange = e => {
        setInput({ ...input, [e.target.name]: e.target.value });
        setError(""); setSuccess("");
    };

    // 1단계: 인증메일 전송
    const handleSendAuth = async e => {
        e.preventDefault();
        setError(""); setSuccess("");
        if(!input.name || !input.id || !input.email){
            setError("모든 항목을 입력해주세요.");
            return;
        }
        setSending(true);
        try {
            await axios.post("/member/find-password/mail-auth", {
                memberName: input.name,
                memberId: input.id,
                memberEmail: input.email,
            });
            setSendDone(true);
            setSuccess("인증코드가 발송되었습니다.<br /> 메일을 확인해 주세요!");
            setTimeout(() => {
                setStep("code");
            }, 1000);
        } catch (err) {
            setError(
                err.response?.data?.message || "해당 정보를 가진 회원이 없거나, 서버 오류입니다."
            );
        } finally {
            setSending(false);
        }
    };

    // 2단계: 인증코드 검증
    const handleCodeChange = e => {
        setCode(e.target.value.replace(/[^0-9]/g, ''));
        setVerifyError(""); setVerifySuccess("");
    };

    const handleVerify = async e => {
        e.preventDefault();
        setVerifying(true);
        setVerifyError(""); setVerifySuccess("");
        try {
            const res = await axios.post("/member/find-password/verify-code", {
                memberEmail: input.email,
                authCode: code
            });
            if (res.data === true) {
                setVerifySuccess("인증에 성공했습니다!");
                setTimeout(()=>{
                    setStep("reset");
                }, 800);
            } else {
                setVerifyError("인증번호가 일치하지 않습니다.");
            }
        } catch (err) {
            setVerifyError(
                err.response?.data?.message || "인증번호 확인 중 오류가 발생했습니다."
            );
        } finally {
            setVerifying(false);
        }
    };

    // 3단계: 비밀번호 재설정
    const handlePwChange = e => {
        setPw(e.target.value);
        setPwError(""); setPwSuccess("");
    };
    const handleConfirmPwChange = e => {
        setConfirmPw(e.target.value);
        setPwError(""); setPwSuccess("");
    };
    const handleResetPw = async e => {
        e.preventDefault();
        setPwError(""); setPwSuccess("");
        if (!pw || !confirmPw){
            setPwError("모든 항목을 입력하세요");
            return;
        }
        if (pw !== confirmPw){
            setPwError("비밀번호가 일치하지 않습니다.");
            return;
        }
        if (pw.length < 4 || !/[0-9]/.test(pw) || !/[a-zA-Z]/.test(pw)){
            setPwError("비밀번호는 4자 이상, 영문+숫자를 포함해야 합니다.");
            return;
        }
        setPwSubmitting(true);
        try {
            const resp = await axios.post("/member/find-password/reset", {
                memberId: input.id,
                memberEmail: input.email,
                newPassword: pw
            });
            if (resp.data === true) {
                setPwSuccess("비밀번호가 성공적으로 재설정되었습니다.");
                setStep("done");
                setTimeout(()=>{
                    onClose();
                }, 1500);
            } else {
                setPwError("비밀번호 변경에 실패했습니다.");
            }
        } catch (err) {
            setPwError(err.response?.data?.message || "비밀번호 변경 중 오류가 발생했습니다.");
        } finally {
            setPwSubmitting(false);
        }
    };

    // 단계별 화면 전환
    if (step === "info") {
        return (
            <FindPwByEmailCom
                input={input}
                onInputChange={handleInputChange}
                sending={sending}
                sendDone={sendDone}
                onSendAuth={handleSendAuth}
                success={success}
                error={error}
                onClose={onClose}
            />
        );
    }
    if (step === "code") {
        return (
            <EmailAuthCodeCom
                email={input.email}
                code={code}
                onCodeChange={handleCodeChange}
                verifying={verifying}
                verifyError={verifyError}
                verifySuccess={verifySuccess}
                onVerify={handleVerify}
                onClose={onClose}
            />
        );
    }
    if (step === "reset") {
        return (
            <ResetPwCom
                pw={pw}
                confirmPw={confirmPw}
                onPwChange={handlePwChange}
                onConfirmPwChange={handleConfirmPwChange}
                onSubmit={handleResetPw}
                error={pwError}
                success={pwSuccess}
                submitting={pwSubmitting}
                onClose={onClose}
            />
        );
    }
    // 마지막 알림 후 자동 닫힘
    if (step === "done") {
        return (
            <div style={{ padding: 40, textAlign: "center" }}>
                <div style={{ fontSize: 18, color: "#20c997" }}>
                    비밀번호 재설정이 완료되었습니다.<br />잠시 후 창이 닫힙니다.
                </div>
            </div>
        );
    }
}

export default FindPwByEmailCon;