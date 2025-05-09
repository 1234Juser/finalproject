import React, { useState } from "react";
import SearchInputCom from "../../components/search/SearchInputCom";
import { useNavigate } from "react-router-dom";

export default function SearchInputCon() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    // 검색 실행 로직을 별도 함수로 분리
    const performSearch = () => {
        if (query.trim() !== '') {
            navigate(`/search?query=${encodeURIComponent(query)}`);
            setQuery("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            performSearch(); // Enter
        }
    };

    // 아이콘 클릭 핸들러 추가
    const handleIconClick = () => {
        performSearch(); // 아이콘을 클릭
    };


    return (
        <div style={{ position: "relative" }}>
            <SearchInputCom
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onIconClick={handleIconClick}
                placeholder="검색어를 입력하세요"
            />
        </div>
    );
}
