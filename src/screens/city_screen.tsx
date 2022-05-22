import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {GlobalStyles} from '../GlobalStyles';
import {AirportList} from '../components/airport_list';

type AirportsScreenProps = {
  navigation: any;
  route: any;
};

export const CitiesScreen: FC<AirportsScreenProps> = props => {
  return (
    <View style={[GlobalStyles.page, styles.screenEmpty]}>
      <AirportList
        navigation={props.navigation}
        type={props.route.params.type}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenEmpty: {
    flex: 1,
    paddingHorizontal: 20,
  },
  item: {
    paddingVertical: 10,
  },
});
