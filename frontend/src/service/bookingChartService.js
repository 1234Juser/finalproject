import axios from "axios";

const path = "https://api.hellotravelogic.link";

export const fetchProductRevenueStats = async (startDate, endDate, accessToken) => {
    try {
        const response = await axios.get(`${path}/admin/booking/product-revenue`, {
            params: {startDate, endDate},
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data; // [{ productCode, productTitle, totalRevenue }, ...]
    } catch (error) {
        console.error('상품 매출 차트 데이터를 가져오는 중 오류 발생:', error);
        throw error;
    }
};