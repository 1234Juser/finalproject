import AdminMemberListCom from "../../components/member/AdminMemberListCom";
import {useEffect, useState} from "react";
import axios from "axios";

function AdminMemberListCon() {
    const [memberList, setMemberList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 (0부터 시작)
    const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
    const [totalElements, setTotalElements] = useState(0); // 총 요소 수

    useEffect(() => {
        // 백엔드 API가 page와 size 파라미터를 받도록 수정
        // 여기서는 size를 10으로 고정했습니다.
        axios.get(`https://api.hellotravelogic.link/member/all?page=${currentPage}&size=10`)
            .then(res => {
                setMemberList(res.data.content); // Page 객체에서 content 추출
                setTotalPages(res.data.totalPages);
                setTotalElements(res.data.totalElements);
            })
            .catch(error => {
                console.error("회원 목록을 가져오는 데 실패했습니다.", error);
            });
    }, [currentPage]);


    // 상태 토글 핸들러
    const handleToggleStatus = (memberId, currentStatus) => {
        const newStatus = currentStatus === "N" ? "Y" : "N";
        axios.put(`https://api.hellotravelogic.link/member/update-endstatus/${memberId}`, { memberEndstatus: newStatus })
            .then(() => {
                setMemberList(list =>
                    list.map(m =>
                        m.memberId === memberId ? { ...m, memberEndstatus: newStatus } : m
                    )
                );
            })
            .catch(error => {
                console.error("회원 상태 업데이트에 실패했습니다.", error);
            });
    };

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    return (
        <AdminMemberListCom
            memberList={memberList}
            onToggleStatus={handleToggleStatus}
            currentPage={currentPage}
            totalPages={totalPages}
            totalElements={totalElements}
            onPageChange={handlePageChange}

        />
    );
}

export default AdminMemberListCon;
