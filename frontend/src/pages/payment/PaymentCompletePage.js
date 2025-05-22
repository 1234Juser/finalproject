import PaymentComplete from "../../components/payment/PaymentComplete";
import {useLocation} from "react-router-dom";

function PaymentCompletePage() {
    const location = useLocation();
    const {
        bookingUid,
        orderDate,
        productTitle,
        productThumbnail,
        totalPrice,
    } = location.state || {};

    return(
    <>
        <PaymentComplete
            bookingUid={bookingUid}
            orderDate={orderDate}
            productTitle={productTitle}
            productThumbnail={productThumbnail}
            totalPrice={totalPrice}
        />
    </>)
}
export default PaymentCompletePage;