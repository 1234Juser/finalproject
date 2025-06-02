import {useParams} from "react-router-dom";
import WishCon from "../../containers/wish/WishCon";
import React, {useEffect, useState} from "react";

function WishListPage() {
    const [accessToken, setAccessToken] = useState(null); // accessToken 상태 추가

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        setAccessToken(accessToken); // localStorage에서 accessToken 가져와 상태에 저장
    }, []);

    return(
        <>
            <WishCon accessToken={accessToken}/>
        </>
    )
}
export default WishListPage;