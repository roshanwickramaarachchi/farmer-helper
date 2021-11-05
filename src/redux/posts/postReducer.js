import {
  ADD_ERROR_POSTS,
  CLEAR_ERROR_MESSAGE_POSTS,
  IS_LOADING_POSTS,
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
} from './postType';

const initialState = {
  posts: [],
  errorMessagePosts: '',
  isLoadingPosts: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ERROR_POSTS:
      return {
        ...state,
        errorMessagePosts: action.payload,
        isLoadingPosts: false,
      };
    case CLEAR_ERROR_MESSAGE_POSTS:
      return {...state, errorMessagePosts: ''};
    case IS_LOADING_POSTS:
      return {...state, isLoadingPosts: true};
    case GET_POSTS:
      return {
        errorMessagePosts: '',
        posts: action.payload,
        isLoadingPosts: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        errorMessagePosts: '',
        isLoadingPosts: false,
      };
    case DELETE_POST:
      return {
        errorMessagePosts: '',
        posts: state.posts.filter(post => post._id !== action.payload),
        isLoadingPosts: false,
      };
    // case UPDATE_POST:
    //   return {...state, errorMessagePosts: '', isLoadingPosts: false};
    case UPDATE_POST: {
      const index = state.posts.findIndex(
        post => post.id === action.payload._id,
      ); //finding index of the item
      const newArray = [...state.posts]; //making a new array
      newArray[index].description = action.payload.description; //changing value in the new array
      newArray[index].photo = action.payload.photo; //changing value in the new array
      return {
        ...state, //copying the orignal state
        posts: newArray, //reassingning todos to new array
        errorMessagePosts: '',
        isLoadingPosts: false,
      };
    }

    default:
      return state;
  }
};

export default reducer;
