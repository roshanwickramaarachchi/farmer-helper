import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
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

const PostForm = ({onSubmit, submitButtonText, errorMessagePosts, postData}) => {
  const dispatch = useDispatch();

  const [photo, setPhoto] = useState(postData.photo);
  const [description, setDescription] = useState(postData.description);

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
      {photo ? (
        <Image source={{uri: photo}} style={styles.imageStyle} />
      ) : (
        <Image
          style={styles.imageStyle}
          source={require('../../assets/default_image.png')}
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
        placeholder={'Enter Description'}
        name={'description'}
        id={'description'}
        autoCorrect={false}
        autoCapitalize={'none'}
        value={description}
        onChangeText={setDescription}
      />
      {/* error message */}
      {errorMessagePosts ? <Error message={errorMessagePosts} /> : null}

      <View style={{marginTop: 30, marginBottom: 30}}>
        <EasyButton
          large
          primary
          onPress={() => dispatch(onSubmit({photo, description}))}>
          <Text style={{color: 'white'}}>{submitButtonText}</Text>
        </EasyButton>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
  },
  imageStyle: {
    width: (width * 95) / 100,
    height: width,
    margin: 10,
  },
});

PostForm.defaultProps = {
  postData: {
    photo: null,
    description: '',
  },
};

export default PostForm;
