import React, {FC, useCallback} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Airport} from '../../state/types';
import {storeAirport} from '../../state/storeAirport';
import {AIRPORT_ACTION_TYPES} from '../../state/airport/actions';

type AirportListProps = {
  navigation?: any;
  route: any;
  airports: Airport[];
};
export const AirportList: FC<AirportListProps> = props => {
  const renderItem = useCallback(
    ({item}: {item: Airport}) => {
      return (
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            // props.changeAirport();
            storeAirport.dispatch({
              type: AIRPORT_ACTION_TYPES.SELECT_AIRPORT,
              airportData: item,
            });
            props.navigation.goBack();
          }}>
          <Text>{`${item.airport_name} (${item.airport_code})`}</Text>
        </TouchableOpacity>
      );
    },
    [props],
  );

  return (
    <FlatList
      data={props.airports}
      renderItem={renderItem}
      keyExtractor={item => item.airport_code}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
  },
});
