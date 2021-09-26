import axios from 'axios';
import {BASE_URL} from '../../api/Base_URL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ADD_ERROR_POSTS,
  CLEAR_ERROR_MESSAGE_POSTS,
  IS_LOADING_POSTS,
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
} from './postType';
import * as RootNavigation from '../../Navigators/RootNavigation';

export const add_error_posts = errorMessagePosts => {
  return {
    type: ADD_ERROR_POSTS,
    payload: errorMessagePosts,
  };
};

export const clear_error_message_posts = () => {
  return {
    type: CLEAR_ERROR_MESSAGE_POSTS,
  };
};

export const is_loading_posts = () => {
  return {
    type: IS_LOADING_POSTS,
  };
};

export const get_posts = posts => {
  return {
    type: GET_POSTS,
    payload: posts,
  };
};

export const add_post = () => {
  return {
    type: ADD_POST,
  };
};

export const delete_post = id => {
  return {
    type: DELETE_POST,
    payload: id,
  };
};

export const update_post = () => {
  return {
    type: UPDATE_POST,
  };
};

// eslint-disable-next-line prettier/prettier
export const getPosts = () => async dispatch => {
  try {
    dispatch(is_loading_posts());
    var token = await AsyncStorage.getItem('token');
    const response = await axios({
      method: 'get',
      url: `${BASE_URL}/api/v1/posts`,
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    //console.log(response.data);
    dispatch(get_posts(response.data.data));
  } catch (err) {
    dispatch(add_error_posts('Something went wrong with get posts'));
    console.log('get posts error: ', err);
  }
};

// eslint-disable-next-line prettier/prettier
export const addPost = ({photo, description}) => async dispatch => {
    try {
      dispatch(is_loading_posts());
      var token = await AsyncStorage.getItem('token');
      await axios({
        method: 'post',
        url: `${BASE_URL}/api/v1/posts`,
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          photo,
          description,
        },
      });
      //console.log(response.data);
      dispatch(add_post());
    } catch (err) {
      dispatch(add_error_posts('Something went wrong with add post'));
      console.log('add post error: ', err);
    }
  };
