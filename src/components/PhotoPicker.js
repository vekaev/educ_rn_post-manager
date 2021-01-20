import React, { useEffect } from 'react';
import { Button, Image, StyleSheet, View } from 'react-native';
import { Platform } from 'react-native-web';
import * as ImagePicker from 'expo-image-picker';
import { THEME } from '../theme';

export const PhotoPicker = ({ image, onPick }) => {

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const takePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      onPick(result.uri);
    }
  };

  return (
    <View styles={styles.wrapper}>
      <Button title="Take photo" color={THEME.COLOR_ACTIVE_PRIMARY} onPress={takePhoto} />
      {image && <Image style={styles.image} source={{ uri: image }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
    marginBottom: 20,
  },
});