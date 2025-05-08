import React, { useState } from "react";
import SearchInputCom from "../../components/search/SearchInputCom";
import { useNavigate } from "react-router-dom";

export default function SearchInputCon() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && query.trim() !== '') {
            // 백엔드 API 경로에 맞게 수정
            navigate(`/search?query=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div style={{ position: "relative" }}>
            <SearchInputCom
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="검색어를 입력하세요"
            />
        </div>
    );
}