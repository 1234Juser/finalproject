import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import WithdrawlCom from "../../components/member/WithdrawlCom";

function WithdrawlCon() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleWithdraw = async (password) => {
        if (loading) return;
        setLoading(true);
        try {
            const token = localStorage.getItem("accessToken");
            await axios.put(
                "/member/withdraw",
                { password },
                { headers: token ? { Authorization: `Bearer ${token}` } : {} }
            );
            alert("회원 탈퇴가 완료되었습니다.");
            localStorage.removeItem("accessToken");
            navigate("/");
        } catch (err) {
            if (err.response && err.response.data) {
                alert(err.response.data.message || "탈퇴에 실패했습니다.");
            } else {
                alert("탈퇴에 실패했습니다.");
            }
        } finally {
            setLoading(false);
        }
    };

    return <WithdrawlCom onWithdraw={handleWithdraw} loading={loading} />;
}

export default WithdrawlCon;
