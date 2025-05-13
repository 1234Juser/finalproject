import OptionFormCon from "../../containers/order/OptionFormCon";

function OptionFormPage() {
    // 토큰 없어도 접속 가능한 페이지긴 함
    const accessToken = localStorage.getItem("accessToken");

    return(
    <>
        <OptionFormCon accessToken={accessToken}/>
    </>)
}
export default OptionFormPage;