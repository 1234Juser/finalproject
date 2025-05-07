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
                reservations: Array.isArray(action.payload)
                    ? action.payload
                    : action.payload.reservations ?? action.payload.list ?? [],
                totalPages: action.payload?.totalPages ?? 1,
                currentPage: action.payload?.currentPage ?? 1,
                loading: false,
            };
        case 'REMOVE_RESERVATION':
            return {
                ...state,
                reservations: state.reservations.map(res =>
                    res.orderCode === action.payload
                        ? { ...res, orderStatus: "CANCELED" }
                        : res
                ),
            };
        case "ADD_OLD_RESERVATIONS":
            return {
                ...state,
                reservations: [
                    ...state.reservations,
                    ...action.payload.filter(newRes =>
                        !state.reservations.some(existing => existing.orderCode === newRes.orderCode)
                    )
                ]
            };
        case 'CANCEL_RESERVATION_ERROR':
            return { ...state, error: action.payload };
        case 'FETCH_ERROR':
            return { ...state, error: action.payload, loading: false };
        case 'LOADING':
            return { ...state, loading: true, error: null };
        default:
            return state;
    }
}

export { initialState, reservationReducer };