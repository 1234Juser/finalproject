import {
    ChatBox,
    ChatButton,
    ChatForm,
    ChatInput,
    ConnectionStatus,
    Container,
    JoinMsg,
    LeaveMsg,
    messageContentStyle,
    MessageRow, messageTextStyle, profileImageStyle, senderInfoStyle
} from '../../../style/community/chat/StyleChatRoom'
import FormatDate from '../../../utils/FormatDate';

function ChatRoomCom({isConnected, username, messages, sendMessage, newMessage, setNewMessage, roomUid, onDeleteChatRoom }) {

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
            <p>방 번호 : {roomUid}</p>
            <button 
                onClick={() => {onDeleteChatRoom(roomUid)}}
                style={{backgroundColor:'red', color:'white', marginBottom:'10px'}}
            >
                채팅방 삭제
            </button>

            <ChatBox>
                {messages.map((msg, index) => (
                    <MessageRow key={index}>
                        <div style={messageContentStyle}>
                            {msg.type === "CHAT" && ( // 일반 채팅 메시지(CHAT 타입)일 때만 프로필 이미지 표시
                                <img
                                    src={msg.profileImageUrl || "/img/default-profile.jpg"} // 기본 프로필 이미지 경로를 설정해주세요.
                                    alt="profile"
                                    style={profileImageStyle}
                                />
                            )}
                            <div style={messageTextStyle}>
                                {msg.type === "CHAT" && (
                                    <span style={senderInfoStyle}>
                                            <strong>{msg.sender}</strong>
                                            <small> ({FormatDate(msg.sentAt || Date.now())})</small>
                                        </span>
                                )}
                                <span> {/* 실제 메시지 내용 */}
                                    {msg.message}
                                     </span>
                                {msg.type === "JOIN" && <JoinMsg><strong>{msg.sender}</strong>님이 입장했습니다.</JoinMsg>}
                                {msg.type === "LEAVE" && <LeaveMsg><strong>{msg.sender}</strong>님이 퇴장했습니다.</LeaveMsg>}
                            </div>
                        </div>

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

export default ChatRoomCom;