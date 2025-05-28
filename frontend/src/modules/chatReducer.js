export const initialState = {
    messages: [],
    newMessage: '',     // 보내는 메시지
    username: null,
    memberCode: null,
    isConnected: false,
    roomUid: '',
    isLoading: true,
    authError: null,
    roomDetails : null,
};

export function chatReducer(state, action) {
    switch (action.type) {
        case 'SET_MESSAGES':
            return { ...state, messages: action.payload };
        case 'ADD_MESSAGE':     // 서버로부터 받은 메시지를 state에 추가
            return { ...state, messages: [...state.messages, action.payload] };
        case 'SET_NEW_MESSAGE':
            return { ...state, newMessage: action.payload };
        case 'SET_USERNAME':
            return { ...state, username: action.payload };
        case 'SET_MEMBER_CODE':
            return { ...state, memberCode: action.payload };
        case 'SET_CONNECTED':
            return { ...state, isConnected: action.payload };
        case 'SET_CURRENT_ROOM_ID':
            return { ...state, roomUid: action.payload };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'SET_AUTH_ERROR':
            return { ...state, authError: action.payload };
        case 'SET_ROOM_DETAILS':
            return { ...state, roomDetails: action.payload };
        case 'SET_PARTICIPANT_COUNT':
            return {
                ...state,
                roomDetails: {
                    ...state.roomDetails,
                    currentParticipants: action.payload
                }
            };

        default:
            return state;
    }
}