import React, {FC} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Flight} from '../types';
import moment from 'moment';
import {OnlineNames} from '../navigations/screens';

type FlightItemProps = {
  navigation: any;
  flight: Flight;
  showDate?: boolean;
  onPress?: () => Promise<unknown>;
};

export const FlightItem: FC<FlightItemProps> = props => {
  const getImage = (status: string) => {
    switch (status) {
      case 'Arrived': {
        return require('./../assets/arrived.png');
      }
      case 'Departed': {
        return require('./../assets/departed.png');
      }
      case 'Scheduled':
      case 'On Time': {
        return require('./../assets/ontime.png');
      }
      case 'Cancelled': {
        return require('./../assets/cancelled.png');
      }
      case 'Delayed': {
        return require('./../assets/delayed.png');
      }
    }
  };
  const getImageText = (status: string) => {
    let statusText;
    switch (status) {
      case 'Arrived': {
        statusText = 'Прибыл';
        break;
      }
      case 'Departed': {
        statusText = 'В пути';
        break;
      }
      case 'Scheduled':
      case 'On Time': {
        statusText = 'Вовремя';
        break;
      }
      case 'Cancelled': {
        statusText = 'Отменен';
        break;
      }
      case 'Delayed': {
        statusText = 'Отложен';
        break;
      }
    }
    return statusText;
  };
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        props.navigation.navigate(OnlineNames.Details, {flight: props.flight})
      }>
      <View style={styles.timeBox}>
        <Text style={styles.time}>
          {moment(props.flight.scheduled_arrival).format('HH:mm')}
        </Text>
        {props.showDate && (
          <Text style={styles.date}>
            {moment(props.flight.scheduled_arrival).format('DD/MM/YYYY')}
          </Text>
        )}
      </View>
      <View style={styles.line} />
      <View style={styles.airportsView}>
        <View style={styles.airports}>
          <Text
            style={
              styles.airportsText
            }>{`${props.flight.departure_city} (${props.flight.departure_airport})`}</Text>
          <Text
            style={
              styles.airportsText
            }>{`${props.flight.arrival_city} (${props.flight.arrival_airport})`}</Text>
        </View>
        <View style={styles.statusView}>
          <Image
            style={styles.statusIcon}
            width={30}
            height={30}
            source={getImage(props.flight.status)}
          />
          <Text style={styles.statusText}>
            {getImageText(props.flight.status)}
          </Text>
        </View>
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 50,
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
  line: {
    marginHorizontal: 7,
    borderWidth: 1,
    borderColor: 'black',
    height: '100%',
  },
  airportsView: {
    justifyContent: 'space-between',
    flex: 3,
    flexDirection: 'row',
  },
  airports: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    fontWeight: 'bold',
  },
  airportsText: {
    fontSize: 12,
  },
  statusView: {justifyContent: 'center', alignItems: 'center'},
  statusIcon: {width: 30, height: 30},
  statusText: {fontSize: 12},
});
