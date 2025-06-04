import OrderCheckoutCom from "../../components/order/OrderCheckoutCom";
import {
    cancelPendingOrder,
    completeOrder,
    createOrder,
    deletePendingOrder,
    fetchMemberInfo,
    fetchOptionDetails
} from "../../service/orderService";
import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {requestIamportPayment} from "../../components/payment/IamportPayment";
import {fetchPaymentMethods, requestPayment} from "../../service/paymentService";

function OrderCheckoutCon({ accessToken }) {
    const { productUid, optionCode } = useParams();
    const [orderCode, setOrderCode] = useState(null);
    const [optionData, setOptionData] = useState(null);
    const [memberInfo, setMemberInfo] = useState(null);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const [loading, setLoading] = useState(!optionData);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // 옵션 로드
    useEffect(() => {
        const loadOptionData = async () => {
            if (!productUid || !optionCode || !accessToken) return;
            try {
                const option = await fetchOptionDetails(productUid, optionCode, accessToken);
                setOptionData(option);

                const member = await fetchMemberInfo(accessToken);
                setMemberInfo(member);

                const { orderCode, bookingUid } = await createOrder(productUid, {
                    ...option,
                    memberCode: member.memberCode,
                    productCode: option.productCode,
                }, member, accessToken);

                if (!orderCode) throw new Error("주문 생성 실패");
                setOrderCode(orderCode);
            } catch (error) {
                setError("옵션 데이터를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        if (productUid && optionCode && accessToken) {
            loadOptionData();
        }
    }, [productUid, optionCode, accessToken]);

    // 결제수단 로드
    useEffect(() => {
        fetchPaymentMethods()
            .then((methods) => setPaymentMethods(methods))
            .catch(() => {
                alert("결제수단을 불러오는 데 실패했습니다. 다시 시도해주세요.");
            });
    }, []);

    // 탭 삭제시 삭제
    useEffect(() => {
        if (!orderCode) return; // orderCode 생성되기 전엔 아무 것도 하지 않음

        const sendCancelRequest = () => {
            const data = JSON.stringify({ orderCode });
            const blob = new Blob([data], { type: "application/json" });
            const success = navigator.sendBeacon("/orders/cancel-pending", blob);
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === "hidden") {
                sendCancelRequest();
            }
        };

        const handleBeforeUnload = () => {
            sendCancelRequest();
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [orderCode]);

    // 10분 후 자동삭제
    useEffect(() => {
        const timer = setTimeout(() => {
            deletePendingOrder(orderCode, accessToken)
                .then(() => {
                    alert("장시간 주문이 진행되지 않았습니다. 다시 주문을 진행해 주세요.");
                })
        }, 10 * 60 * 1000); // 10분

        return () => clearTimeout(timer);
    }, [orderCode, accessToken]);

    // 페이지 이동시 삭제
    useEffect(() => {
        const locationChangeHandler = () => {
            if (!orderCode || !accessToken) return;
            cancelPendingOrder(orderCode, accessToken);
        };

        return () => {
            locationChangeHandler(); // cleanup 시 실행
        };
    }, [orderCode, accessToken, useLocation().pathname]);

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
        const supportedMethods = ["CARD", "KAKAO_PAY", "BANK_TRANSFER"];
        if (!supportedMethods.includes(selectedPaymentMethod)) {
            alert("네이버페이와 토스페이는 서비스 준비 중 입니다.");
            return;
        }

        try {
            const orderData = {
                orderCode: orderCode,
                productCode: optionData.productCode,
                productTitle: optionData.productTitle,
                optionCode: optionData.optionCode,
                memberCode: memberInfo.memberCode,
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

            // 결제 성공 후 결제 정보 저장
            const paymentData = {
                impUid: result.impUid,
                merchantUid: result.bookingUid,
                receiptUrl: result.receiptUrl,
                paymentMethod: selectedPaymentMethod,
                paymentBrand: result.paymentBrand,
                paymentAmount: result.paymentAmount,
                orderCode: result.orderCode,
                memberCode: memberInfo.memberCode,
            };
            await requestPayment(result, accessToken);

            await completeOrder(orderCode, selectedPaymentMethod, orderData.totalPrice, accessToken);

            const thumbnail = optionData.productThumbnail;
            const resolvedThumbnail = !thumbnail
                ? "/img/default.jpg"
                : thumbnail;

            navigate("/payments/complete", {
                state: {
                    bookingUid: result.bookingUid,
                    orderDate: new Date(),
                    productTitle: orderData.productTitle,
                    productThumbnail: resolvedThumbnail,
                    totalPrice: orderData.totalPrice,
                    vbankNum: result.vbankNum,
                    vbankName: result.vbankName,
                    vbankHolder: result.vbankHolder,
                    vbankDue: result.vbankDue,
                },
            });
        } catch (error) {
            alert("주문 생성에 실패했습니다.");
        }
    };

    if (loading) return <p>옵션 정보를 불러오는 중...</p>;
    if (error) return <p>{error}</p>;

    return(
        <>
            <OrderCheckoutCom
                optionData={optionData}
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