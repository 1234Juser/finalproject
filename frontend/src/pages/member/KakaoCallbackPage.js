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
                    roles,
                    memberCode // memberCode 추가
                } = res.data;

                // 응답 데이터에 memberCode가 있는지 확인
                if (memberCode !== undefined && memberCode !== null) {
                    console.log("로그인 응답 데이터에 memberCode가 있습니다:", memberCode);
                } else {
                    console.error("로그인 응답 데이터에 memberCode가 없습니다.");
                }


                // 3. JWT와 유저정보 저장 (ex. localStorage)
                localStorage.setItem("loginType", "kakao");
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("kakaoAccessToken", kakaoAccessToken);
                localStorage.setItem("memberName", memberName);
                localStorage.setItem("memberProfileImageUrl", memberProfileImageUrl);
                localStorage.setItem("roles", JSON.stringify(roles));
                localStorage.setItem("memberCode", memberCode); // memberCode 저장

                // 로컬 스토리지에 저장된 memberCode 확인
                const storedMemberCode = localStorage.getItem("memberCode");
                if (storedMemberCode !== null && storedMemberCode !== 'undefined' && storedMemberCode !== 'null') {
                    console.log("로컬 스토리지에 memberCode가 저장되었습니다:", storedMemberCode);
                } else {
                    console.error("로컬 스토리지에 memberCode 저장이 실패했거나 값이 유효하지 않습니다.");
                }


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