import axios from "axios";

const BASE_URL = "http://localhost:8080";

// 본인 예약 조회
// export async function fetchMyReservations(memberCode, start = 0) {
//     const res = await axios.get(`/my/reservations/list/${memberCode}?start=${start}`);
//     return res.data;
// }
// 최근 6개월 이내 본인예약 조회
export async function fetchRecentReservations(memberCode) {
    const response = await axios.get(`${BASE_URL}/my/reservations/recent/${memberCode}`);
    return response.data;
}

// 6개월 이전 본인예약 추가 조회
export async function fetchOldReservations(memberCode) {
    const response = await axios.get(`${BASE_URL}/my/reservations/old/${memberCode}`);
    return response.data;
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
export async function cancelMyReservation(orderCode) {
    const response = await axios.patch(`/my/reservations/cancel/${orderCode}`)
    return response.data;
}