// containers/search/SearchInputCon.js
import React, { useState, useRef } from "react";
import axios from "axios";
import SearchInputCom from "../../components/search/SearchInputCom";
import { useNavigate } from "react-router-dom";

export default function SearchInputCon() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    // 입력 시 바로 엔터로 이동!
    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && query.trim() !== '') {
            // 검색 결과 페이지로 이동 (예: /products/search?q=검색어)
            navigate(`/products/search?q=${encodeURIComponent(query)}`);
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