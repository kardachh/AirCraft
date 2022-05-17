import React, {FC, useCallback, useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Airport} from '../types';
import {setAirport, setAirports} from '../redux/store';
import {useAppDispatch} from '../redux/hooks';
import {airportsAPI} from '../redux/servises';

type AirportListProps = {
  navigation?: any;
};
export const AirportList: FC<AirportListProps> = ({navigation}: any) => {
  const {data} = airportsAPI.useFetchAirportsQuery(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAirports(data));
  }, [data, dispatch]);

  const renderItem = useCallback(
    ({item}: {item: Airport}) => {
      return (
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            dispatch(setAirport(item));
            navigation.goBack();
          }}>
          <Text>{`${item.airport_name} (${item.airport_code})`}</Text>
        </TouchableOpacity>
      );
    },
    [dispatch, navigation],
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.airport_code}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
  },
});
