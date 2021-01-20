import React, { useCallback, useEffect } from 'react';
import { Alert, Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removePost, toggleBooked } from '../store/actions/post.action';
import { useNavigation } from '@react-navigation/native';
import { THEME } from '../theme';

export const PostScreen = ({ route }) => {
  const navigation = useNavigation();
  const { postId } = route.params;
  const dispatch = useDispatch();

  const post = useSelector(state => state.post.allPosts.find(item => item.id === postId));

  const booked = useSelector(state => state.post.bookedPosts.some(item => item.id === postId));

  const deleteHandler = () => {
    navigation.goBack();
    dispatch(removePost(postId));
  };

  const toggleHandler = useCallback(() => {
    dispatch(toggleBooked(post));
  }, [dispatch, post]);

  useEffect(() => {
    navigation.setParams({ booked });
  }, [booked]);

  useEffect(() => {
    navigation.setParams({ toggleHandler });
  }, [toggleHandler]);

  if (!post) {
    navigation.navigate('Main');
    return null;
  }

  const removeHandler = () => {
    Alert.alert(
      'Delete post',
      'Are u sure?',
      [
        { text: 'Cancel' },
        { text: 'OK', onPress: deleteHandler, style: 'destructive' },
      ],
      { cancelable: false },
    );
  };

  return (
    <ScrollView>
      <Image style={styles.img} source={{ uri: post.img }} />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{post.text}</Text>
      </View>
      <Button title="Delete" color={THEME.COLOR_ACTIVE_PRIMARY} onPress={removeHandler} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textWrap: {
    padding: 10,
  },
  title: {
    fontFamily: 'open-regular',
  },
  img: {
    width: '100%',
    height: 200,
  },
});