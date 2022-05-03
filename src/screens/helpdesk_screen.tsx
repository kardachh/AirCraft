import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const HelpDeskScreen = ({}) => {
  return (
    <View style={styles.screenEmpty}>
      <Text>HelpDesk</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screenEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
