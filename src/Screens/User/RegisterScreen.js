import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AuthForm from '../../Components/Form/AuthForm';
var {width} = Dimensions.get('window');

import {register, clear_error_message} from '../../redux/user/userActions';
import {connect, useDispatch, useSelector} from 'react-redux';

const RegisterScreen = ({navigation}) => {
  const {errorMessage, isLoading} = useSelector(state => state.user);
  const dispatch = useDispatch();

  //when the screen goes out of focus, error message will hide
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      dispatch(clear_error_message());
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Spinner visible={isLoading} />
        <AuthForm
          headerText="Register"
          errorMessage={errorMessage}
          submitButtonText="Register"
          onSubmit={register}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.navigationText}>
            If you already register go to sign in{' '}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    //marginBottom: 400,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationText: {
    marginTop: 30,
    alignSelf: 'center',
  },
});

export default RegisterScreen;
