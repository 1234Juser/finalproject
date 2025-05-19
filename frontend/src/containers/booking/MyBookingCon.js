import MyBookingCom from "../../components/booking/MyBookingCom";
import {useEffect, useReducer, useState} from "react";
import {cancelMyReservation, fetchRecentReservations, fetchOldReservations} from "../../service/reservationService";
import {initialState, reservationReducer} from "../../modules/reservationModule";
import ReviewModalCon from "../review/MyReviewModalCon";
import {deleteMyReview} from "../../service/reviewService";
import MyReviewModalCon from "../review/MyReviewModalCon";

function MyBookingCon({accessToken}){
    const [selectedTab, setSelectedTab] = useState(0);
    const [state, dispatch] = useReducer(reservationReducer, initialState);
    const [showMoreSchedule, setShowMoreSchedule] = useState(true);
    const [showMoreComplete, setShowMoreComplete] = useState(true);
    const [showMoreCancel, setShowMoreCancel] = useState(true);
    const [selectedOrderCode, setSelectedOrderCode] = useState(null);
    const [memberCode, setMemberCode] = useState(null);

    useEffect(() => {
        if (!accessToken) {
            alert("로그인이 필요합니다.");
            return;
        }
        if (accessToken) {
            // let memberCode = null;
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const parsedMemberCode = payload.memberCode;
                // const memberCode = payload.memberCode;
                // if (memberCode) {
                //     console.log("memberCode from token:", memberCode);
                //     localStorage.setItem("memberCode", memberCode);
                // }
                // if (!memberCode || isNaN(memberCode)) {
                if (!parsedMemberCode || isNaN(parsedMemberCode)) {
                    console.error("유효하지 않은 memberCode");
                    alert("로그인 정보가 유효하지 않습니다.");
                    return;
                }
                setMemberCode(parsedMemberCode);
                console.log("로그인된 memberCode:", parsedMemberCode);
                // console.log("로그인된 memberCode:", memberCode);
                // } catch (e) {
                //     console.error("토큰 파싱 실패", e);
                //     return;
                // }

                // useEffect(() => {
                // console.log("로그인된 memberCode:", memberCode);
                // if (!memberCode || isNaN(memberCode)) {
                //     console.error("로그인 정보가 없습니다.");
                //     return;
                // }
                // const loadRecent = async () => {
                dispatch({ type: "LOADING" });
                fetchRecentReservations(accessToken)
                    .then(data => {
                        dispatch({ type: "FETCH_SUCCESS", payload: data });
                    })
                    .catch((err) => {
                        console.error("예약 조회 실패:", err.message);
                        dispatch({ type: "FETCH_ERROR", payload: err.message });
                    });
            } catch (e) {
                console.error("토큰 파싱 실패", e);
                alert("인증 정보가 잘못되었습니다. 다시 로그인 해주세요.");
            }
        } else {
            alert("로그인이 필요합니다.");
        }
    }, [accessToken]);
    //         try {
    //             const data = await fetchRecentReservations();
    //             dispatch({ type: "FETCH_SUCCESS", payload: data });
    //         } catch (err) {
    //             console.error("예약 조회 실패:", err.message);
    //             dispatch({ type: "FETCH_ERROR", payload: err.message });
    //         }
    //     }
    //     loadRecent();
    // }, [memberCode]);

    const handleLoadOldForSchedule = async () => {
        try {
            const oldData = await fetchOldReservations(accessToken);
            if (oldData.length > 0) {
                dispatch({ type: "ADD_OLD_RESERVATIONS", payload: oldData });
            } else {
                alert("더 이상 불러올 예약이 없습니다.");
                setShowMoreSchedule(false);  // 이걸로 더 이상 버튼 안 뜨게 제어
                // setShowMore(false);
            }
        } catch (err) {
            console.error("6개월 이전 예약 불러오기 실패", err);
        }
    };
    const handleLoadOldForComplete = async () => {
        try {
            const oldData = await fetchOldReservations(accessToken);
            if (oldData.length > 0) {
                dispatch({ type: "ADD_OLD_RESERVATIONS", payload: oldData });
            } else {
                alert("더 이상 불러올 예약이 없습니다.");
                setShowMoreComplete(false);  // 이걸로 더 이상 버튼 안 뜨게 제어
            }
        } catch (err) {
            console.error("6개월 이전 예약 불러오기 실패", err);
        }
    };
    const handleLoadOldForCancel = async () => {
        try {
            const oldData = await fetchOldReservations(accessToken);
            if (oldData.length > 0) {
                dispatch({ type: "ADD_OLD_RESERVATIONS", payload: oldData });
            } else {
                alert("더 이상 불러올 예약이 없습니다.");
                setShowMoreCancel(false);  // 이걸로 더 이상 버튼 안 뜨게 제어
            }
        } catch (err) {
            console.error("6개월 이전 예약 불러오기 실패", err);
        }
    };

    const handleCancel = (orderCode) => {
        console.log("취소 요청 들어온 orderCode:", orderCode);
        if (!orderCode) {
            alert("취소할 예약이 없습니다.");
            return;
        }
        if (window.confirm("정말 이 예약을 취소하시겠습니까?")) {
            cancelMyReservation(orderCode, accessToken)
                .then(() => {
                    alert("예약이 취소되었습니다.");
                    dispatch({ type: "REMOVE_RESERVATION", payload: orderCode });
                })
                .catch(err => {
                    alert("예약 취소 중 오류가 발생했습니다.");
                    console.error(err);
                });
        }
    }

    const openReviewModal = (orderCode) => {
        console.log("openReviewModal 호출됨 - orderCode:", orderCode);
        setSelectedOrderCode(orderCode);
    };

    const closeReviewModal = () => {
        console.log("closeReviewModal 호출됨");
        setSelectedOrderCode(null);
    };

    const handleDeleteReview = async (reviewCode, orderCode) => {
        try {
            await deleteMyReview(reviewCode, accessToken);
            alert("리뷰가 삭제되었습니다.");

            // 삭제된 리뷰의 상태를 업데이트
            dispatch({
                type: "UPDATE_REVIEW_STATUS",
                payload: { orderCode, reviewed: false }
            });

            closeReviewModal();  // 모달 닫기
        } catch (error) {
            alert("리뷰 삭제에 실패했습니다.");
            console.error("리뷰 삭제 오류:", error);
        }
    };

    return(
        <>
            <MyBookingCom
                selectedTab={selectedTab}
                onChangeTab={(index) => setSelectedTab(index)}
                reservations={state.reservations}
                onCancelReservation={handleCancel}
                onLoadOldReservationsForSchedule={handleLoadOldForSchedule}
                onLoadOldReservationsForComplete={handleLoadOldForComplete}
                onLoadOldReservationsForCancel={handleLoadOldForCancel}
                showMoreSchedule={showMoreSchedule}
                showMoreComplete={showMoreComplete}
                showMoreCancel={showMoreCancel}
                openReviewModal={openReviewModal}
            />
            {selectedOrderCode &&
                <MyReviewModalCon orderCode={selectedOrderCode}
                                  onClose={closeReviewModal}
                                  onDeleteReview={handleDeleteReview} />}
        </>)
}
export default MyBookingCon;