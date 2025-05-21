import {
    BottomInput,
    ChatWrapper,
    Description,
    Header, InputField,
    MessageBox, Message, SendButton,
    Title, /* LoadingOverlay, */ ErrorMessageUI, MessageTimestamp // LoadingOverlay 제거
} from "../../style/inquiry/StyleInquiryChat";
import {useEffect, useRef} from "react";

const InquiryChatCom = ({
                            selectedTopic, isConnected, icId, error,
                            messages = [], currentUser, messagesEndRef, inputRef, newMessage, handleInputChange, handleKeyPress,
                            handleSendMessage, isVisible, connectWebSocket, disconnectWebSocket,
                        }) => {

    const firstRenderRef = useRef(true);


    /*// WebSocket 연결 상태 관리
    useEffect(() => {
        // 컴포넌트가 처음 렌더링될 때 WebSocket 연결
        if (!firstRenderRef.current) {
            if (isVisible && !isConnected) {
                console.log("Connecting WebSocket...");
                connectWebSocket(); // WebSocket 연결
            } else if (!isVisible && isConnected) {
                console.log("Disconnecting WebSocket...");
                disconnectWebSocket(); // WebSocket 연결 종료
            }
        } else {
            firstRenderRef.current = false; // 첫 렌더링 이후로만 WebSocket 관리
        }

        // 컴포넌트 언마운트 시 WebSocket 연결 해제
        return () => {
            console.log("Cleaning up WebSocket connection...");
            disconnectWebSocket();
        };
    }, [isVisible, isConnected, connectWebSocket, disconnectWebSocket]);*/


    // 메시지 목록 끝으로 스크롤
    useEffect(() => {
        if (messagesEndRef?.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, messagesEndRef]);




    return (
        <ChatWrapper style={{ position: 'relative' }}>
            <Header>
                <Title>1:1 문의 {selectedTopic ? `- ${selectedTopic}` : ''}</Title>
                <Description style={{ color: isConnected ? 'lightgreen' : 'orange' }}>
                    {isConnected ? '연결됨' : '연결 시도 중...'}
                    {icId !== null ? ` (ID: ${icId})` : ''}
                </Description>
            </Header>
            <MessageBox>

                {error && <ErrorMessageUI>{error}</ErrorMessageUI>}

                {messages && messages.length === 0 && !error && (
                    <Message $isSystem>
                        <strong>Whats's up?, Hello, Travelogic!</strong><br />
                        <span>안녕하세요! 무엇을 도와드릴까요?</span><br /><br />
                        <span>💬 채팅상담 연중무휴 24시간</span><br />
                        <span>📞 유선상담 평일 09:00~18:00</span><br /><br />
                    </Message>
                )}
{/*                {messages && messages.map((msg, index) => {
                    const  = msg.memberCode !== null && currentUser && msg.memberCode === currentUser.memberCode && msg.senderType === 'USER';
                    const senderDisplayName = msg.senderType === 'ADMIN' ? '상담원' :
                        (msg.senderType === 'USER' ? (isCurrentUserMsg ? '' : msg.senderName || '고객') :
                            (msg.senderType === 'SYSTEM' ? (msg.senderName || '시스템') : '')); // SYSTEM 메시지 발신자명 추가

                    if (msg.senderType === 'SYSTEM') {
                        return (
                            <Message key={msg.icmId || msg.tempId || `sys-${index}`} $isSystem>
                                {senderDisplayName && <strong>{senderDisplayName}: </strong>}
                                <div dangerouslySetInnerHTML={{ __html: msg.message?.replace(/\n/g, '<br />') || '' }} />
                                <MessageTimestamp>
                                    {new Date(msg.sentAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
                                </MessageTimestamp>
                            </Message>
                        );
                    }

                    return (
                        <Message
                            key={msg.icmId || msg.tempId || `chat-${index}`}
                            $isUser={isCurrentUserMsg}
                            style={msg.tempId ? { opacity: 0.7 } : {}}
                        >
                            {!isCurrentUserMsg && senderDisplayName && <strong>{senderDisplayName}</strong>}
                            <div dangerouslySetInnerHTML={{ __html: msg.message?.replace(/\n/g, '<br />') || '' }} />
                            <MessageTimestamp $isUser={isCurrentUserMsg}>
                                {new Date(msg.sentAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
                            </MessageTimestamp>
                        </Message>
                    );
                })}*/}
                {messages.map((msg, index) => {
                    const isCurrentUser = msg.memberCode === currentUser?.memberCode;
                    return (
                        <Message
                            key={msg.icmId || msg.tempId || `msg-${index}`}
                            $isUser={isCurrentUser}
                            style={msg.tempId ? { opacity: 0.5 } : {}}
                        >
                            {!isCurrentUser && <strong>{msg.senderName || '상담원'}</strong>}
                            <div dangerouslySetInnerHTML={{ __html: msg.message }} />
                            <MessageTimestamp $isUser={isCurrentUser}>
                                {new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                            </MessageTimestamp>
                        </Message>
                    );
                })}

                <div ref={messagesEndRef} />
            </MessageBox>
            <BottomInput>
                <InputField
                    ref={inputRef}
                    placeholder="메시지를 입력하세요 (Shift+Enter로 줄바꿈)"
                    value={newMessage}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    rows="1"
                />
                <SendButton
                    onClick={handleSendMessage}
                >
                    전송
                </SendButton>
            </BottomInput>
        </ChatWrapper>
    );
};

export default InquiryChatCom;