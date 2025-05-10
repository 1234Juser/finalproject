import AdminBookingByProductCon from "../../containers/booking/AdminBookingByProductCon";

function AdminBookingByProductPage() {
    const accessToken = localStorage.getItem("accessToken");
    return(
    <>
        <AdminBookingByProductCon accessToken={accessToken} />
    </>
    )
}
export default AdminBookingByProductPage;