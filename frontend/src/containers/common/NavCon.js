import React, {useEffect, useRef, useState} from "react";
import NavCom from "../../components/common/NavCom";


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
    const [chatPosition, setChatPosition] = useState({top: 0, left: 0});

    const token = localStorage.getItem("accessToken");
    let roles = [];
    if (token) {
        const payload = parseJwt(token);
        if (payload?.roles) roles = payload.roles;
    }

    const toggleChat = (e) => {
        e.preventDefault();
        setShowChat(prev => !prev);
        // 채팅창이 표시될 때 handleTopicSelect 호출 (이미 ID가 있다면 중복 호출 방지 로직 추가 가능)
        if (!showChat && !currentInquiryChatId) { // 처음 채팅창을 열 때 ID가 없다면
            handleTopicSelect(); // InquiryChatCon에서 props로 이 함수를 넘겨받아야 함
        }
        // 또는 InquiryChatCom이 처음 나타날 때 useEffect로 호출
    };

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
    }, [showChat]);

    return <NavCom roles={roles} chatAnchorRef={chatAnchorRef} showChat={showChat} chatPosition={chatPosition} toggleChat={toggleChat}/>

}

export default NavCon;
