import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {AirportList} from '../../components/airport_list';
import {GlobalStyles} from '../../GlobalStyles';

type AirportsScreenProps = {
  // airports: Airport[];
  navigation: any;
  route: any;
};

export const AirportsScreen: FC<AirportsScreenProps> = props => {
  return (
    <View style={[GlobalStyles.page, styles.screenEmpty]}>
      <AirportList navigation={props.navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  screenEmpty: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
