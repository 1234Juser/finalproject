export const initialState = {
    messages: [], // 채팅 메시지 목록 { icmId, icId, memberCode, senderType, senderName (UI용), message, sentAt, type (CHAT, JOIN, LEAVE, INFO, SYSTEM 등) }
    newMessage: '', // 현재 입력 중인 메시지
    currentInquiryChatId: null, // 채팅방 ID (icId) 또는 비회원용 식별자 (예: 0)
    currentUser: { // 현재 로그인한 사용자 정보
        username: null, // memberName
        memberCode: null, // memberCode (Long)
        token: null,
        roles : null,
    },
    isConnected: false, // WebSocket 연결 상태
    error: null, // 에러 메시지 (인증, 연결, 메시지 전송 등)
    isUserLoggedIn: false, // 로그인 상태
}


export function chatReducer(state, action) {
    console.log("-----Reducer action: ", action.type, action.payload);
    const newState = (() => {

        switch (action.type) {
            case 'SET_CURRENT_USER':
                return {
                    ...state,
                    currentUser: {...state.currentUser, ...action.payload}
                };
            case 'SET_INQUIRY_CHAT_ID':
                // return { ...state, currentInquiryChatId: action.payload, messages: [] }; // 채팅방 변경 시 메시지 초기화
                return {
                    ...state,
                    currentInquiryChatId: action.payload
                };
            case 'SET_MESSAGES': // 이전 대화내역 로드
                return {
                    ...state,
                    messages: action.payload
                };
            case 'ADD_MESSAGE': // 새 메시지 (WebSocket 또는 내가 보낸 메시지)
                // 서버에서 icmId를 부여한 경우, 이를 기준으로 중복 메시지 방지
                // action.payload.icmId가 존재하고, 해당 icmId를 가진 메시지가 이미 messages 배열에 있는지 확인
                if (action.payload.icmId && state.messages.find(msg => msg.icmId === action.payload.icmId)) {
                    console.log("Reducer: 중복 메시지 감지 (icmId):", action.payload.icmId);
                    return state; // 이미 있는 메시지면 상태 변경 안 함
                }
                // 서버에서 icmId 없이 오는 시스템 메시지(예: 비회원 안내) 또는 Optimistic Update용 메시지
                return {
                    ...state,
                    messages: [...state.messages, action.payload]
                };
            case 'UPDATE_OPTIMISTIC_MESSAGE': // 메시지 전송 성공 후 서버 데이터로 교체
                return {
                    ...state,
                    messages: state.messages.map(msg =>
                        msg.tempId === action.payload.tempId ? {
                            ...action.payload.confirmedMessage,
                            tempId: undefined
                        } : msg
                    ),
                };
            case 'REMOVE_OPTIMISTIC_MESSAGE': // 메시지 전송 실패 시 임시 메시지 제거
                return {
                    ...state,
                    messages: state.messages.filter(msg => msg.tempId !== action.payload.tempId)
                };
            case 'SET_NEW_MESSAGE':
                return {
                    ...state,
                    newMessage: action.payload
                };
            case 'SET_CONNECTED':
                return {
                    ...state,
                    isConnected: action.payload
                };
            case 'SET_ERROR':
                return {
                    ...state,
                    error: action.payload,
                    isLoading: false,
                    isLoadingHistory: false
                };
            case 'CLEAR_ERROR':
                return {
                    ...state,
                    error: null
                };
            case 'RESET_STATE': // 채팅방 나가기 또는 초기화 시
                return {
                    ...initialState,
                    currentUser: state.currentUser, // 사용자 정보는 유지할 수 있음
                    isLoading: false, // 로딩은 끝난 상태로
                };
            case 'SET_USER_LOGGED_IN': // 로그인 상태 설정
                return {
                    ...state,
                    isUserLoggedIn: action.payload
                };
            default:
                return state;
        }
    })();
    console.log("-----Reducer newState: ", newState);
    return newState;
}