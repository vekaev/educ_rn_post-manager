import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet} from 'react-native';
import { PostList } from '../components/Post';
import { DATA } from '../data';



export const BookedScreen = ({}) => {
  const navigation = useNavigation(); 

  const openPostHandler = post => {
    navigation.navigate('Post', {
       postId: post.id, booked: post.booked },
    )
  }

  return (
    <View style={styles.wrapper}>
      <PostList data={DATA.filter(post => post.booked)} onOpen={openPostHandler}/>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10
  }
})