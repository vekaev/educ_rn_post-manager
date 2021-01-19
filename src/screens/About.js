import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';


export const AboutScreen = ({}) => {
  return (
    <View style={styles.center}>
      <Text>This is my study app</Text>
      <Text>Version <Text style={{fontFamily: 'open-bold'}}>1.0.0</Text></Text>
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})