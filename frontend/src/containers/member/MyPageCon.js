import React, { useEffect, useState } from "react";
import axios from "axios";
import MyPageCom from "../../components/member/MyPageCom";
import {useNavigate} from "react-router-dom";

function MyPageCon() {
    const [memberData, setMemberData] = useState(null);
    const [followingList, setFollowingList] = useState([]);
    const [followerList, setFollowerList] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchMemberData = async () => {
            try {
                const res = await axios.get("/member/mypage", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log('API Response - /member/mypage:', res.data); // <--- 이 로그를 추가해보세요.
                setMemberData(res.data);
                // memberData가 성공적으로 로드된 후 팔로우 정보 가져오기
                if (res.data && res.data.memberCode) {
                    fetchFollowData(res.data.memberCode, token);
                } else {
                    console.log('fetchFollowData 호출 조건 실패:', 'res.data:', res.data, 'res.data.memberCode:', res.data ? res.data.memberCode : 'N/A'); // <--- 조건 실패 시 로그 추가
                }
            } catch (err) {
                if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                    localStorage.removeItem("accessToken");
                    setError("로그인이 만료되었습니다. 다시 로그인해주세요.");
                    setTimeout(() => navigate("/login"), 2000);
                } else {
                    setError("마이페이지 정보를 불러오지 못했습니다. 다시 로그인해주세요");
                }
                setMemberData(null);
            }
        };

        const fetchFollowData = async (memberCode, token) => {
            try {
                const [followingRes, followersRes] = await Promise.all([
                    axios.get(`/follow/${memberCode}/following`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get(`/follow/${memberCode}/followers`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);

                // API 응답 데이터 확인용 로그 추가
                console.log('API Response - Following List:', followingRes.data);
                console.log('API Response - Follower List:', followersRes.data);

                setFollowingList(followingRes.data);
                setFollowerList(followersRes.data);
            } catch (err) {
                console.error("팔로우 정보를 가져오는데 실패했습니다.", err);
                // 팔로우 정보 로드 실패 시 빈 배열로 설정하거나, 사용자에게 알림을 줄 수 있습니다.
                setFollowingList([]);
                setFollowerList([]);
            }
        };

        fetchMemberData();

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
    //카카오연동해제
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
            navigate("/");
        }catch(err){
            alert("카카오 연동 해제에 실패했습니다.");
        };
    }
    //구글로그인 연동해제
    const handleGoogleUnlink = async () => {
        if(!window.confirm("구글 연동을 해제하시겠습니까?")) return;
        const token = localStorage.getItem("accessToken");
        const googleToken = localStorage.getItem("googleAccessToken"); // 로그인시 저장해야 함
        try {
            await axios.post("/oauth/google/unlink",
                { accessToken: googleToken },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("구글 연동이 해제되었습니다.");
            // 연동 토큰 및 jwt 삭제 및 로그인 이동
            localStorage.removeItem("accessToken");
            localStorage.removeItem("googleAccessToken");
            // 구글 계정도 완전히 로그아웃 (팝업 또는 현재창 이동 방식 중 택1)
            // 1) 팝업으로 로그아웃
            const logoutWindow = window.open(
                "https://accounts.google.com/Logout",
                "_blank",
                "width=500,height=600"
            );
            // 2) 또는, 직접 이동시키고 싶다면
            // window.location.href = "https://accounts.google.com/Logout";
            // 그리고 메인으로 이동
            setTimeout(() => {
                if (logoutWindow) logoutWindow.close(); // 팝업창 닫기
                // 앱 메인 이동
                navigate("/");
            }, 1200); // 로그아웃 약간의 대기 필요
        } catch (err) {
            alert("구글 연동 해제에 실패했습니다.");
        }
    };

    if (error) return <div>{error}</div>;
    if (!memberData) return <div>로딩중...</div>; // memberData가 로드될 때까지 로딩 표시


    // 추후 프로필/정보수정 핸들러 바인딩
    return (
        <MyPageCom
            memberData={memberData}
            followingList={followingList}
            followerList={followerList}

            onEditProfileImage={handleEditProfileImage}
            onEditInfo={handleEditInfo}
            onKakaoUnlink = {handleKakaoUnlink}
            onGoogleUnlink={handleGoogleUnlink}
        />
    );
}

export default MyPageCon;
