import React, {useLayoutEffect, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import EasyButton from '../../Components/Button/EasyButton';
import AuthForm from '../../Components/Form/AuthForm';
import PostCard from '../../Components/PostCard';
import Error from '../../Components/Error';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';
import {getMe, signout, updateDetails} from '../../redux/user/userActions';
import {connect, useDispatch, useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
        <View>
          {/* <Icon
            name="add-outline"
            size={40}
            onPress={() => navigation.navigate('Post Create')}
          /> */}
          <Icon
            name="log-out-outline"
            size={40}
            onPress={() => dispatch(signout())}
          />
        </View>
      ),
    });
  }, [dispatch, navigation]);

  //console.log(userData.posts);

  return (
    <ScrollView>
      <Spinner visible={isLoading} />
      {userData ? (
        <View style={styles.container}>
          <AuthForm
            headerText="Profile"
            errorMessage={errorMessage}
            submitButtonText="save"
            onSubmit={updateDetails}
            initialValues={userData}
          />

          <View style={{marginTop: 30, marginBottom: 30}}>
            <EasyButton
              large
              secondary
              onPress={() => navigation.navigate('Post Create')}>
              <Text style={{color: 'white'}}>create post</Text>
            </EasyButton>
          </View>

          <View>
            {userData.posts.map(item => (
              <PostCard key={item._id} item={item} />
            ))}
          </View>
        </View>
      ) : null}
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
