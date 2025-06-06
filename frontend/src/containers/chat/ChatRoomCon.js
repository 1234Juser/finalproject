import {useEffect, useReducer, useRef} from "react";
import ChatRoomCom from "../../components/chat/ChatRoomCom";
import SockJS from "sockjs-client";
import {Stomp} from '@stomp/stompjs';
import {chatReducer, initialState} from "../../modules/chatReducer";
import {
    AuthErrorButton,
    AuthErrorContainer,
    AuthErrorMessage,
    AuthErrorTitle,
} from "../../style/community/chat/StyleChatRoom";
import {useNavigate} from "react-router-dom";
import {deleteChatRoom, getChatRoomDetail, leaveChatRoom} from "../../service/chatService";


function ChatRoomCon({roomUid}) {
    const [state, dispatch] = useReducer(chatReducer, initialState);
    const { messages, newMessage, username, memberCode, isConnected, isLoading, authError, roomDetails } = state;
    const stompClientRef = useRef(null); // STOMP 클라이언트 인스턴스를 저장하기 위한 ref
    const navigate = useNavigate();



    // 로그인 유저의 정보/JWT 토큰 가져오기
    const getAuthInfo = () => {
        const token = localStorage.getItem('accessToken');
        const loggedInUsername = localStorage.getItem('memberName');
        const loggedInMemberCode = localStorage.getItem('memberCode');

        if (token && loggedInMemberCode) {
            return {
                token : token.trim(),
                username: loggedInUsername,
                memberCode : loggedInMemberCode 
            };
        }
        return { token: null, username: null, memberCode : null };
    };

    
    // 사용자 인증
    useEffect(() => {

        if (roomUid) {

            const authInfo = getAuthInfo();

            // 토근 유무 확인
            if (authInfo.token && authInfo.username && authInfo.memberCode) {
                dispatch({type: 'SET_USERNAME', payload: authInfo.username});
                dispatch({type: 'SET_MEMBER_CODE', payload: authInfo.memberCode});

                // --- 여기서 getChatRoomDetail 함수 호출 ---
                const fetchRoomDetails = async () => {
                    try {
                        const details = await getChatRoomDetail(roomUid, authInfo.token);
                        if (details) {
                            dispatch({type: 'SET_ROOM_DETAILS', payload: details});
                        }

                    } catch (error) {
                        console.error("채팅방 상세 정보 로드 실패:", error);
                        // 오류 발생 시 사용자에게 알리거나, 채팅방 목록으로 리다이렉트 등을 고려할 수 있습니다.
                    }
                };
                fetchRoomDetails();
                // ------------------------------------------




            } else {
                dispatch({type: 'SET_AUTH_ERROR', payload: "본 서비스는 로그인이 필요합니다."});
            }
            dispatch({type: 'SET_LOADING', payload: false});

            // 컴포넌트 언마운트 시 연결 해제 
            if (stompClientRef.current && stompClientRef.current.connected) {
                console.log('Disconnecting...');
                stompClientRef.current.disconnect();
                dispatch({type: 'SET_CONNECTED', payload: false});
            }
            
        }
    }, [roomUid]);


    // 로딩이 끝났고, 인증 오류가 없고, username과 roomId가 있고, 아직 연결 안 됐으면 연결 시도
    useEffect(() => {
        const authInfo = getAuthInfo();
        if (!isLoading &&
            !authError &&
            username &&    // UI 표시용 username
            memberCode &&    // 실제 식별자
            roomUid &&      // 방 ID가 있어야 연결 시도
            (!stompClientRef.current || !stompClientRef.current.connected)
        ) {
            // console.log(`Attempting to connect with username: ${username}, memberCode: ${memberCode}, roomId: ${roomUid}`);
            connect(authInfo.token);
        }
    }, [username, memberCode, roomUid, isLoading, authError]);


    // 연결 후 메시지 받기 (STOMP 연결 함수)
    const connect = (token) => {
        
        if (!username || !memberCode || (stompClientRef.current && stompClientRef.current.connected)) {
            // 이미 연결되어 있거나 username이 없으면 중복 연결 방지
            // console.log('Connection prerequisites not met or already connected.');
            return;
        }
        
        // 토큰이 없으면 연결 시도조차 하지 않음 (이미 useEffect에서 authError로 처리됨)
        if (!token && !authError) { 
            dispatch({ type: 'SET_AUTH_ERROR', payload: "인증 토큰 없이 연결할 수 없습니다. 로그인이 필요합니다." });
            return;
        }

        // console.log(`Connecting to WebSocket with roomId: ${roomUid}, username: ${username}, memberCode: ${memberCode}, token: ${token ? 'present' : 'absent'}...`);
        // const socket = new SockJS('http://localhost:8080/ws');
        const socket = new SockJS('https://api.hellotravelogic.link/ws');
        const stompClient = Stomp.over(socket);
        stompClientRef.current = stompClient; // ref에 클라이언트 저장

        const connectHeaders = {};
        if (token) {
            connectHeaders['Authorization'] = 'Bearer ' + token;
        } else {
            // 토큰이 없는 경우, 인터셉터에서 어차피 거부하겠지만, 클라이언트에서도 인지.
            // 이 경우는 보통 useEffect에서 authError가 먼저 설정되어 connect 호출이 안됨.
            console.warn('Attempting to connect without a token.');
        }

        stompClient.connect(
            {connectHeaders},   // 헤더에 JWT 토큰 포함하기
            (frame) => {        // 연결 성공 시 콜백
                console.log('STOMP Connected: ' + frame);
                dispatch({ type: 'SET_AUTH_ERROR', payload: null });    // 연결 성공 시 이전 인증 오류 해제
                dispatch({ type: 'SET_CONNECTED', payload: true });


                // 참가 정보 업데이트 구독
                stompClient.subscribe(`/topic/chat/${roomUid}/updates`, (message) => {
                    const payload = JSON.parse(message.body);

                    if (payload.type === "USER_UPDATE") {
                        // 참여 인원이 서버로부터 브로드캐스트된 경우 UI에 반영
                        dispatch({ type: 'SET_ROOM_DETAILS', payload: { ...roomDetails, currentParticipants: payload.currentParticipants } });
                    }

                });

                // 1. >>>>클라이언트<<<가 채팅방에 입장할 때 서버로 메시지 전송
                const joinMessage = {
                    type: 'JOIN', 
                    roomId : roomUid,
                    sender: username,      // ★★ 실질적으로 서버로 보내는 프로퍼티 ★★
                    memberCode : memberCode,
                    sentAt : new Date().toISOString()
                };
                stompClient.send(`/app/chat.addUser/${roomUid}`,
                    {},
                    JSON.stringify(joinMessage)   
                );

                // 2. joinMessage를 받아서 처리한 후, 구독하는 경로로 보냄. (서버 ChatService.addUser에서 보냄)
                // 특정 채팅방 구독
                if (roomUid) {
                    // console.log(`구독중인 채팅방 :  /topic/chat/${roomUid}`);
                    stompClient.subscribe(`/topic/chat/${roomUid}`, (message) => {
                        const receivedChatMessage = JSON.parse(message.body);
                        // console.log(`>>>>> Message received from /topic/chat/${roomUid}:`, receivedChatMessage);
                    // 메시지 타입에 따라 처리
                    switch (receivedChatMessage.type) {
                        case 'CHAT':
                        case 'JOIN':
                        case 'INFO':
                        case 'LEAVE': // ★ LEAVE 메시지도 UI에 표시 ★
                            dispatch({ type: 'ADD_MESSAGE', payload: receivedChatMessage });
                            break;
                        case 'ERROR':
                            console.error("Received ERROR message:", receivedChatMessage.message);
                            alert("오류: " + receivedChatMessage.message);
                            // 오류 발생 시 채팅방 나가기 등을 고려할 수 있습니다.
                            // navigate("/community/chat");
                            break;
                        default:
                            console.warn("Unknown message type received:", receivedChatMessage.type, receivedChatMessage);
                            // 알 수 없는 타입의 메시지는 무시하거나 로깅
                    }
                    });
                }
            },
            (error) => {
                // 연결 실패 시 콜백
                console.error('Connection error: ' + error);
                dispatch({ type: 'SET_CONNECTED', payload: false });
                dispatch({
                    type: 'SET_AUTH_ERROR',
                    payload: "채팅 서버 연결에 실패했습니다. 로그인 상태를 확인하거나 잠시 후 다시 시도해주세요.",
                });
                // 연결 실패 시 5초 후 재시도 + 토큰 전달
                setTimeout(() => {
                    if (!stompClientRef.current || !stompClientRef.current.connected) {
                         connect(token);
                    }
                }, 5000);
            }
        );
    };


    // 메시지 전송
    const sendMessage = (event) => {
        event.preventDefault();

        if (newMessage && roomUid && memberCode && stompClientRef.current && stompClientRef.current.connected) {
            // 1. 클라이언트에서 전송
            const chatMessage = {
                type: 'CHAT',
                roomId : roomUid,
                sender: username,      // ★ sender로 username (memberName) 사용 ★
                message: newMessage,
                sentAt : new Date().toISOString(),
                memberCode : memberCode,
            };
            // console.log(`----------Sending CHAT message to /app/chat.send/${roomUid}:`, chatMessage);
            
            // 2. 서버에서 수신 후 클라이언트로 전송
            stompClientRef.current.send(`/app/chat.send/${roomUid}`, {}, JSON.stringify(chatMessage));
            dispatch({ type: 'SET_NEW_MESSAGE', payload: '' });
        } else {
            console.log("Cannot send message. Conditions not met: ",
                {newMessage, roomUid, memberCode: memberCode, username: username,
                    connected: stompClientRef.current?.connected});
        }
    };


    // 인증 오류가 있으면 해당 화면을 먼저 표시
    if (authError) {
        return (
            <AuthErrorContainer>
                <AuthErrorTitle>로그인 하세요 😜</AuthErrorTitle>
                <AuthErrorMessage>{authError}</AuthErrorMessage>
                <AuthErrorButton onClick={() => window.location.href = '/login'}>
                    로그인
                </AuthErrorButton>
            </AuthErrorContainer>
        );
    }


    // 채팅방 삭제
    const onDeleteChatRoom = async (roomUidToDelete) => {   // 파라미터 이름 변경 (roomUid와의 혼동 방지)
        const authInfo = getAuthInfo();     // 토큰 확인용으로 계속 사용
        if (!authInfo.token) {
            alert("로그인이 필요합니다.");
            return;
        }

        const confirmDelete = window.confirm("정말 이 채팅방을 삭제할까요?");
        if (!confirmDelete) return;

        try {
            const res = await deleteChatRoom(roomUidToDelete, authInfo.token);
            if (res.ok) {
                alert("채팅방을 삭제했습니다.");
                navigate("/community/chat");
            } else {
                const errorData = await res.json().catch(() => ({ message: "채팅방 삭제에 실패했습니다." }));
                alert(errorData.message || "채팅방 삭제에 실패했습니다.");
            }
        } catch (err) {
            console.error("삭제 중 오류 발생 : ", err);
            alert("삭제 중 오류가 발생했습니다.");
        }
    }


    // 채팅방 나가기
    // 사용자가 명시적으로 채팅방에서 퇴장 (나가기 버튼 클릭 등) 시 호출되는 함수.
    const onHandleLeaveChatRoom = async () => {
        const authInfo = getAuthInfo();
        const currentStompClient = stompClientRef.current;

        const confirmExit = window.confirm("정말 이 채팅방에서 나가시겠습니까?");
        if (!confirmExit) return;

        try {

            // 1. 서버로 LEAVE 메시지 전송 (다른 사용자들에게 알림)
            if (currentStompClient && currentStompClient.connected && authInfo.memberCode && roomUid) {
                // console.log(`---------Sending explicit LEAVE message for user ${authInfo.username} (memberCode: ${authInfo.memberCode}) from room ${roomUid}...`);
                const leaveMessage = {
                    type: 'LEAVE',
                    roomId: roomUid,
                    sender: authInfo.username,
                    message: authInfo.username + "님이 채팅방을 나갔습니다.", 
                    sentAt: new Date().toISOString()
                };
                currentStompClient.send(`/app/chat.leave/${roomUid}`, {}, JSON.stringify(leaveMessage));
                navigate("/community/chat");
            } else {
                 console.warn("WebSocket is not connected. Cannot send LEAVE message via STOMP.");
            }

            // 2. REST API 호출하여 DB 업데이트 (퇴장 시간 기록 등)
            // console.log(`Calling REST API to exit chat room ${roomUid} for user ${authInfo.username}...`);
            const res = await leaveChatRoom(roomUid, authInfo.token);

            if (res.ok) {
                // console.log("---채팅방 퇴장 처리 완료 (DB 업데이트)---");

                // 3. 채팅방 목록 갱신
                // getAllChatRooms().then((updatedRooms) => setRooms(updatedRooms || []));
                alert("채팅방에서 나갔습니다.");
                navigate("/community/chat");
            } else {
                const errorData = await res.json().catch(() => ({ message: "채팅방 퇴장 처리 중 오류가 발생했습니다." }));
                console.error("채팅방 퇴장 REST API 호출 실패:", res.status, errorData);
                alert(errorData.message || "채팅방 퇴장 처리 중 오류가 발생했습니다.");
                 navigate("/community/chat"); // 오류 발생 시에도 이동
            }


        } catch (error) {
            console.error("Failed to send explicit LEAVE message:", error);
            alert("퇴장 처리 중 오류가 발생했습니다.");
        }
    }


    return (
        <>
            <div style={{ flex: 2, overflowY: 'auto' }}>
                <ChatRoomCom isConnected={isConnected} username={username} messages={messages}
                             sendMessage={sendMessage} newMessage={newMessage}
                             setNewMessage={(msg) => dispatch({ type: 'SET_NEW_MESSAGE', payload: msg })}
                             roomUid={roomUid}
                             onDeleteChatRoom={onDeleteChatRoom}
                             onHandleLeaveChatRoom={onHandleLeaveChatRoom}
                             // currentParticipants={roomDetails?.currentParticipants || 0}
                             roomDetails={roomDetails}
                />
            </div>
        </>
    )
}

export default ChatRoomCon;