import OrderCheckoutCom from "../../components/order/OrderCheckoutCom";
import {createOrder, fetchMemberInfo, fetchOptionDetails} from "../../service/orderService";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {requestIamportPayment} from "../../components/payment/IamportPayment";

function OrderCheckoutCon({ accessToken }) {
    const { productUid, optionCode } = useParams();
    // const { orderCode } = useParams();
    const [orderCode, setOrderCode] = useState(null);
    const [optionData, setOptionData] = useState(null);
    // const [loadedOptionData, setLoadedOptionData] = useState(optionData || null);
    const [memberInfo, setMemberInfo] = useState(null);
    const [loading, setLoading] = useState(!optionData);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // 옵션 데이터 불러오기 (props로 optionData가 없을 때만 로드)
    // useEffect(() => {
    //     const loadOptionData = async () => {
    //         if (!optionCode || !accessToken) return;
    //         try {
    //             // 이미 props로 전달된 데이터가 있으면 로드하지 않음
    //             if (optionData && Object.keys(optionData).length > 0) return;
    //
    //             const data = await fetchOptionDetails(productUid, optionCode, accessToken);
    //             setLoadedOptionData(data);
    //             console.log("🟢 옵션 데이터 로드 성공:", data);
    //         } catch (error) {
    //             console.error("🔴 옵션 데이터 로드 실패:", error);
    //             setError("옵션 데이터를 불러오는 데 실패했습니다.");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //
    //     if (!loadedOptionData && optionCode && accessToken) {
    //         loadOptionData();
    //     }
    // }, [optionCode, accessToken, productUid, optionData]);

    useEffect(() => {
        const loadOptionData = async () => {
            if (!productUid || !optionCode || !accessToken) return;
            try {
                const option = await fetchOptionDetails(productUid, optionCode, accessToken);
                setOptionData(option);
                console.log("🟢 옵션 데이터 로드 성공:", option);

                const member = await fetchMemberInfo(accessToken);
                setMemberInfo(member);

                const { orderCode, bookingUid } = await createOrder(productUid, {
                    ...option,
                    memberCode: member.memberCode,
                    productCode: option.productCode
                }, member, accessToken);

                if (!orderCode) throw new Error("주문 생성 실패");
                setOrderCode(orderCode);
                console.log("🟢 [useEffect] 생성된 orderCode:", orderCode);
                console.log("🟢 bookingUid:", bookingUid);
            } catch (error) {
                console.error("🔴 옵션 데이터 로드 실패:", error);
                setError("옵션 데이터를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        if (productUid && optionCode && accessToken) {
            loadOptionData();
        }
    }, [productUid, optionCode, accessToken]);

    // 결제하기 버튼 클릭 시
    const handleCheckout = async () => {
        if (!accessToken) {
            alert("로그인이 필요한 서비스입니다.");
            navigate("/login");
            return;
        }

        try {
            // const orderData = {
            //     productCode: optionData.productCode,
            //     optionCode: optionData.optionCode,
            //     memberCode: memberInfo.memberCode,
            //     reservationDate: optionData.reservationDate,
            //     adultCount: optionData.adultCount,
            //     childCount: optionData.childCount,
            //     totalPrice: optionData.totalPrice,
            //     orderAdultPrice: optionData.productAdult,
            //     orderChildPrice: optionData.productChild,
            // };

            // const {orderCode, bookingUid} = await createOrder(productUid, {
            //         ...optionData,
            //         memberCode: memberInfo.memberCode,
            //         productCode: optionData.productCode,
            //     },
            //     accessToken);
            // if (!orderCode) throw new Error("주문 생성 실패");

            // const bookingUid = await createOrder(productUid, optionData, accessToken);
            // console.log("🟢 주문 생성 성공:", bookingUid);
            // alert("결제가 완료되었습니다. 예약 번호: " + bookingUid);
            // navigate(`/order/complete/${bookingUid}`);

            // console.log("🟢 주문 생성 성공:", orderCode);
            // console.log("bookingUid:", bookingUid);
            // alert("결제가 완료되었습니다. 예약 번호: " + orderCode);
            // navigate(`/payments/create/${orderCode}`);
            const orderData = {
                orderCode: orderCode,
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
            requestIamportPayment(orderData);
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
                optionData={optionData}
                // optionData={loadedOptionData}
                memberInfo={memberInfo}
                orderCode={orderCode}
                loading={loading}
                error={error}
                onCheckout={handleCheckout}
            />
        </>)
}
export default OrderCheckoutCon;