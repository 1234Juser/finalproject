import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom"; // 추가
import NavCom from "../../components/common/NavCom";
import {ChatFloatingWrapper, NotificationWrapper} from "../../style/common/NavStyle";
import InquiryChatCon from "../inquiry/InquiryChatCon";
import NotificationListCon from "../notification/NotificationListCon";

// JWT 토큰에서 역할 뽑기 예시 함수
function parseJwt(token) {
    if (!token) return null;
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

function NavCon() {
    const location = useLocation();
    const [showChat, setShowChat] = useState(false);
    const chatAnchorRef = useRef(null);
    const [chatPosition, setChatPosition] = useState({ top: 0, left: 0 });
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef(null);
    const notificationIconRef = useRef(null); // 새로 추가된 ref



    const token = localStorage.getItem("accessToken");
    let roles = [];
    if (token) {
        const payload = parseJwt(token);
        if (payload?.roles) roles = payload.roles;
    }

    const toggleChat = useCallback((e) => {
        if (e) e.preventDefault();
        setShowChat(prevShowChat => {
            const newShowChatState = !prevShowChat;
            if (newShowChatState) {
                if (chatAnchorRef.current) {
                    const rect = chatAnchorRef.current.getBoundingClientRect();
                    let leftPos = rect.left + window.scrollX;
                    const viewportWidth = window.innerWidth;
                    const chatWidth = 400;
                    const padding = 20;

                    if (leftPos + chatWidth > viewportWidth - padding) {
                        leftPos = viewportWidth - chatWidth - padding;
                    }
                    if (leftPos < padding) {
                        leftPos = padding;
                    }

                    let topPos = rect.bottom + window.scrollY + 8;
                    if (topPos < padding) topPos = padding;

                    setChatPosition({
                        top: topPos,
                        left: leftPos,
                    });
                }
            }
            return newShowChatState;
        });
    }, []);

    // 라우트 변경 시 채팅 창 닫기
    useEffect(() => {
        setShowChat(false);
        setShowNotifications(false);
    }, [location.pathname]);


    // 알림창 보이게 하기
    const toggleNotification = (e) => {
        if (e) e.preventDefault();
        setShowNotifications(prev => !prev);
        console.log("알림 아이콘 클릭됨");
    };


    // 알림창 외부 클릭 시 알림창 닫히게 하기
    const handleClickOutside = (event) => {
        if (
            notificationRef.current &&
            !notificationRef.current.contains(event.target) &&
            notificationIconRef.current &&
            !notificationIconRef.current.contains(event.target)
        ) {
            setShowNotifications(false);
        }
    };

    useEffect(() => {
        if (showNotifications) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showNotifications]);




    return (
        <>
            <NavCom
                roles={roles}
                chatAnchorRef={chatAnchorRef}
                toggleChat={toggleChat}
                toggleNotification={toggleNotification}
                notificationIconRef={notificationIconRef}
            />
            <ChatFloatingWrapper
                top={chatPosition.top}
                $left={chatPosition.left}
                style={{ display: showChat ? 'block' : 'none' }}
            >
                <InquiryChatCon
                    isVisible={showChat}
                />
            </ChatFloatingWrapper>
            {showNotifications && (
                <NotificationWrapper ref={notificationRef}>
                    <NotificationListCon />
                </NotificationWrapper>
            )}
        </>
    );
}

export default NavCon;