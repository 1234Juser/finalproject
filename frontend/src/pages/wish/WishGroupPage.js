import WishCon from "../../containers/wish/WishCon";
import {useParams} from "react-router-dom";

function WishGroupPage() {

    const { memberCode } = useParams();
    const parsedMemberCode = parseInt(memberCode, 10);

    if (isNaN(parsedMemberCode)) {
        return <p style={{ padding: "2rem" }}>잘못된 접근입니다. (memberCode가 숫자가 아님)</p>;
    }

    return(
        <>
            <WishCon memberCode={parsedMemberCode}  />
        </>
    )
}
export default WishGroupPage;