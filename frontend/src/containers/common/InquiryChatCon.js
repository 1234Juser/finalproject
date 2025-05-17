import InquiryChatCom from "../../components/common/InquiryChatCom";
import {useCallback, useEffect, useReducer, useRef, useState} from "react";
import { chatReducer, initialState } from "../../modules/inquiryReducer";
import SockJS from "sockjs-client";
import {ChatWrapper, ErrorMessageUI, Header, Title} from "../../style/common/InquiryChatStyle";
import {getStartInquiry} from "../../service/inquiryService";


// localStorage에서 인증 정보 가져오기
const getAuthInfoFromStorage = () => {
        const token = localStorage.getItem('accessToken');
        const username = localStorage.getItem('memberName');
        const memberCode = localStorage.getItem('memberCode');
        const roles = JSON.parse(localStorage.getItem('roles'));    // roles는 배열 형태 
        // const authorityCode = localStorage.getItem('authorityCode'); // 필요하다면 추가
        console.log('로그인 유저의 roles확인(authorityCode 추출하기위한용도)', roles);

        if (token && memberCode) {
            return { token, username, memberCode, roles};
        }
        return { token: null, username: null, memberCode: null, roles:[] };
}




function InquiryChatCon(){
    const [state, dispatch] = useReducer(chatReducer, initialState);
    const {
        messages, newMessage, currentUser, currentInquiryChatId,
        isConnected, isLoading, isLoadingHistory, error, selectedTopic
    } = state;
    const stompClientRef = useRef(null);
    const messageEndRef = useRef(null);     // 메시지 목록 맨 아래로 스크롤하기 위한 ref
    const inputRef = useRef(null);      // 입력 필드 참조
    

    

    // 1. 초기 사용자 인증 및 정보 설정
    useEffect(() => {
        console.log("---------컴포넌트 마운트: 사용자 인증 정보 로드 시도-----------");
        dispatch({ type: 'SET_LOADING', payload: true });
        const authInfo  = getAuthInfoFromStorage();
        console.log("로드된 인증 정보:", authInfo);
        
        if (authInfo.token && authInfo.memberCode) {
            dispatch({ type: 'SET_CURRENT_USER', payload: authInfo });
            dispatch({ type: 'CLEAR_ERROR' });
        } else {
            dispatch({ type: 'SET_ERROR', payload: "채팅 서비스는 로그인이 필요합니다." });
        }
        dispatch({ type: 'SET_LOADING', payload: false });
    }, []);


    // 2. 채팅방 시작 (REST API) -> currentInquiryChatId 설정
    const handleTopicSelect = useCallback(async () => {
        console.log("------------1:1 채팅 시작-----------현재 currentUser:", currentUser);
        if (!currentUser.token || !currentUser.memberCode) {
            dispatch({ type: 'SET_ERROR', payload: "로그인 후 이용해주세요." });
            return;
        }
        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'CLEAR_ERROR' });

        try {
            // InquiryChatDTO 구성
            const inquiryChatRequest = {
                memberCode: currentUser.memberCode,
                authorityCode: null,
                memberId : currentUser.username,
                // authorityCode: 이 필드는 currentUser.roles를 기반으로 설정하거나,
            //                백엔드에서 memberCode나 memberId로 조회하여 설정할 수 있습니다.
            //                (자세한 내용은 이전 답변의 'authorityCode 처리' 부분 참고)
            };

            const userRole = currentUser.roles.find(role => role === "ROLE_USER");
            if (userRole) {
                inquiryChatRequest.authorityCode = 2;
            } else if (currentUser.roles.includes("ROLE_ADMIN")) {
                inquiryChatRequest.authorityCode = 1;
            }

            console.log("채팅방 생성 요청 DTO:", inquiryChatRequest);
            console.log("사용 토큰:", currentUser.token);

            // REST API로 채팅방 생성 요청
            getStartInquiry(inquiryChatRequest, currentUser.token)
            .then((data) => {
                console.log("-------채팅방 생성 정보 data 수신-------> ", data);
                if (data && data.icId) { // 서버가 반환하는 채팅방 ID 필드명이 'icId'라고 가정
                    dispatch({ type: 'SET_INQUIRY_CHAT_ID', payload: data.icId });
                } else {
                    console.error("응답 데이터에서 채팅방 ID(icId)를 찾을 수 없습니다.", data);
                    dispatch({ type: 'SET_ERROR', payload: "채팅방 정보를 올바르게 받지 못했습니다." });
                }
            })
            .catch((err) => {
                console.error("채팅방 생성/조회 API 호출 실패:", err);
                let errorMessage = "채팅방 시작 중 오류가 발생했습니다.";
                if (err.response && err.response.data && err.response.data.message) {
                    errorMessage = err.response.data.message; // 서버에서 보낸 에러 메시지 사용
                } else if (err.message) {
                    errorMessage = err.message;
                }
                dispatch({ type: 'SET_ERROR', payload: errorMessage });
                dispatch({ type: 'SET_INQUIRY_CHAT_ID', payload: null });
            })
        
         } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, [currentUser]);


    // 3. currentInquiryChatId 설정 시 -> 이전 대화내역 로드 (REST API)
    useEffect(() => {
        if (currentInquiryChatId && currentUser.token) {
            const fetchHistory = async () => {
                dispatch({ type: 'SET_LOADING_HISTORY', payload: true });
                dispatch({ type: 'CLEAR_ERROR' });
                try {
                    const response = await fetch(`/api/inquiry/messages/${currentInquiryChatId}`, {
                        headers: { 'Authorization': `Bearer ${currentUser.token}` },
                    });
                    if (!response.ok) throw new Error('이전 대화내역 로딩 실패');
                    const historyMessages = await response.json(); // List<InquiryChatMessageEntity>
                    
                    // 서버에서 받은 메시지 형식을 클라이언트 UI에 맞게 변환 (필요시)
                    const formattedMessages = historyMessages.map(msg => ({
                        ...msg,
                        // senderName: msg.senderType === 'ADMIN' ? '상담원' : (msg.memberCode === currentUser.memberCode ? '나' : '고객'),
                        type: msg.senderType === 'SYSTEM' ? 'SYSTEM' : 'CHAT' // 기본 CHAT 타입
                    }));
                    dispatch({ type: 'SET_MESSAGES', payload: formattedMessages });

                } catch (err) {
                    console.error("Error fetching message history:", err);
                    dispatch({ type: 'SET_ERROR', payload: err.message || "대화내역 로딩 중 오류" });
                } finally {
                    dispatch({ type: 'SET_LOADING_HISTORY', payload: false });
                }
            };
            fetchHistory();
        }
    }, [currentInquiryChatId, currentUser.token]);


    // 4. WebSocket 연결 로직 (currentInquiryChatId, 인증정보 유효 시)
    const connectWebSocket = useCallback(() => {
        if (!currentInquiryChatId || !currentUser.token || !currentUser.memberCode || (stompClientRef.current && stompClientRef.current.connected)) {
            if (stompClientRef.current && stompClientRef.current.connected) console.log('Already connected or connection in progress.');
            else console.log('WebSocket connection prerequisites not met.');
            return;
        }

        dispatch({ type: 'SET_LOADING', payload: true }); // 연결 시도 중 로딩 표시
        dispatch({ type: 'CLEAR_ERROR' });
        console.log(`Attempting to connect WebSocket for inquiryChatId: ${currentInquiryChatId}`);

        const socket = new SockJS('http://localhost:8080/ws'); // 실제 WebSocket 엔드포인트
        const stompClient = Stomp.over(socket);
        stompClientRef.current = stompClient;

        const connectHeaders = {
            'Authorization': `Bearer ${currentUser.token}`,
            // 'memberCode': currentUser.memberCode // 헤더 또는 STOMP 메시지 본문에 포함 가능
        };

        stompClient.connect(
            connectHeaders,
            (frame) => { // 연결 성공
                console.log('STOMP Connected: ' + frame);
                dispatch({ type: 'SET_CONNECTED', payload: true });
                dispatch({ type: 'SET_LOADING', payload: false });

                // 특정 문의 채팅방 구독
                stompClient.subscribe(`/topic/inquiry/chat/${currentInquiryChatId}`, (message) => {
                    const receivedMessage = JSON.parse(message.body); // InquiryChatMessageDTO 형태 예상
                    console.log(`Message from /topic/inquiry/chat/${currentInquiryChatId}:`, receivedMessage);
                    
                    // 메시지 타입에 따른 처리 (JOIN, LEAVE, CHAT, INFO 등)
                    // 예: receivedMessage.type, receivedMessage.senderType 등 활용
                    dispatch({ type: 'ADD_MESSAGE', payload: {
                        ...receivedMessage,
                        // senderName: receivedMessage.senderType === 'ADMIN' ? '상담원' : (receivedMessage.memberCode === currentUser.memberCode ? '나' : '고객'),
                    } });
                });

                // 입장 메시지 전송 (서버에서 필요시)
                // const joinMessagePayload = {
                //     type: 'JOIN', // 서버에서 정의한 타입
                //     icId: currentInquiryChatId,
                //     memberCode: currentUser.memberCode,
                //     senderName: currentUser.username, // 서버에서 memberCode로 조회할 수도 있음
                //     message: `${currentUser.username}님이 입장했습니다.`, // 시스템 메시지 내용
                //     senderType: 'SYSTEM', // 또는 USER 타입으로 보내고 서버가 SYSTEM으로 변경
                //     sentAt: new Date().toISOString(),
                // };
                // stompClient.send(`/app/inquiry/join/${currentInquiryChatId}`, {}, JSON.stringify(joinMessagePayload));
                // console.log("Sent JOIN message:", joinMessagePayload);
            },
            (error) => { // 연결 실패
                console.error('STOMP Connection error: ' + error);
                dispatch({ type: 'SET_CONNECTED', payload: false });
                dispatch({ type: 'SET_ERROR', payload: "채팅 서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요." });
                dispatch({ type: 'SET_LOADING', payload: false });
                // 재연결 로직 (선택 사항)
                // setTimeout(() => connectWebSocket(), 5000);
            }
        );
        // stompClient.debug = (str) => { console.log("STOMP DEBUG: " + str); }; // 디버그 로그
    }, [currentInquiryChatId, currentUser]);

    // WebSocket 연결 실행
    useEffect(() => {
        if (currentInquiryChatId && currentUser.token && !isLoading && !isConnected) {
            connectWebSocket();
        }
        // 컴포넌트 언마운트 또는 currentInquiryChatId 변경 시 연결 해제
        return () => {
            if (stompClientRef.current && stompClientRef.current.connected) {
                console.log(`Disconnecting STOMP for inquiryChatId: ${currentInquiryChatId}...`);
                // 퇴장 메시지 전송 (선택 사항)
                // const leaveMessage = { type: 'LEAVE', ... };
                // stompClientRef.current.send(`/app/inquiry-chat.leaveUser/${currentInquiryChatId}`, {}, JSON.stringify(leaveMessage));
                stompClientRef.current.disconnect(() => {
                    console.log('STOMP Disconnected.');
                    dispatch({ type: 'SET_CONNECTED', payload: false });
                });
            }
        };
    }, [currentInquiryChatId, currentUser.token, isLoading, isConnected, connectWebSocket]);


    // 5. 메시지 전송 로직 (WebSocket)
    const handleSendMessage = useCallback(() => {
        if (!newMessage.trim() || !stompClientRef.current || !stompClientRef.current.connected || !currentInquiryChatId) {
            dispatch({ type: 'SET_ERROR', payload: "메시지를 입력하거나 연결 상태를 확인해주세요."});
            return;
        }
        dispatch({ type: 'CLEAR_ERROR' });

        const messagePayload = {
            // InquiryChatMessageDTO 구조에 맞게
            icId: currentInquiryChatId,
            memberCode: currentUser.memberCode,
            // authorityCode: currentUser.authorityCode, // 필요시
            senderType: 'USER', // 사용자가 보내는 메시지
            message: newMessage.trim(),
            // sentAt은 서버에서 설정하거나, 클라이언트에서 임시로 설정 후 서버 값으로 교체
            sentAt: new Date().toISOString(), // 임시 시간
            type: 'CHAT', // 메시지 타입
            senderName: currentUser.username, // UI 표시용
        };

        // Optimistic update: 먼저 UI에 추가
        dispatch({ type: 'ADD_MESSAGE', payload: messagePayload });
        dispatch({ type: 'SET_NEW_MESSAGE', payload: '' });
        if(inputRef.current) inputRef.current.style.height = 'inherit';

        stompClientRef.current.send(
            `/app/inquiry/chat.sendMessage/${currentInquiryChatId}`,
            {},
            JSON.stringify({ ...messagePayload})
        );

    }, [newMessage, currentInquiryChatId, currentUser, isConnected]);


    // 메시지 입력 핸들러
    const handleInputChange = (e) => {
        dispatch({ type: 'SET_NEW_MESSAGE', payload: e.target.value });
        // 자동 높이 조절
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
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


     // 초기 인증/설정 오류 (채팅방 진입 전)
    if (error && !currentInquiryChatId) {
         return (
            <ChatWrapper>
                <Header><Title>오류</Title></Header>
                <ErrorMessageUI>{error}</ErrorMessageUI>
                {/* 로그인 페이지로 이동하는 버튼 등을 추가할 수 있습니다. */}
            </ChatWrapper>
        );
    }

    return (
        <>

            {/* 보여줄 때만 위치 스타일과 함께 InquiryChatCom 사용 */}
            <InquiryChatCom isLoading={isLoading} isLoadingHistory={isLoadingHistory}
                            messagesEndRef={messageEndRef} messages={messages}
                            inputRef={inputRef} newMessage={newMessage}
                            error={error} selectedTopic={selectedTopic}
                            handleSendMessage={handleSendMessage} handleInputChange={handleInputChange}
                            isConnected={isConnected} handleKeyPress={handleKeyPress}
                            currentInquiryChatId={currentInquiryChatId}
                            currentUser={currentUser} handleTopicSelect={handleTopicSelect}/>

        </>
    )
}

export default InquiryChatCon;