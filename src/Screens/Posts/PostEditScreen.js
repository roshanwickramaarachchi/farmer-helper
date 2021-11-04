import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import PostForm from '../../Components/Form/PostForm';
import Error from '../../Components/Error';

import {
  editPost,
  clear_error_message_posts,
} from '../../redux/posts/postActions';
import {connect, useDispatch, useSelector} from 'react-redux';

const PostEditScreen = ({route, navigation}) => {
  const {errorMessagePosts, isLoadingPosts} = useSelector(state => state.posts);
  const dispatch = useDispatch();

  const {postData} = route.params;

  //when the screen goes out of focus, error message will hide
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      dispatch(clear_error_message_posts());
    });
    return unsubscribe;
  }, [dispatch, navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* error message */}
      {errorMessagePosts ? <Error message={errorMessagePosts} /> : null}

      <Spinner visible={isLoadingPosts} />

      <PostForm
        errorMessage={errorMessagePosts}
        submitButtonText="Save"
        onSubmit={editPost}
        postData={postData}
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

export default PostEditScreen;
