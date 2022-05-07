import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CustomButton} from '../components/custom_button';
import {useAppSelector} from '../redux/hooks';
import {Flight} from '../types';
import {useDB} from '../api/nativeApi/DatabaseStore';
import moment from 'moment';
import {GlobalStyles} from '../GlobalStyles';

type DetailScreenProps = {
  navigation?: any;
  route?: any;
};

export const DetailsScreen: FC<DetailScreenProps> = props => {
  const {addToFavorites, deleteFromFavorites} = useDB();
  const airports = useAppSelector(state => state.online.airports);
  const {favoritesFlights} = useAppSelector(state => state.online);
  const {flight}: {flight: Flight} = props.route.params;
  const [tracked, setTracked] = useState<boolean>();

  console.log(flight);

  useEffect(() => {
    setTracked(favoritesFlights.includes(flight.flight_id));
  }, [favoritesFlights, flight.flight_id]);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Arrived': {
        return 'Прибыл';
      }
      case 'Departed': {
        return 'В пути';
      }
      case 'Scheduled':
      case 'On Time': {
        return 'Вовремя';
      }
      case 'Cancelled': {
        return 'Отменен';
      }
      case 'Delayed': {
        return 'Отложен';
      }
    }
  };

  return (
    <View style={[GlobalStyles.page, styles.page]}>
      <View style={styles.detailsView}>
        <View style={styles.detailsBlockView}>
          <View style={styles.detailsColumn}>
            <Text style={styles.hintText}>Вылет</Text>
            <Text style={styles.text}>
              {
                airports.find(
                  airport => airport.airport_code === flight.departure_airport,
                )!.airport_name
              }
            </Text>
          </View>
          <View style={styles.detailsColumn}>
            <Text style={styles.hintText}>Прилет</Text>
            <Text style={styles.text}>
              {
                airports.find(
                  airport => airport.airport_code === flight.arrival_airport,
                )!.airport_name
              }
            </Text>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.detailsBlockView}>
          <View style={styles.detailsColumn}>
            <Text style={styles.hintText}>
              {'Время вылета\n(по расписанию)'}
            </Text>
            <Text style={styles.text}>
              {moment(flight.scheduled_departure).format('hh:mm')}
            </Text>
            <Text style={styles.text}>
              {moment(flight.scheduled_departure).format('DD.MM.YYYY')}
            </Text>
          </View>
          <View style={styles.detailsColumn}>
            <Text style={[styles.hintText, {fontWeight: 'bold'}]}>
              Номер рейса
            </Text>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>
              {flight.flight_no}
            </Text>
          </View>
          <View style={styles.detailsColumn}>
            <Text style={styles.hintText}>{'Время вылета\n(фактическое)'}</Text>
            <Text style={styles.text}>
              {moment(flight.actual_departure).format('hh:mm')}
            </Text>
            <Text style={styles.text}>
              {moment(flight.actual_departure).format('DD.MM.YYYY')}
            </Text>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.detailsBlockView}>
          <View style={styles.detailsColumn}>
            <Text style={styles.hintText}>
              {'Время прилета\n(по расписанию)'}
            </Text>
            <Text style={styles.text}>
              {moment(flight.scheduled_arrival).format('hh:mm')}
            </Text>
            <Text style={styles.text}>
              {moment(flight.scheduled_arrival).format('DD.MM.YYYY')}
            </Text>
          </View>
          <View style={styles.detailsColumn}>
            <Text style={styles.hintText}>Статус рейса</Text>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>
              {getStatusText(flight.status)}
            </Text>
          </View>
          <View style={styles.detailsColumn}>
            <Text style={styles.hintText}>
              {'Время прилета\n(фактическое)'}
            </Text>
            <Text style={styles.text}>
              {moment(flight.actual_arrival).format('hh:mm')}
            </Text>
            <Text style={styles.text}>
              {moment(flight.actual_arrival).format('DD.MM.YYYY')}
            </Text>
          </View>
        </View>
      </View>
      <CustomButton
        style={styles.trackButton}
        title={tracked ? 'Удалить из отслеживаемых' : 'Начать отслеживать'}
        onPress={
          tracked
            ? () => deleteFromFavorites(flight.flight_id)
            : () => addToFavorites(flight.flight_id)
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  hintText: {
    fontSize: 10,
    textTransform: 'uppercase',
    color: '#909090',
    textAlign: 'center',
    paddingBottom: 5,
  },
  detailsView: {marginVertical: 15},
  detailsBlockView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 5,
  },
  detailsColumn: {
    margin: 10,
    flexDirection: 'column',
  },
  line: {
    borderWidth: 0.5,
    borderColor: '#909090',
    marginVertical: 15,
    marginHorizontal: '20%',
  },
  trackButton: {
    position: 'absolute',
    bottom: 30,
    marginHorizontal: '10%',
  },
});
