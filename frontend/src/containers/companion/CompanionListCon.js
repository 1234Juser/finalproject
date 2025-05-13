import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CompanionListCom from "../../components/companion/CompanionListCom";

const ITEMS_PER_PAGE = 10; // API 호출 및 UI 표시에 사용될 페이지 당 아이템 수

function CompanionListCon() {
    const [companions, setCompanions] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchCompanions = async (page) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/companions?page=${page}&size=${ITEMS_PER_PAGE}&sort=companionCreatedAt,desc`);
            setCompanions(response.data.content);
            setCurrentPage(response.data.number);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            console.error("게시글 목록을 불러오는데 실패 했습니다.", err);
            setError("게시글을 불러올 수 없습니다. 잠시 후 다시 시도해주세요.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompanions(currentPage);
    }, [currentPage]);

    const handleRowClick = (companionId) => {
        navigate(`/community/companion/${companionId}`);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <CompanionListCom
            loading={loading}
            error={error}
            companions={companions}
            currentPage={currentPage}
            totalPages={totalPages}
            onRowClick={handleRowClick}
            onPageChange={handlePageChange}
            itemsPerPage={ITEMS_PER_PAGE}
        />
    );
}
export default CompanionListCon;