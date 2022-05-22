import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GlobalStyles} from '../GlobalStyles';
import {airportsAPI} from '../redux/servises';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {setRoutes} from '../redux/store';
import {CustomButton} from '../components/custom_button';
import {RoutesNames} from '../navigations/screens';
import {Route} from '../types';
import {SectionList} from 'react-native';
import moment from 'moment';

export const RoutesScreen = ({navigation}: any) => {
  const {data} = airportsAPI.useFetchRoutesQuery(null);
  const [straightRoutes, setStraightRoutes] = useState<Route[]>([]);
  const [transfersRoutes, setTransfersRoutes] = useState<Route[]>([]);
  const {routes, fromCity, toCity} = useAppSelector(state => state.online);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setRoutes(data));
  }, [data, dispatch]);

  useEffect(() => {
    if (fromCity && toCity) {
      setStraightRoutes(
        routes.filter(
          route =>
            route.departure_airport === fromCity.airport_code &&
            route.arrival_airport === toCity.airport_code,
        ),
      );
      const startAirportWays = routes.filter(
        airport =>
          airport.departure_airport === fromCity.airport_code &&
          airport.arrival_airport !== toCity.airport_code,
      );
      const ways: Route[] = [];

      startAirportWays.forEach(startWay => {
        const a = routes.filter(
          route =>
            startWay.arrival_airport === route.departure_airport &&
            route.arrival_airport === toCity.airport_code,
        );
        a.forEach(item => ways.push(item));
      });

      console.log(startAirportWays);
      setTransfersRoutes(ways);
    }
  }, [fromCity, routes, toCity]);

  const renderItem = (info: any) => {
    const {item}: {item: Route} = info;

    return (
      <View style={styles.renderItem}>
        <View style={{justifyContent: 'space-around'}}>
          <Text style={styles.time}>{`${moment(item.scheduled_departure).format(
            'HH:mm',
          )}`}</Text>
          <Text style={styles.time}>{`${moment(item.scheduled_arrival).format(
            'HH:mm',
          )}`}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.airportsView}>
          <View style={styles.airports}>
            <Text
              style={
                styles.airportsText
              }>{`${item.departure_city} (${item.departure_airport})`}</Text>
            <Text
              style={
                styles.airportsText
              }>{`${item.arrival_city} (${item.arrival_airport})`}</Text>
          </View>
          <View
            style={{
              justifyContent: 'space-around',
              alignItems: 'flex-end',
              // width: '30%',
            }}>
            <Text style={{fontSize: 12}}>{item.flight_no}</Text>
            <Text style={{fontSize: 12}}>{`${
              item.duration.hours ? item.duration.hours + ' ч.' : ''
            } ${
              item.duration.minutes ? item.duration.minutes + ' мин.' : ''
            }`}</Text>
          </View>
          <View
            style={{
              // justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
            <Text
              style={[
                styles.daysText,
                item.days_of_week.includes(1)
                  ? GlobalStyles.boldText
                  : styles.hide,
              ]}>
              ПН
            </Text>
            <Text
              style={[
                styles.daysText,
                item.days_of_week.includes(2)
                  ? GlobalStyles.boldText
                  : styles.hide,
              ]}>
              ВТ
            </Text>
            <Text
              style={[
                styles.daysText,
                item.days_of_week.includes(3)
                  ? GlobalStyles.boldText
                  : styles.hide,
              ]}>
              СР
            </Text>
            <Text
              style={[
                styles.daysText,
                item.days_of_week.includes(4)
                  ? GlobalStyles.boldText
                  : styles.hide,
              ]}>
              ЧТ
            </Text>
            <Text
              style={[
                styles.daysText,
                item.days_of_week.includes(5)
                  ? GlobalStyles.boldText
                  : styles.hide,
              ]}>
              ПТ
            </Text>
            <Text
              style={[
                styles.daysText,
                item.days_of_week.includes(6)
                  ? GlobalStyles.boldText
                  : styles.hide,
              ]}>
              СБ
            </Text>
            <Text
              style={[
                styles.daysText,
                item.days_of_week.includes(7)
                  ? GlobalStyles.boldText
                  : styles.hide,
              ]}>
              ВС
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={GlobalStyles.page}>
      <View style={styles.selectRow}>
        <Text style={styles.normalText}>{'Откуда:'}</Text>
        <View style={styles.currentRow}>
          <CustomButton
            title={
              fromCity
                ? `${fromCity.city}, ${fromCity.airport_code}`
                : 'Выберите город'
            }
            onPress={() =>
              navigation.navigate(RoutesNames.Cities, {type: 'from'})
            }
          />
        </View>
      </View>
      <View style={styles.selectRow}>
        <Text style={styles.normalText}>{'Куда:'}</Text>
        <View style={styles.currentRow}>
          <CustomButton
            title={
              toCity
                ? `${toCity.city}, ${toCity.airport_code}`
                : 'Выберите город'
            }
            onPress={() =>
              navigation.navigate(RoutesNames.Cities, {type: 'to'})
            }
          />
        </View>
      </View>
      {fromCity && toCity && (
        <SectionList
          sections={[
            {
              title: 'Прямые рейсы',
              data: straightRoutes,
            },
            // {
            //   title: 'С пересадками',
            //   // renderItem: info => (
            //   //   <View>
            //   //     <Text>123</Text>
            //   //   </View>
            //   // ),
            //   data: transfersRoutes,
            // },
          ]}
          renderItem={renderItem}
          renderSectionHeader={({section}) => (
            <Text style={styles.titleSection}>{`${section.title}:`}</Text>
          )}
          stickySectionHeadersEnabled
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
  },
  arrow: {},
  arrowRevert: {transform: [{rotate: '180deg'}]},
  currentRow: {
    marginLeft: 15,
    flex: 1,
    justifyContent: 'center',
  },
  normalText: {
    fontSize: 16,
  },
  selectRow: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  renderItem: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 15,
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 15,
  },
  titleSection: {
    backgroundColor: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    elevation: 4,
    // margin: 10,
    marginBottom: 0,
    borderRadius: 10,
  },
  line: {
    marginHorizontal: 7,
    borderWidth: 1,
    borderColor: 'black',
    height: '100%',
  },
  time: {
    fontSize: 14,
    fontWeight: 'bold',
    width: 50,
  },
  airportsView: {
    justifyContent: 'space-between',
    flex: 1,
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
  daysText: {
    fontSize: 8,
  },
  hide: {
    display: 'none',
  },
});
