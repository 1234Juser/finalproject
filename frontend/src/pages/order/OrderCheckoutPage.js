import OrderCheckoutCon from "../../containers/order/OrderCheckoutCon";

function OrderCheckoutPage() {
    // 로그인 상태만 접근 가능
    const accessToken = localStorage.getItem("accessToken");

    return(
    <>
        <OrderCheckoutCon
            accessToken={accessToken}
        />
    </>)
}
export default OrderCheckoutPage;