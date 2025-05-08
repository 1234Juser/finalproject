import ProductDetailCom from "../../components/product/ProductDetailCom";
import {useEffect, useReducer, useState} from "react";
import {getProductDetail, toggleWish} from "../../service/ProductService";
import {useParams} from "react-router-dom";
import {initialState, productFormReducer} from "../../modules/ProductReducer";
import { toast } from "react-toastify";

function ProductDetailCon({productCode, initialWishState, memberCode}) {

    const [activeSection, setActiveSection] = useState('basicInfo');
    const { productUid } = useParams();
    const [product, setProduct] = useState([]);
    const [state, dispatch] = useReducer(productFormReducer, {
        ...initialState,
        isWished: initialWishState,
    });


    console.log("선택된 상품의 productUid", productUid);


    useEffect(() => {
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

    const handleDetailTabClick = (tabHref) => {
        const targetId = tabHref.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      };


    // Intersection Observer API로 현재 보이는 섹션을 감지해서 스타일 주기
    // 사용자가 스크롤로 화면을 내릴 때도 DetailTab 컴포넌트에 속성 부여
    useEffect(() => {
        const sections = document.querySelectorAll('section'); // 각 섹션에 id 필요
      
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(entry.target.id);
              }
            });
          },
          {
            threshold: 0.5, // 50% 이상 보이면 active 처리
          }
        );
      
        sections.forEach((section) => observer.observe(section));
      
        return () => sections.forEach((section) => observer.unobserve(section));
    }, []);

    return (
        <>
            <ProductDetailCom product={product}
                            isWished={state.isWished}
                            onToggleWish={handleWishToggle}
                            onTabClick={handleDetailTabClick}
                            activeSection={activeSection}
            />
        </>
    )
}

export default ProductDetailCon