import {useParams} from "react-router-dom";
import PaymentRequest from "../../containers/payment/PaymentRequest";

function PaymentPage() {
    const { orderCode } = useParams();
    const accessToken = localStorage.getItem("accessToken");

    console.log("💬 전달된 orderCode:", orderCode);
    return(
    <>
        <PaymentRequest orderCode={orderCode} accessToken={accessToken} />
    </>)
}
export default PaymentPage;