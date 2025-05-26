import PaymentComplete from "../../components/payment/PaymentComplete";
import {useLocation} from "react-router-dom";

function PaymentCompletePage() {
    const location = useLocation();
    const state = location.state || {};
    console.log("📦 location.state in PaymentCompletePage:", location.state);
    console.log("📦 location.state in PaymentCompletePage:", state);
    // const {
    //     bookingUid,
    //     orderDate,
    //     productTitle,
    //     productThumbnail,
    //     totalPrice,
    //     vbankNum,
    //     vbankName,
    //     vbankHolder,
    //     vbankDue,
    // } = location.state || {};
    const {
        bookingUid,
        orderDate,
        productTitle,
        productThumbnail,
        totalPrice,
        vbankNum,
        vbankName,
        vbankHolder,
        vbankDue,
    } = state;

    return(
    <>
        <PaymentComplete
            bookingUid={bookingUid}
            orderDate={orderDate}
            productTitle={productTitle}
            productThumbnail={productThumbnail}
            totalPrice={totalPrice}
            vbankNum={vbankNum}
            vbankName={vbankName}
            vbankHolder={vbankHolder}
            vbankDue={vbankDue}
        />
    </>)
}
export default PaymentCompletePage;