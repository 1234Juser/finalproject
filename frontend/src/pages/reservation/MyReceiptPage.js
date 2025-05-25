import MyReceiptCon from "../../containers/booking/MyReceiptCon";

function MyReceiptPage() {
    const accessToken = localStorage.getItem("accessToken");

    return(
    <>
        <MyReceiptCon accessToken={accessToken} />
    </>)
}
export default MyReceiptPage;