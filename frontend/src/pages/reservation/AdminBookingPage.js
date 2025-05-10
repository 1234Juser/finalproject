import AdminBookingCon from "../../containers/booking/AdminBookingCon";


function AdminBookingPage() {
    const accessToken = localStorage.getItem("accessToken");
    return (
    <>
        <AdminBookingCon accessToken={accessToken} />
    </>)
}
export default AdminBookingPage;