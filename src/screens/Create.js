import React, { useState } from 'react';
import {
  Button,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { THEME } from '../theme';
import { useDispatch } from 'react-redux';
import { createPost } from '../store/actions/post.action';
import { useNavigation } from '@react-navigation/native';
import { PhotoPicker } from '../components/PhotoPicker';

export const CreateScreen = () => {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [img, setImage] = useState(null);
  const dispatch = useDispatch();

  const saveHandler = () => {
    const post = {
      date: new Date().toJSON(),
      text,
      img,
      booked: false,
    };
    dispatch(createPost(post));
    setText('');
    setImage(null);
    navigation.navigate('Main');

  };

  const photoPickHandler = uri => {
    setImage(uri);
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>New Post</Text>
          <TextInput
            style={styles.textArea}
            value={text}
            onChangeText={setText}
            placeholder={'Fill your text'}
            multiline
          />
          <PhotoPicker image={img} onPick={photoPickHandler} />
          <Button disabled={!text.trim()} style={styles.btn} title="Create Post" color={THEME.COLOR_ACTIVE_PRIMARY}
                  onPress={saveHandler} />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'open-regular',
    marginBottom: 30
  },
  textArea: {
    padding: 25,
    paddingLeft: 10,
    fontSize: 18,
    marginBottom: 20,
    borderRadius: 10,
    borderColor: THEME.COLOR_ACTIVE_PRIMARY,
    borderWidth: 2,
  },
  btn: {
    marginTop: 20,
  },
});