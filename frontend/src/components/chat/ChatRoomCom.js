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
    MessageRow,
    messageTextStyle,
    profileImageStyle,
    senderInfoStyle,
    DangerButton,
    OutlineButton,
    ChatRoomTitleText,
    ChatRoomDescription, CreatorBadge
} from '../../style/community/chat/StyleChatRoom'
import FormatDate from '../../utils/FormatDate';
import {useEffect, useRef, useState} from "react";


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
                    src={profileImageUrl || "/img/default-profile.jpg"}
                    alt="프로필 이미지"
                    style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        marginBottom: '10px',
                        objectFit: 'cover',
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




function ChatRoomCom({isConnected, username, messages, sendMessage, newMessage, setNewMessage, roomUid, onDeleteChatRoom, onHandleLeaveChatRoom, roomDetails}) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSender, setSelectedSender] = useState({});
    const chatBoxRef = useRef(null);

    const handleSenderClick = (sender, profileImageUrl) => {
        setSelectedSender({ sender, profileImageUrl });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSender({});
    };

    // messages 배열이 변경될 때마다 스크롤을 맨 아래로 이동
    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);



    return (
        <Container>
            <h2>
                실시간 채팅 (
                <ConnectionStatus connected={isConnected}>
                    {isConnected ? "연결됨" : "연결 끊김"}
                </ConnectionStatus>
                )
            </h2>
            <ChatRoomTitleText>{roomDetails?.chatRoomTitle}</ChatRoomTitleText >
            <ChatRoomDescription >{roomDetails?.chatRoomDescription}</ChatRoomDescription >
            <p>사용자: {username}</p>
            {roomDetails && roomDetails.currentUserCreator && (
                <p style={{ color: 'green', fontWeight: 'bold', textAlign: 'center', marginBottom: '10px' }}>
                    <span role="img" aria-label="crown">👑</span> 당신은 이 채팅방의 방장입니다. <span role="img" aria-label="crown">👑</span>
                </p>
            )}
            {/* 삭제는 DangerButton 사용 */}
            <DangerButton onClick={() => onDeleteChatRoom(roomUid)}>
                채팅방 삭제
            </DangerButton>
            {/* 나가기는 PrimaryButton 사용 */}
            <OutlineButton onClick={onHandleLeaveChatRoom}>
                채팅방 나가기
            </OutlineButton>

            <ChatBox ref={chatBoxRef}>
                {messages.map((msg, index) => (
                    <MessageRow key={index}>
                        <div style={messageContentStyle}>
                            {msg.type === "CHAT" && (
                                <img
                                    src={msg.profileImageUrl || "/img/default-profile.jpg"}
                                    alt="profile"
                                    style={profileImageStyle}
                                    onClick={() => handleSenderClick(msg.sender, msg.profileImageUrl)}
                                />
                            )}
                            <div style={messageTextStyle}>
                                {msg.type === "CHAT" && (
                                    <span style={senderInfoStyle}
                                          onClick={() => handleSenderClick(msg.sender, msg.profileImageUrl)}
                                    >
                                          {/* 방장 비교 전 로그 추가 */}
                                        {/*console.log(`비교: msg.memberCode (${msg.memberCode}, type:${typeof msg.memberCode}) vs roomDetails.memberCode (${roomDetails?.memberCode}, type:${typeof roomDetails?.memberCode})`)*/}
                                        {/* 메시지 발신자 닉네임 옆에 방장 표시 */}
                                        {/*{roomDetails && roomDetails.memberCode === Number(msg.memberCode) && (
                                            <CreatorBadge>방장</CreatorBadge>
                                        )}*/}
                                            <strong>{msg.sender}</strong>
                                            <small> ({FormatDate(msg.sentAt || Date.now())})</small>
                                    </span>
                                )}
                                <span>
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