import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getOrderByOrderCode} from "../../service/paymentService";
import {requestIamportPayment} from "../../components/payment/IamportPayment";

function PaymentRequest({orderCode, accessToken}) {
    // const { orderCode } = useParams();
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
            try {
                const result = await requestIamportPayment(orderData);
                navigate("/payments/complete", {
                    state: result // result: { bookingUid, orderDate, productTitle, ... }
                });
            } catch (msg) {
                alert("결제 실패: " + msg);
            }
        };

        if (orderData) {
            executePayment();
        }
    }, [orderData, navigate]);

    if (errorMessage) {
        return <p style={{ color: "red" }}>{errorMessage}</p>;
    }

    return(
        <>
            <p>주문 정보를 불러오는 중...</p>
        </>);
}
export default PaymentRequest;