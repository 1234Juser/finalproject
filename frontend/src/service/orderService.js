import axios from "axios";

const path = "http://localhost:8080"

export const calculateTotalPrice = (adultCount, childCount, adultPrice, childPrice) => {
    return (adultCount * adultPrice) + (childCount * childPrice);
};

export const fetchProduct = async (productUid, accessToken) => {
    if (!accessToken) {
        console.error("accessToken 없음");
        return;
    }
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    };
    try {
        const response = await axios.get(`${path}/products/${productUid}`, config);
        return response.data;
    } catch (error) {
        console.error("상품 조회 실패:", error);
        throw error;
    }
};

export const fetchOptionForm = async (productUid, accessToken) => {
    try {
        const response = await axios.get(`${path}/products/${productUid}/option/create`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log("🟢 옵션 폼 데이터 가져오기 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("🔴 옵션 폼 데이터 가져오기 실패:", error);
        throw error;
    }
};

export const fetchOptionsByDate = async (productUid, date) => {
    try {
        const response = await axios.get(`${path}/products/${productUid}/options?date=${date}`);
        return response.data;
    } catch (error) {
        console.error("옵션 조회 실패:", error);
        throw error;
    }
};

export const createOrder = async (orderData, accessToken) => {
    if (!accessToken) {
        console.error("accessToken 없음");
        alert("로그인이 필요한 서비스 입니다.");
        return;
    }
    try {
        const response = await axios.post(`${path}/order/create`, orderData);
        return response.data;
    } catch (error) {
        console.error("주문 생성 실패:", error);
        return null;
    }
};