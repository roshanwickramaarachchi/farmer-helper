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
var {width} = Dimensions.get('window');

const PostCard = ({item}) => {
  return (
    <View style={styles.card}>
      <View style={styles.userInfo}>
        <Image style={styles.userImg} /*source={{uri: item.user.photo}}*/ />
        <View style={styles.userInfoText}>
          <Text style={styles.userName}>{item.user.name}</Text>
          <Text style={styles.postTime}>{item.createdAt}</Text>
        </View>
      </View>
      <Text style={styles.postText}>{item.description}</Text>
      <Image style={styles.postImg} /*source={{uri: item.photo}}*/ />
      <View style={styles.interactionWrapper}>
        <TouchableOpacity style={styles.interaction}>
          <Icon name="heart-outline" size={25} />
          <Text style={styles.interactionText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.interaction}>
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
    width: (width * 95) / 100,
    marginBottom: 20,
    borderRadius: 10,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 15,
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
