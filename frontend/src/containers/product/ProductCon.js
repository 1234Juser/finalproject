import {useEffect, useMemo, useState} from "react";
import ProductCom from "../../components/product/ProductCom";
import {getProductsByCity, getProductsByCountry, toggleWish} from "../../service/ProductService";
import { useSearchParams } from "react-router-dom";
import {toast} from "react-toastify";

function ProductCon({ accessToken }){

    const [products, setProducts] = useState([]);
    const [cityName, setCityName] = useState("");
    const [sortBy, setSortBy] = useState("default");
    const [originalData, setOriginalData] = useState([]);   // 원본 데이터 백업해서 정렬하기 위함
    const [filterOptions, setFilterOptions] = useState({});

    const [searchParams] = useSearchParams();
    const countryId = searchParams.get("country_id");
    const cityId = searchParams.get("city_id");

    useEffect( () => {
        if (countryId) {
            // countryId가 있을 경우 국가 기반 상품 조회
            getProductsByCountry(countryId)
                .then((data) => {
                    setProducts(data);
                    setOriginalData(data);
                })
                .catch((err) => console.error("상품 조회 오류 (국가):", err));
        } else if (cityId) {
            // cityId가 있을 경우 도시 기반 상품 조회
            getProductsByCity(cityId, accessToken)
                .then((data) => {
                    setProducts(data);
                    setOriginalData(data);
                    setCityName(data[0].cityNameKR)
                })
                .catch((err) => console.error("상품 조회 오류 (도시):", err));
        }

    }, [countryId, cityId])


    const handleSort = (type) => {
        setSortBy(type);
    };


    const handleFilterReset = () => {
        setProducts(originalData);
        setSortBy("default");
        setFilterOptions({});   // 필터 초기화
    };


    const handleFilterChange = (filters) => {
        setFilterOptions(filters);
    };


    const filteredProducts = useMemo(() => {
        // filterOptions가 비어있다면(초기 상태 또는 리셋 시) products를 그대로 사용
        // Object.keys(filterOptions).length === 0 && !Object.values(filterOptions).some(v => v !== '' && v !== undefined)
        // 위 조건 대신, filterOptions의 각 값이 실제로 유효한지 확인하여 필터링 적용 여부 판단
        const isAnyFilterActive = Object.values(filterOptions).some(value => value !== "" && value !== undefined);

        let result = [...originalData]; // 항상 원본 데이터에서 필터링 시작

        if (isAnyFilterActive) {
            // 가격 필터
            if (filterOptions.minPrice && !isNaN(parseFloat(filterOptions.minPrice))) {
                result = result.filter(p => p.productAdult >= parseFloat(filterOptions.minPrice));
            }
            if (filterOptions.maxPrice && !isNaN(parseFloat(filterOptions.maxPrice))) {
                result = result.filter(p => p.productAdult <= parseFloat(filterOptions.maxPrice));
            }

            // 상태 필터
            if (filterOptions.status)
                result = result.filter(p => p.productStatus === filterOptions.status);

            // --- 날짜 필터 (수정된 로직) ---
            const fStartDateString = filterOptions.startDate;
            const fEndDateString = filterOptions.endDate;

            if (fStartDateString || fEndDateString) {
                result = result.filter(p => {
                    const pStart = new Date(p.productStartDate);
                    pStart.setHours(0, 0, 0, 0); // 시간 정보를 제거하여 날짜만 비교
                    const pEnd = new Date(p.productEndDate);
                    pEnd.setHours(0, 0, 0, 0); // 시간 정보를 제거하여 날짜만 비교

                    if (fStartDateString && fEndDateString) {
                        // 필터 시작일과 종료일이 모두 있는 경우: 기간 겹침 확인
                        const fStart = new Date(fStartDateString);
                        fStart.setHours(0, 0, 0, 0);
                        const fEnd = new Date(fEndDateString);
                        fEnd.setHours(0, 0, 0, 0);
                        // 상품 시작일 <= 필터 종료일 AND 상품 종료일 >= 필터 시작일
                        return pStart <= fEnd && pEnd >= fStart;
                    } else if (fStartDateString) {
                        // 필터 시작일만 있는 경우: 상품 종료일이 필터 시작일 이후거나 같은지 확인
                        const fStart = new Date(fStartDateString);
                        fStart.setHours(0, 0, 0, 0);
                        return pEnd >= fStart;
                    } else if (fEndDateString) { // fEndDateString만 있는 경우
                        // 필터 종료일만 있는 경우: 상품 시작일이 필터 종료일 이전이거나 같은지 확인
                        const fEnd = new Date(fEndDateString);
                        fEnd.setHours(0, 0, 0, 0);
                        return pStart <= fEnd;
                    }
                    return true; // 이 경우는 발생하지 않지만, 명시적으로 남겨둠
                });
            }
            // --- 날짜 필터 로직 끝 ---
        }


        // 정렬 적용
        switch (sortBy) {
            case "low":
                return result.sort((a, b) => a.productAdult - b.productAdult);
            case "high":
                return result.sort((a, b) => b.productAdult - a.productAdult);
            default:
                // 기본 정렬이 필요하다면 여기에 추가 (예: 최신순 등)
                // 현재는 필터링된 결과의 순서를 그대로 유지
                return result;
        }
    }, [originalData, sortBy, filterOptions]); // products 대신 originalData를 의존성 배열에 추가



    const handleWishToggle = async (product) => {
        try {
            const result = await toggleWish(product, accessToken);
            if (result === null) return;
            const isLiked = result === "LIKED";
            setProducts((prevProducts) =>
                prevProducts.map((p) =>
                    p.productCode === product.productCode
                        ? { ...p, isWished: isLiked }
                        : p
                )
            );

            toast.success(isLiked ? "찜 등록되었습니다 💖" : "찜이 취소되었습니다 💔");
        } catch (e) {
            toast.error("찜 처리 중 오류가 발생했습니다.");
        }
    };

    // 필터가 활성화되었는지 (실제 값이 하나라도 있는지) 확인
    const activeFilterApplied = Object.values(filterOptions).some(value => value !== "" && value !== undefined && value !== null);



    return (
        <>
            <ProductCom products={products} cityName={cityName} handleSort={handleSort} handleFilterReset={handleFilterReset}
                        filteredProducts={filteredProducts}
                        onToggleWish={handleWishToggle}
                        onFilterChange={handleFilterChange}
                        activeFilterApplied={activeFilterApplied} // 이 prop 추가
            />
        </>
    )
}

export default ProductCon;