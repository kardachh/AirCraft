import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {OnlineStackNavigator} from './online_stack_navigator';
import {TrackedScreen} from '../screens/tracked_screen';
import {TabNames} from './screens';
import {HelpDeskScreen} from '../screens/helpdesk_screen';
import {Fly} from '../assets/on_air';

const Tab = createBottomTabNavigator();

const getIconColor = (focused: boolean) => {
  return focused ? '#333333' : '#BDBDBD';
};

export const TabNavigator = () => (
  <Tab.Navigator screenOptions={{headerShown: false}}>
    <Tab.Screen
      name={TabNames.OnlineTable}
      component={OnlineStackNavigator}
      options={{title: 'Онлайн-табло'}}
    />
    <Tab.Screen
      name={TabNames.Tracked}
      component={TrackedScreen}
      options={{
        title: 'Отслеживаемые',
        tabBarIcon: ({focused}) => <Fly color={getIconColor(focused)} />,
      }}
    />
    <Tab.Screen
      name={TabNames.HelpDesk}
      component={HelpDeskScreen}
      options={{
        title: 'Помощь',
      }}
    />
  </Tab.Navigator>
);
