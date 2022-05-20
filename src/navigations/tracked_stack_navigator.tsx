import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TrackedScreen} from '../screens/tracked_screen';
import {TrackedNames} from './screens';
import {DetailsScreen} from '../screens/detail_screen';
import {SchemeScreen} from '../screens/scheme_screen';
import {CheckSeatScreen} from '../screens/seats_screen';

type RootStackParamList = {
  TrackedScreen: undefined;
  DetailsScreen: undefined;
  SchemeScreen: undefined;
  CheckSeatScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const getNavigatorOptions = (title: string, props?: any) => {
  return () => ({
    headerTitleAllowFontScaling: true,
    headerTitle: title,
    headerBackTitle: ' ',
    headerTintColor: 'black',
    headerShown: true,
    ...props,
  });
};

export const TrackedStackNavigator = () => (
  <Stack.Navigator initialRouteName="TrackedScreen">
    <Stack.Screen
      name={TrackedNames.Tracked}
      component={TrackedScreen}
      options={getNavigatorOptions('Отслеживаемые')}
    />
    <Stack.Screen
      name={TrackedNames.Details}
      component={DetailsScreen}
      options={getNavigatorOptions('Подробная информация')}
    />
    <Stack.Screen
      name={TrackedNames.Scheme}
      component={SchemeScreen}
      options={getNavigatorOptions('Схема самолета')}
    />
    <Stack.Screen
      name={TrackedNames.CheckSeat}
      component={CheckSeatScreen}
      options={getNavigatorOptions('Проверка места')}
    />
  </Stack.Navigator>
);
