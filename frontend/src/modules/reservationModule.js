const initialState = {
    reservations: [],
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: null,
};

function reservationReducer(state, action) {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {
                ...state,
                reservations: Array.isArray(action.payload?.list) ? action.payload.list : [],
                totalPages: action.payload?.totalPages || 0,
                currentPage: action.payload?.currentPage || 1,
                loading: false,
            };
        case 'FETCH_ERROR':
            return { ...state, error: action.payload, loading: false };
        case 'LOADING':
            return { ...state, loading: true };
        default:
            return state;
    }
}

export { initialState, reservationReducer };