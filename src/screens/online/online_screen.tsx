import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Airport} from '../../../state/types';
import {OnlineNames} from '../../navigations/screens';
import {CustomButton} from '../../components/custom_button';
import {storeAirport} from '../../../state/storeAirport';
import {FlightsList} from '../../components/flights_list';

export const MainScreen = ({navigation}: {navigation: any}) => {
  const [currentAirport, setCurrentAirport] = useState<Airport | null>(null);

  storeAirport.subscribe(() => setCurrentAirport(storeAirport.getState()));

  return (
    <View style={styles.screen}>
      <View style={styles.selectAirport}>
        <Text style={styles.normalText}>{'Аэропорт:'}</Text>
        <View style={styles.currentAirport}>
          <CustomButton
            title={
              currentAirport
                ? `${currentAirport.airport_name} (${currentAirport.airport_code})`
                : 'Выберите Аэропорт'
            }
            onPress={() => navigation.navigate(OnlineNames.Airports)}
          />
        </View>
      </View>
      <View style={styles.line} />
      {!currentAirport ? (
        <View style={styles.empty}>
          <Text>Чтобы увидеть табло, выберите аэропорт</Text>
        </View>
      ) : (
        <FlightsList />
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
  selectAirport: {
    padding: 20,
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
  currentAirport: {
    marginLeft: 15,
    flex: 1,
    justifyContent: 'center',
  },
  normalText: {
    fontSize: 16,
  },
});
