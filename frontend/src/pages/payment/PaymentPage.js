import {useLocation, useParams} from "react-router-dom";
import PaymentRequest from "../../containers/payment/PaymentRequest";

function PaymentPage() {
    const { orderCode } = useParams();
    const accessToken = localStorage.getItem("accessToken");
    const location = useLocation();
    const { selectedPaymentMethod } = location.state || {};

    console.log("💬 전달된 orderCode:", orderCode);
    console.log("💬 전달된 결제수단:", selectedPaymentMethod);

    return(
    <>
        <PaymentRequest orderCode={orderCode} accessToken={accessToken} selectedPaymentMethod={selectedPaymentMethod} />
    </>)
}
export default PaymentPage;