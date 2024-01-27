import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Messages( route ) {

  const { thread } = route.params;
  
  return (
    <View style={styles.container}>
      <Text>Messages!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
