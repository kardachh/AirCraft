import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const FeedScreen = ({}) => {
  return (
    <View style={styles.screen}>
      <Text>FeedScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
