import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import HomeScreen from './views/Home';

function Routes() {
  return (
    <NavigationContainer>
      <HomeScreen />
    </NavigationContainer>
  );
}

export default Routes;
