import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const TrackedScreen = ({}) => {
  return (
    <View style={styles.screen}>
      <Text>TrackedScreen</Text>
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
