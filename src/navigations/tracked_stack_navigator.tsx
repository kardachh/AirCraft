import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TrackedScreen} from '../screens/tracked_screen';
import {TrackedNames} from './screens';
import {DetailsScreen} from '../screens/detail_screen';

type RootStackParamList = {
  TrackedScreen: undefined;
  DetailsScreen: undefined;
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
  </Stack.Navigator>
);
