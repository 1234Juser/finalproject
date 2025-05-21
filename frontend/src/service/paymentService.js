import axios from 'axios';

const path = "http://localhost:8080";

// SSR방식

// 주문 정보 조회
export const getOrderByOrderCode = async (orderCode, accessToken) => {
    // const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        console.error("accessToken 없음");
        throw new Error("Access Token이 필요합니다.");
    }
    console.log("🔍 [getOrderByOrderCode] orderCode =", orderCode);
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    try {
        const response = await axios.get(`${path}/order/${orderCode}`, config);
        return response.data;
    } catch (error) {
        console.error("주문 정보 조회 실패:", error);
        console.error("❌ 주문 정보 조회 실패:");
        console.error("🔹 status:", error.response?.status);
        console.error("🔹 data:", error.response?.data);
        console.error("🔹 orderCode:", orderCode);
        throw error;
    }
};

// 결제 수단 목록 불러오기
export const fetchPaymentMethods = async () => {
    try {
        const response = await axios.get(`${path}/payments/methods`);
        return response.data; // ["CARD", "KAKAO_PAY", "BANK_TRANSFER", ...]
    } catch (error) {
        console.error("🔴 결제 수단 불러오기 실패:", error);
        throw error;
    }
};

// 결제 요청은 아임포트에서 알아서 진행
// export const requestPayment = async (paymentData, accessToken) => {
//     try {
//         const response = await axios.post(
//             `${path}/payments/create`,
//             paymentData,
//             {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             }
//         );
//         return response.data;
//     } catch (error) {
//         console.error("결제 요청 실패:", error);
//         throw error;
//     }
// };