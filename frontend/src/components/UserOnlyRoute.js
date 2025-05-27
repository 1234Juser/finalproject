// 유저권한전용
import React from 'react';
import { Navigate } from 'react-router-dom';

const UserOnlyRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("accessToken");
    const userRoles = JSON.parse(localStorage.getItem("roles") || "[]");

    if (!isAuthenticated) {
        // 로그인되어 있지 않으면 로그인 페이지로 리다이렉트
        return <Navigate to="/login" />;
    }

    // "ROLE_USER"만 허용하고 "ROLE_ADMIN"은 허용하지 않습니다.
    // 즉, userRoles 배열에 "ROLE_USER"만 있고 다른 역할은 없어야 합니다.
    const isUserOnly = userRoles.includes("ROLE_USER") && userRoles.length === 1;

    if (!isUserOnly) {
        alert("접근 권한이 없습니다.");
        return <Navigate to="/" />;
    }

    return children;
};

export default UserOnlyRoute;