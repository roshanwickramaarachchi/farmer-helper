import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import EasyButton from '../../Components/Button/EasyButton';
import Input from '../../Components/Button/Form/Input';
import FormContainer from '../../Components/Button/Form/FormContainer';
import Error from '../../Components/Error';

const LoginScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  return (
    <View>
      <FormContainer title={'Login'}>
        <Input
          placeholder={'Enter Email'}
          name={'email'}
          id={'email'}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder={'Enter Password'}
          name={'password'}
          id={'password'}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <View style={[{marginTop: 40}, styles.button]}>
          {error ? <Error message={error} /> : null}

          <EasyButton large primary onPress={() => console.log('pressed')}>
            <Text style={{color: 'white'}}>Login</Text>
          </EasyButton>
        </View>

        <View style={[{marginTop: 30}, styles.button]}>
          <TouchableOpacity onPress={() => console.log('pressed')}>
            <Text style={styles.middleText}>Don't have an account yet? </Text>
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
  middleText: {
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default LoginScreen;
