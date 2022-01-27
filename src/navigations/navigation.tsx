import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStackNavigator} from './root_stack_navigator';
import {FeedScreen} from '../screens/feed_screen';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => (
  <Tab.Navigator screenOptions={{headerShown: false}}>
    <Tab.Screen name={'Root'} component={RootStackNavigator} />
    <Tab.Screen name={'Feed'} component={FeedScreen} />
  </Tab.Navigator>
);
