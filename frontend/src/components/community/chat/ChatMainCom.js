import {ChatBox, ChatButton, ChatForm, ChatInput,ConnectionStatus,Container,JoinMsg,LeaveMsg,MessageRow
} from '../../../style/community/chat/StyledChatMain'
import FormatDate from '../../../utils/FormatDate';

function ChatMainCom({isConnected, username, messages, sendMessage, newMessage, setNewMessage, currentRoomId }) {

    return (
        <Container>
            <h2>
                실시간 채팅 (
                <ConnectionStatus connected={isConnected}>
                    {isConnected ? "연결됨" : "연결 끊김"}
                </ConnectionStatus>
                )
            </h2>
            <p>사용자: {username}</p>
            {/* <p>방 번호 : {messages.roomId}</p> */}
            <p>방 번호 : {currentRoomId}</p>
            <ChatBox>
                {messages.map((msg, index) => (
                    <MessageRow key={index}>
                        <strong>{msg.sender}</strong> 
                        ({FormatDate(msg.sentAt || Date.now())}): {msg.message}
                        {msg.type === "JOIN" && <JoinMsg>님이 입장했습니다.</JoinMsg>}
                        {msg.type === "LEAVE" && <LeaveMsg>님이 퇴장했습니다.</LeaveMsg>}
                    </MessageRow>
                ))}
            </ChatBox>
            <ChatForm onSubmit={sendMessage}>
                <ChatInput
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="메시지를 입력하세요..."
                    disabled={!isConnected}
                />
                <ChatButton type="submit" disabled={!isConnected}>
                    보내기
                </ChatButton>
            </ChatForm>
        </Container>

    )
}

export default ChatMainCom;