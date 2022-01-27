import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useBackend} from '../hooks/api/useBackend';
import {Aircraft} from '../hooks/api/types';

export const MainScreen = () => {
  const [aircrafts, setAircrafts] = useState<Aircraft[]>([]);
  const {api} = useBackend();

  const getInfo = async () => {
    try {
      const res = await api.getAircrafts();
      setAircrafts(res);
    } catch (err) {
      console.log(`ERROR\n${err}`);
    }
  };

  useEffect(() => {
    console.log(aircrafts);
  }, [aircrafts]);

  return (
    <View style={styles.screen}>
      <Text>Main Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => getInfo()}
        // onPress={() => navigation.navigate('Details')}
      />
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
