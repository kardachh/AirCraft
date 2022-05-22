import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {RoutesNames} from './screens';
import {RoutesScreen} from '../screens/routes_screen';
import {CitiesScreen} from '../screens/city_screen';

type RootStackParamList = {
  RoutesScreen: undefined;
  CitiesScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const getNavigatorOptions = (title: string) => {
  return () => ({
    headerTitleAllowFontScaling: true,
    headerTitle: title,
    headerBackTitle: ' ',
    headerTintColor: 'black',
    headerShown: true,
  });
};

export const RoutesStackNavigator = () => (
  <Stack.Navigator initialRouteName="RoutesScreen">
    <Stack.Screen
      name={RoutesNames.Routes}
      component={RoutesScreen}
      options={getNavigatorOptions('Рейсы')}
    />
    <Stack.Screen
      name={RoutesNames.Cities}
      component={CitiesScreen}
      options={getNavigatorOptions('Рейсы')}
    />
  </Stack.Navigator>
);
