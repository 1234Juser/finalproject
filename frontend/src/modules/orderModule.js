const orderInitialState = {
    order: [],
    orderDetails: null,
    productTitle: "",
    bookingUid: null,
    adultCount: 0,
    childCount: 0,
    totalPrice: 0,
    memberCode: null,
    memberName: "",
    memberEmail: "",
    memberPhone: "",
    optionCode: null,
    loading: false,
    error: null,
};

const orderReducer = (state, action) => {
    switch (action.type) {
        case "SET_ORDER_DETAILS":
            return {
                ...state,
                orderDetails: action.data,
                totalPrice: action.data.totalPrice || 0,
                bookingUid: action.data.bookingUid || null,
                memberCode: action.data.memberCode || null,
                optionCode: action.data.optionCode || null,
                memberName: action.data.memberName || "",
                memberEmail: action.data.memberEmail || "",
                memberPhone: action.data.memberPhone || "",
                loading: false,
                error: null,
            };

        case "SET_MEMBER_INFO":
            return {
                ...state,
                memberCode: action.data.memberCode || null,
                memberName: action.data.memberName || "",
                memberEmail: action.data.memberEmail || "",
                memberPhone: action.data.memberPhone || "",
            };

        case "SET_LOADING":
            return { ...state, loading: action.data };

        case "SET_ERROR":
            return { ...state, error: action.data };

        default:
            return state;
    }
};

export { orderInitialState, orderReducer };