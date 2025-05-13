import ChatRoomListCom from "../../../components/community/chat/ChatRoomListCom";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {createChatRoom, getAllChatRooms} from "../../../service/chatService";
import {
    AuthErrorButton,
    AuthErrorContainer,
    AuthErrorMessage,
    AuthErrorTitle
} from "../../../style/community/chat/StyleChatRoom";

function ChatRoomListCon() {

    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newRoomName, setNewRoomName] = useState("");
    const [newRoomDescription, setNewRoomDescription] = useState("");
    const [maxParticipants, setMaxParticipants] = useState("");
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [maxParticipantsError, setMaxParticipantsError] = useState("");



    useEffect(() => {

        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsLoggedIn(true);
            getAllChatRooms()
                .then(res => {
                        if (res) {
                            console.log("받아온 데이터", res);
                            setRooms(res);
                        } else {
                            setRooms([]); // 빈 배열로 초기화
                    }})
                .catch ( err => {
                    console.error("채팅방 목록 불러오기 실패:", err);
                    setError("채팅방 목록을 불러오지 못했어요.");
                })
        }
    }, []);


    const openModal = () => {
        setIsModalOpen(true);
    }

    // 참여 인원수 입력시 100을 초과 하지 않도록 설정
    const handleMaxParticipantsChange = (value) => {
        let v = Number(value);
        if (isNaN(v) || value === "") {
            setMaxParticipants("");
            setMaxParticipantsError("");
            return;
        } else {
            if (v > 100) {
                setMaxParticipants(100);
                setMaxParticipantsError("최대 인원 수는 100을 초과할 수 없습니다.");
            } else if (v < 1) {
                setMaxParticipants(1);
                setMaxParticipantsError("");
            } else {
                setMaxParticipants(v);
                setMaxParticipantsError("");
            }
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewRoomName("");
        setNewRoomDescription("");
        setMaxParticipants("");
    };


    // 채팅방 생성
    const createRoom = async () => {
        if (!newRoomName.trim()) {
            alert("채팅방 이름을 입력해주세요.");
            return;
        }
        if (rooms.find(r => r.title === newRoomName.trim())) {
            alert("이미 존재하는 채팅방 이름입니다.");
            return;
        }
        // 참여 인원수 체크 (1 이상)
        if (maxParticipants < 1) {
            alert("참여 인원수는 1명 이상이어야 합니다.");
            return;
        }


        try {
            const token = localStorage.getItem('accessToken');
            console.log("token 확인 : ", token);
            
            const newRoom = {
                chatRoomTitle: newRoomName.trim(),
                chatRoomDescription: newRoomDescription.trim(),
                chatRoomMaxParticipants: maxParticipants
            }
            console.log("요청 보낼 데이터 확인 : ", newRoom);
            
            const createdRoom = await createChatRoom(newRoom, token);

            // 서버 응답 확인
            if (!newRoom || !createdRoom.chatRoomUid) {
                console.log("서버에서 채팅방 정보가 제대로 오지 않았어요.");
                return;
            }

            /*// 서버에서 생성된 방 데이터를 받아서 상태에 추가
            setRooms(prev => [...prev, createdRoom]);*/
            // 생성 성공 후, 다시 서버에서 채팅방 목록을 불러와 상태에 반영
            const updatedRooms = await getAllChatRooms();
            setRooms(updatedRooms || []);

            closeModal();
            // navigate(`/community/chat/${encodeURIComponent(createdRoom.chatRoomUid)}`);

        } catch (error) {
            alert('채팅방 생성에 실패했습니다: ' + error.message);
        }



        // 모달 닫고, 새 페이지로 이동
        closeModal();
        // 예: /chat/room/{roomName} 경로로 이동 (라우터 설정 필요)
        // navigate(`/api/chat/room/${encodeURIComponent(newRoomName.trim())}`);
    };


    // 채팅방으로 이동
    const goToRoom = (room) => {
        navigate(`/community/chat/${encodeURIComponent(room.chatRoomUid)}`);
    };


    // 로그인 안 한 상태: 로그인 유도 UI
    if (!isLoggedIn) {
        return (
            <AuthErrorContainer>
                <AuthErrorTitle>로그인 하세요 😜</AuthErrorTitle>
                <AuthErrorMessage>채팅 서비스를 이용하려면 로그인이 필요합니다.</AuthErrorMessage>
                <AuthErrorButton onClick={() => window.location.href = "/login"}>
                    로그인 페이지로 이동
                </AuthErrorButton>
            </AuthErrorContainer>
        );
    }


    return (
        <>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <ChatRoomListCom
                rooms={rooms}
                isModalOpen={isModalOpen}
                newRoomName={newRoomName}
                setNewRoomName={setNewRoomName}
                newRoomDescription={newRoomDescription}
                setNewRoomDescription={setNewRoomDescription}
                maxParticipants={maxParticipants}
                maxParticipantsError={maxParticipantsError}
                setMaxParticipants={handleMaxParticipantsChange}
                openModal={openModal}
                closeModal={closeModal}
                createRoom={createRoom}
                goToRoom={goToRoom}
            />

        </>
    )
}

export default ChatRoomListCon;