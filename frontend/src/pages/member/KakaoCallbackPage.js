import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

function KakaoCallbackPage() {
    const [searchParams] = useSearchParams();
    const code = searchParams.get("code");
    const navigate = useNavigate();

    useEffect(() => {
        if (!code) return;

        const codeFlagKey = `kakao_code_${code}`;
        // 이미 처리한 code면 아무 것도 하지 않음
        if (localStorage.getItem(codeFlagKey) === "complete" || localStorage.getItem(codeFlagKey) === "processing") {
            return;
        }
        // 이제부터 처리 시작
        localStorage.setItem(codeFlagKey, "processing");

        // 1. 스프링 부트 백엔드로 인증 코드 전달
        axios
            .get(`http://localhost:8080/oauth/kakao/callback?code=${code}`)
            .then(res => {
                // 2. JWT 토큰과 유저정보 반환받음
                const {
                    accessToken,
                    memberName,
                    memberProfileImageUrl,
                    kakaoAccessToken,
                    roles
                } = res.data;

                // 3. JWT와 유저정보 저장 (ex. localStorage)
                localStorage.setItem("loginType", "kakao");
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("kakaoAccessToken", kakaoAccessToken);
                localStorage.setItem("memberName", memberName);
                localStorage.setItem("memberProfileImageUrl", memberProfileImageUrl);
                localStorage.setItem("roles", JSON.stringify(roles));
                // 성공적으로 처리됐으니 complete로 변경
                localStorage.setItem(codeFlagKey, "complete");


                // 4. 메인페이지로 이동 (홈 등)
                navigate("/");
            })
            .catch(err => {
                // 실패 시 처리
                // 실패 시 플래그 제거(재시도 가능하도록)
                localStorage.removeItem(codeFlagKey);
                alert("카카오 로그인 실패! 정지된계정일수도 있으니 고객선터에 문의바랍니다");
                navigate("/login");
            });
    }, [code, navigate]);

    return <div>카카오 로그인 처리중...</div>;
}

export default KakaoCallbackPage;