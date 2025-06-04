import AdminBookingChartCon from "../../containers/booking/AdminBookingChartCon";

function AdminBookingChartPage() {
    const accessToken = localStorage.getItem("accessToken");
    return(
    <>
        <AdminBookingChartCon accessToken={accessToken} />
    </>)
}
export default AdminBookingChartPage;