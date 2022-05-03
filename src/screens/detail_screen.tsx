import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomButton} from '../components/custom_button';
import {useAppSelector} from '../redux/hooks';
import {Flight} from '../types';
import {useDB} from '../api/nativeApi/DatabaseStore';

type DetailScreenProps = {
  navigation?: any;
  route?: any;
};

export const DetailsScreen: FC<DetailScreenProps> = props => {
  const {addToFavorites, deleteFromFavorites} = useDB();
  const {favoritesFlights} = useAppSelector(state => state.online);
  const {flight}: {flight: Flight} = props.route.params;
  const [tracked, setTracked] = useState<boolean>();
  useEffect(() => {
    setTracked(favoritesFlights.includes(flight.flight_id));
  }, [favoritesFlights, flight.flight_id]);

  return (
    <View style={styles.screenEmpty}>
      <CustomButton
        title={tracked ? 'Удалить из отслеживаемых' : 'Начать отслеживать'}
        onPress={
          tracked
            ? () => deleteFromFavorites(flight.flight_id)
            : () => addToFavorites(flight.flight_id)
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
