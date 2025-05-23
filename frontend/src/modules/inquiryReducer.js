const initialState = {
    messages: [],
    newMessage: '',
    icId: null,
    currentUser: {
        username: null,
        memberCode: null,
        token: null,
        roles: null,
    },
    isConnected: false,
    error: null,
    isUserLoggedIn: false,
};

function inquiryReducer(state, action) {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: { ...state.currentUser, ...action.payload }
            };
        case 'SET_INQUIRY_CHAT_ID':
            return {
                ...state,
                icId: action.payload
            };
        case 'SET_MESSAGES':
            return {
                ...state,
                messages: action.payload
            };
        case 'ADD_MESSAGE':
            const newMessageId = action.payload.icmId || action.payload.inquiryChatMessageId;
            const exists = state.messages.some(
                msg => msg.icmId === newMessageId || msg.inquiryChatMessageId === newMessageId
            );
            if (exists) {
                return state; // 중복된 메시지는 추가하지 않음
            }
            return {
                ...state,
                messages: [...state.messages, action.payload]
            };
        case 'SET_NEW_MESSAGE':
            return {
                ...state,
                newMessage: action.payload
            };
        case "REMOVE_MESSAGE":
            return {
                ...state,
                messages: state.messages.filter(msg => msg.tempId !== action.payload),
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
            };
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: null
            };
        case 'RESET_STATE':
            return {
                ...initialState,
                currentUser: state.currentUser,
            };
        case 'SET_USER_LOGGED_IN':
            return {
                ...state,
                isUserLoggedIn: action.payload
            };
        default:
            return state;
    }
}

export { initialState, inquiryReducer };