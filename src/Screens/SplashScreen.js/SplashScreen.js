import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {tryLocalSignin} from '../../redux/user/userActions';
import {connect, useDispatch, useSelector} from 'react-redux';

const SplashScreen = () => {
  const dispatch = useDispatch();  

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(tryLocalSignin());
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/splash.jpg')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default SplashScreen;
