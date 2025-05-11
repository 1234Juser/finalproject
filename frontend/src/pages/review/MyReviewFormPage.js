import MyReviewWriteCon from "../../containers/review/MyReviewWriteCon";

function MyReviewFormPage() {
    const accessToken = localStorage.getItem("accessToken");
    return(
        <>
            <MyReviewWriteCon accessToken={accessToken} />
        </>)
}
export default MyReviewFormPage;