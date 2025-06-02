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

    // === 아이디/이메일 중복상태 ===
    const [idChecked, setIdChecked] = useState(null);
    const [emailChecked, setEmailChecked] = useState(null);

    // 중복체크 성공 메시지 상태 추가
    const [idSuccessMsg, setIdSuccessMsg] = useState("");
    const [emailSuccessMsg, setEmailSuccessMsg] = useState("");





    //유효성 검사
    const validate = (field, value) => {
        switch (field) {
            case "memberName":
                if (!value) {
                    return "이름을 입력하세요";
                }
                if (value.length < 2 || value.length > 6) {
                    return "이름은 2자 이상 6자 이하여야 합니다.";
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

        // 아이디/이메일 입력값이 바뀌면 중복체크 상태 초기화
        if (name === "memberId") {
            setIdChecked(null);
            setIdSuccessMsg("");


        }
        if (name === "memberEmail") {
            setEmailChecked(null);
            setEmailSuccessMsg("");


        }

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
    //아이디 중복체크
    const handleCheckId = async ()=>{
        setIdSuccessMsg(""); // 체크시 일단 초기화
        if(!form.memberId){
            setErrors(prev => ({...prev, memberId: "아이디를 입력하세요."}));
            return;
        }
        try{
            const res = await fetch("https://api.hellotravelogic.link/member/check-id",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({memberId:form.memberId})
            });
            const exists = await res.json();
            setIdChecked(exists);
            setErrors(prev =>({
                ...prev,
                memberId: exists? "이미 사용중인 아이디입니다" : ""
            }));

            if(!exists) {
                setIdSuccessMsg("사용 가능한 아이디입니다.");


            } else {
                setIdSuccessMsg(""); // 사용불가면 메세지 없음

            }

        }catch(e){
            setErrors(prev => ({
                ...prev,
                memberId: "네트워크 오류"
            }));
        }
    };

    //이메일 중복 체크
    const handleCheckEmail = async ()=>{
        setEmailSuccessMsg(""); // 체크시 일단 초기화
        if(!form.memberEmail){
            setErrors(prev=>({...prev, memberEmail: "이메일을 입력하세요"}));
            return;
        }
        // 추가: 이메일 형식검증
        if (!/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(form.memberEmail)) {
            setErrors(prev => ({...prev, memberEmail: "이메일 형식이 올바르지 않습니다."}));
            return;
        }
            try {
            const res = await fetch("https://api.hellotravelogic.link/member/check-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ memberEmail: form.memberEmail })
            });
            const exists = await res.json();
            setEmailChecked(!exists);
            setErrors(prev => ({
                ...prev,
                memberEmail: exists ? "이미 사용중인 이메일입니다" : ""
            }));

            if(!exists) {
                setEmailSuccessMsg("사용 가능한 이메일입니다.");

            } else {
                setEmailSuccessMsg("");

            }

        } catch (e) {
            setErrors(prev => ({
                ...prev,
                memberEmail: "네트워크 오류"
            }));
        }
    };

    // 비밀번호 보기/숨기기 토글
    const handleTogglePw = () => setShowPw(prev => !prev);

    const navigate = useNavigate();


    // 폼 제출
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitMsg("");
        setTermsError("");
        //약관동의 안할시 불가
        if (!agreeTerms) {
            setTermsError("약관에 동의해야 회원가입이 가능합니다.");
            return;
        }
        if (!isFormValid()) return;



        setIsSubmitting(true);
        try {
            const res = await fetch("https://api.hellotravelogic.link/member/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            if (!res.ok) {
                const msg = await res.text();

                // 여기서 오류 메시지 짧게 가공
                let shortMsg = msg;
                if (msg.includes("아이디")) shortMsg = "이미 사용중인 아이디입니다";
                if (msg.includes("이메일")) shortMsg = "이미 사용중인 이메일입니다";


                setSubmitMsg(shortMsg || "회원가입에 실패했습니다.");
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
            onCheckId={handleCheckId}
            onCheckEmail={handleCheckEmail}
            idSuccessMsg={idSuccessMsg}
            emailSuccessMsg={emailSuccessMsg}
            isIdChecked={idChecked}
            isEmailChecked={emailChecked}
        />
    );
}
