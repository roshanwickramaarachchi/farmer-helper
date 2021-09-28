import {
  ADD_ERROR,
  CLEAR_ERROR_MESSAGE,
  IS_LOADING,
  SIGN_IN,
  REGISTER,
  SIGN_OUT,
  GETME,  
  UPDATE,

} from './userType';

const initialState = {
  userData: '',
  token: null,
  errorMessage: '',
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ERROR:
      return {...state, errorMessage: action.payload, isLoading: false};
    case CLEAR_ERROR_MESSAGE:
      return {...state, errorMessage: ''};
    case IS_LOADING:
      return {...state, isLoading: true};
    case SIGN_IN:
      return {errorMessage: '', token: action.payload, isLoading: false};
    case REGISTER:
      return {errorMessage: '', token: action.payload, isLoading: false};
    case UPDATE:
      return {...state, errorMessage: '', isLoading: false};
    case SIGN_OUT:
      return {...state, token: null, errorMessage: '', isLoading: false};
    case GETME:
      return {errorMessage: '', userData: action.payload, isLoading: false};
    default:
      return state;
  }

};

export default reducer;
