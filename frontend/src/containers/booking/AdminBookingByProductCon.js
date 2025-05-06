import { useEffect, useReducer, useState } from "react";
import {
    cancelReservations,
    fetchReservationsByProductCode,
    fetchProductListForFilter
} from "../../service/reservationService";
import { initialState, reservationReducer } from "../../modules/reservationModule";
import AdminBookingByProductCom from "../../components/booking/AdminBookingByProductCom";

function AdminBookingByProductCon() {
    const [state, dispatch] = useReducer(reservationReducer, initialState);
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [start, setStart] = useState(1);
    const [selectedProductCode, setSelectedProductCode] = useState(null);
    const [products, setProducts] = useState([]);

    const onClick = (page) => {
        setStart(page);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                dispatch({ type: 'LOADING' });
                const data = await fetchReservationsByProductCode(selectedProductCode); // null이면 전체
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error) {
                console.error("예약 조회 실패:", error);
                dispatch({ type: 'FETCH_ERROR', payload: error });
            }
        }

        fetchData();
    }, [selectedProductCode]); // 상품이 바뀔 때마다 조회

    // 상품 목록 불러오기
    useEffect(() => {
        fetchProductListForFilter()
            .then((res) => {
                console.log("상품 필터용 product 목록:", res);
                setProducts(res);
            })
            .catch((e) => console.error("상품 목록 불러오기 실패", e));
    }, []);

    // 예약 목록 불러오기 (상품 필터 기준)
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            try {
                const decoded = JSON.parse(atob(token.split('.')[1]));
                const roles = decoded.roles;
                if (!roles.includes("ROLE_ADMIN")) {
                    alert("접근 권한이 없습니다. 관리자만 접근할 수 있습니다.");
                    return;
                }
            } catch (e) {
                console.error("토큰 디코딩 오류:", e);
                alert("인증 정보가 잘못되었습니다. 다시 로그인 해주세요.");
                return;
            }
        } else {
            alert("로그인이 필요합니다.");
            return;
        }

        console.log("선택된 productCode:", selectedProductCode);
        console.log("페이지:", start);

        dispatch({ type: "LOADING" });

        fetchReservationsByProductCode(selectedProductCode, start)
            .then((data) => {
                console.log("예약 데이터 응답:", data);
                dispatch({ type: "FETCH_SUCCESS", payload: data });
            })
            .catch((err) => {
                console.error("예약 조회 실패:", err.response?.data || err.message);
                dispatch({ type: "FETCH_ERROR", payload: err.message });
            });
    }, [selectedProductCode, start]);

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
            await cancelReservations(selectedOrders);
            alert("예약이 성공적으로 취소되었습니다.");
            setSelectedOrders([]);

            const updated = await fetchReservationsByProductCode(selectedProductCode, start);
            dispatch({ type: "FETCH_SUCCESS", payload: updated });
        } catch (err) {
            console.error("예약 취소 실패:", err.response?.data || err.message);
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
        />
    );
}

export default AdminBookingByProductCon;
