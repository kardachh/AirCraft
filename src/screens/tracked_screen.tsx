import React, {useEffect, useState} from 'react';
import {useDB} from '../api/nativeApi/DatabaseStore';
import {FlightsList} from '../components/flights_list';
import {useAppSelector} from '../redux/hooks';
import {airportsAPI} from '../redux/servises';
import {Flight} from '../types';
import {StyleSheet, Text, View} from 'react-native';
import {GlobalStyles} from '../GlobalStyles';

export const TrackedScreen = ({navigation}: {navigation: any}) => {
  const {createFavoritesTable, getFavorites} = useDB();
  const {favoritesFlights} = useAppSelector(state => state.online);
  const {data} = airportsAPI.useFetchFlightInfoQuery(favoritesFlights);
  const [flights, setFlights] = useState<Flight[] | undefined>([]);

  /**
   *  при получении favoritesFlights: {flight_id: number}
   *  отправляется запрос useFetchFlightInfoQuery(favoritesFlights),
   *  который возвращает информацию по запрошенным рейсам (data)
   */
  console.log('favoritesFlights', favoritesFlights);

  useEffect(() => {
    // @ts-ignore
    data && !data.type ? setFlights(data) : setFlights([]);
  }, [data]);

  // Создание БД / получение данных
  useEffect(() => {
    createFavoritesTable().then();
    getFavorites().then();
  }, [createFavoritesTable, getFavorites]);

  return flights && flights.length !== 0 ? (
    <View style={GlobalStyles.page}>
      <FlightsList
        navigation={navigation}
        flightsData={flights}
        showDate={true}
      />
    </View>
  ) : (
    <View style={[GlobalStyles.page, styles.emptyPage]}>
      <Text style={styles.emptyPageText}>
        Чтобы добавить отслеживаемые рейсы необходимо на странице
        {'\n'}
        <Text style={GlobalStyles.boldText}>"Подробная информация"</Text>
        {'\n'}нажать на кнопку{'\n'}
        <Text style={GlobalStyles.boldText}>"Начать отслеживать"</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyPage: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10%',
  },
  emptyPageText: {textAlign: 'center'},
});
