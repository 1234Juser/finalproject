import React, { useEffect, useState } from "react";
import InquiryChatAdminCom from "../../components/inquiry/InquiryChatAdminCom";
import {getAdminChatList} from "../../service/inquiryService";


function InquiryChatAdminCon() {
    const [chatList, setChatList] = useState([]);
    const [filteredChatList, setFilteredChatList] = useState([]);
    const [statusFilter, setStatusFilter] = useState("");
    const [sortOrder, setSortOrder] = useState("desc"); // 기본 정렬은 내림차순
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // 로딩 상태 추가


    // 토큰을 로컬 스토리지나 상태 관리 라이브러리에서 가져옵니다.
    const token = localStorage.getItem("accessToken"); // 예시로 로컬 스토리지에서 가져옴

    useEffect(() => {
        fetchChatList();

    }, []);

    useEffect(() => {
        applyFiltersAndSort();
    }, [chatList, statusFilter, sortOrder]);


    // 모든 1:1 문의 채팅방 가져오기
    const fetchChatList = async () => {
        setLoading(true); // 로딩 시작
        try {
            const data = await getAdminChatList(token);
            setChatList(data);
            setError(null);
        } catch (err) {
            console.error("채팅방 목록 조회 오류:", err);
            setError("채팅방 목록을 불러오는 데 실패했습니다.");
        } finally {
            setLoading(false); // 로딩 종료
        }
    };


    // 필터 및 정렬
    const applyFiltersAndSort = () => {
        let filtered = [...chatList];

        // 상태별 필터링
        if (statusFilter) {
            filtered = filtered.filter(chat => chat.inquiryChatStatus === statusFilter);
        }

        // 정렬
        if (sortOrder === "desc") {
            filtered.sort((a, b) => new Date(b.inquiryChatStartDate) - new Date(a.inquiryChatStartDate));
        } else if (sortOrder === "asc") {
            filtered.sort((a, b) => new Date(a.inquiryChatStartDate) - new Date(b.inquiryChatStartDate));
        }

        setFilteredChatList(filtered);
    };


    const handleStatusChange = (e) => {
        setStatusFilter(e.target.value);
    };


    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };


    return (
        <InquiryChatAdminCom
            chatList={filteredChatList}
            onStatusChange={handleStatusChange}
            onSortChange={handleSortChange}
            currentStatus={statusFilter}
            currentSort={sortOrder}
            error={error}
            loading={loading}
        />
    );
}

export default InquiryChatAdminCon;