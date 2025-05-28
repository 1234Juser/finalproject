import {
    Container,
    CreateButton,
    Header, Input, ModalButtons, ModalContent, ModalHeader,
    ModalOverlay,
    RoomItem,
    RoomList, Button, ErrorMessage
} from "../../style/community/chat/StyleChatRoomList";
import FormatDate from "../../utils/FormatDate";

function ChatRoomListCom({
                             rooms,
                             isModalOpen,
                             newRoomName,
                             setNewRoomName,
                             newRoomDescription,
                             setNewRoomDescription,
                             maxParticipants,
                             setMaxParticipants,
                             openModal,
                             closeModal,
                             goToRoom,
                             createRoom, maxParticipantsError
                         }) {


    return (
        <Container>
            <Header>개설된 채팅방 목록</Header>
            <RoomList>
                {Array.isArray(rooms) &&rooms.length === 0 ? (
                    <div>현재 개설된 채팅방이 없습니다.</div>
                ) : (
                    rooms?.map((room, idx) => (
                    <RoomItem key={room.chatRoomId}
                              onClick={() => room.currentParticipants < room.chatRoomMaxParticipants && goToRoom(room)}
                              style={{
                                  pointerEvents: room.currentParticipants >= room.chatRoomMaxParticipants ? 'none' : 'auto',
                                  opacity: room.currentParticipants >= room.chatRoomMaxParticipants ? 0.5 : 1,
                              }}

                    >
                            <div>
                                <strong>{room.chatRoomTitle}</strong>
                                <p>{room.chatRoomDescription}</p>
                                <p>현재 참여 인원 | {room.currentParticipants}</p>
                                <p>개설일자 | {FormatDate(room.chatRoomCreateAt)}</p>
                                <small>최대 참여 인원 |  {room.chatRoomMaxParticipants}</small>
                                {room.currentParticipants >= room.chatRoomMaxParticipants && (
                                    <p style={{ color: '#151515' }}>🔥 최대 인원이 초과되었습니다.</p>
                                )}
                            </div>
                    </RoomItem>
                    ))
                )}
                
            </RoomList>
            <CreateButton onClick={() => openModal()}>
            새 채팅방 만들기
            </CreateButton>


            {isModalOpen && (
                <>
                    <ModalOverlay onClick={closeModal} />
                    <ModalContent>
                        <ModalHeader>새 채팅방 만들기</ModalHeader>
                        <Input
                            type="text"
                            placeholder="채팅방 이름을 입력하세요"
                            value={newRoomName}
                            onChange={(e) => setNewRoomName(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') createRoom(); }}
                            autoFocus
                        />
                        <Input
                            type="text"
                            placeholder="채팅방 설명을 입력하세요"
                            value={newRoomDescription}
                            onChange={(e) => setNewRoomDescription(e.target.value)}
                        />
                        <Input
                            type="number"
                            min={1}
                            max={100}
                            placeholder="참여 인원수 제한을 입력하세요"
                            value={maxParticipants}
                            onChange={(e) => setMaxParticipants(e.target.value)}
                        />
                        {maxParticipantsError && (
                            <ErrorMessage>{maxParticipantsError}</ErrorMessage>
                        )}

                        <ModalButtons>
                            <Button onClick={createRoom}>생성</Button>
                            <Button onClick={closeModal}>취소</Button>
                        </ModalButtons>
                    </ModalContent>
                </>
            )}
        </Container>
    );


}

export default ChatRoomListCom;