const initialState = {
    options: [],
    // selectedDate: null,
    reservationDate: null,
    productTitle: "",
    productAdult: 0,
    productChild: 0,
    adultCount: 0,
    childCount: 0,
    totalPrice: 0,
    productMaxParticipants: null,
    loading: false,
    error: null,
    fromDate: new Date(),
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_PRODUCT_INFO":
            return {
                ...state,
                productTitle: action.data.productTitle || "",
                productAdult: action.data.productAdult || 0,
                productChild: action.data.productChild || 0,
                productMaxParticipants: action.data.productMaxParticipants || 0,
            };
        case "SET_OPTION_DATA":
            return {
                ...state,
                options: [
                    {
                        optionCode: action.data.optionCode || undefined,
                        productTitle: action.data.productTitle,
                        adultCount: 0,
                        childCount: 0,
                        adultPrice: action.data.adultPrice || 0,
                        childPrice: action.data.childPrice || 0,
                        price: (action.data.adultPrice || 0) * 0 + (action.data.childPrice || 0) * 0,
                    },
                ],
                reservationDate: null,
                totalPrice: (action.data.adultPrice || 0) * 0 + (action.data.childPrice || 0) * 0,
                loading: false,
                error: null,
            };
        case "SET_OPTIONS":
            console.log("🟡 SET_OPTIONS 호출됨:", action.data);
            return {
                ...state,
                options: action.data || [],
                totalPrice: state.options.reduce((sum, opt) => sum + opt.price, 0),
            };
        // case "SET_SELECTED_DATE":
        //     return {
        //         ...state,
        //         selectedDate: action.data,
        //     };
        case "SET_FROM_DATE":
            return {
                ...state,
                fromDate: action.data,
            };
        case 'SET_RESERVATION_DATE':
            console.log("🟢 예약 날짜 설정:", action.data);
            return {
                ...state,
                reservationDate: action.data,
                totalPrice: state.options.reduce((sum, opt) => sum + opt.price, 0),
            };
        case "UPDATE_ADULT_COUNT":
            const updatedAdultOptions = state.options.map((opt, index) => {
            //     index === action.data.index
            //         ? {
            //             ...opt,
            //             adultCount: Math.max(opt.adultCount + action.data.delta, 0),
            //             price: (Math.max(opt.adultCount + action.data.delta, 0) * opt.adultPrice) +
            //                 (opt.childCount * opt.childPrice),
            //         }
            //         : opt
            // );
            if (index === action.data.index) {
                const newAdultCount = Math.max(opt.adultCount + action.data.delta, 0);
                const totalParticipants = newAdultCount + opt.childCount;

                if (state.productMaxParticipants !== null && totalParticipants > state.productMaxParticipants) {
                    alert("최대 예약 인원을 초과할 수 없습니다.");
                    return opt;
                }

                return {
                    ...opt,
                    adultCount: newAdultCount,
                    price: (newAdultCount * opt.adultPrice) + (opt.childCount * opt.childPrice),
                };
            }
            return opt;
    });
            return {
                ...state,
                options: updatedAdultOptions,
                totalPrice: updatedAdultOptions.reduce((sum, opt) => sum + opt.price, 0),
            };

        case "UPDATE_CHILD_COUNT":
            const updatedChildOptions = state.options.map((opt, index) => {
            //     index === action.data.index
            //         ? {
            //             ...opt,
            //             childCount: Math.max(opt.childCount + action.data.delta, 0),
            //             price: (opt.adultCount * opt.adultPrice) +
            //                 (Math.max(opt.childCount + action.data.delta, 0) * opt.childPrice),
            //         }
            //         : opt
            // );
            if (index === action.data.index) {
                const newChildCount = Math.max(opt.childCount + action.data.delta, 0);
                const totalParticipants = opt.adultCount + newChildCount;

                if (state.productMaxParticipants !== null && totalParticipants > state.productMaxParticipants) {
                    alert("최대 예약 인원을 초과할 수 없습니다.");
                    return opt;
                }

                return {
                    ...opt,
                    childCount: newChildCount,
                    price: (opt.adultCount * opt.adultPrice) + (newChildCount * opt.childPrice),
                };
            }
            return opt;
    });
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