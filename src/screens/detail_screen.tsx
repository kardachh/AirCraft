import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type DetailsScreenParams = {
  userID: string;
};

export const DetailsScreen = ({
  route: {params},
}: {
  route: {
    params: DetailsScreenParams;
  };
}) => {
  console.log(`route.params:\n${JSON.stringify(params)}`);
  return (
    <View style={styles.screen}>
      <Text>Detail Screen</Text>
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
