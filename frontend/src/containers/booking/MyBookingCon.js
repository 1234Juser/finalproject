import MyBookingCom from "../../components/booking/MyBookingCom";
import {useEffect, useReducer, useState} from "react";
import {cancelMyReservation, fetchRecentReservations, fetchOldReservations} from "../../service/reservationService";
import {initialState, reservationReducer} from "../../modules/reservationModule";

function MyBookingCon(){
    const [selectedTab, setSelectedTab] = useState(0);
    const [state, dispatch] = useReducer(reservationReducer, initialState);
    const [memberCode] = useState(Number(localStorage.getItem("memberCode")));
    const [showMoreSchedule, setShowMoreSchedule] = useState(true);
    const [showMoreComplete, setShowMoreComplete] = useState(true);
    const [showMoreCancel, setShowMoreCancel] = useState(true);
    const [showMoreAvailable, setShowMoreAvailable] = useState(true); // 일단 true로 설정
    const [oldReservations, setOldReservations] = useState([]); // 6개월 전 주문 담을 곳
    // const [currentPage, setCurrentPage] = useState(0);
    // const onPageClick = (currentPage) => {
    //     setCurrentPage(currentPage);
    // }

    useEffect(() => {
        // const member = JSON.parse(localStorage.getItem("member") || "{}");
        // const memberCode = member?.memberCode;
        // //혹은
        // const memberCode = Number(localStorage.getItem("memberCode"));
        console.log("로그인된 memberCode:", memberCode);
        if (!memberCode || isNaN(memberCode)) {
            console.error("로그인 정보가 없습니다.");
            return;
        }
        async function loadRecent() {
            dispatch({ type: "LOADING" });
            try {
                const data = await fetchRecentReservations(memberCode);
                dispatch({ type: "FETCH_SUCCESS", payload: data });
            } catch (err) {
                dispatch({ type: "FETCH_ERROR", payload: err.message });
            }
        }
        loadRecent();
    }, [memberCode]);
        // const parsedCode = Number(localStorage.getItem("memberCode"));
        // if (!parsedCode || isNaN(parsedCode)) {
        //     console.error("로그인 정보 없음");
        //     return;
        // }
        // async function loadAllPages(memberCode) {
        //     let page = 0;
        //     let allData = [];
        //     let totalPages = 1;
        //
        //     while (page < totalPages) {
        //         const res = await fetchMyReservations(memberCode, page);
        //         allData = allData.concat(res.list);
        //         totalPages = res.totalPages;
        //         page++;
        //     }
        //
        //     dispatch({ type: "FETCH_SUCCESS", payload: { list: allData } });
        // }
    //     async function loadData() {
    //         dispatch({ type: "LOADING" });
    //         try {
    //             const data = await fetchMyReservations(memberCode);
    //             console.log("불러온 예약 데이터:", data);
    //             // const data = await fetchMyReservations(parsedCode);
    //             dispatch({ type: "FETCH_SUCCESS", payload: data });
    //         } catch (err) {
    //             dispatch({ type: "FETCH_ERROR", payload: err.message });
    //         }
    //     }
    //     loadData();
    // }, []);

    const handleLoadOldForSchedule = async () => {
        try {
            const oldData = await fetchOldReservations(memberCode);
            if (oldData.length > 0) {
                dispatch({ type: "ADD_OLD_RESERVATIONS", payload: oldData });
            } else {
                alert("더 이상 불러올 예약이 없습니다.");
                setShowMoreSchedule(false);  // 이걸로 더 이상 버튼 안 뜨게 제어
            }
        } catch (err) {
            console.error("6개월 이전 예약 불러오기 실패", err);
        }
    };
    const handleLoadOldForComplete = async () => {
        try {
            const oldData = await fetchOldReservations(memberCode);
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
            const oldData = await fetchOldReservations(memberCode);
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
    // 통합형 사용하면 버튼이 다 사라져서 나누기로함
    // const handleLoadOld = async () => {
    //     try {
    //         const oldData = await fetchOldReservations(memberCode);
    //         if (oldData.length > 0) {
    //             dispatch({ type: "ADD_OLD_RESERVATIONS", payload: oldData });
    //         } else {
    //             alert("더 이상 불러올 예약이 없습니다.");
    //             setShowMoreAvailable(false);  // 이걸로 더 이상 버튼 안 뜨게 제어
    //         }
    //     } catch (err) {
    //         console.error("6개월 이전 예약 불러오기 실패", err);
    //     }
    // };
    // const onLoadOldReservations = async () => {
    //     try {
    //         const data = await fetchMyOldReservations(memberCode);
    //         setOldReservations(data);
    //         dispatch({ type: "ADD_OLD_RESERVATIONS", payload: data }); // reducer가 있다면
    //         setShowMoreAvailable(false); // 더 보기는 한 번만
    //     } catch (e) {
    //         console.error("6개월 전 예약 불러오기 실패", e);
    //     }
    // };
    // const handleLoadOld = async () => {
    //     try {
    //         const oldData = await fetchOldReservations(memberCode);
    //         dispatch({
    //             type: "FETCH_SUCCESS",
    //             payload: {
    //                 list: [...state.reservations, ...oldData.list], // 리스트 병합
    //                 totalPages: state.totalPages,
    //                 currentPage: state.currentPage
    //             }
    //         });
    //         setShowOld(true);
    //     } catch (err) {
    //         alert("이전 예약을 불러오지 못했습니다.");
    //         console.error(err);
    //     }
    // };

    const handleCancel = (orderCode) => {
        console.log("취소 요청 들어온 orderCode:", orderCode);
        if (!orderCode) {
            alert("취소할 예약이 없습니다.");
            return;
        }
        if (window.confirm("정말 이 예약을 취소하시겠습니까?")) {
            cancelMyReservation(orderCode)
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

    return(
    <>
        <MyBookingCom
            selectedTab={selectedTab}
            onChangeTab={(index) => setSelectedTab(index)}
            reservations={state.reservations}
            onCancelReservation={handleCancel}
            // onPageClick={onPageClick}
            // onLoadOldReservations={handleLoadOld}
            onLoadOldReservationsForSchedule={handleLoadOldForSchedule}
            onLoadOldReservationsForComplete={handleLoadOldForComplete}
            onLoadOldReservationsForCancel={handleLoadOldForCancel}
            // onLoadOldReservations={onLoadOldReservations}
            showMoreSchedule={showMoreSchedule}
            showMoreComplete={showMoreComplete}
            showMoreCancel={showMoreCancel}
        />
    </>)
}
export default MyBookingCon;