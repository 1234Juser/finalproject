import {
    BottomInput,
    ChatWrapper,
    Description,
    Header, InputField,
    MessageBox, Message, SendButton,
    Title, LoadingOverlay, ErrorMessageUI, MessageTimestamp
} from "../../style/common/InquiryChatStyle";

const InquiryChatCom = ({isLoading, isLoadingHistory, selectedTopic, isConnected, currentInquiryChatId, error, messages=[], currentUser, messagesEndRef, inputRef, newMessage, handleInputChange, handleKeyPress
    , handleSendMessage, 
}) => {
    return (
        <ChatWrapper style={{ position: 'relative' }}>
            {(isLoading || isLoadingHistory) && <LoadingOverlay>메시지 로딩 중...</LoadingOverlay>}
            <Header>
                <Title>1:1 문의 {selectedTopic ? `- ${selectedTopic}` : ''}</Title>
                <Description style={{ color: isConnected ? 'lightgreen' : 'orange' }}>
                    {isConnected ? '연결됨' : '연결 중...'} (ID: {currentInquiryChatId})
                </Description>
            </Header>
            <MessageBox>
                {error && !isLoading && !isLoadingHistory && <ErrorMessageUI>{error}</ErrorMessageUI>}
                {/* messages가 있고 길이가 0일 때 */}
                {!isLoadingHistory && messages && messages.length === 0 && !error && (
                    <Message $isSystem>
                        <strong>Whats's up?, Hello, Travelogic!</strong><br />
                        <span>안녕하세요! 무엇을 도와드릴까요?</span><br /><br />
                        <span>💬 채팅상담 연중무휴 24시간</span><br />
                        <span>📞 유선상담 평일 09:00~18:00</span><br /><br />

                    </Message>
                )}
                {/* messages가 있을 때만 map 실행 */}
                {messages && messages.map((msg, index) => {
                    // msg.memberCode, msg.senderType (USER, ADMIN, SYSTEM), msg.type (CHAT, JOIN, LEAVE 등) 활용
                    const isCurrentUserMsg = msg.memberCode === currentUser.memberCode && msg.senderType === 'USER';
                    const senderDisplayName = msg.senderType === 'ADMIN' ? '상담원' :
                                              (msg.senderType === 'USER' ? (isCurrentUserMsg ? '' : msg.senderName || '고객') : '');
                    
                    // 시스템 메시지 부분
                    // 메시지 타입에 따른 스타일링 또는 내용 변경 가능
                    if (msg.type === 'JOIN' || msg.type === 'LEAVE' || msg.type === 'INFO' || msg.senderType === 'SYSTEM') {
                        return (
                            <Message key={msg.icmId || msg.tempId || `sys-${index}`} $isSystem>
                                <div dangerouslySetInnerHTML={{ __html: msg.message?.replace(/\n/g, '<br />') || '' }} />
                                {/* 기존 div 대신 MessageTimestamp 컴포넌트 사용, $isUser prop은 시스템 메시지에는 불필요할 수 있으므로 기본 정렬 따름 */}
                                <MessageTimestamp>
                                    {new Date(msg.sentAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
                                </MessageTimestamp>
                            </Message>
                        )
                    }

                    // 일반 채팅 메시지 부분
                    return (
                        <Message
                            key={msg.icmId || msg.tempId || `chat-${index}`}
                            $isUser={isCurrentUserMsg}
                            style={msg.tempId ? { opacity: 0.7 } : {}}
                        >
                            {!isCurrentUserMsg && senderDisplayName && <strong>{senderDisplayName}</strong>}
                            <div dangerouslySetInnerHTML={{ __html: msg.message?.replace(/\n/g, '<br />') || '' }} />
                            {/* 기존 div 대신 MessageTimestamp 컴포넌트 사용, $isUser prop 전달 */}
                            <MessageTimestamp $isUser={isCurrentUserMsg}>
                                {new Date(msg.sentAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
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
                    // disabled={!isConnected || isLoading || isLoadingHistory}
                />
                {/* <SendButton onClick={handleSendMessage} disabled={!newMessage || !isConnected || isLoading || isLoadingHistory}> */}
                <SendButton onClick={handleSendMessage}>
                    전송
                </SendButton>
            </BottomInput>
        </ChatWrapper>
    );
};

export default InquiryChatCom;
