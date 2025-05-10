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


    // 사용자 이름 입력 받기 (간단한 프롬프트 사용, 실제 앱에서는 로그인 폼 등을 사용)
    useEffect(() => {
        const user = prompt("채팅 아이디를 입력해주세요:");
        if (user) {
            setUsername(user);
        } else {
            // 사용자가 이름을 입력하지 않으면 기본값 설정 또는 다른 처리
            setUsername('Anonymous' + Math.floor(Math.random() * 1000));
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
        if (username && !stompClientRef.current) { // username이 설정되었고, 아직 연결되지 않았다면 연결 시도
            connect();
        }
    }, [username]); // username이 변경될 때마다 connect 함수를 호출 (최초 설정 시 포함)



    // 연결 후 메시지 받기
    const connect = () => {
        if (!username || (stompClientRef.current && stompClientRef.current.connected)) {
            // 이미 연결되어 있거나 username이 없으면 중복 연결 방지
            return;
        }

        console.log('Attempting to connect...');
        // 백엔드 WebSocketConfig에서 설정한 엔드포인트(/ws)로 SockJS 연결을 시도합니다.
        const socket = new SockJS('http://localhost:8080/ws'); // 백엔드 서버 주소
        const stompClient = Stomp.over(socket);
        stompClientRef.current = stompClient; // ref에 클라이언트 저장

        stompClient.connect(
            {}, // 헤더 (필요시 인증 토큰 등 추가)
            (frame) => { // 연결 성공 시 콜백
                console.log('Connected: ' + frame);
                setIsConnected(true);

                // "/topic/public" 주제를 구독하여 서버로부터 오는 메시지를 받습니다.
                stompClient.subscribe('/topic/public', (message) => {
                    const received = JSON.parse(message.body);
                    console.log("받은 메시지 확인 ----> ", received);
                    onMessageReceived(received);
                });

                // 서버에 사용자 참여 메시지를 보냅니다.
                stompClient.send("/app/chat.addUser",
                    {},
                    JSON.stringify({ sender: username, type: 'JOIN' })
                );
            },
            (error) => { // 연결 실패 시 콜백
                console.error('Connection error: ' + error);
                setIsConnected(false);
                // 연결 실패 시 재시도 로직을 추가할 수 있습니다.
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
          console.log(new Date(), str);
        };
    };


    // 서버로부터 받은 메시지 
    const onMessageReceived = (payload) => {
        setMessages(prevMessages => [...prevMessages, payload]);
    };


    // 메시지 전송
    const sendMessage = (event) => {
        event.preventDefault();
        if (newMessage && stompClientRef.current && stompClientRef.current.connected) {
            const chatMessage = {
                type: 'CHAT',
                roomId : "",
                sender: username,
                message: newMessage,
                sentAt : new Date().toISOString()
            };
            // "/app/chat.send" 경로로 메시지 전송
            stompClientRef.current.send("/app/chat.send", {}, JSON.stringify(chatMessage));
            setNewMessage('');
        } else {
            console.log("Cannot send message. Not connected or message is empty.");
        }
    };

    return (
        <>
            <ChatMainCom isConnected={isConnected} username={username} messages={messages}
                        sendMessage={sendMessage} newMessage={newMessage} setNewMessage={setNewMessage}/>
        </>
    )
}

export default ChatMainCon;