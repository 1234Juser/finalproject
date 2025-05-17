export const initialState = {
    messages: [], // 채팅 메시지 목록 { icmId, icId, memberCode, senderType, senderName (UI용), message, sentAt, type (CHAT, JOIN, LEAVE, INFO, SYSTEM 등) }
    newMessage: '', // 현재 입력 중인 메시지
    currentInquiryChatId: null, // 현재 활성화된 문의 채팅방 ID (icId)
    currentUser: { // 현재 로그인한 사용자 정보
        username: null, // memberName
        memberCode: null, // memberCode (Long)
        authorityCode: null, // authorityCode (Integer) - 필요시 추가
        token: null,
    },
    isConnected: false, // WebSocket 연결 상태
    isLoading: true, // 초기 로딩 상태 (인증, 채팅방 정보 등)
    isLoadingHistory: false, // 이전 메시지 로딩 상태
    error: null, // 에러 메시지 (인증, 연결, 메시지 전송 등)
    selectedTopic: null, // 사용자가 선택한 문의 주제
}


export function chatReducer(state, action) {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return { ...state, currentUser: { ...state.currentUser, ...action.payload } };
        case 'SET_INQUIRY_CHAT_ID':
            return { ...state, currentInquiryChatId: action.payload, messages: [] }; // 채팅방 변경 시 메시지 초기화
        case 'SET_MESSAGES': // 이전 대화내역 로드
            return { ...state, messages: action.payload };
        case 'ADD_MESSAGE': // 새 메시지 (WebSocket 또는 내가 보낸 메시지)
            // 중복 메시지 방지 (임시 ID 등으로 확인 가능하나, 서버 ID 기준으로 하는 것이 더 정확)
            if (state.messages.find(msg => msg.icmId === action.payload.icmId && msg.icmId !== undefined)) {
                 return state;
            }
            return { ...state, messages: [...state.messages, action.payload] };
        case 'UPDATE_OPTIMISTIC_MESSAGE': // 메시지 전송 성공 후 서버 데이터로 교체
            return {
                ...state,
                messages: state.messages.map(msg =>
                    msg.tempId === action.payload.tempId ? { ...action.payload.confirmedMessage, tempId: undefined } : msg
                ),
            };
        case 'REMOVE_OPTIMISTIC_MESSAGE': // 메시지 전송 실패 시 임시 메시지 제거
             return { ...state, messages: state.messages.filter(msg => msg.tempId !== action.payload.tempId) };
        case 'SET_NEW_MESSAGE':
            return { ...state, newMessage: action.payload };
        case 'SET_CONNECTED':
            return { ...state, isConnected: action.payload };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'SET_LOADING_HISTORY':
            return { ...state, isLoadingHistory: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload, isLoading: false, isLoadingHistory: false };
        case 'CLEAR_ERROR':
            return { ...state, error: null };
        case 'RESET_STATE': // 채팅방 나가기 또는 초기화 시
            return {
                ...initialState,
                currentUser: state.currentUser, // 사용자 정보는 유지할 수 있음
                isLoading: false, // 로딩은 끝난 상태로
            };
        default:
            return state;
    }
}