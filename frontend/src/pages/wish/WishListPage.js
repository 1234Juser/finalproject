import {useParams} from "react-router-dom";
import WishCon from "../../containers/wish/WishCon";
import React from "react";

function WishListPage() {

    const { groupCode } = useParams();
    const parsedGroupCode = parseInt(groupCode, 10);
    const memberCode = parseInt(localStorage.getItem("memberCode"), 10);

    // if (isNaN(parsedMemberCode)) {
    //     return <p style={{ padding: "2rem" }}>잘못된 접근입니다. (memberCode가 숫자가 아님)</p>;
    // }

    // if (groupCode === "0" || !groupCode) {
    //     return (
    //         <p style={{ padding: "2rem" }}>
    //             선택된 그룹이 없어요. 먼저 그룹을 선택해주세요.
    //         </p>
    //     );
    // }

    if (!groupCode || isNaN(parsedGroupCode)) {
        return <p style={{ padding: "2rem" }}>잘못된 접근입니다.</p>;
    }

    return(
        <>
            <WishCon memberCode={memberCode} groupCode={parsedGroupCode} />
        </>
    )
}
export default WishListPage;
