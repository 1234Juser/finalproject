const initialState = {
    groups: [],
    selectedGroupCode: null,
    wishList: [],
    data : null,
    loading : false,
    error : null
}
const reducer = (state, action) => {
    switch(action.type){
        // 불러올 위시그룹, 위시리스트 데이터
        case "SET_GROUPS":
            return { ...state, groups: action.data };
        case "SET_WISH_LIST":
            return { ...state, wishList: action.data };
        case "SET_SELECTED_GROUP":
            return { ...state, selectedGroupCode: action.data };
        case "SET_LOADING":
            return { ...state, loading: action.data };
        case "SET_ERROR":
            return { ...state, error: action.data };
        // case "LOADING":
        //     return {...state, loading : true, error : null};
        // case "FINISHED" :
        //     return {...state, loading : false, error : null};
        // case "ERROR" :
        //     return {...state, loading : false, error : action.error};
        // default :
            return state;
    }
}
export {initialState, reducer};