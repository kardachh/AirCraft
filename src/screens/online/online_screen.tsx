import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {OnlineNames} from '../../navigations/screens';
import {CustomButton} from '../../components/custom_button';
import {FlightsList} from '../../components/flights_list';
import {useAppSelector} from '../../redux/hooks';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

export const MainScreen = ({navigation}: {navigation: any}) => {
  const {selectedAirport, selectedDate} = useAppSelector(state => state.online);
  return (
    <View style={styles.screen}>
      <View style={styles.selectRow}>
        <Text style={styles.normalText}>{'Аэропорт:'}</Text>
        <View style={styles.currentRow}>
          <CustomButton
            title={
              selectedAirport
                ? `${selectedAirport.airport_name} (${selectedAirport.airport_code})`
                : 'Выберите Аэропорт'
            }
            onPress={() => navigation.navigate(OnlineNames.Airports)}
          />
        </View>
      </View>
      <View style={styles.selectRow}>
        <Text style={styles.normalText}>{'Дата:'}</Text>
        <View style={styles.currentRow}>
          <CustomButton
            title={`${moment(selectedDate, 'YYYY-MM-DD').format('LL')}`}
            onPress={() => navigation.navigate(OnlineNames.Calendar)}
          />
        </View>
      </View>
      {!selectedAirport ? (
        <View style={styles.empty}>
          <Text>Чтобы увидеть табло, выберите аэропорт</Text>
        </View>
      ) : (
        <FlightsList navigation={navigation} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  line: {
    borderWidth: 1,
  },
  selectRow: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  empty: {
    flex: 1,
    // height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentRow: {
    marginLeft: 15,
    flex: 1,
    justifyContent: 'center',
  },
  normalText: {
    fontSize: 16,
  },
});
