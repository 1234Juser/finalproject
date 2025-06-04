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
                alert("로그인이 필요합니다.");
                return;
            }
            // 네, 아니요 버튼이 있는 기본 확인 창
            const confirmed = window.confirm("정말 이 리뷰를 삭제하시겠습니까?");
            if (!confirmed) return;

            await deleteReviewByAdmin(reviewCode, accessToken);
            dispatch({ type: "UPDATE_REVIEW_STATUS",
                payload: {
                    reviewCode,
                    reviewStatus: "DELETE_BY_ADMIN"
                } });
            // 삭제 후 필터된 목록 갱신
            const updatedReviews = await getReviewsByProductForAdmin(selectedProductCode, accessToken, 1);
            dispatch({ type: "SET_REVIEWS", data: updatedReviews });
            alert("리뷰가 성공적으로 삭제되었습니다.");
        } catch (error) {
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
                setProducts(res);
            })
            .catch(() => {
                alert("상품 목록 불러오기에 실패했습니다. 잠시 후 다시 시도해 주세요.");
            });
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
                return;
            }
            dispatch({ type: "SET_LOADING", data: true });

            getReviewsByProductForAdmin(selectedProductCode, accessToken, start)
                .then(data => {
                    dispatch({ type: "SET_REVIEWS", data });
                })
                .catch(err => {
                    if (err.response?.status === 403) {
                        alert("접근 권한이 없습니다. 관리자만 조회할 수 있습니다.");
                    } else {
                        alert("리뷰 목록 조회에 실패했습니다.");
                    }
                    dispatch({ type: "SET_ERROR", data: "리뷰 목록 조회 실패" });
                })
        } catch (e) {
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