import AdminReviewCom from "../../components/review/AdminReviewCom";
import {useEffect, useReducer} from "react";
import {getAllReviewsForAdmin} from "../../service/reviewService";
import {initialState, reducer} from "../../modules/reviewModule";

function AdminReviewCon() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetchReviews = async () => {
            console.log("🟡 관리자 리뷰 목록 조회 시작");
            dispatch({ type: "SET_LOADING", data: true });
            try {
                const reviews = await getAllReviewsForAdmin();
                console.log("🟢 관리자 리뷰 목록 조회 완료:", reviews);
                dispatch({ type: "SET_REVIEWS", data: reviews });
            } catch (error) {
                console.error("🔴 리뷰 목록 조회 실패:", error);
                dispatch({ type: "SET_ERROR", data: "리뷰 목록 조회 실패" });
            } finally {
                dispatch({ type: "SET_LOADING", data: false });
            }
        };

        fetchReviews();
    }, []);

    return(
        <>
            <AdminReviewCom
                reviews={state.reviews}
                loading={state.loading}
                error={state.error}/>
        </>)
}
export default AdminReviewCon;