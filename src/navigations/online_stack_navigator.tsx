import React from 'react';
import {MainScreen} from '../screens/online/online_screen';
import {DetailsScreen} from '../screens/detail_screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OnlineNames} from './screens';
import {AirportsScreen} from '../screens/online/airport_screen';
import {CalendarScreen} from '../screens/online/calendar_screen';
import {SchemeScreen} from '../screens/scheme_screen';
import {CheckSeatScreen} from '../screens/seats_screen';

type RootStackParamList = {
  OnlineTableScreen: undefined;
  DetailsScreen: undefined;
  AirportsScreen: undefined;
  CalendarScreen: undefined;
  SchemeScreen: undefined;
  CheckSeatScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const getNavigatorOptions = (title: string, props?: any) => {
  return () => ({
    headerTitleAllowFontScaling: true,
    headerTitle: title,
    headerBackTitle: ' ',
    // headerTitleStyle: GlobalStackStyle.tabTitle,
    headerTintColor: 'black',
    headerShown: true,
    ...props,
  });
};

export const OnlineStackNavigator = () => (
  <Stack.Navigator initialRouteName="OnlineTableScreen">
    <Stack.Screen
      name={OnlineNames.OnlineTable}
      component={MainScreen}
      options={getNavigatorOptions('Онлайн-табло')}
    />
    <Stack.Screen
      name={OnlineNames.Airports}
      component={AirportsScreen}
      options={getNavigatorOptions('Аэропорты')}
    />
    <Stack.Screen
      name={OnlineNames.Details}
      component={DetailsScreen}
      options={getNavigatorOptions('Подробная информация')}
    />
    <Stack.Screen
      name={OnlineNames.Calendar}
      component={CalendarScreen}
      options={getNavigatorOptions('Календарь')}
    />
    <Stack.Screen
      name={OnlineNames.Scheme}
      component={SchemeScreen}
      options={getNavigatorOptions('Схема самолета')}
    />
    <Stack.Screen
      name={OnlineNames.CheckSeat}
      component={CheckSeatScreen}
      options={getNavigatorOptions('Схема самолета')}
    />
  </Stack.Navigator>
);
