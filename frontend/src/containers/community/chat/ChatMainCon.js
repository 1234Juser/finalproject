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


    // 사용자 이름 입력 받기 (간단한 프롬프트 사용, 실제 앱에서는 로그인 폼 등을 사용)
    useEffect(() => {
        const user = prompt("채팅 아이디를 입력해주세요:");
        const room = prompt("입장할 채팅방 ID를 입력해주세요:");
        if (user && room) {
            setUsername(user);
            setCurrentRoomId(room);
        } else {
            // 사용자가 이름을 입력하지 않으면 기본값 설정 또는 다른 처리
            alert("아이디와 채팅방 ID를 모두 입력해주세요. 기본값으로 설정됩니다.");
            setUsername('Anonymous' + Math.floor(Math.random() * 1000));
            setCurrentRoomId('defaultRoom');    // 기본 채팅방 ID
        }

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
        // username과 currentRoomId가 모두 설정되면 연결 시도 (아직 연결되지 않았다면 연결 시도)
        if (username && currentRoomId && !stompClientRef.current) { 
            connect();
        }
    }, [username, currentRoomId]); // username이 변경될 때마다 connect 함수를 호출 (최초 설정 시 포함)



    // 1. 연결 후 메시지 받기 (STOMP 연결 함수)
    const connect = () => {
        if (!username || !currentRoomId || (stompClientRef.current && stompClientRef.current.connected)) {
            // 이미 연결되어 있거나 username이 없으면 중복 연결 방지
            console.log('Connection prerequisites not met or already connected.');
            return;
        }

        console.log(`Connecting to WebSocket with roomId: ${currentRoomId}...`);
        // 백엔드 WebSocketConfig에서 설정한 엔드포인트(/ws)로 SockJS 연결을 시도합니다.
        const socket = new SockJS('http://localhost:8080/ws'); // 백엔드 서버 주소
        const stompClient = Stomp.over(socket);
        stompClientRef.current = stompClient; // ref에 클라이언트 저장

        stompClient.connect(
            {}, // 헤더 (필요시 인증 토큰 등 추가)
            (frame) => {
                // 연결 성공 시 콜백
                console.log('Connected: ' + frame);
                setIsConnected(true);
                
                // 1. 특정 채팅방 구독
                if (currentRoomId) {
                    stompClient.subscribe(`/topic/chat/${currentRoomId}`, (message) => {
                        const receivedChatMessage = JSON.parse(message.body);
                        console.log(`Message received from /topic/chat/${currentRoomId}:`, receivedChatMessage);
                        onMessageReceived(receivedChatMessage);
                    });
                }

                // 2. 공개 메시지 구독 (/topic/public) - 예: 사용자 입장/퇴장 알림
                stompClient.subscribe('/topic/public', (message) => {
                    const receivedPublicMessage = JSON.parse(message.body);
                    console.log("받은 메시지 확인 ----> ", receivedPublicMessage);
                    onMessageReceived(receivedPublicMessage);    // 이 메시지도 채팅창에 표시
                });

                // 3. 서버에 사용자 참여 메시지 전송 (/app/chat.addUser)
                stompClient.send("/app/chat.addUser",
                    {},
                    JSON.stringify({ 
                        sender: username, 
                        type: 'JOIN', 
                        roomId: currentRoomId   // addUser는 roomId를 경로로 받지 않으므로 DTO에 포함 
                    })   
                );
            },
            (error) => {
                // 연결 실패 시 콜백
                console.error('Connection error: ' + error);
                setIsConnected(false);
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
        stompClient.debug = (str) => {
          console.log(new Date(), new Date(), str);
        };
    };


    // 서버로부터 받은 메시지를 상태에 추가하는 함수
    const onMessageReceived = (payload) => {
        console.log("Adding message to UI:", payload);
        setMessages(prevMessages => [...prevMessages, payload]);
    };


    // 메시지 전송
    const sendMessage = (event) => {
        event.preventDefault();

        if (newMessage && currentRoomId && stompClientRef.current && stompClientRef.current.connected) {
            const chatMessage = {
                type: 'CHAT',
                roomId : currentRoomId,
                sender: username,
                message: newMessage,
                sentAt : new Date().toISOString()
            };
            // 메시지를 특정 채팅방의 경로로 전송 
            stompClientRef.current.send(`/app/chat.send/${currentRoomId}`, {}, JSON.stringify(chatMessage));
            setNewMessage('');
        } else {
            console.log("Cannot send message. Conditions not met: ",
                {newMessage, currentRoomId, connected: stompClientRef.current?.connected});
        }
    };

    return (
        <>
            <ChatMainCom isConnected={isConnected} username={username} messages={messages}
                        sendMessage={sendMessage} newMessage={newMessage} setNewMessage={setNewMessage}
                        currentRoomId={currentRoomId} />
        </>
    )
}

export default ChatMainCon;