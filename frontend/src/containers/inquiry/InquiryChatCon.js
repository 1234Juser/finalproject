import InquiryChatCom from "../../components/inquiry/InquiryChatCom";
import { useCallback, useEffect, useReducer, useRef } from "react";
import { inquiryReducer, initialState as originalInitialState } from "../../modules/inquiryReducer";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { getStartInquiry, closeInquiryChat } from "../../service/inquiryService";

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
    const [state, dispatch] = useReducer(inquiryReducer, initialState);
    const {
        messages,
        newMessage,
        currentUser,
        icId,
        isConnected,
        isUserLoggedIn, error
    } = state;

    const stompClientRef = useRef(null);
    const messagesEndRef = useRef(null); // 메시지 끝 참조
    const inputRef = useRef(null); // 입력 필드 참조
    const manualDisconnectRef = useRef(false);



    // Step 1: 사용자 인증 정보 로드
    useEffect(() => {
        const authInfo = getAuthInfoFromStorage();

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
        dispatch({ type: "CLEAR_ERROR" });
    }, []);

    // Step 2: 채팅방 초기화 및 웹소켓 연결
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
            dispatch({ type: "SET_INQUIRY_CHAT_ID", payload: data.icId });
            return data;
        } catch (err) {
            console.error("Error creating chat room:", err);
            dispatch({ type: "SET_ERROR", payload: '채팅 방을 시작하지 못했습니다.' });
            throw err; // 에러를 다시 던져 useEffect에서 잡을 수 있도록 함
        }
    }, [isUserLoggedIn, currentUser]);

    // 채팅방 초기화
    useEffect(() => {
        const initializeChat = async () => {
            if (currentUser && currentUser.username && isVisible && icId === null) {
                // console.log("Initializing chat room...");

                try {
                    const data = await createInquiryChat();
                } catch (error) {
                    console.error("Error initializing chat room:", error);
                }
            }
        };

        initializeChat();
    }, [currentUser, isVisible, icId, createInquiryChat]);


    // Step 3: WebSocket 연결
    const connectWebSocket = useCallback(() => {
        if (isConnected || !icId || stompClientRef.current || manualDisconnectRef.current) return;

        const connectHeaders = {};
        if (isUserLoggedIn && currentUser.token) { // 회원이고 토큰이 있을 때만 헤더 추가
            connectHeaders['Authorization'] = `Bearer ${currentUser.token}`;
            // console.log("WebSocket 연결 헤더 (회원):", connectHeaders);
        } else {
            // console.log("WebSocket 연결 헤더 (비회원): No Authorization header");
        }

        const socket = new SockJS("http://localhost:8080/ws");
        const stompClient = Stomp.over(socket);

        stompClient.connect(
            connectHeaders,
            (frame) => {
                stompClientRef.current = stompClient;

                // console.log("Connected to WebSocket:", frame);

                dispatch({ type: "SET_CONNECTED", payload: true });

                // 사용자 여부에 따라 구독 경로 설정
                const isAdmin = currentUser.roles.includes('ROLE_ADMIN');
                const subscribePath = isAdmin
                    ? `/topic/inquiry/admin/${icId}/send`
                    : `/topic/inquiry/${icId}/send`;

                stompClient.subscribe(subscribePath, (message) => {
                    const newMessage = JSON.parse(message.body);
                    // console.log("<<<<<<<<< Received message:", newMessage);
                    dispatch({ type: "ADD_MESSAGE", payload: newMessage });
                });
                // console.log(`Subscribed to ${subscribePath}`);
            },
            (error) => {
                console.error("WebSocket connection error:", error);
                dispatch({ type: "SET_CONNECTED", payload: false });
            }
        );
    }, [icId, isConnected, isUserLoggedIn, currentUser]);

    const disconnectWebSocket = useCallback(() => {
        if (stompClientRef.current) {
            stompClientRef.current.disconnect();
            stompClientRef.current = null;
        }
        dispatch({ type: "SET_CONNECTED", payload: false });
    }, []);


    // Step 4: WebSocket 연결 실행
    useEffect(() => {

        if (icId && isVisible && !manualDisconnectRef.current) {
            connectWebSocket();
        }

        // cleanup 함수에서 연결 종료 시도
        return () => {
            disconnectWebSocket();
        };

    }, [icId, isVisible, disconnectWebSocket]);


    // 메시지 전송 로직
    const handleSendMessage = useCallback(() => {

        // 비회원인 경우 시스템 메시지 표시
        if (!isUserLoggedIn) {
            const tempId = `system-${Date.now()}`;
            dispatch({ type: "ADD_MESSAGE", payload: {
                    tempId,
                    message: "본 서비스는 로그인이 필요합니다.",
                    senderType: "SYSTEM",
                } });
            return;
        }

        // 로그인된 사용자 메시지 전송
        if (!newMessage.trim()) return;
        if (!stompClientRef.current || !stompClientRef.current.connected) {
            dispatch({ type: "SET_ERROR", payload: "WebSocket 연결이 끊어졌습니다." });
            return;
        }

        const isAdmin = currentUser.roles.includes('ROLE_ADMIN');
        const sendPath = isAdmin
            ? `/app/admin/inquiry/${icId}/send`
            : `/app/inquiry/${icId}/send`;

        const messagePayload = {
            icId: icId,
            memberCode: currentUser?.memberCode,
            username: currentUser?.username,
            senderType: isAdmin ? "ADMIN" : "USER",
            message: newMessage.trim(),
            messageType: "CHAT",
            sendAt: new Date().toISOString(),
        };

        // console.log("Message Payload:", messagePayload);

        // memberCode가 null이 아닌지 확인 후 전송
        if (isAdmin && !messagePayload.memberCode) {
            dispatch({ type: "SET_ERROR", payload: "관리자 회원 코드가 설정되지 않았습니다." });
            return;
        }

        stompClientRef.current.send(
            sendPath,
            {},
            JSON.stringify(messagePayload)
        );

        // 클라이언트에서 즉시 메시지 추가 방지 (서버에서 수신 후 추가)
        // dispatch({ type: "ADD_MESSAGE", payload: messagePayload });
        dispatch({ type: "SET_NEW_MESSAGE", payload: "" });
    }, [newMessage, icId, currentUser]);


    // 입력 input 상태 관리
    const handleInputChange = (e) => {
        dispatch({ type: 'SET_NEW_MESSAGE', payload: e.target.value });
    };


    // Enter 키 전송 (Shift+Enter는 줄바꿈)
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // 채팅 종료 핸들러
    const handleCloseChat = useCallback(async () => {
        if (!icId) {
            dispatch({ type: "SET_ERROR", payload: "유효한 채팅 ID가 없습니다." });
            return;
        }

        try {
            await closeInquiryChat(icId, currentUser.token);
            // 수동 종료 플래그 설정
            manualDisconnectRef.current = true;
            dispatch({ type: "SET_CONNECTED", payload: false });
            disconnectWebSocket();
        } catch (err) {
            console.error("채팅 종료 오류:", err);
            dispatch({ type: "SET_ERROR", payload: "채팅 종료에 실패했습니다." });
        }
    }, [icId, currentUser, disconnectWebSocket]);


    return (
        <InquiryChatCom
            isVisible={isVisible}
            isConnected={isConnected}
            icId={icId}
            messages={messages}
            currentUser={currentUser}
            messagesEndRef={messagesEndRef}
            inputRef={inputRef}
            handleSendMessage={handleSendMessage}
            newMessage={newMessage}
            connectWebSocket={connectWebSocket}
            disconnectWebSocket={disconnectWebSocket}
            handleInputChange={handleInputChange}
            handleKeyPress={handleKeyPress}
            error={state.error}
            isUserLoggedIn={isUserLoggedIn}
            handleCloseChat={handleCloseChat}
        />
    );
}

export default InquiryChatCon;