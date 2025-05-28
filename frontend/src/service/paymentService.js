import axios from 'axios';

const path = "http://localhost:8080";

// SSR방식

// 주문 정보 조회
export const getOrderByOrderCode = async (orderCode, accessToken) => {
    if (!accessToken) {
        throw new Error("Access Token이 필요합니다.");
    }
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    try {
        const response = await axios.get(`${path}/order/${orderCode}`, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 결제 수단 목록 불러오기
export const fetchPaymentMethods = async () => {
    try {
        const response = await axios.get(`${path}/payments/methods`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 주문명세서에서 출력
export const fetchPaymentByBookingUid = async (bookingUid, accessToken) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${accessToken}` }
        };
        const response = await axios.get(`/payments/booking/${bookingUid}`, config);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const fetchPaymentByImpUid = async (impUid, accessToken) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${accessToken}` }
        };
        const response = await axios.get(`/payments/imp/${impUid}`, config);
        return response.data;
    } catch (err) {
        throw err;
    }
};

// 결제 요청은 아임포트에서 알아서 진행
export const requestPayment = async (paymentData, accessToken) => {
    console.log("[requestPayment] 호출됨:", paymentData);
    try {
        const response = await axios.post(
            `${path}/payments/create`,
            paymentData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};