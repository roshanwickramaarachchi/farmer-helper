import {combineReducers} from 'redux';
import userReducer from './user/userReducer';
import postsReducer from './posts/postReducer';

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
});

export default rootReducer;
