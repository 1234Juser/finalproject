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

    return (
        <>
            <ProductCom products={products} cityName={cityName} handleSort={handleSort} handleFilterReset={handleFilterReset}
                        filteredProducts={filteredProducts}
                        onToggleWish={handleWishToggle}
            />
        </>
    )
}

export default ProductCon;