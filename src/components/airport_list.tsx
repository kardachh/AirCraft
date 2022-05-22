import React, {useCallback, useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Airport} from '../types';
import {setAirport, setAirports, setFromCity, setToCity} from '../redux/store';
import {useAppDispatch} from '../redux/hooks';
import {airportsAPI} from '../redux/servises';

export const AirportList = ({navigation, type}: any) => {
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
            dispatch(
              type === 'selectAirport'
                ? setAirport(item)
                : type === 'from'
                ? setFromCity(item)
                : setToCity(item),
            );
            navigation.goBack();
          }}>
          <Text>{`${item.city}, ${item.airport_name}, ${item.airport_code}`}</Text>
        </TouchableOpacity>
      );
    },
    [dispatch, navigation, type],
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
