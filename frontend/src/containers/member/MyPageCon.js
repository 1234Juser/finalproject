import React, { useEffect, useState } from "react";
import axios from "axios";
import MyPageCom from "../../components/member/MyPageCom";

function MyPageCon() {
    const [memberData, setMemberData] = useState(null);

    useEffect(() => {
        // JWT 토큰 필요시 헤더에 추가
        const token = localStorage.getItem("accessToken");
        axios.get("/member/mypage", {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        })
            .then(res => setMemberData(res.data))
            .catch(err => setMemberData(null)); // 필요시 에러처리
    }, []);

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
