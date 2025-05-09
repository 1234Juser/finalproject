import WishCon from "../../containers/wish/WishCon";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

function WishGroupPage() {
    const navigate = useNavigate();
    const [isReady, setIsReady] = useState(false);
    const [accessToken, setAccessToken] = useState(null); // accessToken 상태 추가

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            navigate("/login");
            return;
        }
        setAccessToken(token);
        setIsReady(true); // 렌더링 허용
    }, [navigate]);

    if (!isReady) return null;

    return(
        <>
            <WishCon accessToken={accessToken}
            />
        </>
    )
}
export default WishGroupPage;