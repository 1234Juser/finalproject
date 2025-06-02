import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import AdminMyPageCom from "../../components/member/AdminMyPageCom";

function AdminMyPageCon(){
    const[memberData, setMemberData] = useState(null);
    const [followingList, setFollowingList] = useState([]);
    const [followerList, setFollowerList] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() =>{
        const token = localStorage.getItem("accessToken");
        if(!token){
            navigate("/login");
            return;
        }

        const fetchAdminMemberData = async () => {
            try {
                const res = await axios.get("https://api.hellotravelogic.link/member/adminmypage",{
                    headers:{Authorization: `Bearer ${token}`}
                });
                setMemberData(res.data);
                if (res.data && res.data.memberCode) {
                    fetchFollowData(res.data.memberCode, token);
                }
            } catch (err) {
                if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                    localStorage.removeItem("accessToken");
                    setError("로그인이 만료되었습니다. 다시 로그인해주세요.");
                    setTimeout(() => navigate("/login"), 2000);
                } else {
                    setError("마이페이지 정보를 불러오지 못했습니다.");
                }
                setMemberData(null);
            }
        };

        const fetchFollowData = async (memberCode, token) => {
            try {
                const [followingRes, followersRes] = await Promise.all([
                    axios.get(`https://api.hellotravelogic.link/follow/${memberCode}/following`, { // 관리자용 엔드포인트가 별도로 있다면 수정 필요
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get(`https://api.hellotravelogic.link/follow/${memberCode}/followers`, { // 관리자용 엔드포인트가 별도로 있다면 수정 필요
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);
                setFollowingList(followingRes.data);
                setFollowerList(followersRes.data);
            } catch (err) {
                console.error("팔로우 정보를 가져오는데 실패했습니다.", err);
                setFollowingList([]);
                setFollowerList([]);
            }
        };

        fetchAdminMemberData();
    }, [navigate]);

    if (error) return <div>{error}</div>;
    if (!memberData) return <div>로딩중...</div>;

    return(
        <AdminMyPageCom
            memberData={memberData}
            followingList={followingList}
            followerList={followerList}
        />
    );
}

export default AdminMyPageCon;