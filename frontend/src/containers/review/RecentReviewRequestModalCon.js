import RecentReviewRequestModalCom from "../../components/review/RecentReviewRequestModalCom";
import {fetchLatestUnreviewedOrder} from "../../service/reservationService";
import {useEffect, useReducer} from "react";
import {initialState, reducer} from "../../modules/reviewModule";

function RecentReviewRequestModalCon({accessToken, state, dispatch}) {
    // const [state, dispatch] = useReducer(reducer, initialState);
    const { reviewRequest, showReviewRequestModal } = state;

    useEffect(() => {
        if (!accessToken) {
            console.log("accessToken 없음");
            return;
        }

        const hiddenDate = localStorage.getItem("reviewModalHideDate");
        const today = new Date().toISOString().split("T")[0];

        if (hiddenDate === today) {
            console.log("⛔ 오늘은 모달 표시 안함");
            return;
        }

        const checkReviewRequest = async () => {
            try {
                const order = await fetchLatestUnreviewedOrder(accessToken);
                if (order) {
                    dispatch({ type: "SET_REVIEW_REQUEST", payload: order });
                }
            } catch (err) {
                console.error("리뷰 요청 주문 조회 실패:", err);
            }
        };

        checkReviewRequest();
    }, [accessToken, dispatch]);

    const handleClose = () => {
        dispatch({ type: "CLOSE_REVIEW_REQUEST_MODAL" });
    };

    const handleDoNotShowToday = () => {
        const today = new Date().toISOString().split("T")[0];
        localStorage.setItem("reviewModalHideDate", today);
        handleClose();
    };

    if (!showReviewRequestModal || !reviewRequest) return null;
    return(
    <>
        <RecentReviewRequestModalCom
            order={reviewRequest}
            onClose={handleClose}
            onDoNotShowToday={handleDoNotShowToday}
            accessToken={accessToken}/>
    </>)
}
export default RecentReviewRequestModalCon;