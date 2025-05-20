import React, { useCallback, useEffect, useRef, useState } from "react";
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
                // 채팅창이 열릴 때 채팅 위치 계산
                if (chatAnchorRef.current) {
                    const rect = chatAnchorRef.current.getBoundingClientRect();
                    let leftPos = rect.left + window.scrollX;
                    const viewportWidth = window.innerWidth;
                    const chatWidth = 400; // 채팅창 너비
                    const padding = 20;    // 화면 가장자리와의 최소 간격

                    // 오른쪽 화면을 넘어가지 않도록 leftPos 조정
                    if (leftPos + chatWidth > viewportWidth - padding) {
                        leftPos = viewportWidth - chatWidth - padding;
                    }
                    // 왼쪽 화면 가장자리보다 작아지지 않도록 leftPos 조정
                    if (leftPos < padding) {
                        leftPos = padding;
                    }

                    // 채팅창이 너무 위로 올라가는 것을 방지
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
    }, []); // 의존성 배열 비우기

    useEffect(() => {
        if (showChat && chatAnchorRef.current) {
            const rect = chatAnchorRef.current.getBoundingClientRect();
            let leftPos = rect.left + window.scrollX;
            const viewportWidth = window.innerWidth;
            const chatWidth = 400;
            const padding = 32;

            // 오른쪽 영역 넘어감 방지
            if (leftPos + chatWidth + padding > viewportWidth) {
                leftPos = viewportWidth - chatWidth - padding;
            }
            // 왼쪽 너무 붙으면 padding 확보
            if (leftPos < padding) {
                leftPos = padding;
            }

            setChatPosition({
                top: rect.bottom + window.scrollY + 8,
                left: leftPos,
            });
        }

        console.log("isVisible 상태 확인---------showChat: ", showChat);
    }, [showChat]);

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
                style={{ display: showChat ? 'block' : 'none' }} // CSS를 통해 표시 여부 제어
            >
                <InquiryChatCon
                    isVisible={showChat}  // InquiryChatCon에 현재 보이는지 여부 전달
                />
            </ChatFloatingWrapper>
        </>
    );
}

export default NavCon;