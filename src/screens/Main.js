import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { PostList } from '../components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { loadPosts } from '../store/actions/post.action';
import { THEME } from '../theme';

export const MainScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const openPostHandler = post => {
    navigation.navigate('Post', { postId: post.id, booked: post?.booked });
  };

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  const allPosts = useSelector(state => state.post.allPosts);
  const loading = useSelector(state => state.post.loading);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={THEME.COLOR_SECONDARY_ACTIVE_PRIMARY} />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <PostList data={allPosts} onOpen={openPostHandler} />
    </View>
  );
};

MainScreen.navigationOptions = {
  headerTitle: 'MainScreen',
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

