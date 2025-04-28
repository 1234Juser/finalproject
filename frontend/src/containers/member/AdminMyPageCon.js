import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import AdminMyPageCom from "../../components/member/AdminMyPageCom";

function AdminMyPageCon(){
    const[memberData, setMemberData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() =>{
        const token = localStorage.getItem("accessToken");
        if(!token){
            navigate("/login");
            return;
        }
        axios
            .get("/member/adminmypage",{
                headers:{Authorization: `Bearer ${token}`}
            })
            .then(res=>setMemberData(res.data))
            .catch(err => {
                if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                    localStorage.removeItem("accessToken");
                    setError("로그인이 만료되었습니다. 다시 로그인해주세요.");
                    setTimeout(() => navigate("/login"), 2000);
                } else {
                    setError("마이페이지 정보를 불러오지 못했습니다.");
                }
                setMemberData(null);
            });
    }, [navigate]);

    if (error) return <div>{error}</div>;

    return(
        <AdminMyPageCom memberData={memberData}/>
    );
}

export default AdminMyPageCon;