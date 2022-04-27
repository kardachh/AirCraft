import React, {FC, useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Flight} from '../types';
import {FlightItem} from './flight_item';
import moment from 'moment';
import {useAppSelector} from '../redux/hooks';
import {airportsAPI} from '../redux/servises';

type FlightsListProps = {
  navigation: any;
  // route?: any;
};

export const FlightsList: FC<FlightsListProps> = props => {
  const selectedAirport = useAppSelector(state => state.online.selectedAirport);
  const selectedDate = useAppSelector(state => state.online.selectedDate);
  const airports = useAppSelector(state => state.online.airports);
  const {data} = airportsAPI.useFetchFlightsQuery(`'${selectedDate}'`);
  const [flights, setFlights] = useState<Flight[]>([]);

  useEffect(() => {
    if (data && selectedAirport) {
      setFlights(
        data
          .filter(
            flight =>
              flight.departure_airport === selectedAirport.airport_code ||
              flight.arrival_airport === selectedAirport.airport_code,
          )
          .sort(
            (a, b) =>
              parseInt(moment(a.scheduled_arrival).format('HHmm'), 10) -
              parseInt(moment(b.scheduled_arrival).format('HHmm'), 10),
          ),
      );
    }
  }, [data, selectedAirport]);

  const renderItem = useCallback(
    ({item}: {item: Flight}) =>
      // airport && (
      FlightItem({
        navigation: props.navigation,
        flight: item,
        arrivalAirport: airports.find(
          airport => airport.airport_code === item.arrival_airport,
        )!,
        departureAirport: airports.find(
          airport => airport.airport_code === item.departure_airport,
        )!,
      }),
    [airports, props.navigation],
  );

  return flights.length !== 0 ? (
    <FlatList
      style={styles.list}
      data={flights}
      renderItem={renderItem}
      keyExtractor={item => item.flight_id.toString()}
      refreshing={true}
    />
  ) : (
    <View style={styles.text}>
      <Text>{'На этот день нет рейсов'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
