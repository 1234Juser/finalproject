const initialState = {
    reviews: [],           // 특정 상품의 리뷰 목록
    myReview: null,        // 내 여행(주문)에 대한 단일 리뷰
    selectedReview: null,  // 관리자 또는 사용자 선택 리뷰
    loading: false,
    error: null,
    sortOptionDefault: "date",  // 디폴트는 작성일 순
    showToast: false,      // 리뷰 작성 성공 메시지
    toastMessage: "",      // 토스트 메시지 내용
    totalPages: 0,
    currentPage: 1,
    reviewPic: null,
};

const reducer = (state, action) => {
    switch(action.type){
        case "SET_REVIEWS":
            return {
                ...state,
                reviews: action.data.reviews || [],
                totalPages: action.data.totalPages || 0,
                currentPage: action.data.currentPage || 1,
                loading: false,
                error: null,
            };
        case "SET_REVIEW_PIC":
            return { ...state, reviewPic: action.data };
        case "CLEAR_REVIEW_PIC":
            return { ...state, reviewPic: null };
        case "SET_MY_REVIEW":
            return { ...state, myReview: action.data };
        case "SET_SELECTED_REVIEW":
            return { ...state, selectedReview: action.data };
        case "ADD_REVIEW":
            return {
                ...state,
                reviews: [action.data, ...state.reviews],  // 최신 리뷰가 상단으로
                showToast: true,
                toastMessage: "감사합니다! 리뷰가 성공적으로 등록되었습니다."
            };
        case "REMOVE_REVIEW":
            return {
                ...state,
                reviews: state.reviews.filter(review =>
                    review.reviewCode !== action.payload)
            };
        case "UPDATE_REVIEW_STATUS":
            return {
                ...state,
                reviews: state.reviews.map(review =>
                    review.reviewCode === action.payload.reviewCode
                        ? { ...review, reviewStatus: action.payload.reviewStatus }
                        : review
                )
            };
        case "SET_SORT_OPTION":
            return { ...state, sortOption: action.data };
        case "SET_AVERAGE_RATING":
            return { ...state, averageRating: action.data };
        case "SET_REVIEW_COUNT":
            return { ...state, reviewCount: action.data };
        case "SET_LOADING":
            return { ...state, loading: action.data, error: null };
        case "SET_ERROR":
            return { ...state, error: action.data, loading: false };
        case "HIDE_TOAST":
            return { ...state, showToast: false, toastMessage: "" };
        default:
            return state;
    }
};

export { initialState, reducer };