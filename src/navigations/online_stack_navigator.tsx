import React from 'react';
import {MainScreen} from '../screens/online/online_screen';
import {DetailsScreen} from '../screens/online/detail_screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OnlineNames} from './screens';
import {AirportsScreen} from '../screens/online/airport_screen';
import {CalendarScreen} from '../screens/online/calendar_screen';

type RootStackParamList = {
  OnlineTableScreen: undefined;
  DetailsScreen: {userId: string};
  AirportsScreen: {};
  CalendarScreen: {};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const getNavigatorOptions = (title: string) => {
  return () => ({
    headerTitleAllowFontScaling: true,
    headerTitle: title,
    headerBackTitle: ' ',
    // headerTitleStyle: GlobalStackStyle.tabTitle,
    headerTintColor: 'black',
    headerShown: true,
  });
};

// const ScreenNavigationOptions = ({navigation}) => ({
//   headerShown: true,
//   headerTitle: 'Профиль',
// headerTitleStyle: GlobalStackStyle.tabTitle,
// headerTintColor: GlobalStackStyle.tabTintColor.color,
// headerRight: () => (
//   <Notifications
//     onPress={() => navigation.navigate(NotificationsPageScreen)}
//   />
// ),
// });

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
  </Stack.Navigator>
);
