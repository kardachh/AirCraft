import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CustomButton} from '../components/custom_button';
import {useAppSelector} from '../redux/hooks';
import {Flight} from '../types';
import {useDB} from '../api/nativeApi/DatabaseStore';
import moment from 'moment';
import {GlobalStyles} from '../GlobalStyles';
import {OnlineNames} from '../navigations/screens';

type DetailScreenProps = {
  navigation?: any;
  route?: any;
};

export const DetailsScreen: FC<DetailScreenProps> = props => {
  const {addToFavorites, deleteFromFavorites} = useDB();
  const {favoritesFlights} = useAppSelector(state => state.online);
  const {flight}: {flight: Flight} = props.route.params;
  const [tracked, setTracked] = useState<boolean>();

  useEffect(() => {
    setTracked(favoritesFlights.includes(flight.flight_id));
  }, [favoritesFlights, flight.flight_id]);

  const getStatusText = (status: string) => {
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
    <View style={[GlobalStyles.page, styles.page]}>
      <View style={styles.detailsView}>
        <View style={styles.detailsBlockView}>
          <View style={styles.detailsColumn}>
            <Text style={styles.hintText}>Вылет</Text>
            <Text style={styles.text}>
              {`${flight.departure_city}\n(${flight.departure_airport_name})`}
            </Text>
          </View>
          <View style={styles.detailsColumn}>
            <Text style={styles.hintText}>Прилет</Text>
            <Text style={styles.text}>
              {`${flight.arrival_city}\n(${flight.arrival_airport_name})`}
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
            <Text style={[styles.hintText, GlobalStyles.boldText]}>
              Номер рейса
            </Text>
            <Text style={[styles.text, GlobalStyles.boldText]}>
              {flight.flight_no}
            </Text>
          </View>
          <View style={styles.detailsColumn}>
            <Text style={styles.hintText}>{'Время вылета\n(фактическое)'}</Text>
            {flight.actual_departure ? (
              <View>
                <Text style={styles.text}>
                  {moment(flight.actual_departure).format('hh:mm')}
                </Text>
                <Text style={styles.text}>
                  {moment(flight.actual_departure).format('DD.MM.YYYY')}
                </Text>
              </View>
            ) : (
              <Text style={styles.detailsEmptyDateText}>Не вылетел</Text>
            )}
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
            <Text style={[styles.hintText, GlobalStyles.boldText]}>
              Статус рейса
            </Text>
            <Text style={[styles.text, GlobalStyles.boldText]}>
              {getStatusText(flight.status)}
            </Text>
          </View>
          <View style={styles.detailsColumn}>
            <Text style={styles.hintText}>
              {'Время прилета\n(фактическое)'}
            </Text>
            {flight.actual_arrival ? (
              <View>
                <Text style={styles.text}>
                  {moment(flight.actual_arrival).format('hh:mm')}
                </Text>
                <Text style={styles.text}>
                  {moment(flight.actual_arrival).format('DD.MM.YYYY')}
                </Text>
              </View>
            ) : (
              <Text style={styles.detailsEmptyDateText}>
                {flight.actual_departure ? 'В пути' : 'Не вылетел'}
              </Text>
            )}
          </View>
        </View>
      </View>
      <CustomButton
        style={styles.schemaButton}
        title={'Схема самолета'}
        onPress={() => {
          props.navigation.navigate(OnlineNames.Scheme);
        }}
      />
      <CustomButton
        style={styles.trackButton}
        title={tracked ? 'Удалить из отслеживаемых' : 'Начать отслеживать'}
        onPress={
          tracked
            ? () => deleteFromFavorites(flight.flight_id)
            : () => addToFavorites(flight.flight_id)
        }
      />
      {flight.status === 'Scheduled' || flight.status === 'On Time' ? (
        <CustomButton
          style={styles.checkSeatButton}
          title={'Проверить доступность мест'}
          onPress={() => {
            props.navigation.navigate(OnlineNames.CheckSeat, {flight: flight});
          }}
        />
      ) : (
        <View />
      )}
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
  detailsEmptyDateText: {
    textAlign: 'center',
  },
  line: {
    borderWidth: 0.5,
    borderColor: '#909090',
    marginVertical: 15,
    marginHorizontal: '20%',
  },
  checkSeatButton: {
    position: 'absolute',
    bottom: 20,
    marginHorizontal: '10%',
  },
  trackButton: {
    position: 'absolute',
    bottom: 60,
    marginHorizontal: '10%',
  },
  schemaButton: {
    position: 'absolute',
    bottom: 100,
    marginHorizontal: '10%',
  },
});
