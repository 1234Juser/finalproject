import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getOrderByOrderCode, requestPayment} from "../../service/paymentService";
import {requestIamportPayment} from "../../components/payment/IamportPayment";
import {completeOrder} from "../../service/orderService";

function PaymentRequest({orderCode, accessToken}) {
    // const { orderCode } = useParams();
    const location = useLocation();
    const { selectedPaymentMethod } = location.state || {};

    const [orderData, setOrderData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const data = await getOrderByOrderCode(orderCode, accessToken);
                setOrderData(data);
            } catch (error) {
                console.error("주문 정보 불러오기 실패:", error);
                alert("주문 정보를 불러올 수 없습니다.");
                setErrorMessage("주문 정보를 불러오는 데 실패했습니다.");
            }
        };

        if (orderCode && accessToken) {
            fetchOrderData();
        }
    }, [orderCode, accessToken]);

    // useEffect(() => {
    //     if (orderData) {
    //         requestIamportPayment(orderData);
    //     }
    // }, [orderData]);
    useEffect(() => {
        const executePayment = async () => {
            if (!selectedPaymentMethod) {
                alert("❗ 결제수단이 선택되지 않았습니다.");
                return;
            }
            console.log("⚙️ 결제 실행 시작");
            try {
                const result = await requestIamportPayment(orderData, selectedPaymentMethod);
                console.log("💬 아임포트 결제 응답:", result);

                const paymentData = {
                    impUid: result.impUid,
                    merchantUid: result.bookingUid,
                    receiptUrl: result.receiptUrl,
                    paymentMethod: selectedPaymentMethod,
                    paymentBrand: result.paymentBrand,
                    paymentAmount: result.paymentAmount,
                    orderCode: result.orderCode,
                    memberCode: orderData.memberCode,
                    vbankNum: result.vbankNum,
                    vbankName: result.vbankName,
                    vbankHolder: result.vbankHolder,
                    vbankDue: result.vbankDue,
                };

                console.log("📤 결제 저장 요청 데이터:", paymentData);
                console.log("💬 result:", result);
                try {
                    await requestPayment(paymentData, accessToken);
                    // await completeOrder(orderCode, selectedPaymentMethod, paymentData.paymentAmount, accessToken);
                    await completeOrder(result.orderCode, selectedPaymentMethod, result.paymentAmount, accessToken);
                    console.log("🟢 PaymentEntity 저장 성공:", paymentData);
                    console.log("💬 result:", result);
                } catch (err) {
                    console.error("❌ PaymentEntity 저장 실패:", err);
                }
                navigate("/payments/complete", {
                    // state: result // result: { bookingUid, orderDate, productTitle, ... }
                    // state: paymentData
                    state: {
                        bookingUid: result.bookingUid,
                        orderDate: result.orderDate,
                        productTitle: result.productTitle,
                        productThumbnail: result.productThumbnail,
                        totalPrice: result.totalPrice,
                        vbankNum: result.vbankNum,
                        vbankName: result.vbankName,
                        vbankHolder: result.vbankHolder,
                        vbankDue: result.vbankDue,
                    }
                });
            } catch (msg) {
                console.error("❌ 결제 실패 메시지:", msg);
                alert("결제 실패: " + msg);
            }
        };

        if (orderData) {
            executePayment();
        }
    }, [orderData, selectedPaymentMethod, navigate]);

    if (errorMessage) {
        return <p style={{ color: "red" }}>{errorMessage}</p>;
    }

    return(
        <>
            <p>주문 정보를 불러오는 중...</p>
        </>);
}
export default PaymentRequest;