import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import PostForm from '../../Components/Form/PostForm';

import {
  createPost,
  clear_error_message_posts,
} from '../../redux/posts/postActions';
import {connect, useDispatch, useSelector} from 'react-redux';

const PostCreteScreen = ({navigation}) => {
  const {errorMessagePosts, isLoadingPosts} = useSelector(state => state.posts);
  const dispatch = useDispatch();

  //when the screen goes out of focus, error message will hide
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      dispatch(clear_error_message_posts());
    });
    return unsubscribe;
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PostForm
        errorMessage={errorMessagePosts}
        submitButtonText="Save"
        onSubmit={createPost}
      />
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
});

export default PostCreteScreen;
