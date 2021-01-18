import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';


export const AboutScreen = ({}) => {
  return (
    <View style={styles.center}>
      <Text>AboutScreen</Text>
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