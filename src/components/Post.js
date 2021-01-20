import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

export const PostList = ({ data, onOpen }) => {

  if (data.length === 0) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.noItems}>No posts</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={post => post.id.toString()}
      renderItem={({ item }) => <Post post={item} onOpen={onOpen} />} />
  );
};

const Post = ({ post, onOpen }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(post)}>
      <View style={styles.post}>
        <ImageBackground style={styles.img} source={{ uri: post?.img }}>
          <View style={styles.textWrap}>
            <Text style={styles.title}>{new Date(post?.date).toLocaleDateString()}</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  post: {
    marginBottom: 15,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: 200,
  },
  textWrap: {
    backgroundColor: 'rgba(0, 0 ,0 , 0.5)',
    paddingVertical: 5,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    color: '#fff',
    fontFamily: 'open-regular',
  },
  wrapper: {
    padding: 10,
  },
  noItems: {
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'open-regular',
    fontSize: 18,
  },
});