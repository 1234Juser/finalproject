import InquiryChatCom from "../../components/common/InquiryChatCom";
import {useEffect, useRef, useState} from "react";




function InquiryChatCon(){

    const [showChat, setShowChat] = useState(false);
    const chatAnchorRef = useRef(null);
    // 채팅창 표시될 때 위치 조정을 위해 상태 관리
    const [chatPosition, setChatPosition] = useState({top: 0, left: 0});

    // 스타일 객체로 위치 전달
    const chatStyle = {
        position: 'absolute',
        top: `${chatPosition.top}px`,
        left: `${chatPosition.left}px`,
        width: '400px',
        zIndex: 999,
    }



    const toggleChat = (e) => {
        e.preventDefault();
        setShowChat(prev => !prev);
    };


    useEffect(() => {
        if(showChat && chatAnchorRef.current) {
            const rect = chatAnchorRef.current.getBoundingClientRect();
            setChatPosition({
                top: rect.bottom + window.scrollY + 8, // 아이콘 바로 아래 8px 간격
                left: rect.left + window.scrollX,
            });
        }
    }, [showChat]);


    return (
        <>
            {/* 채팅 토글할 수 있는 아이콘이나 버튼 예시 */}
            <div ref={chatAnchorRef} onClick={toggleChat} style={{ cursor: 'pointer', display: 'inline-block' }}>
                {/* 예: 아이콘 */}
                <span>💬 문의하기</span>
            </div>

            {/* 보여줄 때만 위치 스타일과 함께 InquiryChatCom 사용 */}
            {showChat && <InquiryChatCom style={chatStyle} />}

        </>
    )
}

export default InquiryChatCon;