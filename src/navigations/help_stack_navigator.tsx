import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HelpNames} from './screens';
import {FAQScreen} from '../screens/faq_screen';

type RootStackParamList = {
  FAQScreen: undefined;
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

export const HelpStackNavigator = () => (
  <Stack.Navigator initialRouteName="FAQScreen">
    <Stack.Screen
      name={HelpNames.FAQ}
      component={FAQScreen}
      options={getNavigatorOptions('Часто задаваемые вопросы')}
    />
  </Stack.Navigator>
);
