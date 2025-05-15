import {useParams} from "react-router-dom";
import WishCon from "../../containers/wish/WishCon";
import React, {useEffect, useState} from "react";

function WishListPage() {
    // const { groupCode } = useParams();
    // const parsedGroupCode = parseInt(groupCode, 10);    // 이미 WishCon에서 파싱 중
    const [accessToken, setAccessToken] = useState(null); // accessToken 상태 추가

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        setAccessToken(accessToken); // localStorage에서 accessToken 가져와 상태에 저장
    }, []);


    // if (!groupCode || isNaN(parsedGroupCode)) {
    //     return <p style={{ padding: "2rem" }}>잘못된 접근입니다.</p>;
    // }

    return(
        <>
            <WishCon
                accessToken={accessToken}
                // groupCode={parsedGroupCode}
            />
        </>
    )
}
export default WishListPage;