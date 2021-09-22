import axios from 'axios';
import {BASE_URL} from '../../api/Base_URL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ADD_ERROR,
  CLEAR_ERROR_MESSAGE,
  IS_LOADING,
  SIGN_IN,
  REGISTER,
  SIGN_OUT,
} from './userType';
import * as RootNavigation from '../../Navigators/RootNavigation';

export const add_error = errorMessage => {
  return {
    type: ADD_ERROR,
    payload: errorMessage,
  };
};

export const clear_error_message = () => {
  return {
    type: CLEAR_ERROR_MESSAGE,
  };
};

export const is_loading = () => {
  return {
    type: IS_LOADING,
  };
};

export const sign_in = token => {
  return {
    type: SIGN_IN,
    payload: token,
  };
};

export const user_register = token => {
  return {
    type: REGISTER,
    payload: token,
  };
};

export const sign_out = () => {
  return {
    type: SIGN_OUT,
  };
};

export const tryLocalSignin = () => async dispatch => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch(sign_in(token));
    RootNavigation.navigate('Main Flow');
  } else {
    RootNavigation.navigate('Login Flow');
  }
};

// eslint-disable-next-line prettier/prettier
export const signin = ({ email, password }) => async dispatch => {
    try {
      dispatch(is_loading());
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/api/v1/auth/login`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          email,
          password,
        },
      });
      //console.log(response.data.token);
      await AsyncStorage.setItem('token', response.data.token);
      dispatch(sign_in(response.data.token));
      RootNavigation.navigate('Main Flow');
    } catch (err) {
      dispatch(add_error('Something went wrong with sign in'));
      console.log('sign in error: ', err);
    }
  };

// eslint-disable-next-line prettier/prettier
export const register = ({ name,email, password,photo }) => async dispatch => {
    try {
      dispatch(is_loading());
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/api/v1/auth/register`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          name,
          email,
          password,
          photo,
        },
      });
      //console.log(response.data);
      await AsyncStorage.setItem('token', response.data.token);
      dispatch(user_register(response.data.token));
      RootNavigation.navigate('Main Flow');
    } catch (err) {
      dispatch(add_error('Something went wrong with user register'));
      console.log('user register error: ', err);
    }
  };

export const signout = () => async dispatch => {
  try {
    dispatch(is_loading());
    await AsyncStorage.removeItem('token');
    dispatch(sign_out());
    RootNavigation.navigate('Login Flow');
  } catch (err) {
    dispatch(add_error('Something went wrong with sign out'));
    console.log('sign out error: ', err);
  }
};
