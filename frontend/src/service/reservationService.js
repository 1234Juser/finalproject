import axios from "axios";

const path = "http://localhost:8080";

// 본인 예약 조회
// export async function fetchMyReservations(memberCode, start = 0) {
//     const res = await axios.get(`/my/reservations/list/${memberCode}?start=${start}`);
//     return res.data;
// }
// 최근 6개월 이내 본인예약 조회
export async function fetchRecentReservations(accessToken) {
    if (!accessToken) {
        console.error("accessToken 없음");
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
        console.error("fetchRecentReservations 실패", error.response?.data || error.message);
        throw error;
    }
}

// 6개월 이전 본인예약 추가 조회
export async function fetchOldReservations(accessToken) {
    if (!accessToken) {
        console.error("accessToken 없음");
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
        console.error("fetchOldReservations 실패", error.response?.data || error.message);
        throw error;
    }
}

// 관리자의 예약 관리
export async function fetchAllReservations(accessToken, start = 0) {
    if (!accessToken) {
        console.error("accessToken 없음");
        return;
    }
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    };

    try {
        const res = await axios.get(`${path}/admin/booking?start=${start}`, config);
        return res.data;
    } catch (error) {
        console.error("fetchAllReservations 실패", error.response?.data || error.message);
        throw error;
    }
}

// 예약일이 지나면 상태변경
export async function updateReservationStatus(accessToken) {
    if (!accessToken) {
        console.error("accessToken 없음");
        return;
    }
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    };

    try {
        // const response = await axios.patch(`${path}/reservation/update-status/completed/${orderCode}`, {}, config);
        const response = await axios.get("/reservations", config);
        return response.data;
    } catch (error) {
        console.error("updateReservationStatus 실패", error.response?.data || error.message);
        throw error;
    }
}

// 관리자가 예약 취소(다중 가능)
export async function cancelReservations(orderCodeList, accessToken) {
    if (!accessToken) {
        console.error("accessToken 없음");
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
        console.error("cancelReservations 실패", error.response?.data || error.message);
        throw error;
    }
}

// 로그인 사용자가 본인의 예약 취소
export async function cancelMyReservation(orderCode, accessToken) {
    if (!accessToken) {
        console.error("accessToken 없음");
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
        console.error("cancelMyReservation 실패", error.response?.data || error.message);
        throw error;
    }
}

// 상품 목록 조회 (관리자 예약 필터용)
export async function fetchProductListForFilter(accessToken) {
    if (!accessToken) {
        console.error("accessToken 없음");
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
            console.warn("예상치 못한 응답 형식:", res.data);
            return [];
        }
    } catch (error) {
        console.error("fetchProductListForFilter 실패", error.response?.data || error.message);
        throw error;
    }
}

// 상품별 예약 조회
// 디폴트인 전체일 경우 /admin/booking으로 요청
export async function fetchReservationsByProductCode(productCode, accessToken, start = 1) {
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
        console.error("fetchReservationsByProductCode 실패", error.response?.data || error.message);
        throw error;
    }
}