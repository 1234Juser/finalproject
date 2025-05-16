import AdminBookingCom from "../../components/booking/AdminBookingCom";
import {useEffect, useReducer, useState} from "react";
import {cancelReservations, fetchAllReservations} from "../../service/reservationService";
import {initialState, reservationReducer} from "../../modules/reservationModule";

function AdminBookingCon({accessToken}){
    const [state, dispatch] = useReducer(reservationReducer, initialState);
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [start, setStart] = useState(1);
    const onClick = (start) => {
        setStart(start);
    }

    useEffect(() => {
        if (!accessToken) {
            alert("토큰이 없습니다.");
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
        dispatch({ type: "LOADING" });
        fetchAllReservations(accessToken, start)
            .then(data => {
                console.log("API 응답 확인:", data);
                dispatch({ type: "FETCH_SUCCESS", payload: data })
            })
            .catch(err => {
                if (err.response?.status === 403) {
                    alert("접근 권한이 없습니다. 관리자만 조회할 수 있습니다.");
                } else {
                    console.error("예약 조회 실패:", err.message);
                    alert("예약 목록 조회에 실패했습니다.");
                }
                    dispatch({ type: "FETCH_ERROR", payload: err.message });
            });
            } catch (e) {
                console.error("토큰 디코딩 오류:", e);
                alert("인증 정보가 잘못되었습니다. 다시 로그인 해주세요.");
            }
    }, [accessToken, start]);

    const { reservations, loading, currentPage, totalPages } = state;

    const handleCheck = (orderCode) => {
        setSelectedOrders(prev =>
            prev.includes(orderCode)
                ? prev.filter(code => code !== orderCode)
                : [...prev, orderCode]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedOrders.length === 0) {
            alert("예약을 먼저 선택하세요.");
            return;
        }

        const confirmed = window.confirm("선택한 예약을 정말 취소하시겠습니까?");
        if (!confirmed) return;
        try {
            console.log("선택된 예약코드 목록:", selectedOrders);
            // 선택된 예약 상태 체크
            const invalidOrders = reservations.filter(reservation =>
                selectedOrders.includes(reservation.orderCode) &&
                (reservation.orderStatus === "CANCELED" || reservation.orderStatus === "COMPLETED")
            );

            if (invalidOrders.length > 0) {
                invalidOrders.forEach(res => {
                    if (res.orderStatus === "CANCELED") {
                        alert(`예약 번호 ${res.orderCode}는 이미 취소된 여행입니다.`);
                    }
                    if (res.orderStatus === "COMPLETED") {
                        alert(`예약 번호 ${res.orderCode}는 종료된 여행이므로 취소할 수 없습니다.`);
                    }
                });
                return;
            }
            // 예약 취소 요청
            await cancelReservations(selectedOrders, accessToken);
            // const response = await cancelReservations(selectedOrders, accessToken);
            alert("예약이 성공적으로 취소되었습니다.");
            setSelectedOrders([]); // 선택 초기화

            // 목록 갱신
            const newData = await fetchAllReservations(accessToken, start);
            dispatch({ type: "FETCH_SUCCESS", payload: newData });
        } catch (err) {
            if (err.response?.status === 403) {
                alert("예약 취소 권한이 없습니다. 관리자만 수행할 수 있습니다.");
            } else {
                alert("예약 취소에 실패했습니다.");
            }
            console.error("예약 취소 실패:", err.response?.data || err.message);
        }
    };

    return(
        <>
            <AdminBookingCom
                reservations={reservations}
                loading={loading}
                currentPage={currentPage}
                totalPages={totalPages}
                selectedOrders={selectedOrders}
                onCheck={handleCheck}
                onSubmit={handleSubmit}
                onClick={onClick}
            />
        </>
    )
}
export default AdminBookingCon;