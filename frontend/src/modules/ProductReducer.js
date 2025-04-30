export const initialState = {
    productUid: '',
    countryCode: '',
    cityCode: '',
    themeCode: '',
    productTitle: '',
    productContent: '',
    productAdult: '',
    productChild: '',
    productStartDate: '',
    productEndDate: '',
    productMinParticipants: '',
    productMaxParticipants: '',
    productStatus: 'ON_SALE',
    productThumbnail: '',
    productType: '',
  };
  
  export function productFormReducer(state, action) {
    switch (action.type) {
      case 'CHANGE':
        return {
          ...state,
          [action.field]: action.value,
        };
      case 'RESET':
        return initialState;
      default:
        return state;
    }
  }
  