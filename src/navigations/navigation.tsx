import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {OnlineStackNavigator} from './online_stack_navigator';
import {TabNames} from './screens';
import {Fly} from '../assets/on_air';
import {Calendar} from '../assets/calendar';
import {TrackedStackNavigator} from './tracked_stack_navigator';
import {airportsAPI} from '../redux/servises';
import {useAppDispatch} from '../redux/hooks';
import {setAirports, setRoutes} from '../redux/store';
import {HelpStackNavigator} from './help_stack_navigator';
import FAQ from '../assets/faq';
import RoutesIcon from '../assets/routes';
import {RoutesStackNavigator} from './routes_stack_navigator';

const Tab = createBottomTabNavigator();

const getIconColor = (focused: boolean) => {
  return focused ? '#333333' : '#BDBDBD';
};

export const TabNavigator = () => {
  const {data: dataAirports} = airportsAPI.useFetchAirportsQuery(null);
  const {data: dataRoutes} = airportsAPI.useFetchRoutesQuery(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAirports(dataAirports));
    dispatch(setRoutes(dataRoutes));
  }, [dataAirports, dataRoutes, dispatch]);

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
        name={TabNames.Routes}
        component={RoutesStackNavigator}
        options={{
          title: 'Рейсы',
          tabBarActiveTintColor: 'black',
          tabBarIcon: ({focused}) => (
            <RoutesIcon color={getIconColor(focused)} />
          ),
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
          tabBarIcon: ({focused}) => <FAQ color={getIconColor(focused)} />,
        }}
      />
    </Tab.Navigator>
  );
};
