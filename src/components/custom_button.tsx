import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type CustomButtonProps = {
  title: string;
  onPress: () => Promise<unknown>;
};

export const CustomButton: FC<CustomButtonProps> = props => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
  },
  text: {
    fontSize: 16,
  },
});
