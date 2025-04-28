import React, { useEffect, useState } from "react";
import axios from "axios";
import MyPageCom from "../../components/member/MyPageCom";
import {useNavigate} from "react-router-dom";

function MyPageCon() {
    const [memberData, setMemberData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        // JWT 토큰 필요시 헤더에 추가
        const token = localStorage.getItem("accessToken");
        if (!token) {
            navigate("/login");
            return;
        }

        axios.get("/member/mypage", {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        })
            .then(res => setMemberData(res.data))
            .catch(err => {
                if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                    // 토큰 만료 혹은 인증 에러 처리
                    localStorage.removeItem("accessToken"); // 토큰 제거
                    setError("로그인이 만료되었습니다. 다시 로그인해주세요.");
                    setTimeout(() => navigate("/login"), 2000); // 2초 뒤 로그인 페이지로 이동
                } else {
                    setError("마이페이지 정보를 불러오지 못했습니다.");
                }
                setMemberData(null);
            });
    }, [navigate]);

    if (error) return <div>{error}</div>;

    // 추후 프로필/정보수정 핸들러 바인딩
    return (
        <MyPageCom
            memberData={memberData}
            onEditProfileImage={() => alert("준비중")}
            onEditInfo={() => alert("준비중")}
        />
    );
}

export default MyPageCon;
