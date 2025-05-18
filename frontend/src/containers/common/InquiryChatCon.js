import InquiryChatCom from "../../components/common/InquiryChatCom";
import { useCallback, useEffect, useReducer, useRef } from "react"; // useState 제거 (필요시 다시 추가)
import { chatReducer, initialState as originalInitialState } from "../../modules/inquiryReducer";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { getStartInquiry } from "../../service/inquiryService";

// isLoading, isLoadingHistory를 제외한 initialState 정의
const initialState = {
    ...originalInitialState,
    isLoading: false, // 초기값은 false로 두되, 사용하지 않음
    isLoadingHistory: false, // 초기값은 false로 두되, 사용하지 않음
};

// localStorage에서 인증 정보 가져오기
const getAuthInfoFromStorage = () => {
    const token = localStorage.getItem('accessToken');
    const username = localStorage.getItem('memberName');
    const memberCodeString = localStorage.getItem('memberCode');
    const memberCode = memberCodeString ? parseInt(memberCodeString, 10) : null;
    const rolesString = localStorage.getItem('roles');
    const roles = rolesString ? JSON.parse(rolesString) : [];

    console.log('로그인 유저의 membercode 확인', memberCode);
    return { token, username, memberCode, roles };
};


function InquiryChatCon({ isVisible, key: componentKey }) { // 'key' prop 이름 변경 (React 예약어와 충돌 방지)
    const [state, dispatch] = useReducer(chatReducer, initialState);
    const {
        messages, newMessage, currentUser, currentInquiryChatId,
        isConnected, error, isUserLoggedIn// isLoading, isLoadingHistory 제거
    } = state;

    const stompClientRef = useRef(null);
    const messageEndRef = useRef(null);
    const inputRef = useRef(null);

    // currentUser에서 필요한 값들을 추출 (useEffect 의존성 배열에 사용하기 위함)
    const userToken = currentUser?.token;
    const userMemberCode = currentUser?.memberCode;
    const currentUsername = currentUser?.username;
    const currentUserRoles = currentUser?.roles;


    // ----------------------------------------------------------------------------------------1. 초기 사용자 인증 정보 설정
    useEffect(() => {
        console.log("---------컴포넌트 마운트: 사용자 인증 정보 로드 시도-----------");
        const authInfo = getAuthInfoFromStorage();
        console.log("로드된 인증 정보:", authInfo);

        if (authInfo.token && authInfo.memberCode !== null) { // memberCode도 유효한지 확인
            dispatch({ type: 'SET_CURRENT_USER', payload: authInfo });
            dispatch({ type: 'SET_USER_LOGGED_IN', payload: true });
        } else { // 비회원 또는 토큰/memberCode 없는 경우
            dispatch({ type: 'SET_CURRENT_USER', payload: { token: null, memberCode: null, username: '비회원', roles: [] } });
            dispatch({ type: 'SET_USER_LOGGED_IN', payload: false });
            console.log("비회원 사용자이거나 인증 정보가 불완전합니다. currentUser를 비회원 상태로 설정.");
        }
        dispatch({ type: 'CLEAR_ERROR' }); // 초기 에러 클리어
    }, []); // 마운트 시 1회 실행


    // ----------------------------------------------------------------------------------------2. 채팅방 시작 (REST API 또는 비회원 처리) -> currentInquiryChatId 설정
    const createInquiryChat = useCallback(async () => {
        console.log("------------1:1 채팅 시작-----------현재 userMemberCode:", userMemberCode);
        dispatch({ type: 'CLEAR_ERROR' });

        try {
            // const isUserLoggedIn = userToken && userMemberCode !== null;
            console.log(">>>>>>>>로그인 상태<<<<<<<<", isUserLoggedIn);

            // 2-1. 비회원 처리
            if (!isUserLoggedIn) {
                console.log("비회원 사용자입니다. icId를 0으로 설정합니다. (API 호출 안 함)");
                dispatch({ type: 'SET_INQUIRY_CHAT_ID', payload: 0 }); // 비회원용 채팅 ID (예: 0)
                return;
            }

            // 2-2. 회원인 경우 API 호출
            const inquiryChatRequest = {
                memberCode: userMemberCode,
                authorityCode: null,
                memberId: currentUsername || "회원", // username이 없을 경우 대비
            };
            if (currentUserRoles && Array.isArray(currentUserRoles)) {
                const userRole = currentUserRoles.find(role => role === "ROLE_USER");
                if (userRole) {
                    inquiryChatRequest.authorityCode = 2;
                } else if (currentUserRoles.includes("ROLE_ADMIN")) {
                    inquiryChatRequest.authorityCode = 1;
                }
            }
            console.log("채팅방 생성 요청 DTO:", inquiryChatRequest);

            // 2-3. 채팅방 생성 요청
            const response
                = await getStartInquiry(inquiryChatRequest);
            console.log("-------채팅방 생성 정보 response\n 수신-------> ", response);

            if (response && response.icId !== undefined && response.icId !== null) { // icId 유효성 검사 강화
                dispatch({ type: 'SET_INQUIRY_CHAT_ID', payload: response.icId });
                console.log("채팅방이 성공적으로 생성되었습니다. icId:", response.icId);
            }

        } catch (err) {
            console.error("채팅방 생성/조회 처리 중 오류:", err);
            dispatch({ type: 'SET_ERROR', payload: err.message });
            dispatch({ type: 'SET_INQUIRY_CHAT_ID', payload: null }); // 오류 발생 시 ID 초기화
        }
    }, [isUserLoggedIn, userMemberCode, currentUsername, currentUserRoles]);


    // ----------------------------------------------------------------------------------------3. 채팅방 시작 로직 호출 (isVisible, currentInquiryChatId, currentUser 변경 시)
    useEffect(() => {
        // isVisible이 true이고, currentInquiryChatId가 아직 설정되지 않았으며, currentUser 정보가 로드된 후 실행
        // 일단 currentUser 지웠는데 여기서 currenUser 확인해보자
        console.log("-----여기서 currentUser 정보 확인 ------->", currentUser)
        if (isVisible && currentInquiryChatId === null ) {
            console.log("InquiryChatCon: 채팅창 활성화 및 채팅방 정보 로드 시도. createInquiryChat 호출.");
            createInquiryChat();
        }
        // 이전 대화 내역 로드 로직은 현재 주석 처리되어 있으므로 생략
    }, [isVisible, currentInquiryChatId, createInquiryChat, componentKey]); // componentKey 추가 (컴포넌트 키 변경 시 재시도)


    // ----------------------------------------------------------------------------------------4. WebSocket 연결 로직 (currentInquiryChatId가 설정되면 연결 시도)
    const connectWebSocket = useCallback(() => {
        console.log("[connectWebSocket] Called. currentInquiryChatId:", currentInquiryChatId, "isConnected:", isConnected, "userMemberCode:", userMemberCode);

        if (currentInquiryChatId === null || (stompClientRef.current && stompClientRef.current.connected) || isConnected) {
            if (stompClientRef.current && stompClientRef.current.connected) console.log('[웹소켓 연결] Already connected.');
            else if (currentInquiryChatId === null) console.log('[웹소켓 연결] Prerequisites not met (currentInquiryChatId is null).');
            else if (isConnected) console.log('[웹소켓 연결] Already connected (state.isConnected).');
            return;
        }

        dispatch({ type: 'CLEAR_ERROR' });
        console.log(`Attempting to connect WebSocket for ID: ${currentInquiryChatId}`);

        const socket = new SockJS('http://localhost:8080/ws');
        const stomp = Stomp.over(socket);
        stompClientRef.current = stomp; // Ref 할당은 connect 콜백 외부에서도 가능하나, 성공 시가 더 명확할 수 있음.

        const connectHeaders = {};
        if (userToken) { // 회원인 경우에만 토큰 추가
            connectHeaders['Authorization'] = `Bearer ${userToken}`;
        }
        console.log("WebSocket 연결 헤더:", connectHeaders);

        stomp.connect(
            connectHeaders,
            (frame) => {
                console.log("✅ WebSocket 연결 성공", frame);
                dispatch({ type: 'SET_CONNECTED', payload: true });

                if (userMemberCode === null) { // 비회원 (currentUser.memberCode가 null)
                    console.log("👤 비회원입니다. 공용 채널 (/topic/inquiry/public) 구독합니다.");
                    stomp.subscribe("/topic/inquiry/public", (message) => {
                        try {
                            const payload = JSON.parse(message.body);
                            console.log("📢 [비회원] 공용 메시지 수신:", payload);
                            // 서버에서 오는 메시지 형식에 맞게 dispatch
                            // 예: payload.content가 실제 메시지 내용이라고 가정
                            dispatch({
                                type: 'ADD_MESSAGE',
                                payload: {
                                    // icmId: payload.id, // 서버가 ID를 준다면
                                    icId: 0, // 비회원용 채팅방 ID
                                    memberCode: null, // 시스템 또는 공용 메시지 발신자
                                    senderType: payload.senderType || 'SYSTEM', // 서버에서 오는 타입 사용
                                    senderName: payload.senderName || '안내', // 서버에서 오는 발신자명 사용
                                    message: payload.message || payload.content || "안내 메시지가 도착했습니다.", // 실제 필드명 확인
                                    sentAt: payload.sentAt || new Date().toISOString(),
                                    type: payload.type || 'SYSTEM', // 메시지 타입 (UI 표시용)
                                },
                            });
                        } catch (e) {
                            console.error("비회원 공용 메시지 처리 중 오류:", e, message.body);
                        }
                    });
                } else { // 회원
                    console.log(`✅ 회원입니다 (memberCode: ${userMemberCode}). 개인 채널 (/topic/inquiry/${currentInquiryChatId}) 구독합니다.`);
                    const userSpecificTopic = `/topic/inquiry/${currentInquiryChatId}`;
                    stomp.subscribe(userSpecificTopic, (message) => {
                        try {
                            const receivedMessage = JSON.parse(message.body);
                            console.log("<<<<< [회원] 메시지 수신 FROM SERVER:", receivedMessage);
                            dispatch({
                                type: 'ADD_MESSAGE',
                                payload: { // 서버 응답에 맞게 필드 매핑
                                    ...receivedMessage,
                                    sentAt: receivedMessage.sentAt || receivedMessage.sendAt || new Date().toISOString(), // 오타 가능성 고려
                                    senderType: String(receivedMessage.senderType).toUpperCase(),
                                    type: String(receivedMessage.messageType || 'CHAT').toUpperCase(),
                                },
                            });
                        } catch (e) {
                            console.error("회원 메시지 처리 중 오류:", e, message.body);
                        }
                    });
                }
            },
            (errorCallback) => {
                console.error("❌ WebSocket 연결 실패:", errorCallback);
                dispatch({ type: 'SET_CONNECTED', payload: false });
                // dispatch({ type: 'SET_ERROR', payload: '웹소켓 연결에 실패했습니다. 잠시 후 다시 시도해주세요.' });
            }
        );
        stomp.debug = (str) => { console.log("STOMP DEBUG: " + str); };

    }, [currentInquiryChatId, isConnected, userToken, userMemberCode, dispatch]); // 의존성 배열에 userToken, userMemberCode 추가

    // WebSocket 연결 실행 Effect
    useEffect(() => {
        // currentInquiryChatId가 null이 아니고 (즉, 채팅방 ID가 설정되었고), 아직 연결되지 않았을 때
        if (currentInquiryChatId !== null && !isConnected) {
            console.log(`[WebSocket 연결 실행] currentInquiryChatId: ${currentInquiryChatId}, isConnected: ${isConnected}. connectWebSocket 호출!`);
            connectWebSocket();
        }

        // 컴포넌트 언마운트 또는 currentInquiryChatId/connectWebSocket 함수 변경 시 연결 해제
        return () => {
            if (stompClientRef.current && stompClientRef.current.connected) {
                console.log(`Disconnecting STOMP for ID: ${currentInquiryChatId}...`);
                stompClientRef.current.disconnect(() => {
                    console.log('STOMP Disconnected.');
                    dispatch({ type: 'SET_CONNECTED', payload: false });
                });
                stompClientRef.current = null; // 참조 제거
            }
        };
    }, [currentInquiryChatId, isConnected, connectWebSocket, dispatch]); // dispatch 추가


    // --------------------------------------------------------------------------5. 메시지 전송 로직 (WebSocket)
    const handleSendMessage = useCallback(() => {
        if (!newMessage.trim()) return;
        if (currentInquiryChatId === null) {
            dispatch({ type: 'SET_ERROR', payload: "채팅방에 연결되지 않았습니다." });
            return;
        }
        if (!stompClientRef.current || !stompClientRef.current.connected) {
            dispatch({ type: 'SET_ERROR', payload: "채팅 서버 연결이 끊어졌습니다." });
            return;
        }

        // 비회원은 메시지 전송 불가 (요청사항 1,2번 목표에 집중)
        if (userMemberCode === null) {
            console.log("비회원은 메시지를 전송할 수 없습니다.");
            // 필요시 사용자에게 알림 dispatch({ type: 'SET_ERROR', payload: "비회원은 메시지를 전송할 수 없습니다." });
            dispatch({ type: 'SET_NEW_MESSAGE', payload: '' }); // 입력창 비우기
            if (inputRef.current) inputRef.current.style.height = 'inherit';
            return;
        }

        // 회원 메시지 전송
        const messagePayload = {
            icId: currentInquiryChatId, // 서버 DTO에 맞게 icId 또는 inquiryChatId 사용
            memberCode: userMemberCode,
            senderType: 'USER',
            message: newMessage.trim(),
            // sentAt: new Date().toISOString(), // 서버에서 설정하는 것이 일반적
            messageType: 'CHAT', // 또는 서버 DTO에 맞는 필드명 사용
            // senderName: currentUsername, // 서버에서 memberCode 기준으로 처리 가능
        };

        const tempId = `temp-${Date.now()}`; // 임시 ID (낙관적 업데이트용)
        dispatch({
            type: 'ADD_MESSAGE',
            payload: {
                ...messagePayload,
                tempId,
                sentAt: new Date().toISOString(), // UI 즉시 표시용 시간
                senderName: currentUsername || "나",
            }
        });

        stompClientRef.current.send(
            `/app/inquiry/${currentInquiryChatId}/send`, // 서버의 @MessageMapping 경로 확인 필요
            {},
            JSON.stringify(messagePayload)
        );

        dispatch({ type: 'SET_NEW_MESSAGE', payload: '' });
        if (inputRef.current) inputRef.current.style.height = 'inherit';

    }, [newMessage, currentInquiryChatId, userMemberCode, currentUsername, dispatch, isConnected]); // isConnected 추가

    // 메시지 입력 핸들러
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

    // 메시지 목록 변경 시 스크롤 맨 아래로
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <>
            <InquiryChatCom
                // isLoading, isLoadingHistory 제거
                messagesEndRef={messageEndRef} messages={messages}
                inputRef={inputRef} newMessage={newMessage}
                error={error}
                handleSendMessage={handleSendMessage} handleInputChange={handleInputChange}
                isConnected={isConnected} handleKeyPress={handleKeyPress}
                currentInquiryChatId={currentInquiryChatId}
                currentUser={currentUser}
            />
        </>
    );
}

export default InquiryChatCon;