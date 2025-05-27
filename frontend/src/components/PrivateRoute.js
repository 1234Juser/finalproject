// 관리자전용권한
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, requiredRoles }) => {
    const isAuthenticated = localStorage.getItem("accessToken");
    const userRoles = JSON.parse(localStorage.getItem("roles") || "[]");

    if (!isAuthenticated) {
        // 로그인되어 있지 않으면 로그인 페이지로 리다이렉트
        return <Navigate to="/login" />;
    }

    if (requiredRoles && requiredRoles.length > 0) {
        const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
        if (!hasRequiredRole) {
            // 필요한 권한이 없으면 메인 페이지로 리다이렉트 (또는 권한 없음 페이지)
            alert("접근 권한이 없습니다.");
            return <Navigate to="/" />;
        }
    }

    return children;
};

export default PrivateRoute;