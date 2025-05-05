import axios from "axios";

const path = "http://localhost:8080";

// 본인 예약 조회
// export async function fetchMyReservations(memberCode, start = 0) {
//     const res = await axios.get(`/my/reservations/list/${memberCode}?start=${start}`);
//     return res.data;
// }
// 최근 6개월 이내 본인예약 조회
export async function fetchRecentReservations() {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        console.error("accessToken 없음");
        return;
    }
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
export async function fetchOldReservations() {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        console.error("accessToken 없음");
        return;
    }
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
export async function fetchAllReservations(start = 0) {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        console.error("accessToken 없음");
        return;
    }
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
export async function updateReservationStatus(orderCode) {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        console.error("accessToken 없음");
        return;
    }
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await axios.post(`${path}/reservation/update-status/completed/${orderCode}`, config);
        return res.data;
    } catch (error) {
        console.error("updateReservationStatus 실패", error.response?.data || error.message);
        throw error;
    }
}

// 관리자가 예약 취소(다중 가능)
export async function cancelReservations(orderCodeList) {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        console.error("accessToken 없음");
        return;
    }
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
export async function cancelMyReservation(orderCode) {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        console.error("accessToken 없음");
        return;
    }
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.patch(`${path}/my/reservations/cancel/${orderCode}`, config)
        return response.data;
    } catch (error) {
        console.error("cancelMyReservation 실패", error.response?.data || error.message);
        throw error;
    }
}