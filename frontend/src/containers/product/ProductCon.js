import { useEffect, useState } from "react";
import ProductCom from "../../components/product/ProductCom";
import {getProductsByCity, getProductsByCountry} from "../../service/ProductService";
import { useSearchParams } from "react-router-dom";

function ProductCon(){

    const [products, setProducts] = useState([]);

    const [searchParams] = useSearchParams(); // 이전 페이지에서 전달된 쿼리 파라미터 읽기
    const countryCode = searchParams.get("countryCode");
    const cityCode = searchParams.get("cityCode");

    console.log("searchParams: ", searchParams);
    console.log("searchParams countryCode: ", countryCode);
    console.log("searchParams cityCode: ", cityCode);

    useEffect( () => {
        if (countryCode) {
            // countryCode가 있을 경우 국가 기반 상품 조회
            getProductsByCountry(countryCode)
                .then((data) => {
                    console.log("국가별 투어 상품 리스트: ", data);
                    setProducts(data);
                })
                .catch((err) => console.error("상품 조회 오류 (국가):", err));
        } else if (cityCode) {
            // cityCode가 있을 경우 도시 기반 상품 조회
            getProductsByCity(cityCode)
                .then((data) => {
                    console.log("도시별 투어 상품 리스트: ", data);
                    setProducts(data);
                })
                .catch((err) => console.error("상품 조회 오류 (도시):", err));
        }
    }, [countryCode, cityCode])

    console.log("products----->", products);

    return (
        <>
            <ProductCom products={products}/>
        </>
    )
}

export default ProductCon;