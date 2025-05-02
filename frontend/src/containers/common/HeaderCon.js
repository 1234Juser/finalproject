import {useLocation, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderCom from "../../components/common/HeaderCom";



function HeaderCon() {
    
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
        const loginType = localStorage.getItem("loginType");
        localStorage.removeItem("loginType");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("memberName");
        localStorage.removeItem("memberProfileImageUrl");
        localStorage.removeItem("roles");
        setIsLoggedIn(false);
        setMemberName("");
        setProfileImg("/img/default-profile.jpg");
        // 구글 로그아웃도 같이 실행
        if(loginType === "google") {
            const logoutWindow = window.open(
                "https://accounts.google.com/Logout",
                "_blank",
                "width=500,height=600"
            );
            setTimeout(() => {
                if(logoutWindow) logoutWindow.close();
                navigate("/");
            }, 1000);
            return;
        }
        navigate("/");
    };

    return (
        <>
            <HeaderCom isLoggedIn={isLoggedIn} profileImg={profileImg} handleLogout={handleLogout} memberName={memberName} />
        </>
    )
}

export default HeaderCon;