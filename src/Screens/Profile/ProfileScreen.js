import React, {useLayoutEffect, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import EasyButton from '../../Components/Button/EasyButton';
import AuthForm from '../../Components/Form/AuthForm';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';
import {getMe, signout} from '../../redux/user/userActions';
import {connect, useDispatch, useSelector} from 'react-redux';

const ProfileScreen = ({navigation}) => {
  const {errorMessage, isLoading, userData} = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      dispatch(getMe());
    });
    return listener;
  }, [dispatch, navigation]);
  //console.log(posts); 

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="add-outline"
          size={40}
          onPress={() => navigation.navigate('Post Create')}
        />
      ),
    });
  }, [navigation]);

  if (userData.name === undefined){
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Spinner visible={isLoading} />
      <AuthForm
        headerText="Profile"
        errorMessage={errorMessage}
        submitButtonText="save"
        //onSubmit={update}
        initialValues={userData}
      />
      <View>
        <EasyButton large primary onPress={() => dispatch(signout())}>
          <Text style={{color: 'white'}}>Sign out</Text>
        </EasyButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    //marginTop: 30,
    //marginBottom: 400,
    //width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationText: {
    marginTop: 30,
    marginBottom: 30,
    alignSelf: 'center',
  },
});

export default ProfileScreen;
