const initialState = {
    reservations: [],
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: null,
    order: null,
    option: null,
    payment: null,
    product: null
};

function reservationReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            const payload = action.payload || {};
            // 단일 예약의 경우
            if (payload.orderCode) {
                return {
                    ...state,
                    order: payload,
                    option: payload,
                    loading: false
                };
            }
            // 여러 예약 목록의 경우
            const reservations = Array.isArray(payload)
                ? payload
                : payload.reservations || payload.list || [];
            return {
                ...state,
                reservations,
                totalPages: payload.totalPages || 1,
                currentPage: payload.currentPage || 1,
                loading: false,
            };
        case 'SET_RESERVATIONS':
            return {
                ...state,
                reservations: action.payload || [],
                loading: false,
                error: null,
            };
        case 'REMOVE_RESERVATION':
            const reservation = state.reservations.find(res => res.orderCode === action.payload);
            if (!reservation) return state;
            if (reservation.orderStatus === "CANCELED") {
                alert("이미 취소된 여행입니다.");
                return state;
            }
            if (reservation.orderStatus === "COMPLETED") {
                alert("종료된 여행이므로 취소할 수 없습니다.");
                return state;
            }
            return {
                ...state,
                reservations: state.reservations.map(res =>
                    res.orderCode === action.payload
                        ? { ...res, orderStatus: "CANCELED" }
                        : res
                ),
            };
        case 'UPDATE_REVIEW_STATUS':
            return {
                ...state,
                reservations: state.reservations.map(reservation =>
                    reservation.orderCode === action.payload.orderCode
                        ? { ...reservation, reviewed: action.payload.reviewed }
                        : reservation
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
        case "SET_PAYMENT":
            return { ...state, payment: action.payload };
        case "SET_PRODUCT":
            return { ...state, product: action.payload };
        case 'FETCH_ERROR':
            return { ...state, error: action.payload, loading: false };
        case 'LOADING':
            return { ...state, loading: true, error: null };
        default:
            return state;
    }
}

export { initialState, reservationReducer };