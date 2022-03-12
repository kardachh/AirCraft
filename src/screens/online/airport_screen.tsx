import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Backend} from '../../api/network/backend';
import {Airport} from '../../../state/types';
import {AirportList} from '../../components/airport_list';

type AirportsScreenProps = {
  navigation: any;
  route: any;
};

const sortAirports = (airportsRaw: Airport[]) => {
  let collator = new Intl.Collator();

  return airportsRaw.sort(function (a, b) {
    return collator.compare(a.airport_name, b.airport_name);
  });
};

export const AirportsScreen: FC<AirportsScreenProps> = props => {
  const [airports, setAirports] = useState<Airport[]>([]);

  useEffect(() => {
    const {getAirports} = Backend();
    const getInfo = () => {
      getAirports()
        .then(res => setAirports(sortAirports(res)))
        .catch(err => console.log(`ERROR\n${err}`));
    };
    getInfo();
  }, []);

  return (
    <View style={styles.screen}>
      <AirportList
        navigation={props.navigation}
        route={props.route}
        airports={airports}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
