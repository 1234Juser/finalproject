import {
    BottomInput,
    ChatWrapper,
    Description,
    Header, InputField,
    MessageBox, Message, SendButton,
    Title, /* LoadingOverlay, */ ErrorMessageUI, MessageTimestamp // LoadingOverlay 제거
} from "../../style/common/InquiryChatStyle";

const InquiryChatCom = ({
                            selectedTopic, isConnected, currentInquiryChatId, error, // isLoading, isLoadingHistory 제거
                            messages = [], currentUser, messagesEndRef, inputRef, newMessage, handleInputChange, handleKeyPress,
                            handleSendMessage,
                        }) => {
    return (
        <ChatWrapper style={{ position: 'relative' }}>
            {/* {(isLoading || isLoadingHistory) && <LoadingOverlay>메시지 로딩 중...</LoadingOverlay>} REMOVED */}
            <Header>
                <Title>1:1 문의 {selectedTopic ? `- ${selectedTopic}` : ''}</Title>
                <Description style={{ color: isConnected ? 'lightgreen' : 'orange' }}>
                    {isConnected ? '연결됨' : '연결 시도 중...'} {/* ID 표시가 null일 수 있으므로 조건부 처리 */}
                    {currentInquiryChatId !== null ? ` (ID: ${currentInquiryChatId})` : ''}
                </Description>
            </Header>
            <MessageBox>
                {/* 에러 메시지를 간결하게 표시하거나, 필요에 따라 제거/수정 */}
                {error && <ErrorMessageUI>{error}</ErrorMessageUI>}

                {/* messages가 있고 길이가 0일 때 (isLoadingHistory 조건 제거) */}
                {messages && messages.length === 0 && !error && (
                    <Message $isSystem>
                        <strong>Whats's up?, Hello, Travelogic!</strong><br />
                        <span>안녕하세요! 무엇을 도와드릴까요?</span><br /><br />
                        <span>💬 채팅상담 연중무휴 24시간</span><br />
                        <span>📞 유선상담 평일 09:00~18:00</span><br /><br />
                    </Message>
                )}
                {messages && messages.map((msg, index) => {
                    const isCurrentUserMsg = msg.memberCode !== null && currentUser && msg.memberCode === currentUser.memberCode && msg.senderType === 'USER';
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