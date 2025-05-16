import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import CompanionListCom from "../../components/companion/CompanionListCom";

const ITEMS_PER_PAGE = 10;

function CompanionListCon() {
    const [companions, setCompanions] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const initialSearchKeyword = queryParams.get("searchKeyword") || "";
    const initialSearchType = queryParams.get("searchType") || "title";

    const [searchKeyword, setSearchKeyword] = useState(initialSearchKeyword);
    const [searchType, setSearchType] = useState(initialSearchType);

    const fetchCompanions = useCallback(async (page, keyword, type) => {
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams({
                page: page,
                size: ITEMS_PER_PAGE,
                sort: "companionCreatedAt,desc"
            });
            if (keyword && keyword.trim() !== "") {
                params.append("searchKeyword", keyword);
            }
            params.append("searchType", type || "title");

            const response = await axios.get(`/companions?${params.toString()}`);
            setCompanions(response.data.content);
            setCurrentPage(response.data.number);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            console.error("게시글 목록을 불러오는데 실패 했습니다.", err);
            setError("게시글을 불러올 수 없습니다. 잠시 후 다시 시도해주세요.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const pageFromUrl = parseInt(params.get("page"), 10);
        const keywordFromUrl = params.get("searchKeyword") || "";
        const typeFromUrl = params.get("searchType") || "title";

        const newCurrentPage = !isNaN(pageFromUrl) && pageFromUrl >= 0 ? pageFromUrl : 0;

        // URL에 검색어가 있으면 상태를 업데이트합니다.
        // 검색 후 검색창을 비우는 로직과 충돌하지 않도록,
        // 검색어 상태는 검색 액션(handleSearchSubmit)에서 직접 관리하고,
        // 여기서는 URL 변경에 따른 동기화만 담당합니다.
        if (params.has("searchKeyword")) {
            // setSearchKeyword(keywordFromUrl); // 이 줄은 handleSearchSubmit에서 관리하므로 주석처리 하거나 삭제합니다.
            // 검색 후 검색창을 비우는 동작을 유지하려면 이 줄을 활성화하면 안됩니다.
        } else {
            // URL에 searchKeyword가 없는 경우 (예: 초기 로드, 검색어 없이 페이지만 변경)
            // 이 경우에도 검색창을 비워야 한다면 setSearchKeyword("")를 호출할 수 있지만,
            // 현재 요구사항은 "검색 실행 후 초기화"이므로, 여기서는 URL을 따릅니다.
            // 만약 사용자가 URL에서 직접 searchKeyword를 지우고 접근하면 검색창도 비워집니다.
            setSearchKeyword(keywordFromUrl);
        }
        setSearchType(typeFromUrl);

        fetchCompanions(newCurrentPage, keywordFromUrl, typeFromUrl);
    }, [location.search, fetchCompanions]);



    const handleRowClick = (companionId) => {
        navigate(`/community/companion/${companionId}`);
    };

    const handlePageChange = (pageNumber) => {
        const params = new URLSearchParams(location.search);
        params.set("page", pageNumber.toString());
        navigate(`${location.pathname}?${params.toString()}`);
    };

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleSearchTypeChange = (newType) => {
        setSearchType(newType);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const trimmedKeyword = searchKeyword.trim();

        if (!trimmedKeyword) {
            alert("검색어를 입력해주세요.");
            // 검색어가 없으면 아무 작업도 하지 않고 현재 상태를 유지합니다.
            // 페이지 이동, API 호출, 검색창 내용 변경 등을 하지 않습니다.
            return;
        }

        const params = new URLSearchParams();
        params.append("searchKeyword", trimmedKeyword);
        params.append("searchType", searchType);
        params.append("page", "0"); // 검색 실행 시 항상 첫 페이지로 이동

        navigate(`${location.pathname}?${params.toString()}`);
        setSearchKeyword(""); // 검색 실행 후 검색어 입력창 비우기
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
            searchKeyword={searchKeyword}
            onSearchChange={handleSearchChange}
            onSearchSubmit={handleSearchSubmit}
            searchType={searchType}
            onSearchTypeChange={handleSearchTypeChange}
        />
    );
}
export default CompanionListCon;