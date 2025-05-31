import { useEffect, useReducer, useState } from "react";
import {cancelReservations,
    fetchReservationsByProductCode, fetchProductListForFilter
} from "../../service/reservationService";
import { initialState, reservationReducer } from "../../modules/reservationModule";
import AdminBookingByProductCom from "../../components/booking/AdminBookingByProductCom";

function AdminBookingByProductCon({accessToken}) {
    const [state, dispatch] = useReducer(reservationReducer, initialState);
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [start, setStart] = useState(1);
    const [selectedProductCode, setSelectedProductCode] = useState(null);
    const [products, setProducts] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("all");

    const onClick = (page) => {
        setStart(page);
    };

    const handleStatusChange = (e) => {
        setStart(1); // 필터 변경 시 1페이지로 초기화
        setSelectedStatus(e.target.value);
    };

    // 상품 목록 불러오기
    useEffect(() => {
        if (!accessToken) {
            alert("토큰이 없습니다.");
            return;
        }
        fetchProductListForFilter(accessToken)
            .then((res) => {
                setProducts(res);
            })
            .catch((e) => console.error("상품 목록 불러오기 실패", e));
    }, [accessToken]);

    // 예약 목록 불러오기 (상품 필터 기준)
    useEffect(() => {
        if (!accessToken) {
            alert("토큰이 없습니다.");
            return;
        }
        if (accessToken) {
            try {
                const decoded = JSON.parse(atob(accessToken.split('.')[1]));
                const roles = decoded.roles;
                if (!roles.includes("ROLE_ADMIN")) {
                    alert("접근 권한이 없습니다. 관리자만 접근할 수 있습니다.");
                    return;
                }
            } catch (e) {
                alert("인증 정보가 잘못되었습니다. 다시 로그인 해주세요.");
                return;
            }
        } else {
            alert("로그인이 필요합니다.");
            return;
        }

        dispatch({ type: "LOADING" });

        fetchReservationsByProductCode(selectedProductCode, accessToken, start, selectedStatus)
            .then((data) => {
                dispatch({ type: "FETCH_SUCCESS", payload: data });
            })
            .catch((err) => {
                dispatch({ type: "FETCH_ERROR", payload: err.message });
            });
    }, [selectedProductCode, accessToken, start, selectedStatus]);      // 상품이 바뀔 때마다 조회

    const { reservations, loading, currentPage, totalPages } = state;

    const handleCheck = (orderCode) => {
        setSelectedOrders((prev) =>
            prev.includes(orderCode)
                ? prev.filter((code) => code !== orderCode)
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
            alert("예약이 성공적으로 취소되었습니다.");
            setSelectedOrders([]);

            const updated = await fetchReservationsByProductCode(selectedProductCode, accessToken, start);
            dispatch({ type: "FETCH_SUCCESS", payload: updated });
        } catch (err) {
            alert("예약 취소에 실패했습니다.");
        }
    };

    const handleProductChange = (e) => {
        const value = e.target.value;
        setStart(1); // 필터 변경 시 1페이지로 초기화
        setSelectedProductCode(value === "all" ? null : Number(value))
    };

    return (
        <AdminBookingByProductCom
            products={products}
            reservations={reservations}
            loading={loading}
            currentPage={currentPage}
            totalPages={totalPages}
            selectedOrders={selectedOrders}
            onCheck={handleCheck}
            onSubmit={handleSubmit}
            onClick={onClick}
            selectedProductCode={selectedProductCode}
            onProductChange={handleProductChange}
            selectedStatus={selectedStatus}
            onStatusChange={handleStatusChange}
        />
    );
}

export default AdminBookingByProductCon;
