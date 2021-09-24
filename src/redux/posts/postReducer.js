import {
  ADD_ERROR,
  CLEAR_ERROR_MESSAGE,
  IS_LOADING_POSTS,
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
} from './postType';

const initialState = {
  posts: [],
  errorMessage: '',
  isLoadingPosts: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ERROR:
      return {...state, errorMessage: action.payload, isLoadingPosts: false};
    case CLEAR_ERROR_MESSAGE:
      return {...state, errorMessage: ''};
    case IS_LOADING_POSTS:
      return {...state, isLoadingPosts: true};
    case GET_POSTS:
      return {errorMessage: '', posts: action.payload, isLoadingPosts: false};
    case ADD_POST:
      return {...state, errorMessage: '', isLoadingPosts: false};
    case DELETE_POST:
      return {
        errorMessage: '',
        posts: state.posts.filter(post => post._id !== action.payload),
        isLoadingPosts: false,
      };
    case UPDATE_POST:
      return {...state, errorMessage: '', isLoadingPosts: false};
    default:
      return state;
  }
};

export default reducer;
