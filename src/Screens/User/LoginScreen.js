import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import EasyButton from '../../Components/Button/EasyButton';
import Input from '../../Components/Form/Input';
import FormContainer from '../../Components/Form/FormContainer';
import Error from '../../Components/Error';
import {signin, clear_error_message} from '../../redux/user/userActions';

import {connect, useDispatch, useSelector} from 'react-redux';

const LoginScreen = ({navigation}) => {
  const {errorMessage, isLoading} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //when the screen goes out of focus, error message will hide
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      dispatch(clear_error_message());
    });
    return unsubscribe;
  }, []);

  return (
    <View>
      <Spinner visible={isLoading} />
      <FormContainer title={'Login'}>
        <Input
          placeholder={'Enter Email'}
          name={'email'}
          id={'email'}
          autoCorrect={false}
          autoCapitalize={'none'}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder={'Enter Password'}
          name={'password'}
          id={'password'}
          autoCorrect={false}
          autoCapitalize={'none'}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <View style={[{marginTop: 40}, styles.button]}>
          {errorMessage ? <Error message={errorMessage} /> : null}

          <EasyButton
            large
            primary
            onPress={() => dispatch(signin({email, password}))}>
            <Text style={{color: 'white'}}>Login</Text>
          </EasyButton>
        </View>

        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.navigationText}>
              Don't have an account yet?{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </FormContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '80%',
    alignItems: 'center',
  },
  navigationText: {
    marginTop: 30,
    alignSelf: 'center',
  },
});

export default LoginScreen;
