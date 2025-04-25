import {useState} from "react";
import RegisterCom from "../../components/member/RegisterCom";
import {useNavigate} from "react-router-dom";

export default function RegisterCon() {
    const [form, setForm] = useState({
        memberName: "",
        memberId: "",
        memberPassword: "",
        memberEmail: "",
        memberPhone: "",
    });
    const [errors, setErrors] = useState({});
    const [showPw, setShowPw] = useState(false);
    const [submitMsg, setSubmitMsg] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // === 약관동의 관련 상태 추가 ===
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [termsError, setTermsError] = useState("");


    //유효성 검사
    const validate = (field, value) => {
        switch (field) {
            case "memberName":
                if (!value) {
                    return "이름을 입력하세요";
                }
                if (value.length < 2) {
                    return "이름은 2자 이상이어야 합니다.";
                }
                break;
            case "memberId":
                if (!/^[a-zA-Z0-9_]{4,20}$/.test(value)) {
                    return "아이디는 4~20자의 영문/숫자/_(언더바)만 가능합니다.";
                }
                break;
            case "memberPassword":
                if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value) || value.length < 4) {
                    return "비밀번호는 4자리 이상, 영문과 숫자를 포함해야 합니다.";
                }
                break;
            case "memberEmail":
                if (!/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(value)) {
                    return "이메일 형식이 올바르지 않습니다.";
                }
                break;
            case "memberPhone":
                if (!/^01[0|1|6|7|8|9]-\d{3,4}-\d{4}$/.test(value)) {
                    return "휴대폰 번호는 '010-1234-5678' 형식으로 입력해주세요.";
                }
                break;
            default:
                break;
        }
        return null;
    };

    // 입력 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));

        setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
    };

    // 약관동의 체크박스 변경 핸들러
    const handleAgreeTerms = (e) => {
        setAgreeTerms(e.target.checked);
        // 동의 시 에러 메시지 삭제
        if (e.target.checked) setTermsError("");
    };


    // 전체 폼 검사
    const isFormValid = () => {
        const fieldNames = Object.keys(form);
        let isValid = true;
        const newErrors = {};
        fieldNames.forEach(field => {
            const error = validate(field, form[field]);
            if (error) {
                isValid = false;
                newErrors[field] = error;
            }
        });
        setErrors(newErrors);
        return isValid;
    };

    // 비밀번호 보기/숨기기 토글
    const handleTogglePw = () => setShowPw(prev => !prev);

    const navigate = useNavigate();


    // 폼 제출
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitMsg("");
        setTermsError("");

        if (!agreeTerms) {
            setTermsError("약관에 동의해야 회원가입이 가능합니다.");
            return;
        }
        if (!isFormValid()) return;

        setIsSubmitting(true);
        try {
            const res = await fetch("http://localhost:8080/member/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            if (!res.ok) {
                const msg = await res.text();
                setSubmitMsg(msg || "회원가입에 실패했습니다.");
            } else {
                setSubmitMsg("회원가입이 완료되었습니다!");
                setForm({
                    memberName: "",
                    memberId: "",
                    memberPassword: "",
                    memberEmail: "",
                    memberPhone: "",
                });
                window.alert("회원가입이 성공적으로 완료되었습니다!");
                navigate("/"); // 메인페이지 경로

            }
        } catch (error) {
            setSubmitMsg("서버 오류가 발생했습니다. 잠시 후 시도해주세요.");
        }
        setIsSubmitting(false);
    };

    return (
        <RegisterCom
            form={form}
            errors={errors}
            showPw={showPw}
            submitMsg={submitMsg}
            isSubmitting={isSubmitting}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onTogglePw={handleTogglePw}
            agreeTerms={agreeTerms}
            onAgreeTerms={handleAgreeTerms}
            termsError={termsError}

        />
    );
}
