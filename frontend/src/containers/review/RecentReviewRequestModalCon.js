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
            console.log("오늘은 모달 표시 안함");
            return;
        }

        const checkReviewRequest = async () => {
            try {
                const order = await fetchLatestUnreviewedOrder(accessToken);
                const hiddenOrders = JSON.parse(localStorage.getItem("hiddenReviewOrders") || "[]");

                if (order && !hiddenOrders.includes(Number(order.orderCode))) {
                    dispatch({ type: "SET_REVIEW_REQUEST", payload: order });
                } else {
                    console.log("숨긴 주문 또는 없음:", order?.orderCode);
                }
            } catch (err) {
                console.error("리뷰 요청 주문 조회 실패:", err);
            }
        };

        checkReviewRequest();
    }, [accessToken, dispatch]);

    // 단순 창닫기
    const handleClose = () => {
        dispatch({ type: "CLOSE_REVIEW_REQUEST_MODAL" });
    };

    // 오늘보지 않기
    const handleDoNotShowToday = () => {
        const today = new Date().toISOString().split("T")[0];
        localStorage.setItem("reviewModalHideDate", today);
        handleClose();
    };

    // 영원히 안보기
    const handleDoNotShowThisOrder = () => {
        const hiddenOrders = JSON.parse(localStorage.getItem("hiddenReviewOrders") || "[]");
        if (!hiddenOrders.includes(reviewRequest.orderCode)) {
            hiddenOrders.push(reviewRequest.orderCode);
            localStorage.setItem("hiddenReviewOrders", JSON.stringify(hiddenOrders));
        }
        handleClose();
    };

    if (!showReviewRequestModal || !reviewRequest) return null;
    return(
    <>
        <RecentReviewRequestModalCom
            order={reviewRequest}
            onClose={handleClose}
            onDoNotShowToday={handleDoNotShowToday}
            onDoNotShowThisOrder={handleDoNotShowThisOrder}
            accessToken={accessToken}/>
    </>)
}
export default RecentReviewRequestModalCon;