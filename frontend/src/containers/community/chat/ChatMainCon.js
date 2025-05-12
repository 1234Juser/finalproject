import {useEffect, useRef, useState} from "react";
import ChatMainCom from "../../../components/community/chat/ChatMainCom";
import SockJS from "sockjs-client";
import { Stomp } from '@stomp/stompjs';

function ChatMainCon() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');       // 보내는 메시지
    const [username, setUsername] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const stompClientRef = useRef(null); // STOMP 클라이언트 인스턴스를 저장하기 위한 ref
    const [currentRoomId, setCurrentRoomId] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState(null); // 인증 오류 상태 추가



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



    // 사용자 이름 입력 받기 (간단한 프롬프트 사용, 실제 앱에서는 로그인 폼 등을 사용)
    useEffect(() => {

        const authInfo = getAuthInfo();
        console.log('현재 로그인 정보 확인 : ', authInfo);

        if (authInfo.token && authInfo.username) {
            setUsername(authInfo.username);

            // 채팅방 ID 입력 받기 (로그인 성공 후)
            const room = prompt(`환영합니다, ${authInfo.username}님! 입장할 채팅방 ID를 입력해주세요:`);
            if (room) {
                setCurrentRoomId(room);
            } else {
                // 사용자가 이름을 입력하지 않으면 기본값 설정 또는 다른 처리
                alert("아이디와 채팅방 ID를 모두 입력해주세요. 기본값으로 설정됩니다.");
                setAuthError("채팅방 ID가 필요합니다. 입장을 취소합니다.")
                setCurrentRoomId('defaultRoom');    // 기본 채팅방 ID
            } 
        } else {
            // 토큰이 없으면 처음부터 인증 오류 상태로 설정
            setAuthError("본 서비스는 로그인이 필요한 서비스 입니다.");
        }
        setIsLoading(false);

        // 컴포넌트 언마운트 시 연결 해제
        return () => {
            if (stompClientRef.current && stompClientRef.current.connected) {
                console.log('Disconnecting...');
                stompClientRef.current.disconnect();
                setIsConnected(false);
            }
        };
    }, []);

    useEffect(() => {
        // 로딩이 끝났고, 인증 오류가 없고, username과 roomId가 있고, 아직 연결 안 됐으면 연결 시도
        if (!isLoading && !authError && username && currentRoomId && (!stompClientRef.current || !stompClientRef.current.connected)) {
            console.log(`Attempting to connect with username: ${username}, roomId: ${currentRoomId}`);
            const authInfo = getAuthInfo(); // 연결 시점에 다시 토큰 가져오기 (선택적, 이미 위에서 가져왔다면 재사용 가능)
            connect(authInfo.token); // 토큰을 connect 함수에 전달
        }
    }, [username, currentRoomId, username, currentRoomId]);



    // 연결 후 메시지 받기 (STOMP 연결 함수)
    const connect = (token) => {
        if (!username || !currentRoomId || (stompClientRef.current && stompClientRef.current.connected)) {
            // 이미 연결되어 있거나 username이 없으면 중복 연결 방지
            console.log('Connection prerequisites not met or already connected.');
            return;
        }
        
        // 토큰이 없으면 연결 시도조차 하지 않음 (이미 useEffect에서 authError로 처리됨)
        if (!token && !authError) { // 추가적인 방어 코드: 토큰이 없는데 authError도 없다면 문제.
             setAuthError("인증 토큰 없이 연결할 수 없습니다. 로그인이 필요합니다.");
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
                setAuthError(null);     // 연결 성공 시 이전 인증 오류 해제
                setIsConnected(true);
                
                // 1. 특정 채팅방 구독
                if (currentRoomId) {
                    console.log(`구독중인 채팅방 :  /topic/chat/${currentRoomId}`);
                    stompClient.subscribe(`/topic/chat/${currentRoomId}`, (message) => {
                        const receivedChatMessage = JSON.parse(message.body);
                        console.log(`>>>>> Message received from /topic/chat/${currentRoomId}:`, receivedChatMessage);
                        onMessageReceived(receivedChatMessage);
                    });
                }

                // 2. 사용자 입장/퇴장 알림 메시지 구독
                stompClient.subscribe('/topic/public', (message) => {
                    const receivedPublicMessage = JSON.parse(message.body);
                    console.log(">>>>> 받은 공개 메시지 확인 : ", receivedPublicMessage);
                    onMessageReceived(receivedPublicMessage); 
                });

                // 3. 사용자가 채팅방에 입장할 때 서버로 메시지 전송
                const joinMessage = {
                    type: 'JOIN', 
                    roomId : currentRoomId,
                    sender: username, 
                    sentAt : new Date().toISOString()
                };
                stompClient.send(`/app/chat.addUser/${currentRoomId}`,
                    {},
                    JSON.stringify(joinMessage)   
                );
            },
            (error) => {
                // 연결 실패 시 콜백
                console.error('Connection error: ' + error);
                setIsConnected(false);
                setAuthError("채팅 서버 연결에 실패했습니다. 로그인 상태를 확인하거나 잠시 후 다시 시도해주세요.");
                // 연결 실패 시 재시도
                setTimeout(() => {
                    if (!stompClientRef.current || !stompClientRef.current.connected) {
                         console.log('Retrying connection...');
                         connect();
                    }
                }, 5000); // 5초 후 재시도
            }
        );

        // 디버깅을 위해 stompClient 로깅 활성화 (선택 사항)
        // stompClient.debug = (str) => {
        //   console.log(new Date(), new Date(), str);
        // };
    };


    // 서버로부터 받은 메시지를 상태에 추가하는 함수
    const onMessageReceived = (payload) => {
        console.log("화면에 전달되는 메시지:", payload);
        setMessages(prevMessages => [...prevMessages, payload]);
    };


    // 메시지 전송
    const sendMessage = (event) => {
        event.preventDefault();

        if (newMessage && currentRoomId && username && stompClientRef.current && stompClientRef.current.connected) {
            const chatMessage = {
                type: 'CHAT',
                roomId : currentRoomId,
                sender: username,
                message: newMessage,
                sentAt : new Date().toISOString()
            };
            console.log(`Sending CHAT message to /app/chat.send/${currentRoomId}:`, chatMessage);
            // 메시지를 특정 채팅방의 경로로 전송 
            stompClientRef.current.send(`/app/chat.send/${currentRoomId}`, {}, JSON.stringify(chatMessage));
            setNewMessage('');
        } else {
            console.log("Cannot send message. Conditions not met: ",
                {newMessage, currentRoomId, connected: stompClientRef.current?.connected});
        }
    };


    // 인증 오류가 있으면 해당 화면을 먼저 표시
    if (authError) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh', // 전체 뷰포트 높이
                textAlign: 'center',
                padding: '20px',
                backgroundColor: '#f8f9fa' // 부드러운 배경색
            }}>
                <h1 style={{ color: '#dc3545', marginBottom: '20px' }}>접근 제한</h1>
                <p style={{ fontSize: '1.2em', marginBottom: '30px' }}>{authError}</p>
                {/* 실제 로그인 페이지로 이동하는 버튼을 추가할 수 있습니다. */}
                {/* <button onClick={() => window.location.href = '/login'}
                        style={{padding: '10px 20px', fontSize: '1em', color: 'white', backgroundColor: '#007bff', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>
                    로그인 페이지로 이동
                </button> */}
            </div>
        );
    }

    // 인증 오류는 없지만, username이나 currentRoomId가 설정되지 않은 경우 (정상적으론 authError에서 걸러짐)
    if (!username || !currentRoomId) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>채팅에 참여하려면 사용자 정보와 채팅방 ID가 필요합니다. 페이지를 새로고침하거나 다시 시도해주세요.</div>;
    }



    return (
        <>
            <ChatMainCom isConnected={isConnected} username={username} messages={messages}
                        sendMessage={sendMessage} newMessage={newMessage} setNewMessage={setNewMessage}
                        currentRoomId={currentRoomId}/>
        </>
    )
}

export default ChatMainCon;