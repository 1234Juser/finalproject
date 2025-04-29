import ProductDetailCom from "../../components/product/ProductDetailCom";
import {useEffect, useState} from "react";
import {getProductDetail} from "../../service/ProductService";
import {useParams} from "react-router-dom";

function ProductDetailCon() {

    const { productUid } = useParams(); // URL의 productUid 파라미터를 가져옴
    const [product, setProduct] = useState([]); // 상품 데이터 상태 관리


    console.log("선택된 상품의 productUid", productUid);


    useEffect(() => {
        getProductDetail(productUid)
            .then((data) => {
                console.log("투어 상품 데이터: ", data);
                setProduct(data);
            })
            .catch((err) => console.error("상품 조회 오류 (국가):", err));
    }, [productUid])

    console.log("product----->", product);


    return (
        <>
            <ProductDetailCom product={product}/>
        </>
    )
}

export default ProductDetailCon