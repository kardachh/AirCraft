import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {OnlineStackNavigator} from './online_stack_navigator';
import {TabNames} from './screens';
import {FAQScreen} from '../screens/faq_screen';
import {Fly} from '../assets/on_air';
import {Calendar} from '../assets/calendar';
import {Helpdesk} from '../assets/helpdesk';
import {TrackedStackNavigator} from './tracked_stack_navigator';
import {airportsAPI} from '../redux/servises';
import {useAppDispatch} from '../redux/hooks';
import {setAirports} from '../redux/store';
import {HelpStackNavigator} from './help_stack_navigator';

const Tab = createBottomTabNavigator();

const getIconColor = (focused: boolean) => {
  return focused ? '#333333' : '#BDBDBD';
};

export const TabNavigator = () => {
  const {data} = airportsAPI.useFetchAirportsQuery('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAirports(data));
  }, [data, dispatch]);

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name={TabNames.OnlineTable}
        component={OnlineStackNavigator}
        options={{
          title: 'Онлайн-табло',
          tabBarActiveTintColor: 'black',
          tabBarIcon: ({focused}) => <Calendar color={getIconColor(focused)} />,
        }}
      />
      <Tab.Screen
        name={TabNames.Tracked}
        component={TrackedStackNavigator}
        options={{
          title: 'Отслеживаемые',
          tabBarActiveTintColor: 'black',
          tabBarIcon: ({focused}) => <Fly color={getIconColor(focused)} />,
        }}
      />
      <Tab.Screen
        name={TabNames.HelpDesk}
        component={HelpStackNavigator}
        options={{
          title: 'FAQ',
          tabBarActiveTintColor: 'black',
          tabBarIcon: ({focused}) => <Helpdesk color={getIconColor(focused)} />,
        }}
      />
    </Tab.Navigator>
  );
};
