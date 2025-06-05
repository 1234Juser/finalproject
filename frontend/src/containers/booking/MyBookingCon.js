import MyBookingCom from "../../components/booking/MyBookingCom";
import {useEffect, useReducer, useState} from "react";
import {
    cancelMyReservation, fetchRecentReservations,
    fetchOldReservations, fetchOldReservationsByStatus
} from "../../service/reservationService";
import {initialState, reservationReducer} from "../../modules/reservationModule";
import {deleteMyReview} from "../../service/reviewService";
import MyReviewModalCon from "../review/MyReviewModalCon";
import dayjs from "dayjs";
import {getProductDetail} from "../../service/ProductService";

function MyBookingCon({accessToken}){
    const [selectedTab, setSelectedTab] = useState(0);
    const [state, dispatch] = useReducer(reservationReducer, initialState);
    const [showMoreSchedule, setShowMoreSchedule] = useState(true);
    const [showMoreComplete, setShowMoreComplete] = useState(true);
    const [showMoreCancel, setShowMoreCancel] = useState(true);
    const [selectedOrderCode, setSelectedOrderCode] = useState(null);
    const [autoLoadingDone, setAutoLoadingDone] = useState(false);
    const [cityIdMap, setCityIdMap] = useState({}); // 해당 예약이 가지고 있는 상품이 가지고 있는 도시정보

    // 가장 오래된 예약찾기
    function getEarliestReservationDate(status) {
        const filtered = state.reservations
            .filter(r => r.orderStatus?.toUpperCase() === status.toUpperCase())
            .map(r => dayjs(r.reservationDate));

        if (filtered.length === 0) return dayjs(); // fallback

        return filtered.reduce((earliest, current) =>
            current.isBefore(earliest) ? current : earliest
        );
    }

    useEffect(() => {
        const fetchCityIds = async () => {
            const map = {};
            const uniqueProductUids = [...new Set(state.reservations.map(r => r.productUid))];
            for (const uid of uniqueProductUids) {
                try {
                    const product = await getProductDetail(uid, accessToken);
                    map[uid] = product.city?.cityId || product.cityId; // product.city가 객체거나 숫자
                } catch (e) {
                    console.error("도시 정보 조회 실패:", uid);
                }
            }
            setCityIdMap(map);
        };

        if (accessToken && state.reservations.length > 0) {
            fetchCityIds();
        }
    }, [state.reservations, accessToken]);

    useEffect(() => {
        if (!accessToken) {
            alert("로그인이 필요합니다.");
            return;
        }
        const fetchData = async () => {
            try {
                dispatch({ type: "LOADING" });
                const data = await fetchRecentReservations(accessToken);
                dispatch({ type: "FETCH_SUCCESS", payload: data });
            } catch (err) {
                dispatch({ type: "FETCH_ERROR", payload: err.message });
            } finally {
                setAutoLoadingDone(true);
            }
        };
        fetchData();
    }, [accessToken]);

    const filteredCompleted = state.reservations.filter(r => r.orderStatus === "COMPLETED");
    // 최초 진입 시 실행. 예약 존재하긴 한다면 나오는 그 순간까지.
    useEffect(() => {
        const loadCompletedInPastRanges = async () => {
            let found = false;
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

    const filteredCanceled = state.reservations.filter(r => r.orderStatus === "CANCELED");
    useEffect(() => {
        const loadCanceledInPastRanges = async () => {
            let found = false;
            let attempts = 0;
            setAutoLoadingDone(false);
            const today = dayjs();

            for (let attempts = 1; attempts <= 3; attempts++) {
                const endDate = today.subtract(6 * (attempts - 1), "month");
                const startDate = endDate.subtract(6, "month");
                try {
                    const data = await fetchOldReservationsByStatus(
                        "CANCELED",
                        accessToken,
                        startDate.format("YYYY-MM-DD"),
                        endDate.format("YYYY-MM-DD")
                    );
                    const canceled = data.filter(r => r.orderStatus === "CANCELED");

                    if (canceled.length > 0) {
                        dispatch({ type: "ADD_OLD_RESERVATIONS", payload: canceled });
                        break;
                    }
                } catch (err) {
                    break;
                }
            }
            setAutoLoadingDone(true);
        };
        if (selectedTab === 2 && filteredCanceled.length === 0) {
            loadCanceledInPastRanges();
        } else if (selectedTab === 2) {
            setAutoLoadingDone(true);
        }
    }, [selectedTab]);

    const handleLoadOldForSchedule = async () => {
        try {
            const oldData = await fetchOldReservations(accessToken);
            // 실제로 화면에 추가될 예약만 추출 (SCHEDULED or WAITING_BANK_TRANSFER)
            const filtered = oldData.filter(r =>
                ["SCHEDULED", "WAITING_BANK_TRANSFER"].includes(r.orderStatus?.toUpperCase())
            );

            if (filtered.length > 0) {
                dispatch({
                    type: "ADD_OLD_RESERVATIONS",
                    payload: filtered,
                    meta: { statusList: ["SCHEDULED", "WAITING_BANK_TRANSFER"] }
                });
            } else {
                alert("더 이상 불러올 예약이 없습니다.");
                setShowMoreSchedule(false);  // 이걸로 더 이상 버튼 안 뜨게 제어
            }
        } catch (err) {
            alert("6개월 이전 예약 불러오기 실패했습니다.");
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
                dispatch({
                    type: "ADD_OLD_RESERVATIONS",
                    payload: oldData,
                    meta: { status: "COMPLETED" }
                });
            } else {
                alert("더 이상 불러올 예약이 없습니다.");
                setShowMoreComplete(false);  // 이걸로 더 이상 버튼 안 뜨게 제어
            }
        } catch (err) {
            alert("6개월 이전 예약 불러오기 실패했습니다.");
        }
    };
    const handleLoadOldForCancel = async () => {
        try {
            const earliest = getEarliestReservationDate("CANCELED");
            const endDate = dayjs(earliest).subtract(1, "day");
            const startDate = endDate.subtract(6, "month");
            const oldData = await fetchOldReservations(
                "CANCELED",
                accessToken,
                startDate.format("YYYY-MM-DD"),
                endDate.format("YYYY-MM-DD")
            );
            if (oldData.length > 0) {
                dispatch({
                    type: "ADD_OLD_RESERVATIONS",
                    payload: oldData,
                    meta: { status: "CANCELED" }
                });
            } else {
                alert("더 이상 불러올 예약이 없습니다.");
                setShowMoreCancel(false);  // 이걸로 더 이상 버튼 안 뜨게 제어
            }
        } catch (err) {
            alert("6개월 이전 예약 불러오기 실패했습니다.");
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
                });
        }
    }

    const openReviewModal = (orderCode) => {
        setSelectedOrderCode(orderCode);
    };

    const closeReviewModal = () => {
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
                autoLoadingDone={autoLoadingDone}
                cityIdMap={cityIdMap}
            />
            {selectedOrderCode &&
                <MyReviewModalCon
                    orderCode={selectedOrderCode}
                    onClose={closeReviewModal}
                    onDeleteReview={handleDeleteReview}
                    accessToken={accessToken}
                />}
        </>)
}
export default MyBookingCon;