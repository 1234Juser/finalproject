import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {getOrderByOrderCode, requestPayment, updatePaymentStatus} from "../../service/paymentService";
import {requestIamportPayment} from "../../components/payment/IamportPayment";
import {completeOrder} from "../../service/orderService";

function PaymentRequest({orderCode, accessToken}) {
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
                alert("주문 정보를 불러올 수 없습니다.");
                setErrorMessage("주문 정보를 불러오는 데 실패했습니다.");
            }
        };

        if (orderCode && accessToken) {
            fetchOrderData();
        }
    }, [orderCode, accessToken]);

    useEffect(() => {
        const executePayment = async () => {
            if (!selectedPaymentMethod) {
                alert("결제수단이 선택되지 않았습니다.");
                return;
            }
            try {
                const result = await requestIamportPayment(orderData, selectedPaymentMethod);

                const paymentData = {
                    impUid: result.impUid,
                    merchantUid: result.bookingUid,
                    receiptUrl: result.receiptUrl,
                    paymentMethod: selectedPaymentMethod,
                    paymentBrand: result.paymentBrand,
                    paymentAmount: result.paymentAmount,
                    productThumbnail: orderData.productThumbnail,
                    orderCode: result.orderCode,
                    memberCode: orderData.memberCode,
                    vbankNum: result.vbankNum,
                    vbankName: result.vbankName,
                    vbankHolder: result.vbankHolder,
                    vbankDue: result.vbankDue,
                };

                try {
                    await requestPayment(paymentData, accessToken);
                    await updatePaymentStatus(result.impUid, accessToken);
                    await completeOrder(result.orderCode, selectedPaymentMethod, result.paymentAmount, accessToken);
                } catch (err) {
                    alert("결제 처리 중 문제가 발생했습니다. 다시 시도해주세요.");
                }
                navigate("/payments/complete", {
                    state: {
                        bookingUid: result.bookingUid,
                        orderDate: result.orderDate,
                        productTitle: result.productTitle,
                        productThumbnail: orderData.productThumbnail || "/img/empty/empty-list.jpeg",
                        totalPrice: result.totalPrice,
                        vbankNum: result.vbankNum,
                        vbankName: result.vbankName,
                        vbankHolder: result.vbankHolder,
                        vbankDue: result.vbankDue,
                    }
                });
            } catch (msg) {
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