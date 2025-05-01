import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";

function GoogleCallbackPage() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const code = urlParams.get("code");

        if (!code) {
            navigate("/login");
            return;
        }

        const codeFlagKey = `google_code_${code}`;
        // 한 번 처리된 code면 아무 것도 안 함
        if (
            localStorage.getItem(codeFlagKey) === "complete" ||
            localStorage.getItem(codeFlagKey) === "processing"
        ) {
            return;
        }
        // 이제부터 처리 시작
        localStorage.setItem(codeFlagKey, "processing");

        axios
            .get(`http://localhost:8080/oauth/google/callback?code=${code}`)
            .then(res => {
                localStorage.setItem("accessToken", res.data.accessToken || res.data.token);
                localStorage.setItem("memberName", res.data.memberName);
                localStorage.setItem("memberProfileImageUrl", res.data.memberProfileImageUrl);
                // 필요한 추가 정보 저장

                // 처리 완료 플래그
                localStorage.setItem(codeFlagKey, "complete");

                navigate("/");
            })
            .catch(err => {
                localStorage.removeItem(codeFlagKey); // 실패 시 플래그 제거(재로그인 허용)
                alert("구글 로그인 실패");
                navigate("/login");
            });
    }, [location, navigate]);

    return (
        <div>
            구글 로그인 처리중입니다...
        </div>
    );
}

export default GoogleCallbackPage;

