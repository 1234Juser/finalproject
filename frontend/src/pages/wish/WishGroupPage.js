import WishCon from "../../containers/wish/WishCon";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function WishGroupPage() {
    const navigate = useNavigate();
    const [memberCode, setMemberCode] = useState(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const storedCode = localStorage.getItem("memberCode");

        console.log("로그아웃 이후에도 남은 memberCode:", storedCode);

        if (!storedCode || isNaN(parseInt(storedCode, 10))) {
            alert("로그인 후 이용해주세요.");
            navigate("/login");
        } else {
            setMemberCode(parseInt(storedCode, 10));
            setIsReady(true); // 렌더링 허용
        }
    }, [navigate]);

    if (!isReady) return null;

    return(
        <>
            <WishCon memberCode={memberCode}
            />
        </>
    )
}
export default WishGroupPage;