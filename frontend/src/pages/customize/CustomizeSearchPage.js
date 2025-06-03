import React, { useState, useMemo, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import ProductCom from '../../components/product/ProductCom';
import { toggleWish } from '../../service/wishService';

function CustomizeSearchPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchResults = useMemo(() => location.state?.searchResults || [], [location.state?.searchResults]); // 이전 페이지에서 전달된 검색 결과

    const [products, setProducts] = useState([]);
    const [sortBy, setSortBy] = useState("default");
    const [originalData, setOriginalData] = useState([]); // 원본 데이터 백업해서 정렬하기 위함

    useEffect(() => {
        // console.log("searchResults 상태 업데이트:", searchResults); // searchResults 상태 업데이트 로그
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

    const handleToggleWish = async (clickedProduct) => { // async 키워드 추가
        const token = localStorage.getItem('accessToken');
        if (!token) {
            alert('로그인이 필요합니다.');
            navigate('/login');
            return;
        }

        try {
            // toggleWish 함수 호출 (productUid만 전달, isWished는 백엔드에서 처리)
            const result = await toggleWish(clickedProduct.productCode, token);

            // UI 상태 업데이트
            const updatedProducts = products.map(product =>
                product.productUid === clickedProduct.productUid
                    ? { ...product, isWished: result === "LIKED" } // 백엔드 응답에 따라 isWished 업데이트
                    : product
            );
            setProducts(updatedProducts);

            if (result === "LIKED") {
                alert('찜 목록에 추가되었습니다.');
            } else {
                alert('찜 목록에서 제거되었습니다.');
            }

        } catch (error) {
            console.error('찜 처리 중 오류 발생:', error);
            if (error.message === "로그인이 필요합니다.") {
                alert(error.message);
                navigate('/login');
            } else if (error.response && error.response.status === 401) {
                alert('인증 오류가 발생했습니다. 다시 로그인해주세요.');
                navigate('/login');
            } else {
                alert('찜 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
            }
        }
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
    // console.log("현재 products 상태:", products); // products 상태 로그
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
            cityName={cityName}
            handleSort={handleSort}
            handleFilterReset={handleFilterReset}
            filteredProducts={filteredProducts}
            onToggleWish={handleToggleWish}
        />
    );
}
export default CustomizeSearchPage;