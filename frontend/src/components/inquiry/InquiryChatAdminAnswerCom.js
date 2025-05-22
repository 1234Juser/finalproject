import AdminSideBarPage from "../../pages/common/AdminSideBarPage";
import {
    ContentWrapper,
    Header,
    Message,
    MessageInputContainer,
    MessagesContainer,
    SendButton,
    Sender,
    TextArea,
    Timestamp,
    MessageContent
} from "../../style/inquiry/StyleInquiryChatAdminAnswer";
import { containerStyle, mainStyle, sidebarStyle } from "../../style/member/AdminMyPageStyle";
import React, { useEffect, useRef } from "react";

function InquiryChatAdminAnswerCom({
    messages,
    inquiryChatId,
    loading,
    error,
    handleSendMessage,
    newMessage,
    handleInputChange,
    handleKeyPress, chatClosed
}) {

    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);


// 새 메시지가 추가될 때 자동 스크롤
    useEffect(() => {
        const container = messagesContainerRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }

    }, [messages]);




    return (
        <div style={containerStyle}>
            <aside style={sidebarStyle}>
                <AdminSideBarPage />
            </aside>
            <main style={mainStyle}>
                <ContentWrapper>
                    <Header>채팅방 ID: {inquiryChatId}</Header>

                    {/* 메시지 목록 */}
                    {loading ? (
                        <p>로딩 중...</p>
                    ) : error ? (
                        <p style={{ color: "red" }}>{error}</p>
                    ) : (
                        <MessagesContainer ref={messagesContainerRef}>
                        {messages.map(message => (
                                <Message key={message.icmId} senderType={message.senderType}>
                                    <Sender>
                                        {message.senderType === "ADMIN" ? "관리자" : "사용자"}
                                    </Sender>
                                    <MessageContent>{message.message}</MessageContent>
                                    <Timestamp>
                                        {new Date(message.sendAt).toLocaleString()}
                                    </Timestamp>
                                </Message>
                            ))}
                            <div ref={messagesEndRef} />
                        </MessagesContainer>
                    )}

                    {/* 메시지 작성 */}
                    <MessageInputContainer>
                        <TextArea
                            value={newMessage}
                            onChange={handleInputChange}
                            placeholder="답장을 입력하세요..."
                            onKeyPress={handleKeyPress}
                            rows="3"
                            disabled={chatClosed}
                        />
                        <SendButton onClick={handleSendMessage} disabled={chatClosed}>
                            전송
                        </SendButton>
                    </MessageInputContainer>
                </ContentWrapper>
            </main>
        </div>
    );
}

export default InquiryChatAdminAnswerCom;