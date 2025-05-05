import AdminBookingCom from "../../components/booking/AdminBookingCom";
import {useEffect, useReducer, useState} from "react";
import {cancelReservations, fetchAllReservations} from "../../service/reservationService";
import {initialState, reservationReducer} from "../../modules/reservationModule";

function AdminBookingCon(){
    const [state, dispatch] = useReducer(reservationReducer, initialState);
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [start, setStart] = useState(1);
    const onClick = (start) => {
        setStart(start);
    }

    useEffect(() => {
        dispatch({ type: "LOADING" });
        fetchAllReservations(start)
            .then(data => {
                console.log("API 응답 확인:", data);
                dispatch({ type: "FETCH_SUCCESS", payload: data })
            })
            .catch(err => {
                console.error("예약 조회 실패:", err.message);
                dispatch({ type: "FETCH_ERROR", payload: err.message });
            });
    }, [start]);

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
        console.log("선택된 예약코드 목록:", selectedOrders);
        try {
            const response = await cancelReservations(selectedOrders);
            alert("예약이 성공적으로 취소되었습니다.");
            setSelectedOrders([]); // 선택 초기화

            // 목록 갱신
            const newData = await fetchAllReservations();
            dispatch({ type: "FETCH_SUCCESS", payload: newData });
        } catch (err) {
            alert("예약 취소에 실패했습니다.");
            console.error(err);
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