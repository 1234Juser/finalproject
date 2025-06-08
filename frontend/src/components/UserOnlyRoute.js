// 유저권한전용
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const UserOnlyRoute = ({ children }) => {
    const location = useLocation(); // 현재 라우트 정보를 가져옵니다.
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("accessToken"));
    const [userRolesString, setUserRolesString] = useState(localStorage.getItem("roles"));

    useEffect(() => {
        const currentAuth = localStorage.getItem("accessToken");
        const currentRoles = localStorage.getItem("roles");
        setIsAuthenticated(currentAuth);
        setUserRolesString(currentRoles);

        // 디버깅 로그 추가
        console.log(`UserOnlyRoute useEffect triggered for path: ${location.pathname}`);
        console.log("localStorage accessToken:", currentAuth);
        console.log("localStorage roles string:", currentRoles);
        try {
            const parsedRoles = JSON.parse(currentRoles || "[]");
            console.log("Parsed roles:", parsedRoles);
        } catch (e) {
            console.error("Error parsing roles from localStorage:", e);
        }

    }, [location.pathname]); // 의존성 배열에 location.pathname을 추가하여 경로가 변경될 때마다 이 useEffect가 실행되도록 합니다.

    const userRoles = JSON.parse(userRolesString || "[]");

    // 디버깅 로그 추가
    console.log("UserOnlyRoute render check:");
    console.log("isAuthenticated:", isAuthenticated);
    console.log("userRolesString:", userRolesString);
    console.log("userRoles:", userRoles);
    const hasUserRole = userRoles.includes("ROLE_USER");
    console.log("hasUserRole:", hasUserRole);


    if (!isAuthenticated) {
        console.log("UserOnlyRoute: Not authenticated, redirecting to /login");
        // 사용자가 인증되지 않았으면 로그인 페이지로 리디렉션합니다.
        // replace 옵션은 히스토리에 현재 경로를 남기지 않아 뒤로 가기 시 이전 로그인 시도 페이지로 돌아가지 않도록 합니다.
        return <Navigate to="/login" replace />;
    }

    if (!hasUserRole) {
        console.log("UserOnlyRoute: No ROLE_USER, showing alert and redirecting to /");
        // "ROLE_USER" 권한이 없으면 접근 권한이 없음을 알리고 메인 페이지로 리디렉션합니다.
        alert("접근 권한이 없습니다.");
        return <Navigate to="/" replace />;
    }

    // 모든 조건을 통과하면 요청된 자식 컴포넌트를 렌더링합니다.
    return children;
};

export default UserOnlyRoute;