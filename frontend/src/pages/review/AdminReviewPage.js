import AdminReviewCon from "../../containers/review/AdminReviewCon";

function AdminReviewPage() {
    const accessToken = localStorage.getItem("accessToken");
    return(
        <>
            <AdminReviewCon accessToken={accessToken} />
        </>
    )
}
export default AdminReviewPage;