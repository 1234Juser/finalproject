import AdminMemberListCom from "../../components/member/AdminMemberListCom";
import {useEffect, useState} from "react";
import axios from "axios";

function AdminMemberListCon() {
    const [memberList, setMemberList] = useState([]);

    useEffect(() => {
        axios.get("/member/all")
            .then(res => setMemberList(res.data));
    }, []);

    // 상태 토글 핸들러
    const handleToggleStatus = (memberId, currentStatus) => {
        const newStatus = currentStatus === "N" ? "Y" : "N";
        axios.put(`/member/update-endstatus/${memberId}`, { memberEndstatus: newStatus })
            .then(() => {
                setMemberList(list =>
                    list.map(m =>
                        m.memberId === memberId ? { ...m, memberEndstatus: newStatus } : m
                    )
                );
            });
    };

    return (
        <AdminMemberListCom
            memberList={memberList}
            onToggleStatus={handleToggleStatus}
        />
    );
}

export default AdminMemberListCon;
