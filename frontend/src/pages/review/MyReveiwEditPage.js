import MyReviewEditCon from "../../containers/review/MyReviewEditCon";

function MyReviewEditPage() {
    const accessToken = localStorage.getItem("accessToken");
    return(
        <>
            <MyReviewEditCon accessToken={accessToken} />
        </>)
}
export default MyReviewEditPage;