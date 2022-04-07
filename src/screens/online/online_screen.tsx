import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {OnlineNames} from '../../navigations/screens';
import {CustomButton} from '../../components/custom_button';
import {FlightsList} from '../../components/flights_list';
import {useAppSelector} from '../../redux/hooks';

export const MainScreen = ({navigation}: {navigation: any}) => {
  const {selectedAirport, airports} = useAppSelector(state => state.online);
  useEffect(() => {
    // const {getAirports} = useBackend();
    // const getInfo = () => {
    //   getAirports()
    //     .then(res => {
    //       let collator = new Intl.Collator();
    //       res.sort((a, b) => collator.compare(a.airport_name, b.airport_name));
    //       setAirports(res);
    //     })
    //     .catch(err => console.log(`ERROR\n${err}`));
    // };
    // getInfo();
  }, []);

  // store.subscribe(() => setCurrentAirport(store.getState()));

  return (
    <View style={styles.screen}>
      <View style={styles.selectAirport}>
        <Text style={styles.normalText}>{'Аэропорт:'}</Text>
        <View style={styles.currentAirport}>
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
      <View style={styles.line} />
      {!selectedAirport ? (
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
