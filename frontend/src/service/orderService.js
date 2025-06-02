import axios from "axios";
import {format} from "date-fns";

const path = "http://localhost:8080"

export const calculateTotalPrice = (adultCount, childCount, adultPrice, childPrice) => {
    return (adultCount * adultPrice) + (childCount * childPrice);
};

export const fetchProduct = async (productUid, accessToken) => {
    if (!accessToken) {
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
        throw error;
    }
};

export const fetchOptionForm = async (productUid) => {
    try {
        const response = await axios.get(`${path}/products/${productUid}/option/create`);
        return response.data;
    } catch (error) {
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
        throw error;
    }
};

export const saveReservation = async (productUid, reservationDate, adultCount, childCount, accessToken) => {
    try {
        const response = await axios.patch(
            `${path}/products/${productUid}/reservation`,
            JSON.stringify({
                reservationDate,
                adultCount,
                childCount,
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
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
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchOptionsByDateRange = async (productUid, startDate, endDate) => {
    try {
        const s = typeof startDate === "string" ? startDate : format(startDate, "yyyy-MM-dd");
        const e = typeof endDate   === "string" ? endDate   : format(endDate,   "yyyy-MM-dd");

        const response = await axios.get(`${path}/products/${productUid}/option`, {
            params: { startDate: s, endDate: e },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 주문 생성
export const createOrder = async (productUid, optionData, memberInfo, accessToken) => {
    if (!accessToken) {
        alert("로그인이 필요한 서비스 입니다.");
        return;
    }
    try {
        // optionData를 주문 생성에 필요한 데이터로 변환
        const orderData = {
            productCode: optionData.productCode,
            productTitle: optionData.productTitle,
            optionCode: optionData.optionCode,
            memberCode: optionData.memberCode,
            memberName: memberInfo.memberName,
            memberEmail: memberInfo.memberEmail,
            memberPhone: memberInfo.memberPhone,
            reservationDate: optionData.reservationDate,
            adultCount: optionData.adultCount || 0,
            childCount: optionData.childCount || 0,
            totalPrice: optionData.totalPrice,
            orderAdultPrice: optionData.productAdult,
            orderChildPrice: optionData.productChild,
        };
        const response = await axios.post(`${path}/order/create`, orderData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return {
            orderCode: response.data.orderCode,
            bookingUid: response.data.bookingUid,
        };
    } catch (error) {
        alert("주문 생성 중 오류가 발생했습니다.");
        return null;
    }
};

// 주문 상세 조회
export const fetchOrderDetails = async (bookingUid, accessToken) => {
    if (!accessToken) {
        return;
    }
    try {
        const response = await axios.get(`${path}/order/${bookingUid}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 옵션 상세 조회 (OrderCheckoutCon에서 사용)
export const fetchOptionDetails = async (productUid, optionCode, accessToken) => {
    try {
        const response = await axios.get(`${path}/products/${productUid}/option/${optionCode}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 주문검토페이지에서 사용
export const fetchMemberInfo = async (accessToken) => {
    try {
        const response = await axios.get(`${path}/member/info`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 결제 완료 시 orderStatus를 SCHEDULED로 변경
export const completeOrder = async (orderCode, paymentMethod, totalPrice, accessToken) => {
    if (!accessToken) {
        return;
    }
    try {
        const response = await axios.patch(
            `${path}/order/${orderCode}/complete`,
            {
                paymentMethod,
                totalPrice,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

// orderStatus가 PENDING상태 유지되면 orderCode삭제
export const deletePendingOrder = async (orderCode, accessToken) => {
    try {
        const response = await axios.delete(`${path}/order/${orderCode}/delete`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 페이지 이동시 PENDING상태 주문 삭제
export const cancelPendingOrder = async (orderCode, accessToken) => {
    const data = { orderCode };
    try {
        const response = await axios.post("/orders/cancel-pending", data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};