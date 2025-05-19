import { useEffect, useReducer, useState } from "react";
import {
    cancelReservations,
    fetchReservationsByProductCode,
    fetchProductListForFilter, updateReservationStatus
} from "../../service/reservationService";
import { initialState, reservationReducer } from "../../modules/reservationModule";
import AdminBookingByProductCom from "../../components/booking/AdminBookingByProductCom";

function AdminBookingByProductCon({accessToken}) {
    const [state, dispatch] = useReducer(reservationReducer, initialState);
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [start, setStart] = useState(1);
    const [selectedProductCode, setSelectedProductCode] = useState(null);
    const [products, setProducts] = useState([]);

    const onClick = (page) => {
        setStart(page);
    };

    // 상품 목록 불러오기
    useEffect(() => {
        if (!accessToken) {
            alert("토큰이 없습니다.");
            return;
        }
        fetchProductListForFilter(accessToken)
            .then((res) => {
                console.log("상품 필터용 product 목록:", res);
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

        fetchReservationsByProductCode(selectedProductCode, accessToken, start)
            .then((data) => {
                console.log("예약 데이터 응답:", data);
                dispatch({ type: "FETCH_SUCCESS", payload: data });

                // 예약 상태 자동 업데이트 함수
                if (data.reservations && data.reservations.length > 0) {
                    const updatePromises = data.reservations.map((reservation) => {
                        const reservationDate = new Date(reservation.reservationDate);
                        const today = new Date();

                        // 예약일이 지났는지 확인
                        if (reservationDate < today && reservation.orderStatus === "SCHEDULED") {
                            return updateReservationStatus(accessToken, reservation.orderCode)
                                .then(() => console.log(`예약 상태 업데이트 완료: ${reservation.orderCode}`))
                                .catch(err => console.error(`예약 상태 업데이트 실패: ${reservation.orderCode}`, err));
                        }

                        return Promise.resolve(); // 상태 변경이 필요하지 않은 경우
                    });

                    // 모든 상태 업데이트가 완료된 후 로그 출력
                    Promise.all(updatePromises).then(() => console.log("모든 예약 상태 업데이트 완료"));
                }

            })
            .catch((err) => {
                console.error("예약 조회 실패:", err.response?.data || err.message);
                dispatch({ type: "FETCH_ERROR", payload: err.message });
            });
    }, [selectedProductCode, accessToken, start]);      // 상품이 바뀔 때마다 조회

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
