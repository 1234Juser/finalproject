// 유저권한전용
import React from 'react';
import { Navigate } from 'react-router-dom';

const UserOnlyRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("accessToken");
    const userRoles = JSON.parse(localStorage.getItem("roles") || "[]");

    // console.log("UserOnlyRoute - isAuthenticated:", isAuthenticated);
    // console.log("UserOnlyRoute - userRoles:", userRoles);
    // console.log("UserOnlyRoute - hasUserRole (before check):", userRoles.includes("ROLE_USER"));


    if (!isAuthenticated) {
        // 로그인되어 있지 않으면 로그인 페이지로 리다이렉트
        return <Navigate to="/login" />;
    }

    // "ROLE_USER" 권한을 가지고 있는지만 확인합니다. 다른 역할이 있어도 허용합니다.
    const hasUserRole = userRoles.includes("ROLE_USER");

    if (!hasUserRole) { // 변경된 조건: "ROLE_USER"를 가지고 있지 않으면 접근 불가
        alert("접근 권한이 없습니다.");
        return <Navigate to="/" />;
    }


    return children;
};

export default UserOnlyRoute;