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
} from '../../style/community/chat/StyleChatRoom'
import FormatDate from '../../utils/FormatDate';
import {useState} from "react";


// 모달 컴포넌트 정의
function Modal({ isOpen, onClose,  showId,  profileImageUrl}) {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center',
                width: '300px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
                <h3>회원 정보</h3>
                <img
                    src={profileImageUrl || "/img/default-profile.jpg"} // 기본 이미지를 fallback으로 설정
                    alt="프로필 이미지"
                    style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        marginBottom: '10px',
                        objectFit: 'cover', // 이미지를 중앙에 맞추고 자름
                        border: '1px solid #ddd'
                    }}
                />

                <p><strong>아이디:</strong> {showId}</p>
                <button style={{ marginTop: '10px' }} onClick={onClose}>
                    닫기
                </button>
            </div>
        </div>
    );
}




function ChatRoomCom({isConnected, username, messages, sendMessage, newMessage, setNewMessage, roomUid, onDeleteChatRoom, onHandleLeaveChatRoom,
                        currentParticipants}) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSender, setSelectedSender] = useState({});

    const handleSenderClick = (sender, profileImageUrl) => {
        setSelectedSender({ sender, profileImageUrl });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSender({});
    };



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
            {/*<p>현재 참여 인원 : {currentParticipants}</p>*/}
            <button 
                onClick={() => {onDeleteChatRoom(roomUid)}}
                style={{backgroundColor:'red', color:'white', marginBottom:'10px'}}
            >
                채팅방 삭제
            </button>
            <button onClick={onHandleLeaveChatRoom}>채팅방 나가기</button>

            <ChatBox>
                {messages.map((msg, index) => (
                    <MessageRow key={index}>
                        <div style={messageContentStyle}>
                            {msg.type === "CHAT" && ( // 일반 채팅 메시지(CHAT 타입)일 때만 프로필 이미지 표시
                                <img
                                    src={msg.profileImageUrl || "/img/default-profile.jpg"} // 기본 프로필 이미지 경로를 설정해주세요.
                                    alt="profile"
                                    style={profileImageStyle}
                                    onClick={() => handleSenderClick(msg.sender, msg.profileImageUrl)} // 이미지 클릭 이벤트
                                />
                            )}
                            <div style={messageTextStyle}>
                                {msg.type === "CHAT" && (
                                    <span style={senderInfoStyle}
                                          onClick={() => handleSenderClick(msg.sender, msg.profileImageUrl)} // 발신자 클릭 이벤트
                                    >
                                            <strong>{msg.sender}</strong>
                                            <small> ({FormatDate(msg.sentAt || Date.now())})</small>
                                    </span>
                                )}
                                <span>
                                    {/* 실제 메시지 내용 */}
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

            {/* 모달 컴포넌트 */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                showId={selectedSender.sender}
                profileImageUrl={selectedSender.profileImageUrl}
            />

        </Container>

    )
}

export default ChatRoomCom;