import axios from "axios";

// 본인 예약 조회
export async function fetchMyReservations(memberCode, start = 0) {
    const res = await axios.get(`/mypage/reservations/list/${memberCode}?start=${start}`);
    return res.data;
}

// 관리자의 예약 관리
export async function fetchAllReservations(start = 0) {
    const res = await axios.get(`/admin/booking?start=${start}`);
    return res.data;
}

// 예약일이 지나면 상태변경
export async function updateReservationStatus(orderCode) {
    const res = await axios.post(`/reservation/update-status/completed/${orderCode}`);
    return res.data;
}

// 관리자가 예약 취소
export async function cancelReservations(orderCodeList) {
    const res = await axios.post("/admin/booking/cancel", orderCodeList);
    return res.data;
}

// 로그인 사용자가 본인의 예약 취소