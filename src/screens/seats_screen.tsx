import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GlobalStyles} from '../GlobalStyles';
import Loader from '../components/Loader';
import SelectDropdown from 'react-native-select-dropdown';
import {airportsAPI} from '../redux/servises';

export const CheckSeatScreen = ({route}: any) => {
  const {data: dataSeats, isFetching: isFetchingSeats} =
    airportsAPI.useFetchSeatsQuery(route.params.flight.aircraft_code);

  const [selectedSeat, setSelectedSeat] = useState(undefined);

  const {data: dataAvailable, isFetching: isFetchingAvailable} =
    airportsAPI.useFetchAvailableSeatQuery({
      flight_id: route.params.flight.flight_id,
      seat_no: selectedSeat,
    });

  return (
    <View style={GlobalStyles.page}>
      {/*Добавить лоудер*/}
      <Loader isDataLoaded={!isFetchingSeats && !isFetchingAvailable} />
      {dataSeats && (
        <View style={styles.page}>
          <View style={styles.pageView}>
            <Text style={styles.selectText}>Выберите место в самолете:</Text>
            <SelectDropdown
              dropdownOverlayColor={''}
              defaultButtonText={' '}
              buttonStyle={styles.select}
              dropdownStyle={styles.dropdown}
              data={dataSeats}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                setSelectedSeat(selectedItem.seat_no);
              }}
              buttonTextAfterSelection={selectedItem => selectedItem.seat_no}
              rowTextForSelection={item => item.seat_no}
            />
          </View>
          {selectedSeat && dataAvailable && (
            <View style={styles.checkView}>
              <Text style={styles.checkText}>
                {`Место ${selectedSeat}\n`}
                <Text style={GlobalStyles.boldText}>
                  {dataAvailable.length !== 0 ? 'Занято' : 'Свободно'}
                </Text>
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pageView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  page: {
    flex: 1,
    padding: 10,
  },
  select: {
    backgroundColor: 'white',
    height: 50,
    width: 80,
    borderWidth: 1,
    borderRadius: 15,
  },
  dropdown: {height: '65%', borderRadius: 15},
  selectText: {
    fontSize: 16,
  },
  checkText: {
    fontSize: 20,
  },
  checkView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
