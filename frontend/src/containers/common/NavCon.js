import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom"; // 추가
import NavCom from "../../components/common/NavCom";
import { ChatFloatingWrapper } from "../../style/common/NavStyle";
import InquiryChatCon from "../inquiry/InquiryChatCon";

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
    const location = useLocation(); // 추가
    const [showChat, setShowChat] = useState(false);
    const chatAnchorRef = useRef(null);
    const [chatPosition, setChatPosition] = useState({ top: 0, left: 0 });

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
    }, [location.pathname]);

    return (
        <>
            <NavCom
                roles={roles}
                chatAnchorRef={chatAnchorRef}
                toggleChat={toggleChat}
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
        </>
    );
}

export default NavCon;