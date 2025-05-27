import MyBookingCom from "../../components/booking/MyBookingCom";
import {useEffect, useReducer, useState} from "react";
import {
    cancelMyReservation,
    fetchRecentReservations,
    fetchOldReservations,
    fetchOldReservationsByStatus
} from "../../service/reservationService";
import {initialState, reservationReducer} from "../../modules/reservationModule";
import {deleteMyReview} from "../../service/reviewService";
import MyReviewModalCon from "../review/MyReviewModalCon";
import dayjs from "dayjs";

function MyBookingCon({accessToken}){
    const [selectedTab, setSelectedTab] = useState(0);
    const [state, dispatch] = useReducer(reservationReducer, initialState);
    const [showMoreSchedule, setShowMoreSchedule] = useState(true);
    const [showMoreComplete, setShowMoreComplete] = useState(true);
    const [showMoreCancel, setShowMoreCancel] = useState(true);
    const [selectedOrderCode, setSelectedOrderCode] = useState(null);
    const [autoLoadingDone, setAutoLoadingDone] = useState(false);

    // 가장 오래된 예약찾기
    function getEarliestReservationDate(status) {
        const filtered = state.reservations
            .filter(r => r.orderStatus === status)
            .map(r => dayjs(r.reservationDate));

        if (filtered.length === 0) return dayjs(); // fallback

        return filtered.reduce((earliest, current) =>
            current.isBefore(earliest) ? current : earliest
        );
    }

    useEffect(() => {
        if (!accessToken) {
            alert("로그인이 필요합니다.");
            return;
        }
        try {
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
    }, [accessToken]);
    //         try {
    //             const data = await fetchRecentReservations(accessToken);
    //             dispatch({ type: "FETCH_SUCCESS", payload: data });
    //         } catch (err) {
    //             console.error("예약 조회 실패:", err.message);
    //             dispatch({ type: "FETCH_ERROR", payload: err.message });
    //         }
    //     }
    //     loadRecent();
    // }, [accessToken]);

    const filteredCompleted = state.reservations.filter(r => r.orderStatus === "COMPLETED");
    // 최초 진입 시 실행. 예약 존재하긴 한다면 나오는 그 순간까지.
    useEffect(() => {
        const loadCompletedInPastRanges = async () => {
            let found = false;
            // let beforeDate = dayjs(); // 기준은 오늘부터 시작
            // const loopLimit = 10; // 무한 루프 방지
            let attempts = 0;
            setAutoLoadingDone(false);
            const today = dayjs();

            for (let attempts = 1; attempts <= 3; attempts++) {
                const endDate = today.subtract(6 * (attempts - 1), "month");
                const startDate = endDate.subtract(6, "month");
                try {
                    const data = await fetchOldReservationsByStatus(
                        "COMPLETED",
                        accessToken,
                        startDate.format("YYYY-MM-DD"),
                        endDate.format("YYYY-MM-DD")
                    );
                    const completed = data.filter(r => r.orderStatus === "COMPLETED");

                    if (completed.length > 0) {
                        dispatch({type: "ADD_OLD_RESERVATIONS", payload: completed});
                        break;
                    }
                } catch (err) {
                    console.error("자동 로딩 실패:", err);
                    break;
                }
            }
            setAutoLoadingDone(true); // 자동 조회 끝났음
        };

        if (selectedTab === 1 && filteredCompleted.length === 0) {
            loadCompletedInPastRanges();
        } else if (selectedTab === 1) {
            setAutoLoadingDone(true); // 이미 데이터 있음
        }
    }, [selectedTab]);

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
            const earliest = getEarliestReservationDate("COMPLETED");
            const endDate = dayjs(earliest).subtract(1, "day"); // 이전 예약은 가장 이른 날짜 이전부터 시작
            const startDate = dayjs(endDate).subtract(6, "month");
            const oldData = await fetchOldReservationsByStatus(
                "COMPLETED",
                accessToken,
                startDate.format("YYYY-MM-DD"),
                endDate.format("YYYY-MM-DD")
            );
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

    useEffect(() => {
        const hasCompleted = state.reservations.some(r => r.orderStatus === "COMPLETED");
        const hasCanceled = state.reservations.some(r => r.orderStatus === "CANCELED");

        if (selectedTab === 1 && !hasCompleted && showMoreComplete && autoLoadingDone) {
            handleLoadOldForComplete(); // 자동 로딩 후 추가 요청 허용
        }

        if (selectedTab === 2 && !hasCanceled && showMoreCancel) {
            handleLoadOldForCancel();
        }
    }, [selectedTab, state.reservations, autoLoadingDone]);

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
                autoLoadingDone={autoLoadingDone}
            />
            {selectedOrderCode &&
                <MyReviewModalCon orderCode={selectedOrderCode}
                                  onClose={closeReviewModal}
                                  onDeleteReview={handleDeleteReview}
                                  accessToken={accessToken}
                />}
        </>)
}
export default MyBookingCon;