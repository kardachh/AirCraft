import React from 'react';
import {TabNavigator} from './src/navigations/navigation';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {storeAirport} from './state/storeAirport';

const App = () => {
  return (
    <Provider store={storeAirport}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
