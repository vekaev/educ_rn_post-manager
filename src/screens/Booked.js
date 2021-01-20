import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { PostList } from '../components/Post';
import { useSelector } from 'react-redux';

export const BookedScreen = ({}) => {
  const navigation = useNavigation();

  const openPostHandler = post => {
    navigation.navigate('Post', {
        postId: post.id, booked: post.booked,
      },
    );
  };

  const BookedPosts = useSelector(state => state.post.bookedPosts);

  return (
    <View style={styles.wrapper}>
      <PostList data={BookedPosts} onOpen={openPostHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
});