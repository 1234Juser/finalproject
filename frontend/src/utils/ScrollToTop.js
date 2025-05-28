import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // 스크롤 위치를 최상단으로 이동
    }, [pathname]); // pathname이 변경될 때마다 실행

    return null; // UI를 렌더링하지 않으므로 null 반환
}

export default ScrollToTop;