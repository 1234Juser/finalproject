import ProductDetailCom from "../../components/product/ProductDetailCom";
import {useEffect, useReducer, useState} from "react";
import {getProductDetail, toggleWish} from "../../service/ProductService";
import {useParams} from "react-router-dom";
import {initialState, productFormReducer} from "../../modules/ProductReducer";
import { toast } from "react-toastify";

function ProductDetailCon({productCode, initialWishState, memberCode}) {

    const { productUid } = useParams(); // URL의 productUid 파라미터를 가져옴
    const [product, setProduct] = useState([]); // 상품 데이터 상태 관리
    const [state, dispatch] = useReducer(productFormReducer, {
        ...initialState,
        isWished: initialWishState,
    });


    console.log("선택된 상품의 productUid", productUid);


    useEffect(() => {
        // const memberCode = Number(localStorage.getItem("memberCode"));
        // console.log("호출 URL:",
        //     `http://localhost:8080/products/${productUid}?memberCode=${memberCode}`
        // );

        getProductDetail(productUid)
            .then((data) => {
                console.log("투어 상품 데이터: ", data);
                setProduct(data);
                dispatch({ type: "TOGGLE_WISH", payload: data.isWished });
            })
            .catch((err) => console.error("상품 조회 오류 (국가):", err));
    }, [productUid])

    console.log("product----->", product);

    const handleWishToggle = async () => {
        try {
            const result = await toggleWish(product);
            if (result === null) return;
            const isLiked = result === "LIKED";
            dispatch({ type: "TOGGLE_WISH", payload: isLiked });
            toast.success(isLiked ? "찜 등록되었습니다 💖" : "찜이 취소되었습니다 💔");
        } catch (e) {
            toast.error("찜 처리 중 오류가 발생했습니다.");
        }
    };


    return (
        <>
            <ProductDetailCom product={product}
                            isWished={state.isWished}
                            onToggleWish={handleWishToggle}
            />
        </>
    )
}

export default ProductDetailCon