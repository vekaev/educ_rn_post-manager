import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DATA } from '../data';
import { useNavigation } from '@react-navigation/native'
import { PostList } from '../components/Post';

export const MainScreen = () => {
  const navigation = useNavigation(); 

  const openPostHandler = post => {
    navigation.navigate('Post', {postId: post.id, booked: post.booked})
  }

  return (
    <View style={styles.wrapper}>
      <PostList data={DATA} onOpen={openPostHandler}/>
    </View>
  )
}

MainScreen.navigationOptions = {
  headerTitle: 'MainScreen'
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10
  }
})