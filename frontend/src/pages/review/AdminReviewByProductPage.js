import AdminReviewByProductCon from "../../containers/review/AdminReviewByProductCon";

function AdminReviewByProductPage() {
    const accessToken = localStorage.getItem("accessToken");

    return(
    <>
        <AdminReviewByProductCon accessToken={accessToken} />
    </>)
}
export default AdminReviewByProductPage;