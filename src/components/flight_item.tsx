import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Airport, Flight} from '../types';
import moment from 'moment';
import {useDispatch} from 'react-redux';

type FlightItemProps = {
  flight: Flight;
  departureAirport: Airport;
  arrivalAirport: Airport;
  onPress?: () => Promise<unknown>;
};
export const FlightItem: FC<FlightItemProps> = props => {
  // const dispatch = useDispatch();
  return (
    <TouchableOpacity style={styles.item} onPress={() => console.log(123)}>
      <View style={styles.timeBox}>
        <Text style={styles.time}>
          {moment(props.flight.scheduled_arrival).format('HH:mm')}
        </Text>
      </View>
      <View style={styles.line} />
      <View style={styles.airports}>
        <Text>{`${props.departureAirport.airport_name} (${props.departureAirport.airport_code})`}</Text>
        <Text>{`${props.arrivalAirport.airport_name} (${props.arrivalAirport.airport_code})`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 15,
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 15,
  },
  timeBox: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontSize: 24,
    fontWeight: 'bold',
    width: 70,
  },
  line: {
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: 'black',
    height: '100%',
  },
  airports: {
    flexDirection: 'column',
    fontWeight: 'bold',
  },
});
