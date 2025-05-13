import {useEffect, useReducer, useRef} from "react";
import ChatRoomCom from "../../../components/community/chat/ChatRoomCom";
import SockJS from "sockjs-client";
import {Stomp} from '@stomp/stompjs';
import {chatReducer, initialState} from "../../../modules/chatReducer";
import {
    AuthErrorButton,
    AuthErrorContainer,
    AuthErrorMessage,
    AuthErrorTitle,
    InfoMessage
} from "../../../style/community/chat/StyleChatRoom";
import {useNavigate} from "react-router-dom";
import { deleteChatRoom } from "../../../service/chatService";


function ChatRoomCon({roomUid}) {
    const [state, dispatch] = useReducer(chatReducer, initialState);
    const { messages, newMessage, username, isConnected, currentRoomId, isLoading, authError } = state;
    const stompClientRef = useRef(null); // STOMP 클라이언트 인스턴스를 저장하기 위한 ref
    const navigate = useNavigate();



    // 로그인 유저의 정보/JWT 토큰 가져오기
    const getAuthInfo = () => {
        const token = localStorage.getItem('accessToken');
        const loggedInUsername = localStorage.getItem('memberName');
        if (token) {
            return {
                token,
                username: loggedInUsername
            };
        }
        return { token: null, username: null };
    };



    // 사용자 인증 (간단한 프롬프트 사용, 실제 앱에서는 로그인 폼 등을 사용)
    useEffect(() => {

        if (roomUid) {

            const authInfo = getAuthInfo();
            console.log('현재 로그인 정보 확인 : ', authInfo);

            // 토근 유무 확인
            if (authInfo.token && authInfo.username) {
                dispatch({type: 'SET_USERNAME', payload: authInfo.username});

                // 채팅방 ID 입력 받기 (로그인 성공 후)
                /*const room = prompt(`환영합니다, ${authInfo.username}님! 입장할 채팅방 번호를 입력해주세요:`);
                if (room) {
                    dispatch({type: 'SET_CURRENT_ROOM_ID', payload: room});
                } else {
                    alert("채팅방 번호를 입력해주세요.");
                    dispatch({type: 'SET_AUTH_ERROR', payload: "채팅방 ID가 필요합니다. 입장을 취소합니다."});
                    dispatch({type: 'SET_CURRENT_ROOM_ID', payload: 'defaultRoom'});
                }*/
            } else {
                dispatch({type: 'SET_AUTH_ERROR', payload: "본 서비스는 로그인이 필요합니다."});
            }
            dispatch({type: 'SET_LOADING', payload: false});

            // 컴포넌트 언마운트 시 연결 해제
            return () => {
                if (stompClientRef.current && stompClientRef.current.connected) {
                    console.log('Disconnecting...');
                    stompClientRef.current.disconnect();
                    dispatch({type: 'SET_CONNECTED', payload: false});
                }
            };
        }
    }, [roomUid]);

    useEffect(() => {
        // 로딩이 끝났고, 인증 오류가 없고, username과 roomId가 있고, 아직 연결 안 됐으면 연결 시도
        if (!isLoading &&
            !authError &&
            username &&
            // currentRoomId &&
            (!stompClientRef.current || !stompClientRef.current.connected)
        ) {
            console.log(`Attempting to connect with username: ${username}, roomId: ${roomUid}`);
            const authInfo = getAuthInfo(); // 연결 시점에 다시 토큰 가져오기 (선택적, 이미 위에서 가져왔다면 재사용 가능)
            connect(authInfo.token);
        }
    }, [username, roomUid]);



    // 연결 후 메시지 받기 (STOMP 연결 함수)
    const connect = (token) => {
        // if (!username || !currentRoomId || (stompClientRef.current && stompClientRef.current.connected)) {
        if (!username || (stompClientRef.current && stompClientRef.current.connected)) {
            // 이미 연결되어 있거나 username이 없으면 중복 연결 방지
            console.log('Connection prerequisites not met or already connected.');
            return;
        }
        
        // 토큰이 없으면 연결 시도조차 하지 않음 (이미 useEffect에서 authError로 처리됨)
        if (!token && !authError) { // 추가적인 방어 코드: 토큰이 없는데 authError도 없다면 문제.
            dispatch({ type: 'SET_AUTH_ERROR', payload: "인증 토큰 없이 연결할 수 없습니다. 로그인이 필요합니다." });
            return;
        }

        console.log(`Connecting to WebSocket with roomId: ${currentRoomId}...`);
        const socket = new SockJS('http://localhost:8080/ws'); // 백엔드 서버 주소
        const stompClient = Stomp.over(socket);
        stompClientRef.current = stompClient; // ref에 클라이언트 저장

        const connectHeaders = {};
        if (token) {
            connectHeaders['Authorization'] = 'Bearer ' + token;
            console.log('Sending Authorization header with token.');
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

                // 1. 특정 채팅방 구독
                if (roomUid) {
                    console.log(`구독중인 채팅방 :  /topic/chat/${roomUid}`);
                    stompClient.subscribe(`/topic/chat/${roomUid}`, (message) => {
                        const receivedChatMessage = JSON.parse(message.body);
                        console.log(`>>>>> Message received from /topic/chat/${roomUid}:`, receivedChatMessage);
                        dispatch({ type: 'ADD_MESSAGE', payload: receivedChatMessage });
                    });
                }

                // 2. 사용자 입장/퇴장 알림 메시지 구독
                stompClient.subscribe('/topic/public', (message) => {
                    const receivedPublicMessage = JSON.parse(message.body);
                    console.log(">>>>> 받은 공개 메시지 확인 : ", receivedPublicMessage);
                    dispatch({ type: 'ADD_MESSAGE', payload: receivedPublicMessage });

                });

                // 3. 사용자가 채팅방에 입장할 때 서버로 메시지 전송
                const joinMessage = {
                    type: 'JOIN', 
                    roomId : roomUid,
                    sender: username, 
                    sentAt : new Date().toISOString()
                };
                stompClient.send(`/app/chat.addUser/${roomUid}`,
                    {},
                    JSON.stringify(joinMessage)   
                );
            },
            (error) => {
                // 연결 실패 시 콜백
                console.error('Connection error: ' + error);
                dispatch({ type: 'SET_CONNECTED', payload: false });
                dispatch({
                    type: 'SET_AUTH_ERROR',
                    payload: "채팅 서버 연결에 실패했습니다. 로그인 상태를 확인하거나 잠시 후 다시 시도해주세요.",
                });
                // 연결 실패 시 5초 후 재시도
                setTimeout(() => {
                    if (!stompClientRef.current || !stompClientRef.current.connected) {
                         connect();
                    }
                }, 5000);
            }
        );

        // 디버깅을 위해 stompClient 로깅 활성화 (선택 사항)
        // stompClient.debug = (str) => {
        //   console.log(new Date(), new Date(), str);
        // };
    };


    // 메시지 전송
    const sendMessage = (event) => {
        event.preventDefault();

        if (newMessage && roomUid && username && stompClientRef.current && stompClientRef.current.connected) {
            const chatMessage = {
                type: 'CHAT',
                roomId : roomUid,
                sender: username,
                message: newMessage,
                sentAt : new Date().toISOString()
            };
            console.log(`----------Sending CHAT message to /app/chat.send/${roomUid}:`, chatMessage);
            // 메시지를 특정 채팅방의 경로로 전송 
            stompClientRef.current.send(`/app/chat.send/${roomUid}`, {}, JSON.stringify(chatMessage));
            dispatch({ type: 'SET_NEW_MESSAGE', payload: '' });
        } else {
            console.log("Cannot send message. Conditions not met: ",
                {newMessage, roomUid, connected: stompClientRef.current?.connected});
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

    // 인증 오류는 없지만, username이나 currentRoomId가 설정되지 않은 경우 (정상적으론 authError에서 걸러짐)
    // if (!username || !currentRoomId) {
    //     return (
    //         <InfoMessage>
    //             채팅에 참여하려면 사용자 정보와 채팅방 ID가 필요합니다. 페이지를 새로고침하거나 다시 시도해주세요.
    //         </InfoMessage>
    //     )
    // }


    // 채팅방 삭제
    const onDeleteChatRoom = async (roomUid) => {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }
        const confirmDelete = window.confirm("정말 이 채팅방을 삭제할까요?");
        if (!confirmDelete) return;

        try {
            const res = await deleteChatRoom(roomUid, token);
            if (res.ok) {
                console.log("---채팅 삭제---");
                alert("채팅방을 삭제했습니다.");
                // 삭제 후 알림창 닫고 목록 페이지로 이동
                navigate("/community/chat");
            } else {
                alert("채팅방 삭제에 실패했습니다.");
            }
        } catch (err) {
            console.error("삭제 중 오류 발생 : ", err);
            alert("삭제 중 오류가 발생했습니다.");
        }
    }
        

    return (
        <>
            <div style={{ flex: 2, overflowY: 'auto' }}>
                <ChatRoomCom isConnected={isConnected} username={username} messages={messages}
                             sendMessage={sendMessage} newMessage={newMessage}
                             setNewMessage={(msg) => dispatch({ type: 'SET_NEW_MESSAGE', payload: msg })}
                             roomUid={roomUid}
                             onDeleteChatRoom={onDeleteChatRoom}/>
            </div>
        </>
    )
}

export default ChatRoomCon;