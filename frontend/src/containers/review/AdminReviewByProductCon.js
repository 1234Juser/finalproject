import AdminReviewByProductCom from "../../components/review/AdminReviewByProductCom";
import {useEffect, useReducer, useState} from "react";
import {initialState, reducer} from "../../modules/reviewModule";
import {deleteReviewByAdmin, getReviewsByProductForAdmin} from "../../service/reviewService";
import {fetchProductListForFilter} from "../../service/reviewService";

function AdminReviewByProductCon({ accessToken }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [selectedProductCode, setSelectedProductCode] = useState(null);
    const [products, setProducts] = useState([]);
    const [start, setStart] = useState(1);
    const onClick = (page) => {
        setStart(page);
    };

    const handleDeleteReview = async (reviewCode) => {
        try {
            if (!accessToken) {
                console.error("accessToken 없음");
                alert("로그인이 필요합니다.");
                return;
            }
            await deleteReviewByAdmin(reviewCode, accessToken);
            dispatch({ type: "UPDATE_REVIEW_STATUS",
                payload: {
                    reviewCode,
                    reviewStatus: "DELETE_BY_ADMIN"
                } });
            alert("리뷰가 성공적으로 삭제되었습니다.");
        } catch (error) {
            console.error("리뷰 삭제 실패:", error);
            alert("리뷰 삭제에 실패했습니다.");
        }
    };
    useEffect(() => {
        if (!accessToken) {
            alert("토큰이 없습니다.");
            return;
        }
        fetchProductListForFilter(accessToken)
            .then((res) => {
                console.log("상품 필터용 product 목록:", res);
                setProducts(res);
            })
            .catch((e) => console.error("상품 목록 불러오기 실패", e));
    }, [accessToken]);

    useEffect(() => {
        if (!accessToken) {
            alert("로그인이 필요합니다.");
            return;
        }
        try {
            const decoded = JSON.parse(atob(accessToken.split('.')[1]));
            const roles = decoded.roles;
            if (!roles.includes("ROLE_ADMIN")) {
                alert("접근 권한이 없습니다. 관리자만 접근할 수 있습니다.");
                // 필요 시 아래처럼 리다이렉트도 가능
                // navigate("/");
                return;
            }
            console.log("🟡 관리자 리뷰 목록 조회 시작");
            dispatch({ type: "SET_LOADING", data: true });

            getReviewsByProductForAdmin(selectedProductCode, accessToken, start)
                .then(data => {
                    console.log("API 응답 확인:", data);
                    dispatch({ type: "SET_REVIEWS", data });
                })
                .catch(err => {
                    if (err.response?.status === 403) {
                        alert("접근 권한이 없습니다. 관리자만 조회할 수 있습니다.");
                    } else {
                        console.error("리뷰 조회 실패:", err.message);
                        alert("리뷰 목록 조회에 실패했습니다.");
                    }
                    dispatch({ type: "SET_ERROR", data: "리뷰 목록 조회 실패" });
                })
        } catch (e) {
            console.error("토큰 디코딩 오류:", e);
            alert("인증 정보가 잘못되었습니다. 다시 로그인 해주세요.");
        }
    }, [selectedProductCode, accessToken, start]);

    const { reviews, loading, error, currentPage, totalPages } = state;

    const handleProductChange = (e) => {
        const value = e.target.value;
        setStart(1); // 필터 변경 시 1페이지로 초기화
        setSelectedProductCode(value === "all" ? null : Number(value))
    };

    return(
    <>
        <AdminReviewByProductCom
            products={products}
            selectedProductCode={selectedProductCode}
            reviews={reviews}
            loading={loading}
            error={error}
            onProductChange={handleProductChange}
            currentPage={currentPage}
            totalPages={totalPages}
            onClick={onClick}
            onDelete={handleDeleteReview}
        />
    </>)
}
export default AdminReviewByProductCon;