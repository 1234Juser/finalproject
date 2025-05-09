import MyBookingCon from "../../containers/booking/MyBookingCon";

function MyBookingPage() {
    const accessToken = localStorage.getItem("accessToken");

    return(
    <>
        <MyBookingCon accessToken={accessToken} />
    </>)
}
export default MyBookingPage