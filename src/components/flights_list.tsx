import React, {FC, useCallback} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Flight} from '../../state/types';

type FlightsListProps = {
  navigation?: any;
  route?: any;
};

const mock: Flight[] = [
  {
    flight_id: 187,
    flight_no: 'PG0402',
    scheduled_departure: '2022-10-20T08:25:00.000Z',
    scheduled_arrival: '2022-10-20T09:20:00.000Z',
    departure_airport: 'DME',
    arrival_airport: 'LED',
    status: 'Scheduled',
    aircraft_code: '321',
    actual_departure: null,
    actual_arrival: null,
  },
  {
    flight_id: 188,
    flight_no: 'PG0403',
    scheduled_departure: '2022-10-20T07:25:00.000Z',
    scheduled_arrival: '2022-10-20T08:20:00.000Z',
    departure_airport: 'DME',
    arrival_airport: 'LED',
    status: 'Scheduled',
    aircraft_code: '321',
    actual_departure: null,
    actual_arrival: null,
  },
  {
    flight_id: 189,
    flight_no: 'PG0404',
    scheduled_departure: '2022-10-20T15:05:00.000Z',
    scheduled_arrival: '2022-10-20T16:00:00.000Z',
    departure_airport: 'DME',
    arrival_airport: 'LED',
    status: 'Scheduled',
    aircraft_code: '321',
    actual_departure: null,
    actual_arrival: null,
  },
  {
    flight_id: 190,
    flight_no: 'PG0405',
    scheduled_departure: '2022-10-20T05:35:00.000Z',
    scheduled_arrival: '2022-10-20T06:30:00.000Z',
    departure_airport: 'DME',
    arrival_airport: 'LED',
    status: 'Scheduled',
    aircraft_code: '321',
    actual_departure: null,
    actual_arrival: null,
  },
  {
    flight_id: 270,
    flight_no: 'PG0222',
    scheduled_departure: '2022-10-20T07:05:00.000Z',
    scheduled_arrival: '2022-10-20T10:30:00.000Z',
    departure_airport: 'DME',
    arrival_airport: 'OVB',
    status: 'Scheduled',
    aircraft_code: '773',
    actual_departure: null,
    actual_arrival: null,
  },
];

export const FlightsList: FC<FlightsListProps> = props => {
  const renderItem = useCallback(({item}: {item: Flight}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        // onPress={() => {
        //   // props.changeAirport();
        //   storeAirport.dispatch({
        //     type: AIRPORT_ACTION_TYPES.SELECT_AIRPORT,
        //     airportData: item,
        //   });
        //   props.navigation.goBack();
        // }}
      >
        <Text>{`${item.departure_airport} (${item.arrival_airport})`}</Text>
      </TouchableOpacity>
    );
  }, []);
  return (
    <FlatList
      style={styles.list}
      data={mock}
      renderItem={renderItem}
      keyExtractor={item => item.flight_id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 15,
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 15,
  },
});
