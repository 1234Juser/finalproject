import AdminSideBarPage from "../../pages/common/AdminSideBarPage";
import {
    ContentWrapper,
    Header,
    Message, MessageInputContainer,
    MessagesContainer, SendButton, Sender,
    TextArea, Timestamp
} from "../../style/inquiry/StyleInquiryChatAdminAnswer";
import { containerStyle, mainStyle, sidebarStyle } from "../../style/member/AdminMyPageStyle";
import React from "react";

function InquiryChatAdminAnswerCom({
    messages,
    inquiryChatId,
    loading,
    error,
    handleSendMessage,
    sending,
    newMessage, handleInputChange, handleKeyPress,
    isConnected,
}) {
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
                        <MessagesContainer>
                            {messages.map(message => (
                                    <Message key={message.icmId || message.inquiryChatMessageId} senderType={message.inquiryChatMessageSenderType}>
                                        <Sender>
                                            {message.inquiryChatMessageSenderType === "ADMIN" ? "관리자" : "사용자"}
                                        </Sender>
                                        <p>{message.inquiryChatMessage}</p>
                                        <Timestamp>
                                            {new Date(message.inquiryChatMessageSentAt).toLocaleString()}
                                        </Timestamp>
                                    </Message>
                                ))}
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
                        />
                        <SendButton onClick={handleSendMessage}>
                            전송
                        </SendButton>
                    </MessageInputContainer>
                </ContentWrapper>
            </main>
        </div>
    );
}

export default InquiryChatAdminAnswerCom;