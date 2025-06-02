import axios from "axios";

// const path = "http://localhost:8080"
const path = "https://hellotravelogic.link";

// 최근 6개월 이내 본인예약 조회
export async function fetchRecentReservations(accessToken) {
    if (!accessToken) {
        return;
    }
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    };
    try {
        const response = await axios.get(`${path}/my/reservations/recent`, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 6개월 이전 본인예약 추가 조회
export async function fetchOldReservations(accessToken) {
    if (!accessToken) {
        return;
    }
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    };

    try {
        const response = await axios.get(`${path}/my/reservations/old`, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 관리자의 예약 관리
export async function fetchAllReservations(accessToken, start = 0, status = "all") {
    if (!accessToken) {
        return;
    }
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        params: {
            start: start,
        },
    };
    if (status && status !== "all") {
        config.params.orderStatus = status;
    }
    try {
        const res = await axios.get(`${path}/admin/booking?start=${start}`, config);
        return res.data;
    } catch (error) {
        throw error;
    }
}

// 관리자가 예약 취소(다중 가능)
export async function cancelReservations(orderCodeList, accessToken) {
    if (!accessToken) {
        return;
    }
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    };
    try {
        const res = await axios.post(`${path}/admin/booking/cancel`, orderCodeList, config);
        return res.data;
    } catch (error) {
        throw error;
    }
}

// 로그인 사용자가 본인의 예약 취소
export async function cancelMyReservation(orderCode, accessToken) {
    if (!accessToken) {
        return;
    }
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    };
    try {
        const response = await axios.patch(`${path}/my/reservations/cancel/${orderCode}`, {}, config);
        return response.data;
    } catch (error) {
        const message = error?.response?.data || "예약 취소 중 오류가 발생했습니다.";
        throw new Error(message);
    }
}

// 상품 목록 조회 (관리자 예약 필터용)
export async function fetchProductListForFilter(accessToken) {
    if (!accessToken) {
        return [];
    }

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    };
    try {
        const res = await axios.get(`${path}/admin/booking/products`, config);
        // return res.data;
        // 배열 형태로 반환
        if (Array.isArray(res.data)) {
            return res.data;
        } else {
            return [];
        }
    } catch (error) {
        throw error;
    }
}

// 상품별 예약 조회
// 디폴트인 전체일 경우 /admin/booking으로 요청
export async function fetchReservationsByProductCode(productCode, accessToken, start = 1, status = "all") {
    if (!accessToken) {
        console.error("accessToken 없음");
        return;
    }
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        params: { start }
    };
    if (status && status !== "all") {
        config.params.orderStatus = status;
    }
    try {
        if (productCode == null) {
            const res = await axios.get(`${path}/admin/booking`, config); // 전체 예약
            return res.data;
        } else {
            config.params.productCode = productCode;
            const res = await axios.get(`${path}/admin/booking/filter`, config); // 상품별 예약
            return res.data;
        }
    } catch (error) {
        throw error;
    }
}
// bookingUid로 예약 명세서 페이지 출력
export const fetchReservationByBookingUid = async (bookingUid, accessToken) => {
    try {
        const response = await axios.get(`${path}/reservations/receipt/${bookingUid}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }});
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 로그인 회원의 최신 미작성 리뷰 주문 조회
export async function fetchLatestUnreviewedOrder(accessToken) {
    if (!accessToken) {
        return [];
    }
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    };
    try {
        const response = await axios.get("/my/reservations/review-request", config);
        return response.data; // 성공 시 OrderDTO 객체
    } catch (error) {
        if (error.response && error.response.status === 204) {
            return null; // 리뷰 대상 없음
        } else {
            throw error;
        }
    }
}

// 상태별 예약 조회
export async function fetchOldReservationsByStatus(status, accessToken, startDate, endDate) {
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        params: {
            startDate,
            endDate
        }
    };
    const response = await axios.get(`${path}/my/reservations/old/${status}`, config);
    return response.data;
}