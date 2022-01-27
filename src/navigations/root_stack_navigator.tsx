import React from 'react';
import {MainScreen} from '../screens/main_screen';
import {DetailsScreen} from '../screens/detail_screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

type RootStackParamList = {
  Main: undefined;
  Details: {userId: string};
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootStackNavigator = () => (
  <RootStack.Navigator initialRouteName="Main">
    <RootStack.Screen name="Main" component={MainScreen} />
    <RootStack.Screen
      name="Details"
      component={DetailsScreen}
      initialParams={{userId: '451'}}
    />
  </RootStack.Navigator>
);
