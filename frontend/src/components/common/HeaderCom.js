import styled from 'styled-components';
import {WrapBlock, StyledHeader, StyledTitle} from "../../style/StyleSet";
import {Link, useLocation, useNavigate} from "react-router-dom";
import NavCom from "./NavCom";
import { useEffect, useState } from "react";


// 프로필 단순 이미지 크기 스타일
const ProfileImg = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 8px;
`;


const HeaderRight = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-left: auto;
`;

function HeaderCom() {
    const navigate = useNavigate();
    const location = useLocation();


    // 로컬스토리지에서 상태를 가져와서 사용
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));
    const [memberName, setMemberName] = useState(localStorage.getItem("memberName") || "");
    const [profileImg, setProfileImg] = useState(localStorage.getItem("memberProfileImageUrl") || "/img/default-profile.jpg");

    useEffect(() => {
        // 로그인 관련 localStorage 변화 감지 (다른 창에서 동기화용)
        const syncLoginState = () => {
            setIsLoggedIn(!!localStorage.getItem("accessToken"));
            setMemberName(localStorage.getItem("memberName") || "");
            setProfileImg(localStorage.getItem("memberProfileImageUrl") || "/img/default-profile.jpg");
        };
        window.addEventListener("storage", syncLoginState);
        return () => window.removeEventListener("storage", syncLoginState);
    }, []);

    // 로그인/로그아웃 후에도 바로 반영되게 navigate 이후에도 반영(페이지 이동 시에도)
    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("accessToken"));
        setMemberName(localStorage.getItem("memberName") || "");
        setProfileImg(localStorage.getItem("memberProfileImageUrl") || "/img/default-profile.jpg");
    }, [location.pathname]);


    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("memberName");
        localStorage.removeItem("memberProfileImageUrl");
        localStorage.removeItem("roles");
        setIsLoggedIn(false);
        setMemberName("");
        setProfileImg("/img/default-profile.jpg");
        navigate("/");
    };

    return (
        <>
            <WrapBlock>
                <StyledHeader>
                    <StyledTitle>
                        <Link to="/" className="link">Hello, Travelogic!</Link>
                    </StyledTitle>
                    <HeaderRight>
                        {isLoggedIn ? (
                            <>
                                <ProfileImg src={profileImg} alt="프로필" />
                                <span style={{fontWeight:600}}>{memberName}</span>
                                <button onClick={handleLogout}>로그아웃</button>
                            </>
                        ) : (
                            <>
                                <button onClick={()=>navigate("/login")}>로그인</button>
                                <button onClick={() => navigate("/register")}>회원가입</button>
                            </>
                        )}
                    </HeaderRight>
                </StyledHeader>
                <NavCom />
            </WrapBlock>

        </>
    )
}
export default HeaderCom;
