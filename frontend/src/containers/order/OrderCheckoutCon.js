import OrderCheckoutCom from "../../components/order/OrderCheckoutCom";
import {
    completeOrder,
    createOrder,
    deletePendingOrder,
    fetchMemberInfo,
    fetchOptionDetails
} from "../../service/orderService";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {requestIamportPayment} from "../../components/payment/IamportPayment";
import {orderInitialState as result} from "../../modules/orderModule";
import {fetchPaymentMethods} from "../../service/paymentService";

function OrderCheckoutCon({ accessToken }) {
    const { productUid, optionCode } = useParams();
    // const { orderCode } = useParams();
    const [orderCode, setOrderCode] = useState(null);
    const [optionData, setOptionData] = useState(null);
    // const [loadedOptionData, setLoadedOptionData] = useState(optionData || null);
    const [memberInfo, setMemberInfo] = useState(null);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const [loading, setLoading] = useState(!optionData);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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
                    productCode: option.productCode,
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

    useEffect(() => {
        fetchPaymentMethods()
            .then((methods) => setPaymentMethods(methods))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            deletePendingOrder(orderCode, accessToken)
                .then(() => console.log("⏱ 주문 자동 삭제 완료"))
                .catch((err) => console.warn("자동 삭제 실패:", err));
        }, 10 * 60 * 1000); // 10분

        return () => clearTimeout(timer);
    }, [orderCode, accessToken]);

    // 결제하기 버튼 클릭 시
    const handleCheckout = async () => {
        if (!accessToken) {
            alert("로그인이 필요한 서비스입니다.");
            navigate("/login");
            return;
        }

        if (!selectedPaymentMethod) {
            alert("결제수단을 선택해주세요.");
            return;
        }
        const supportedMethods = ["CARD", "KAKAO_PAY"];
        if (!supportedMethods.includes(selectedPaymentMethod)) {
            alert("카드와 카카오페이 외 결제는 서비스 준비 중 입니다.");
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

            const result = await requestIamportPayment(orderData, selectedPaymentMethod);
            if (!result) {
                // 결제 실패 → 주문 삭제
                await deletePendingOrder(orderCode, accessToken);
                alert("결제에 실패했습니다. 주문이 삭제되었습니다.");
                return;
            }

            // 주문 상태 변경
            // await completeOrder(
            //     orderData.orderCode,
            //     "CARD", // 또는 "KAKAO_PAY" 등
            //     orderData.totalPrice,
            //     accessToken
            // );
            await completeOrder(orderCode, "CARD", orderData.totalPrice, accessToken);

            const resolvedThumbnail =
                orderData.productThumbnail?.includes("upload/")
                    ? `/upload/product/${encodeURIComponent(orderData.productThumbnail)}`
                    : `/static/img/product/${encodeURIComponent(orderData.productThumbnail)}`;

            navigate("/payments/complete", {
                state: {
                    bookingUid: result.bookingUid,
                    orderDate: new Date().toISOString().split("T")[0],
                    productTitle: orderData.productTitle,
                    // productThumbnail: orderData.productThumbnail,
                    productThumbnail: resolvedThumbnail,
                    totalPrice: orderData.totalPrice,
                },
            });
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
                paymentMethods={paymentMethods}
                selectedPaymentMethod={selectedPaymentMethod}
                setSelectedPaymentMethod={setSelectedPaymentMethod}
            />
        </>)
}
export default OrderCheckoutCon;