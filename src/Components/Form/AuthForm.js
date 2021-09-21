import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import EasyButton from '../../Components/Button/EasyButton';
import Input from '../../Components/Form/Input';
import Error from '../../Components/Error';

var {width} = Dimensions.get('window');

import {connect, useDispatch, useSelector} from 'react-redux';

// eslint-disable-next-line prettier/prettier
const AuthForm = ({headerText, onSubmit, submitButtonText, errorMessage, userData}) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState(userData.password);
  const [photo, setPhoto] = useState(userData.photo);
  const [description, setDescription] = useState(userData.description);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else {
      return true;
    }
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
      includeBase64: true,
    };

    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();

    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }

        setPhoto(
          `data:${response.assets[0].type};base64,` + response.assets[0].base64,
        );
      });
    }
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      //console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }

      setPhoto(
        `data:${response.assets[0].type};base64,` + response.assets[0].base64,
      );
    });
  };

  return (
    <>
      <Text style={styles.title}>{headerText}</Text>

      {photo ? (
        <Image source={{uri: photo}} style={styles.imageStyle} />
      ) : (
        <Image
          style={styles.imageStyle}
          source={require('../../assets/defaultUserProfile.png')}
        />
      )}

      <EasyButton large secondary onPress={() => captureImage('photo')}>
        <Text style={{color: 'white'}}>Launch Camera for Image</Text>
      </EasyButton>
      {/* <EasyButton large primary onPress={() => captureImage('video')}>
        <Text style={{color: 'white'}}>Launch Camera for Video</Text>
      </EasyButton> */}
      <EasyButton large secondary onPress={() => chooseFile('photo')}>
        <Text style={{color: 'white'}}>Choose Image</Text>
      </EasyButton>
      {/* <EasyButton large primary onPress={() => chooseFile('video')}>
        <Text style={{color: 'white'}}>Choose Video</Text>
      </EasyButton> */}

      <Input
        placeholder={'Enter Name'}
        name={'name'}
        id={'name'}
        autoCorrect={false}
        autoCapitalize={'none'}
        value={name}
        onChangeText={setName}
      />
      <Input
        placeholder={'Enter Description about you'}
        name={'description'}
        id={'description'}
        autoCorrect={false}
        autoCapitalize={'none'}
        value={description}
        onChangeText={setDescription}
      />
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

      {/* error message */}
      {errorMessage ? <Error message={errorMessage} /> : null}

      <View>
        <EasyButton
          large
          primary
          onPress={() =>
            dispatch(onSubmit({name, photo, description, email, password}))
          }>
          <Text style={{color: 'white'}}>{submitButtonText}</Text>
        </EasyButton>
      </View>
    </>
  );
};

AuthForm.defaultProps = {
  userData: {
    name: '',
    photo: null,
    description: '',
    email: '',
    password: '',
  }

}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
  },
  imageStyle: {
    width: width / 2,
    height: width / 2,
    margin: 10,
    borderRadius: width / 4,
  },
});



export default AuthForm;
