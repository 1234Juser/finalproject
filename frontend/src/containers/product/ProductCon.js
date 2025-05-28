import {useEffect, useMemo, useState} from "react";
import ProductCom from "../../components/product/ProductCom";
import {getProductsByCity, getProductsByCountry, getCityById} from "../../service/ProductService";
import { useSearchParams } from "react-router-dom";

function ProductCon(){

    const [products, setProducts] = useState([]);
    const [cityName, setCityName] = useState("");
    const [sortBy, setSortBy] = useState("default");
    const [originalData, setOriginalData] = useState([]);   // 원본 데이터 백업해서 정렬하기 위함

    const [searchParams] = useSearchParams(); // 이전 페이지에서 전달된 쿼리 파라미터 읽기
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
            getProductsByCity(cityId)
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
    };

    const filteredProducts = useMemo(() => {
        const copied = [...products];
        // console.log("copied 확인(정렬 전 products의 복사본) :  " , copied);
        switch (sortBy) {
            case "low":
                return copied.sort((a, b) => a.productAdult - b.productAdult);
            case "high":
                return copied.sort((a, b) => b.productAdult - a.productAdult);
            default:
                return copied; // 기본 정렬은 productCode순임.
        }
    }, [products, sortBy]);

    return (
        <>
            <ProductCom products={products} cityName={cityName} handleSort={handleSort} handleFilterReset={handleFilterReset}
                        filteredProducts={filteredProducts}/>
        </>
    )
}

export default ProductCon;