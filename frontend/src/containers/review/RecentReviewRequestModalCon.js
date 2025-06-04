import RecentReviewRequestModalCom from "../../components/review/RecentReviewRequestModalCom";
import {fetchLatestUnreviewedOrder} from "../../service/reservationService";
import {useEffect} from "react";


function RecentReviewRequestModalCon({accessToken, state, dispatch}) {
    const { reviewRequest, showReviewRequestModal } = state;
    const memberCode = localStorage.getItem("memberCode");

    useEffect(() => {
        const memberCode = localStorage.getItem("memberCode");
        if (!accessToken || !memberCode) return;

        // 자정까지 숨김 설정 확인
        const hideUntilRaw = sessionStorage.getItem(`reviewHideUntil_${memberCode}`);
        const hideUntil = hideUntilRaw ? Number(hideUntilRaw) : null;
        const now = Date.now();

        if (hideUntil && hideUntil > now) return;

        const checkReviewRequest = async () => {
            try {
                const order = await fetchLatestUnreviewedOrder(accessToken);
                if (!order) return;

                const key = `reviewHiddenOrders_${memberCode}`;
                const hiddenOrders = JSON.parse(sessionStorage.getItem(key) || "[]");
                if (!hiddenOrders.includes(Number(order.orderCode))) {
                    dispatch({ type: "SET_REVIEW_REQUEST", payload: order });
                }
            } catch (err) {
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
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0); // 자정

        const hideUntil = midnight.getTime();
        if (memberCode) {
            sessionStorage.setItem(`reviewHideUntil_${memberCode}`, hideUntil.toString());
        }
        dispatch({ type: "CLOSE_REVIEW_REQUEST_MODAL" });
    };

    // 영원히 안보기
    const handleDoNotShowThisOrder = () => {
        if (!memberCode) return;
        const key = `reviewHiddenOrders_${memberCode}`;
        const hiddenOrders = JSON.parse(sessionStorage.getItem(key) || "[]");
        const code = Number(reviewRequest.orderCode);

        if (!hiddenOrders.includes(code)) {
            hiddenOrders.push(code);
            sessionStorage.setItem(key, JSON.stringify(hiddenOrders));
        }
        dispatch({ type: "CLOSE_REVIEW_REQUEST_MODAL" });
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