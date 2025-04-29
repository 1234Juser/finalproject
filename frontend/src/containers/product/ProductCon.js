import { useEffect, useState } from "react";
import ProductCom from "../../components/product/ProductCom";
import {getProductsByCountry} from "../../service/ProductService";
import { useSearchParams } from "react-router-dom";

function ProductCon(){

    const [products, setProducts] = useState([]);

    const [serchParams, setSearchParams] = useSearchParams(); // 이전 페이지에서 전달된 쿼리 파라미터 읽기


    // const handleCityOnClick = async (cityCode) => {
    //     console.log("일본 클릭했는ㄷ ㅔ ", cityCode);
    //     await getProductsByCity(cityCode)
    //     .then(data => {
    //         console.log("cityCode 받기 : ", cityCode);
    //         console.log("도시별 투어 목록 리스트 : ", data);
    //         setProducts(data);
    //     })
    //     .catch((err) => console.log(err));
    // }

    // const setSortParams = () => {
        
    // }
    const countryCode = serchParams.get("countryCode"); //
    console.log("searchParams countryCode: ", countryCode);



    useEffect( () => {
        if (countryCode) { // countryCode가 null이 아닐 경우만 API 호출
            getProductsByCountry(countryCode)
                .then((data) => {
                    console.log("도시별 투어 상품 리스트: ", data);
                    setProducts(data);
                })
                .catch((err) => console.error("상품 조회 오류:", err));
        }
    }, [countryCode])

    console.log("products----->", products);

    return (
        <>
            <ProductCom products={products}/>
        </>
    )
}

export default ProductCon;