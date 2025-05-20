import InquiryChatAdminAnswerCom from "../../components/inquiry/InquiryChatAdminAnswerCom";
import { useEffect, useReducer, useRef, useState } from "react";
import { getMessages } from "../../service/inquiryService";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import {initialState, inquiryReducer} from "../../modules/inquiryReducer";
import {initialState as currentUser} from "../../modules/chatReducer";



// Helper 함수: 사용자 인증 정보 가져오기
const getAuthInfoFromStorage = () => {
    const token = localStorage.getItem("accessToken");
    const username = localStorage.getItem("memberName");
    const memberCodeString = localStorage.getItem("memberCode");
    const memberCode = memberCodeString ? parseInt(memberCodeString, 10) : null;
    const rolesString = localStorage.getItem("roles");
    const roles = rolesString ? JSON.parse(rolesString) : [];

    return { token, username, memberCode, roles };
};


function InquiryChatAdminAnswerCon({ inquiryChatId }) {
    const [state, dispatch] = useReducer(inquiryReducer, initialState);
    const { messages, newMessage, error, loading, sending, isConnected, currentUser } = state;
    const stompClientRef = useRef(null);


    useEffect(() => {
        // 사용자 인증 정보 로드
        const authInfo = getAuthInfoFromStorage();
        console.log("---------Auth Info:", authInfo);

        if (authInfo.token && authInfo.memberCode !== null) {
            dispatch({ type: "SET_CURRENT_USER", payload: authInfo });
            dispatch({ type: "SET_USER_LOGGED_IN", payload: true });
        } else {
            dispatch({
                type: "SET_CURRENT_USER",
                payload: { token: null, memberCode: null, username: "비회원", roles: [] },
            });
            dispatch({ type: "SET_USER_LOGGED_IN", payload: false });
        }
        // dispatch({ type: "CLEAR_ERROR" });

        // console.log("Current User:", state.currentUser); // 추가
        fetchMessages();
        connectWebSocket();

        return () => {
            disconnectWebSocket();
        };
    }, [inquiryChatId]);

    // useEffect를 하나 더 사용하여 currentUser 변경 시 로그 확인 (디버깅용)
    useEffect(() => {
        console.log("Current User (updated in state):", currentUser);
    }, [currentUser]);

    useEffect(() => {
        console.log("현재 메시지 리스트:", messages);
    }, [messages]);




    // 메시지 불러오기
    const fetchMessages = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const data = await getMessages(inquiryChatId);

            // inquiryChatMessageId를 icmId로 매핑
            const normalizedMessages = data.map(msg => ({ ...msg, icmId: msg.inquiryChatMessageId }));
            dispatch({ type: 'SET_MESSAGES', payload: normalizedMessages });
            dispatch({ type: 'SET_ERROR', payload: null });
        } catch (err) {
            console.error("메시지 조회 오류:", err);
            dispatch({ type: 'SET_ERROR', payload: "메시지 조회에 실패했습니다." });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    // 메시지 전송 로직
    const handleSendMessage = async () => {
        console.log("보내는 중");       // 1번만 뜨는지 확인ㅇㅇ


        if (newMessage.trim() === "") return;

        dispatch({ type: 'SET_SENDING', payload: true });

        // 메시지 전송 경로
        const sendPath = `/app/admin/inquiry/${inquiryChatId}/send`;

        const messagePayload = {
            icId: inquiryChatId,
            memberCode: currentUser?.memberCode,
            username: currentUser?.username,
            // authorityCode: currentUser?.username,
            senderType: "ADMIN",
            messageType: "CHAT",
            message: newMessage,
            sendAt: new Date().toISOString(),
        };

        console.log("messagePayload", messagePayload);

        if (stompClientRef.current && stompClientRef.current.connected) {
            stompClientRef.current.send(
                sendPath,
                {},
                JSON.stringify(messagePayload)
            );

            // 클라이언트에서 즉시 메시지 추가
            // dispatch({ type: 'ADD_MESSAGE', payload: messagePayload});
            dispatch({ type: 'SET_NEW_MESSAGE', payload: "" });
            dispatch({ type: 'SET_ERROR', payload: null });
        } else {
            console.error("메시지 전송 오류:", error);
            dispatch({ type: 'SET_ERROR', payload: "메시지 전송에 실패했습니다." });
        }

        dispatch({ type: 'SET_SENDING', payload: false });
    };


    // 웹소켓 연결
    const connectWebSocket = () => {

        if (stompClientRef.current && stompClientRef.current.connected) {
            console.log('이미 WebSocket에 연결되어 있습니다.');
            return;
        }



        const token = localStorage.getItem("accessToken");
        const socket = new SockJS('http://localhost:8080/ws'); // 백엔드 서버 주소
        const stompClient = Stomp.over(socket);
        stompClientRef.current = stompClient;

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        stompClient.connect(headers, () => {
            console.log('STOMP 연결 성공');
            dispatch({ type: 'SET_CONNECTED', payload: true });

            stompClient.subscribe(`/topic/admin/inquiry/${inquiryChatId}/send`
                , (message) => {
                    console.log("STOMP: 구독 콜백 실행됨, 받은 메시지:", message.body);
                    const receivedMessage = JSON.parse(message.body);
                    console.log("<<<<<<<<<<파싱된 받은 메시지:", receivedMessage);

                    // inquiryChatMessageId를 icmId로 매핑
                    const normalizedReceivedMessage = { ...receivedMessage, icmId: receivedMessage.icmId };
                    dispatch({ type: 'ADD_MESSAGE', payload: normalizedReceivedMessage
                    });
            });

        }, (error) => {
            console.error('STOMP 연결 오류:', error);
            dispatch({ type: 'SET_ERROR', payload: "채팅 연결에 실패했습니다." });
        });
    };


    // 웹소켓 연결 해제
    const disconnectWebSocket = () => {
        if (stompClientRef.current) {
            stompClientRef.current.disconnect(() => {
                console.log('STOMP 연결 해제');
                dispatch({ type: 'SET_CONNECTED', payload: false });
            });
            stompClientRef.current = null; // ✅ 완전 초기화
        }
    };


    // 입력 input 상태 관리
    const handleInputChange = (e) => {
        dispatch({ type: 'SET_NEW_MESSAGE', payload: e.target.value });
        e.target.style.height = 'inherit';
        const scrollHeight = e.target.scrollHeight;
        const maxHeight = parseInt(getComputedStyle(e.target).maxHeight || '100px', 10);
        e.target.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    };


    // Enter 키 전송 (Shift+Enter는 줄바꿈)
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };


    return (
        <InquiryChatAdminAnswerCom
            messages={messages}
            newMessage={newMessage}
            handleSendMessage={handleSendMessage}
            error={error}
            loading={loading}
            sending={sending}
            handleInputChange={handleInputChange}
            handleKeyPress={handleKeyPress}
            inquiryChatId={inquiryChatId}
            isConnected={isConnected}
        />
    );
}

export default InquiryChatAdminAnswerCon;