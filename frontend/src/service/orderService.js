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
            JSON.stringify({ reservationDate }),
            {
                headers: {
                    "Content-Type": "application/json",
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

export const fetchOptionsByDate = async (productUid, reservationDate) => {
    try {
        const formattedDate = reservationDate instanceof Date
            ? reservationDate.toISOString().split("T")[0]
            : reservationDate;

        const response = await axios.get(`${path}/products/${productUid}/option`, {
            params: { date: reservationDate },
        });
        console.log("🟢 옵션 가격 데이터 가져오기 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("🔴 옵션 가격 데이터를 불러오는 데 실패했습니다:", error);
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
export const fetchOptionsByDateRange = async (productUid, startDate, endDate) => {
    try {
        const response = await axios.get(`${path}/products/${productUid}/option`, {
            params: { startDate, endDate },
        });
        console.log("🟢 옵션 가격 데이터 가져오기 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("🔴 옵션 가격 데이터를 불러오는 데 실패했습니다:", error);
        throw error;
    }
};

// 주문 생성
export const createOrder = async (productUid, optionData, accessToken) => {
    if (!accessToken) {
        console.error("accessToken 없음");
        alert("로그인이 필요한 서비스 입니다.");
        return;
    }
    try {
        // optionData를 주문 생성에 필요한 데이터로 변환
        const orderData = {
            optionCode: optionData.optionCode,
            reservationDate: optionData.reservationDate,
            adultCount: optionData.adultCount || 0,
            childCount: optionData.childCount || 0,
            totalPrice: optionData.totalPrice,
            productTitle: optionData.productTitle,
        };
        const response = await axios.post(`${path}/products/${productUid}/order/create`, orderData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        console.log("🟢 주문 생성 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("🔴 주문 생성 실패:", error);
        return null;
    }
};

// 주문 상세 조회
export const fetchOrderDetails = async (bookingUid, accessToken) => {
    if (!accessToken) {
        console.error("🔴 accessToken 없음");
        return;
    }
    try {
        const response = await axios.get(`${path}/order/${bookingUid}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log("🟢 주문 상세 조회 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("🔴 주문 상세 조회 실패:", error);
        throw error;
    }
};

// 옵션 상세 조회 (OrderCheckoutCon에서 사용)
export const fetchOptionDetails = async (productUid, optionCode, accessToken) => {
    try {
        const response = await axios.get(`${path}/products/${productUid}/options/${optionCode}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log("🟢 옵션 상세 조회 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("🔴 옵션 상세 조회 실패:", error);
        throw error;
    }
};