import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import kakaoLoginImg from "../../components/member/img/kakao_login.png";
import googleLoginImg from "../../components/member/img/google_login.png";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    padding: 70px 0 60px 0;
    min-height: 520px;
    background: #fff;

`;

const Title = styled.h2`
    font-size: 2.2rem;
    margin-bottom: 36px;
    font-weight: 700;
    letter-spacing: -1px;
    color: #22223b;
`;

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
`;

const NormalBtn = styled.button`
    width: 100%;
    max-width: 340px;
    padding: 12px;
    background: #496af2;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 1.08rem;
    font-weight: bold;
    margin-top: 8px;
    cursor: pointer;
    box-shadow: 0 4px 17px 0 #709dff22;
    transition: background 0.18s, transform 0.13s;
    &:hover {
        background: linear-gradient(90deg, #3b32c6 0%, #658ce6 100%);
        transform: translateY(-2px) scale(1.03);
    }
`;


const KakaoBtnWrap = styled.div`
    width: 270px;
    position: relative;
    display: flex; justify-content: center;
    &:before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 12px;
        background: #fae10044;
        z-index: 0;
        filter: blur(6px);
        opacity: 0.7;
        transition: opacity 0.2s;
    }
    &:hover:before {
        opacity: 1;
        filter: blur(10px);
    }
`;

const KakaoBtn = styled.img`
    cursor: pointer;
    width: 270px;
    border-radius: 12px;
    border: 2px solid #fae100;
    background: #fffbe7;
    box-shadow: 0 2px 14px 0 #fae10050;
    transition: box-shadow 0.16s, filter 0.18s;
    position: relative;
    z-index: 1;
    &:hover {
        box-shadow: 0 6px 24px 0 #fae10070;
        filter: brightness(0.96);
    }
`;


const Tip = styled.div`
    margin-top: 40px;
    color: #6d7993;
    font-size: 1.02rem;
    background: #f4f9ff;
    padding: 13px 20px;
    border-radius: 9px;
    box-shadow: 0 1px 7px #709dff18;
`;

const MethodBox = styled.div`
    width: 100%;
    max-width: 450px;
    margin: 0 auto;
    padding: 36px 24px 32px 24px;
    background: #fff;
    border: 1px solid #eee;
    border-radius: 10px;
    box-shadow: 0 2px 18px #dbeafe13;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const GoogleBtnWrap = styled.div`
    width: 270px;
    position: relative;
    display: flex; justify-content: center;
    margin-bottom: 4px;
`;

const GoogleBtn = styled.img`
    cursor: pointer;
    width: 270px;
    height: 48px;
    border-radius: 12px;
    border: 2px solid #e0e0e0;
    background: #fff;
    box-shadow: 0 2px 14px 0 #e0e0e060;
    transition: box-shadow 0.16s, filter 0.18s;
    position: relative;
    z-index: 1;
    &:hover {
        box-shadow: 0 6px 24px 0 #bdbdbd90;
        filter: brightness(0.97);
    }
`;



function RegisterMethodSelectCom() {
    const navigate = useNavigate();

    // 카카오 로그인 redirect
    const handleKakaoLogin = () => {
        window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=14194a0a23cf74ec0bc6c0b2ba676489&redirect_uri=http://localhost:3000/oauth/kakao/callback&prompt=login`
            .replace(/\s+/g, '');
    }
    // 구글 로그인 redirect
    const handleGoogleLogin = () => {
        const GOOGLE_CLIENT_ID = "981822033334-r6u3d855k6gds83h9dtd8p327m6bfcu3.apps.googleusercontent.com";
        const GOOGLE_REDIRECT_URI = "http://localhost:3000/oauth/google/callback";

        const oauthUrl =
            `https://accounts.google.com/o/oauth2/v2/auth?` +
            `response_type=code&` +
            `client_id=${GOOGLE_CLIENT_ID}&` +
            `redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}&` +
            `scope=openid%20email%20profile&` +
            `access_type=offline&` +
            `prompt=consent`;

        window.location.href = oauthUrl;
    };



    return (
        <Wrapper>
            <MethodBox>
            <Title>회원가입 방식을 선택하세요</Title>
            <ButtonGroup>
                <NormalBtn onClick={() => navigate("/register")}>일반 회원가입</NormalBtn>
                <KakaoBtnWrap>
                    <KakaoBtn src={kakaoLoginImg} alt="카카오로 시작하기" onClick={handleKakaoLogin} />
                </KakaoBtnWrap>
                <GoogleBtnWrap>
                    <GoogleBtn
                        src={googleLoginImg}
                        alt="구글로 시작하기"
                        onClick={handleGoogleLogin}
                    />
                </GoogleBtnWrap>
            </ButtonGroup>
            <Tip>
                원하는 방식으로 회원가입 및 로그인이 가능합니다.<br/>
            </Tip>
            </MethodBox>
        </Wrapper>
    )
}
export default RegisterMethodSelectCom;