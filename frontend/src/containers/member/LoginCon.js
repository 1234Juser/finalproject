import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginCom from "../../components/member/LoginCom";
import Modal from "../../components/common/Modal";
import FindIdCon from "../member/FindIdCon";
import FindPwMethodSelectCom from "../../components/member/FindPwMethodSelectCom";
import FindPwCon from "./FindPwCon";
import FindPwByEmailCon from "./FindPwByEmailCon";


function LoginCon(){
    const [memberId, setMemberId] = useState("");
    const [memberPassword, setMemberPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    const [showFindId, setShowFindId] = useState(false);
    const [showFindPwMethod, setShowFindPwMethod] = useState(false);
    const [showFindPw, setShowFindPw] = useState(false);
    const [showFindPwByEmail, setShowFindPwByEmail] = useState(false);



    // 디버깅용: 비밀번호 입력될 때마다 출력
    useEffect(() => {
        console.log("현재 입력된 비밀번호:", memberPassword);
    }, [memberPassword]);

    //로그인 처리 핸들러
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setErrorMsg("");

        // 디버깅: 서버로 보낼 데이터 로그
        console.log("로그인 시도");
        console.log("입력된 ID:", memberId);
        console.log("입력된 PW:", memberPassword);

        try{
            const response = await axios.post("/member/login", {
                memberId,
                memberPassword
            });

            console.log("로그인 응답:", response.data);
            const {accessToken, memberName, memberProfileImageUrl, roles, memberCode} = response.data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("memberName", memberName);
            localStorage.setItem("memberProfileImageUrl", memberProfileImageUrl);
            localStorage.setItem("roles", JSON.stringify(roles));
            localStorage.setItem("memberCode", memberCode);
            localStorage.setItem("loginType", "local");


            //로그인 성공시 메인페이지로 이동
            navigate("/");

        } catch(err){
            console.error("로그인 에러:", err.response?.data || err.message);
            if(err.response && err.response.data){
                setErrorMsg("아이디 또는 비밀번호가 올바르지 않습니다.");
            }else{
                setErrorMsg("서버 오류가 발생했습니다.")
            }
        }
    };

    // 카카오 로그인 핸들러 추가
    const handleKakaoLogin = () => {
        window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=14194a0a23cf74ec0bc6c0b2ba676489&redirect_uri=http://localhost:3000/oauth/kakao/callback&prompt=login`
            .replace(/\s+/g, '');
    }
    // 구글 로그인 핸들러 추가
    const handleGoogleLogin = () => {
        const googleClientId = "981822033334-r6u3d855k6gds83h9dtd8p327m6bfcu3.apps.googleusercontent.com";
        const redirectUri = "http://localhost:3000/oauth/google/callback";
        const scope = "profile email";
        const authUrl =
            `https://accounts.google.com/o/oauth2/v2/auth` +
            `?client_id=${googleClientId}` +
            `&redirect_uri=${encodeURIComponent(redirectUri)}` +
            `&response_type=code` +
            `&scope=${encodeURIComponent(scope)}` +
            `&access_type=offline` +
            `&prompt=login`;
        window.location.href = authUrl;
    };



    return (
        <>
            <LoginCom
                memberId={memberId}
                memberPassword={memberPassword}
                onChangeId={e => setMemberId(e.target.value)}
                onChangePassword={e => setMemberPassword(e.target.value)}
                onSubmit={handleSubmit}
                errorMsg={errorMsg}
                onClickFindId={()=> setShowFindId(true)}
                onClickFindPw={()=> setShowFindPwMethod(true)}
                onClickRegister={()=> navigate("/registerselect")}
                onClickKakao={handleKakaoLogin}
                onClickGoogle={handleGoogleLogin}
            />
            {showFindId && (
                <Modal onClose={()=> setShowFindId(false)}>
                    <FindIdCon onClose={() => setShowFindId(false)}/>
                </Modal>
            )}
            {showFindPwMethod && (
                <FindPwMethodSelectCom
                    onSelectMethod={method =>{
                        if(method==="default"){
                            setShowFindPwMethod(false);
                            setShowFindPw(true);
                        }else if (method === "email-auth") {
                            setShowFindPwMethod(false);
                            setShowFindPwByEmail(true);
                        }
                    }}
                    onClose={()=> setShowFindPwMethod(false)}
                />
            )}
            {showFindPw &&(
                <Modal onClose={()=> setShowFindPw(false)}>
                    <FindPwCon onClose={()=> setShowFindPw(false)}/>
                </Modal>
            )}
            {showFindPwByEmail && (
                <Modal onClose={() => setShowFindPwByEmail(false)}>
                    <FindPwByEmailCon onClose={() => setShowFindPwByEmail(false)} />
                </Modal>
            )}

        </>
    );
}

export default LoginCon;