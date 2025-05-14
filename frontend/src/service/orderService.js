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

export const fetchOptionForm = async (productUid) => {
    try {
        const response = await axios.get(`${path}/products/${productUid}/option/create`);
        console.log("🟢 옵션 폼 데이터 가져오기 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("🔴 옵션 폼 데이터 가져오기 실패:", error);
        throw error;
    }
};

export const selectReservationDate = async (productUid, reservationDate) => {
    try {
        const response = await axios.patch(
            `${path}/products/${productUid}/reservation-date`,
            JSON.stringify({ reservationDate }),{
                headers: {
                    "Content-Type": "application/json"
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error saving reservation date:", error);
        throw error;
    }
};

export const saveReservation = async (productUid, reservationDate, accessToken) => {
    try {
        const response = await axios.patch(
            `${path}/products/${productUid}/reservation`,
            { reservationDate },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error saving reservation:", error);
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
// export const fetchOptionsByDate = async (productUid) => {
//     try {
//         const response = await axios.get(`${path}/products/${productUid}/options`);
//         return response.data;
//     } catch (error) {
//         console.error("🔴 옵션 가격 데이터를 불러오는 데 실패했습니다:", error);
//         throw error;
//     }
// };

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