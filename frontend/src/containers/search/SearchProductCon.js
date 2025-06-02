import React, { useEffect, useState, useMemo } from "react";
import SearchProductCom from "../../components/search/SearchProductCom";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

// 페이지당 상품 개수 설정
const PRODUCTS_PER_PAGE = 10;

function SearchProductCon() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("query") || "";

    // 필터 및 정렬 상태
    const [sortBy, setSortBy] = useState("default"); // 정렬 기준 상태

    // 페이징 관련 상태
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0); // 전체 상품 개수 상태 추가

    useEffect(() => {
        if (!keyword) {
            setProducts([]);
            setLoading(false);
            setTotalPages(0); // 검색어 없으면 페이징 초기화
            setTotalProducts(0);
            return;
        }
        setLoading(true);

        // 백엔드 API 호출 시 페이지 및 정렬 정보 추가
        // 백엔드에서 'page', 'size', 'sortBy' 파라미터를 받는다고 가정
        axios.get(`https://api.hellotravelogic.link/search?query=${encodeURIComponent(keyword)}&page=${currentPage - 1}&size=${PRODUCTS_PER_PAGE}&sortBy=${sortBy}`)
            .then((res) => {
                // 백엔드 응답 구조에 따라 수정 필요 (예: { content: [...], totalElements: ... })
                setProducts(res.data.content); // 백엔드에서 정렬되어 온 현재 페이지 데이터
                setTotalProducts(res.data.totalElements); // 예시: 전체 상품 개수
                setTotalPages(res.data.totalPages); // 응답의 totalPages 필드에서 전체 페이지 수 가져오기 (또는 계산)
            })
            .catch(() => {
                setProducts([]);
                setTotalProducts(0);
                setTotalPages(0);
            })
            .finally(() => setLoading(false));

    }, [keyword, currentPage, sortBy]); // keyword, currentPage, sortBy 변경 시 데이터 다시 로드

    // 필터링 및 정렬 로직 (useMemo 사용) - 이제 백엔드에서 정렬하므로 이 훅은 필요 없거나 필터링 기능에만 사용
    // 현재는 필터링 기능이 없으므로 제거하거나 추후 필터링 기능 구현 시 활용
    // const filteredProducts = useMemo(() => {
    //     // 필터링 로직 추가 (필요하다면)
    //     return products; // 백엔드에서 정렬된 데이터 그대로 사용
    // }, [products]);


    // 정렬 핸들러
    const handleSort = (type) => {
        setSortBy(type); // 정렬 기준 변경 -> useEffect 다시 실행
        setCurrentPage(1); // 정렬 기준 변경 시 1페이지로 이동 (선택 사항)
    };

    // 필터 초기화 핸들러 (현재는 정렬 초기화 기능만 포함)
    const handleFilterReset = () => {
        setSortBy("default"); // 정렬 기준 초기화 -> useEffect 다시 실행
        setCurrentPage(1); // 초기화 시 1페이지로 이동 (선택 사항)
    };

    // 페이지 변경 핸들러
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page); // 페이지 변경 -> useEffect 다시 실행
        }
    };

    return (
        <SearchProductCom
            products={products} // 백엔드에서 정렬된 데이터 전달
            loading={loading}
            keyword={keyword}
            handleSort={handleSort}
            handleFilterReset={handleFilterReset}
            // 페이징 관련 props 추가
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            totalProducts={totalProducts} // 전체 상품 개수 전달
        />
    );
}
export default SearchProductCon;