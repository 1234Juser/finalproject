import OrderCheckoutCom from "../../components/order/OrderCheckoutCom";
import {createOrder, fetchOptionDetails} from "../../service/orderService";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

function OrderCheckoutCon({ optionCode, optionData, accessToken }) {
    const { productUid } = useParams();
    const [loadedOptionData, setLoadedOptionData] = useState(optionData || null);
    const [loading, setLoading] = useState(!optionData);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // 옵션 데이터 불러오기 (props로 optionData가 없을 때만 로드)
    useEffect(() => {
        const loadOptionData = async () => {
            if (!optionCode || !accessToken) return;
            try {
                // 이미 props로 전달된 데이터가 있으면 로드하지 않음
                if (optionData && Object.keys(optionData).length > 0) return;

                const data = await fetchOptionDetails(productUid, optionCode, accessToken);
                setLoadedOptionData(data);
                console.log("🟢 옵션 데이터 로드 성공:", data);
            } catch (error) {
                console.error("🔴 옵션 데이터 로드 실패:", error);
                setError("옵션 데이터를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        if (!loadedOptionData && optionCode && accessToken) {
            loadOptionData();
        }
    }, [optionCode, accessToken, productUid, optionData]);

    // 결제하기 버튼 클릭 시
    const handleCheckout = async () => {
        if (!accessToken) {
            alert("로그인이 필요한 서비스입니다.");
            navigate("/login");
            return;
        }

        try {
            const bookingUid = await createOrder(productUid, loadedOptionData, accessToken);
            console.log("🟢 주문 생성 성공:", bookingUid);
            alert("결제가 완료되었습니다. 예약 번호: " + bookingUid);
            navigate(`/order/complete/${bookingUid}`);
        } catch (error) {
            console.error("🔴 주문 생성 실패:", error);
            alert("주문 생성에 실패했습니다.");
        }
    };

    if (loading) return <p>옵션 정보를 불러오는 중...</p>;
    if (error) return <p>{error}</p>;

    return(
    <>
        <OrderCheckoutCom
            optionData={loadedOptionData}
            loading={loading}
            error={error}
            onCheckout={handleCheckout}
        />
    </>)
}
export default OrderCheckoutCon;