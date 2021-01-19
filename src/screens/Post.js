import React, { useMemo } from 'react';
import { Text, ScrollView, View, StyleSheet , Image, Button, Alert} from 'react-native';
import { DATA } from '../data';


export const PostScreen = ({route}) => {
  const { postId } = route.params;

  const post = useMemo(() => DATA.find(p => p.id === postId), [postId])

  if(!post) return null

  const removeHandler = () => {
    Alert.alert(
      "Delete post",
      "Are u sure?",
      [
        { text: "Cancel" },
        { text: "OK", onPress: () => console.log("OK Pressed"), style: 'destructive' }
      ],
      { cancelable: false }
    );
  }

  return (
    <ScrollView>
      <Image style={styles.img} source={{uri: post.img}}/>
      <View style={styles.textWrap}>
        <Text style={styles.title}>{post.text}</Text>
      </View>
      <Button title='Delete' onPress={removeHandler}/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  textWrap:{
    padding: 10
  },
  title:{
    fontFamily: 'open-regular'
  },
  img: {
    width: '100%',
    height: 200
  }
})