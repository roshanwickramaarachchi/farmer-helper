import React from 'react';
import {View, Text} from 'react-native';
import EasyButton from '../../Components/Button/EasyButton';
import Spinner from 'react-native-loading-spinner-overlay';
import {signout} from '../../redux/user/userActions';
import {connect, useDispatch, useSelector} from 'react-redux';

const ProfileScreen = () => {
  const {errorMessage, isLoading} = useSelector(state => state.user);
  const dispatch = useDispatch();

  return (
    <View>
      <Spinner visible={isLoading} /> 
      <Text>Profile Screen</Text>
      <EasyButton large primary onPress={() => dispatch(signout())}>
        <Text style={{color: 'white'}}>Login</Text>
      </EasyButton>
    </View>
  );
};

export default ProfileScreen;
