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
                    setError("마이페이지 정보를 불러오지 못했습니다. 다시 로그인해주세요");
                }
                setMemberData(null);
            });
    }, [navigate]);

    //회원정보 수정 핸들러
    const handleEditInfo = async (form) =>{
        try{
            const token = localStorage.getItem("accessToken");
            await axios.put("/member/mypage/update", form,{
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            alert("개인정보가 수정되었습니다.");
            //갱신
            const res = await axios.get("/member/mypage",{
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            setMemberData(res.data);
            localStorage.setItem("memberName", res.data.memberName);
        }catch(err){
            if(err.response && err.response.data) {
                alert(err.response.data.message); //서버에서 온 에러메시지
            }else{
                alert("정보 수정에 실패했습니다.")
            }
        }
    };
    //프로필이미지수정
    const handleEditProfileImage = async (file) => {
        try {
            const token = localStorage.getItem("accessToken");
            const formData = new FormData();
            formData.append("file", file);

            const res = await axios.post("/member/mypage/profile-image", formData, {
                headers: {
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    "Content-Type": "multipart/form-data"
                }
            });

            alert("프로필 이미지가 변경되었습니다!");
            // 새 프로필 이미지 URL 받아오기 + 저장
            const imageUrl = res.data;
            setMemberData((data) => ({ ...data, memberProfileImageUrl: imageUrl }));
            localStorage.setItem("memberProfileImageUrl", imageUrl);

            // 프로필 이미지 로컬 스토리지 반영
        } catch (err) {
            alert("프로필 이미지 변경에 실패했습니다.");
        }
    };

    const handleKakaoUnlink = async () => {
        if(!window.confirm("카카오 연동을 해제하시겠습니까?")) return;
        const token = localStorage.getItem("accessToken");
        const kakaoToken = localStorage.getItem("kakaoAccessToken");
        console.log("Unlink 시도. kakaoAccessToken=", kakaoToken);
        try{
            await axios.post("/oauth/kakao/unlink",
                {accessToken: kakaoToken,}
                ,{
                headers: {Authorization: `Bearer ${token}`}
            });
            alert("카카오 연동이 해제되었습니다.");
            //토큰 삭제 및 로그인 이동
            localStorage.removeItem("accessToken");
            localStorage.removeItem("kakaoAccessToken");
            navigate("/login");
        }catch(err){
            alert("카카오 연동 해제에 실패했습니다.");
        };
    }

    if (error) return <div>{error}</div>;

    // 추후 프로필/정보수정 핸들러 바인딩
    return (
        <MyPageCom
            memberData={memberData}
            onEditProfileImage={handleEditProfileImage}
            onEditInfo={handleEditInfo}
            onKakaoUnlink = {handleKakaoUnlink}
        />
    );
}

export default MyPageCon;
