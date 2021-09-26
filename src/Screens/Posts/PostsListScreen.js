import React, {useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import PostCard from '../../Components/PostCard';
import Error from '../../Components/Error';
import {
  getPosts,
  clear_error_message_posts,
} from '../../redux/posts/postActions';
import {connect, useDispatch, useSelector} from 'react-redux';

var {width} = Dimensions.get('window');

const PostsListScreen = ({navigation}) => {
  const {errorMessagePosts, isLoadingPosts, posts} = useSelector(
    state => state.posts,
  );
  const dispatch = useDispatch();

  //when the screen goes out of focus, error message will hide
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      dispatch(clear_error_message_posts());
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      dispatch(getPosts());
    });
    return listener;
  }, [dispatch, navigation]);
  console.log(posts);

  return (
    <View style={styles.container}>
      {/* error message */}
      {errorMessagePosts ? <Error message={errorMessagePosts} /> : null}

      <Spinner visible={isLoadingPosts} />

      <FlatList
        data={posts}
        renderItem={({item}) => <PostCard item={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
});

export default PostsListScreen;
