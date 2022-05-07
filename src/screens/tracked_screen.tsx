import React, {useEffect, useState} from 'react';
import {useDB} from '../api/nativeApi/DatabaseStore';
import {FlightsList} from '../components/flights_list';
import {useAppSelector} from '../redux/hooks';
import {airportsAPI} from '../redux/servises';
import {Flight} from '../types';
import {View} from 'react-native';
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

  useEffect(() => {
    setFlights(data);
  }, [data]);

  // Создание БД / получение данных
  useEffect(() => {
    // dropTable();
    createFavoritesTable().then();
    getFavorites().then();
    // addToFavorites({flight_id: 1337});
  }, [createFavoritesTable, getFavorites]);

  return (
    <View style={GlobalStyles.page}>
      <FlightsList
        navigation={navigation}
        flightsData={flights}
        showDate={true}
      />
    </View>
  );
};
