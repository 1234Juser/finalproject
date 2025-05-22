import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCom from '../../components/product/ProductCom';

function CustomizeSearchPage() {
    const location = useLocation();
    const searchResults = useMemo(() => location.state?.searchResults || [], [location.state?.searchResults]); // 이전 페이지에서 전달된 검색 결과

    const [products, setProducts] = useState([]);
    const [sortBy, setSortBy] = useState("default");
    const [originalData, setOriginalData] = useState([]); // 원본 데이터 백업해서 정렬하기 위함

    useEffect(() => {
        console.log("searchResults 상태 업데이트:", searchResults); // searchResults 상태 업데이트 로그
        setProducts(searchResults);
        setOriginalData(searchResults);
    }, [searchResults]);

    const handleSort = (type) => {
        setSortBy(type);
    };

    const handleFilterReset = () => {
        setProducts(originalData);
        setSortBy("default");
    };

    const filteredProducts = useMemo(() => {
        const copied = [...products];
        switch (sortBy) {
            case "low":
                return copied.sort((a, b) => a.productAdult - b.productAdult);
            case "high":
                return copied.sort((a, b) => b.productAdult - a.productAdult);
            default:
                return copied; // 기본 정렬
        }
    }, [products, sortBy]);

    // 검색 결과가 없을 경우 메시지 표시
    console.log("현재 products 상태:", products); // products 상태 로그
    if (!searchResults || searchResults.length === 0) {
        return (
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px', textAlign: 'center' }}>
                <h3>검색 결과가 없습니다.</h3>
                <p>입력하신 조건에 맞는 상품을 찾을 수 없습니다.</p>
            </div>
        );
    }

    // ProductCon과 동일한 제목을 표시하기 위해 도시 이름을 가져옵니다.
    const cityName = searchResults.length > 0 ? searchResults[0].cityName : "검색 결과";


    return (
        <ProductCom
            products={filteredProducts} // ProductCom 내부에서 사용되지 않지만 props 구조 유지를 위해 전달
            cityName={cityName}
            handleSort={handleSort}
            handleFilterReset={handleFilterReset}
        />
    );
}
export default CustomizeSearchPage;