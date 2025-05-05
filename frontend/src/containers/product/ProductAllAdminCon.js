import ProductAllAdminCom from "../../components/product/ProductAllAdminCom";
import {getProductsList} from "../../service/ProductService";
import {useState, useEffect} from "react";

function ProductAllAdminCon() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProductsList()
            .then((data) => {
                console.log("data 확인 : ", data);
                setProducts(data);
            })
            .catch((err) => console.log("상품 조회 오류", err));
    }, [])


    return (
        <>
            <ProductAllAdminCom products={products}/>
        </>
    )
}

export  default ProductAllAdminCon