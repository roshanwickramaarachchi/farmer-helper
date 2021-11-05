import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect, useDispatch, useSelector} from 'react-redux';
var {width} = Dimensions.get('window');
import * as RootNavigation from '../Navigators/RootNavigation';

const PostCard = ({item}) => {
  const {userData} = useSelector(state => state.user);
  //console.log(userData._id);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          {userData._id === item.user ? (
            <Image style={styles.userImg} source={{uri: userData.photo}} />
          ) : (
            <Image style={styles.userImg} source={{uri: item.user.photo}} />
          )}
          <View style={styles.userInfoText}>
            {userData._id === item.user ? (
              <Text style={styles.userName}>{userData.name}</Text>
            ) : (
              <Text style={styles.userName}>{item.user.name}</Text>
            )}
            <Text style={styles.postTime}>{item.createdAt}</Text>
          </View>
        </View>
        {userData._id === item.user ? (
          <TouchableOpacity
            onPress={() => {
              RootNavigation.navigate('Post Edit', {
                postData: item,
              });
            }}

            // onPress={() => console.log(item)}
          >
            <Icon name="pencil" size={25} />
          </TouchableOpacity>
        ) : null}

        {userData._id === item.user ? (
          <TouchableOpacity onPress={() => console.log('pressed')}>
            <Icon name="trash-outline" size={25} />
          </TouchableOpacity>
        ) : null}
      </View>
      <Text style={styles.postText}>{item.description}</Text>
      <Image style={styles.postImg} source={{uri: item.photo}} />
      <View style={styles.interactionWrapper}>
        <TouchableOpacity
          style={styles.interaction}
          onPress={() => console.log('pressed')}>
          <Icon name="heart-outline" size={25} />
          <Text style={styles.interactionText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.interaction}
          onPress={() => console.log('pressed')}>
          <Icon name="md-chatbubble-outline" size={25} />
          <Text style={styles.interactionText}>Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f8f8',
    width: width,
    marginBottom: 20,
    borderRadius: 10,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderColor: 'red',
    // borderWidth: 5,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    //padding: 15,
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfoText: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  postTime: {
    fontSize: 12,
    color: '#666',
  },
  iconConatainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  postText: {
    fontSize: 14,
    paddingLeft: 15,
    paddingRight: 15,
  },
  postImg: {
    width: (width * 95) / 100,
    height: 250,
    marginTop: 15,
  },
  interactionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  interaction: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 2,
  },
  interactionText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 5,
    marginTop: 5,
  },
});

export default PostCard;
