import InquiryChatCom from "../../components/common/InquiryChatCom";
import { useCallback, useEffect, useReducer, useRef } from "react";
import { chatReducer, initialState as originalInitialState } from "../../modules/inquiryReducer";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { getStartInquiry } from "../../service/inquiryService";

// initialState 재정의
const initialState = {
    ...originalInitialState,
    isLoading: false,
    isLoadingHistory: false,
};

const getAuthInfoFromStorage = () => {
    const token = localStorage.getItem("accessToken");
    const username = localStorage.getItem("memberName");
    const memberCodeString = localStorage.getItem("memberCode");
    const memberCode = memberCodeString ? parseInt(memberCodeString, 10) : null;
    const rolesString = localStorage.getItem("roles");
    const roles = rolesString ? JSON.parse(rolesString) : [];

    return { token, username, memberCode, roles };
};

function InquiryChatCon({ isVisible }) {
    const [state, dispatch] = useReducer(chatReducer, initialState);
    const {
        messages,
        newMessage,
        currentUser,
        icId,
        isConnected,
        isUserLoggedIn,
    } = state;

    const stompClientRef = useRef(null);
    const messagesEndRef = useRef(null); // 메시지 끝 참조
    const inputRef = useRef(null); // 입력 필드 참조




    // Step 1: 사용자 인증 정보 로드
    useEffect(() => {
        const authInfo = getAuthInfoFromStorage();
        if (authInfo.token && authInfo.memberCode !== null) {
            dispatch({ type: "SET_CURRENT_USER", payload: authInfo });
            dispatch({ type: "SET_USER_LOGGED_IN", payload: true });
        } else {
            dispatch({ type: "SET_CURRENT_USER", payload: { token: null, memberCode: null, username: "비회원", roles: [] } });
            dispatch({ type: "SET_USER_LOGGED_IN", payload: false });
        }
        dispatch({ type: "CLEAR_ERROR" });
    }, []);



    // Step 2: 채팅방 초기화
    const initializeInquiryChat = useCallback(async () => {
        if (currentUser && currentUser.username !== null && isVisible && icId === null) {
            console.log("Initializing chat room...");
            try {
                const data = await createInquiryChat();
                console.log("Chat room initialized with ID:", data.icId);
            } catch (error) {
                console.error("Error initializing chat room:", error);
            }
        }
    }, [currentUser, isVisible, icId]);

    useEffect(() => {
        initializeInquiryChat();
    }, [initializeInquiryChat]);

    const createInquiryChat = useCallback(async () => {



        if (!isUserLoggedIn) {
            dispatch({ type: 'SET_INQUIRY_CHAT_ID', payload: 0 });
            return;
        }
        const inquiryChatRequest = {
            memberCode: currentUser?.memberCode,
            authorityCode: null,
            memberId: currentUser?.username || '회원',
        };

        try {
            const data = await getStartInquiry({
                inquiryMessage: inquiryChatRequest,
                token: currentUser?.token,
            });

            console.log("Chat room initialized with ID:", data.icId);
            dispatch({ type: "SET_INQUIRY_CHAT_ID", payload: data.icId });
            return data;
        } catch (err) {
            console.error("Error creating chat room:", err);
            dispatch({ type: "SET_ERROR", payload: '채팅 방을 시작하지 못했습니다.' });
        }
    }, [isUserLoggedIn, currentUser]);



    // Step 3: WebSocket 연결
    const connectWebSocket = useCallback(() => {
        if (isConnected || !icId || stompClientRef.current) return;


        const connectHeaders = {};
        if (isUserLoggedIn && currentUser.token) { // 회원이고 토큰이 있을 때만 헤더 추가
            connectHeaders['Authorization'] = `Bearer ${currentUser.token}`;
            console.log("WebSocket 연결 헤더 (회원):", connectHeaders);
        } else {
            console.log("WebSocket 연결 헤더 (비회원): No Authorization header");
        }


        const socket = new SockJS("http://localhost:8080/ws");
        const stompClient = Stomp.over(socket);

        stompClient.connect(
            connectHeaders,
            (frame) => {
                stompClientRef.current = stompClient;

                console.log("Connected to WebSocket:", frame);

                dispatch({ type: "SET_CONNECTED", payload: true });

                stompClient.subscribe(`/topic/inquiry/${icId}`, (message) => {
                    const newMessage = JSON.parse(message.body);
                    dispatch({ type: "ADD_MESSAGE", payload: newMessage });
                });
            }, (error) => {
                console.error("WebSocket connection error:", error);
                dispatch({ type: "SET_CONNECTED", payload: false });
            });
    }, [icId, isConnected]);

    const disconnectWebSocket = useCallback(() => {
        if (stompClientRef.current) {
            stompClientRef.current.disconnect();
            stompClientRef.current = null;
        }
        dispatch({ type: "SET_CONNECTED", payload: false });
    }, []);



    // Step 4: WebSocket 연결 실행
    useEffect(() => {
        if (icId && isVisible) {
            connectWebSocket();
        }

        return () => {
            if (!isVisible) {
                disconnectWebSocket();
            }
        };
    }, [icId, isVisible, connectWebSocket, disconnectWebSocket]);


    
    // 메시지 전송 로직
    const handleSendMessage = useCallback(() => {
        console.log("메시지 전송 버튼 클릭됨");

        if (!newMessage.trim()) return;
        if (!stompClientRef.current || !stompClientRef.current.connected) {
            dispatch({ type: "SET_ERROR", payload: "WebSocket 연결이 끊어졌습니다." });
            return;
        }

        const messagePayload = {
            icId: icId,
            memberCode: currentUser?.memberCode,
            username: currentUser?.username,
            senderType: "USER",
            message: newMessage.trim(),
            messageType: "CHAT",
            sentAt: new Date().toISOString(), // 서버에서 설정하는 것이 일반적
        };

        console.log("Message Payload:", messagePayload);

        stompClientRef.current.send(
            `/app/inquiry/${icId}/send`,
            {},
            JSON.stringify(messagePayload)
        );

        dispatch({ type: "ADD_MESSAGE", payload: messagePayload });
        dispatch({ type: "SET_NEW_MESSAGE", payload: "" });
    }, [newMessage, icId, currentUser]);


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
        <InquiryChatCom
            selectedTopic="1:1 문의"
            isVisible={isVisible}
            isConnected={isConnected}
            icId={icId}
            messages={messages}
            currentUser={currentUser}
            messagesEndRef={messagesEndRef} // Ref 전달
            inputRef={inputRef}
            handleSendMessage={handleSendMessage}
            newMessage={newMessage}
            connectWebSocket={connectWebSocket}
            disconnectWebSocket={disconnectWebSocket}
            handleInputChange={handleInputChange}
            handleKeyPress={handleKeyPress}
        />
    );
}

export default InquiryChatCon;