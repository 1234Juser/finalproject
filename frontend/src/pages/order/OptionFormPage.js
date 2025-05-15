import OptionFormCon from "../../containers/order/OptionFormCon";
import {useParams} from "react-router-dom";

function OptionFormPage() {
    // 토큰 없어도 접속 가능한 페이지긴 함
    const accessToken = localStorage.getItem("accessToken");

    return(
    <>
        <OptionFormCon accessToken={ accessToken } />
    </>)
}
export default OptionFormPage;