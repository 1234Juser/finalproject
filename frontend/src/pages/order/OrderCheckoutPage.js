import OrderCheckoutCon from "../../containers/order/OrderCheckoutCon";

function OrderCheckoutPage() {
    // 로그인 상태만 접근 가능
    const accessToken = localStorage.getItem("accessToken");
    // 숫자로 저장된 optionCode 가져오기
    const optionCode = parseInt(localStorage.getItem("optionCode"), 10);
    // optionData는 JSON 형태로 저장되어 있을 수도 있음
    const optionData = JSON.parse(localStorage.getItem("optionData") || "{}");

    // optionCode가 없으면 메인 페이지로 리다이렉트
    if (isNaN(optionCode) || !optionData.optionCode) {
        alert("옵션 코드가 존재하지 않습니다.");
        window.location.replace("/");
        return null;
    }

    return(
    <>
        <OrderCheckoutCon
            accessToken={accessToken}
            optionCode={optionCode}
            optionData={optionData}  />
    </>)
}
export default OrderCheckoutPage;