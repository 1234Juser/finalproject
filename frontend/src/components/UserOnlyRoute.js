// 유저권한전용
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom'; // useLocation 추가

const UserOnlyRoute = ({ children }) => {
    const location = useLocation(); // 현재 라우트 정보를 가져옵니다.
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("accessToken"));
    const [userRolesString, setUserRolesString] = useState(localStorage.getItem("roles"));

    useEffect(() => {
        // location.pathname (현재 경로)이 변경될 때마다 localStorage 값을 다시 읽어 상태를 업데이트합니다.
        const currentAuth = localStorage.getItem("accessToken");
        const currentRoles = localStorage.getItem("roles");
        setIsAuthenticated(currentAuth);
        setUserRolesString(currentRoles);

        // 디버깅을 위해 현재 값을 콘솔에 출력해볼 수 있습니다.
        // console.log(`UserOnlyRoute re-checked on path: ${location.pathname}`);
        // console.log("Updated localStorage accessToken:", currentAuth);
        // console.log("Updated localStorage roles:", currentRoles);

    }, [location.pathname]); // 의존성 배열에 location.pathname을 추가하여 경로가 변경될 때마다 이 useEffect가 실행되도록 합니다.

    const userRoles = JSON.parse(userRolesString || "[]");

    if (!isAuthenticated) {
        // 사용자가 인증되지 않았으면 로그인 페이지로 리디렉션합니다.
        // replace 옵션은 히스토리에 현재 경로를 남기지 않아 뒤로 가기 시 이전 로그인 시도 페이지로 돌아가지 않도록 합니다.
        return <Navigate to="/login" replace />;
    }

    // "ROLE_USER" 권한이 있는지 확인합니다.
    const hasUserRole = userRoles.includes("ROLE_USER");

    if (!hasUserRole) {
        // "ROLE_USER" 권한이 없으면 접근 권한이 없음을 알리고 메인 페이지로 리디렉션합니다.
        alert("접근 권한이 없습니다.");
        return <Navigate to="/" replace />;
    }

    // 모든 조건을 통과하면 요청된 자식 컴포넌트를 렌더링합니다.
    return children;
};

export default UserOnlyRoute;