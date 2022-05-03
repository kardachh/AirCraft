import React, {FC, useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Airport, Flight} from '../types';
import {FlightItem} from './flight_item';
import moment from 'moment';
import {useAppSelector} from '../redux/hooks';

type FlightsListProps = {
  navigation: any;
  selectedAirport?: Airport;
  flightsData?: Flight[];
  showDate?: boolean;
};

export const FlightsList: FC<FlightsListProps> = props => {
  const airports = useAppSelector(state => state.online.airports);
  const [flightsFiltered, setFlightsFiltered] = useState<Flight[]>([]);

  const filterFlights = useCallback(
    (flights?: Flight[]) => {
      const newFlights: Flight[] = flights ? [...flights] : [];
      let filteredFlights = newFlights.sort(
        (a, b) =>
          parseInt(moment(a.scheduled_arrival).format('HHmm'), 10) -
          parseInt(moment(b.scheduled_arrival).format('HHmm'), 10),
      );
      if (props.selectedAirport) {
        filteredFlights = filteredFlights.filter(flight => {
          return (
            flight.departure_airport === props.selectedAirport!.airport_code ||
            flight.arrival_airport === props.selectedAirport!.airport_code
          );
        });
      }
      return filteredFlights;
    },
    [props.selectedAirport],
  );

  useEffect(
    () => setFlightsFiltered(filterFlights(props.flightsData)),
    [filterFlights, props.flightsData],
  );

  const renderItem = useCallback(
    ({item}: {item: Flight}) =>
      FlightItem({
        navigation: props.navigation,
        flight: item,
        showDate: props.showDate,
        arrivalAirport: airports.find(
          airport => airport.airport_code === item.arrival_airport,
        )!,
        departureAirport: airports.find(
          airport => airport.airport_code === item.departure_airport,
        )!,
      }),
    [airports, props.navigation, props.showDate],
  );
  return flightsFiltered.length !== 0 ? (
    <FlatList
      style={styles.list}
      data={flightsFiltered}
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
