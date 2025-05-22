import {
    BottomInput,
    ChatWrapper,
    Description,
    Header, InputField,
    MessageBox, Message, SendButton,
    Title, /* LoadingOverlay, */ ErrorMessageUI, MessageTimestamp, CloseButton // LoadingOverlay 제거
} from "../../style/inquiry/StyleInquiryChat";
import {useEffect, useRef} from "react";

const InquiryChatCom = ({
                            isConnected, icId, error,
                            messages = [], currentUser, inputRef, newMessage, handleInputChange, handleKeyPress,
                            handleSendMessage, isUserLoggedIn, handleCloseChat
                        }) => {

    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    // 메시지 목록 끝으로 스크롤
    useEffect(() => {
        const container = messagesEndRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
            // messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, messagesEndRef]);


    console.log('메시지 확인:::::::::', messages);


    return (
        <ChatWrapper>
            <Header>
                <Title>1:1 문의</Title>
                <Description style={{ color: isConnected ? 'lightgreen' : 'orange' }}>
                    {isUserLoggedIn ? ( isConnected ? '연결됨' : '연결 끊김') : ''}
                    {isUserLoggedIn ? ( icId !== null ? ` (ID: ${icId})` : '') : ''}
                </Description>
                {isUserLoggedIn ? <CloseButton onClick={handleCloseChat}>종료</CloseButton> : ''}
            </Header>
            <MessageBox ref={messagesContainerRef}>
                {error && <ErrorMessageUI>{error}</ErrorMessageUI>}
                {messages && messages.length === 0 && !error && (
                    <Message $isSystemInfo>
                        <strong>Whats's up?, Hello, Travelogic!</strong><br />
                        <span>안녕하세요! 무엇을 도와드릴까요?</span><br /><br />
                        <span>💬 채팅상담 연중무휴 24시간</span><br />
                        <span>📞 유선상담 평일 09:00~18:00</span><br /><br />
                    </Message>
                )}
                {messages.map((msg, index) => {
                    const isCurrentUser = msg.memberCode === currentUser?.memberCode;
                    return (
                        <Message
                            key={msg.icmId || msg.tempId || `msg-${index}`}
                            $isUser={isCurrentUser}
                            $isSystem={msg.senderType === "SYSTEM"}
                            style={msg.tempId ? { opacity: 0.5 } : {}}
                        >
                            {msg.senderType !== "SYSTEM" && !isCurrentUser && <strong>{msg.senderName || '상담원'}</strong>}
                            <div dangerouslySetInnerHTML={{ __html: msg.message }} />
                            {msg.senderType !== "SYSTEM" && (
                                <MessageTimestamp $isUser={isCurrentUser}>
                                    {new Date(msg.sendAt).toLocaleString()}
                                </MessageTimestamp>
                            )}
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