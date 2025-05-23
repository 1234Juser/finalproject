// 오늘 날짜를 'YYYY-MM-DD' 형식으로 가져오기
const today = new Date().toLocaleDateString("sv-SE", {
    timeZone: "Asia/Seoul"
});

export const initialState = {
    formInput: {
        countryId: "",
        cityId: "",
        themeCode: "",
        productTitle: "",
        productContent: "",
        productAdult: "",
        productChild: "",
        productStartDate: today,
        productEndDate: "",
        productMinParticipants: "",
        productMaxParticipants: "",
        productStatus: null,
        productType: null,
        productThumbnail : null,
        regionCode : "",
        regionType : "",
        cityName : "",
        countryName : "",
        fullLocation : "",
    },
    regions: [],
    countries: [],
    cities: [],
    themes: [],
    uploadedFile: null,
    isWished: false,
    partiError: { participants: "" },
    formErrors: "",
    adProducts: [],
};

export const productFormReducer  = (state, action) => {
    switch (action.type) {
        case "SET_FORM_INPUT":
            return {
                ...state,
                formInput: {
                    ...state.formInput,
                    ...action.payload,
                },
            };
        case "SET_REGIONS":
            return { ...state, regions: action.payload };
        case "SET_COUNTRIES":
            return { ...state, countries: action.payload };
        case "SET_CITIES":
            return { ...state, cities: action.payload };
        case "SET_THEMES":
            return { ...state, themes: action.payload };
        case "SET_FILE":
            return { ...state, uploadedFile: action.payload };
        case "SET_PARTI_ERROR":
            return { ...state, partiError: action.payload };
        case "SET_FORM_ERRORS":
            return { ...state, formErrors: action.payload };
        case "INIT_FORM":
            return { ...state, formInput: { ...action.payload } };
        case 'CHANGE':
            return {
                ...state,
                [action.field]: action.value,
            };
        case 'RESET':
            return initialState;
        case "TOGGLE_WISH":
            return { ...state, isWished: action.payload };
        case "SET_AD_PRODUCTS":
            return { ...state, adProducts: action.payload };
        default:
            return state;
    }
};

  