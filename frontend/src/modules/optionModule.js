const initialState = {
    options: [],
    selectedDate: null,
    productTitle: "",
    productAdult: 0,
    productChild: 0,
    totalPrice: 0,
    loading: false,
    error: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_PRODUCT_INFO":
            return {
                ...state,
                productTitle: action.data.productTitle || "",
                productAdult: action.data.productAdult || 0,
                productChild: action.data.productChild || 0
            };
        case "SET_OPTION_DATA":
            return {
                ...state,
                options: [
                    {
                        optionCode: 0,
                        productTitle: action.data.productTitle,
                        adultCount: 1,
                        childCount: 0,
                        adultPrice: action.data.adultPrice,
                        childPrice: action.data.childPrice,
                        price: action.data.adultPrice * 1 + action.data.childPrice * 0,
                    },
                ],
                totalPrice: action.data.adultPrice * 1 + action.data.childPrice * 0,
                loading: false,
                error: null,
            };
        case "SET_OPTIONS":
            console.log("🟡 SET_OPTIONS 호출됨:", action.data);
            return {
                ...state,
                options: action.data || [],
                totalPrice: (action.data[0]?.adultCount || 0) * (action.data[0]?.adultPrice || 0) +
                    (action.data[0]?.childCount || 0) * (action.data[0]?.childPrice || 0),
            };
        case "SET_SELECTED_DATE":
            return {
                ...state,
                selectedDate: action.data,
            };

        case "UPDATE_ADULT_COUNT":
            const updatedAdultOptions = state.options.map((opt, index) =>
                index === action.data.index
                    ? {
                        ...opt,
                        adultCount: Math.max(opt.adultCount + action.data.delta, 0),
                        price: (Math.max(opt.adultCount + action.data.delta, 0) * opt.adultPrice) +
                            (opt.childCount * opt.childPrice),
                    }
                    : opt
            );
            return {
                ...state,
                options: updatedAdultOptions,
                totalPrice: updatedAdultOptions.reduce((sum, opt) => sum + opt.price, 0),
            };

        case "UPDATE_CHILD_COUNT":
            const updatedChildOptions = state.options.map((opt, index) =>
                index === action.data.index
                    ? {
                        ...opt,
                        childCount: Math.max(opt.childCount + action.data.delta, 0),
                        price: (opt.adultCount * opt.adultPrice) +
                            (Math.max(opt.childCount + action.data.delta, 0) * opt.childPrice),
                    }
                    : opt
            );
            return {
                ...state,
                options: updatedChildOptions,
                totalPrice: updatedChildOptions.reduce((sum, opt) => sum + opt.price, 0),
            };
        case "SET_OPTION_COUNT":
            return {
                ...state,
                [action.key]: action.value
            };
        case "SET_TOTAL_PRICE":
            return {
                ...state,
                totalPrice: action.data
            };
        case "SET_LOADING":
            return { ...state, loading: action.data };

        case "SET_ERROR":
            return { ...state, error: action.data };

        default:
            return state;
    }
};

export { initialState, reducer };