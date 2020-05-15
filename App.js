/* eslint-disable */
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import { StatusBar, AsyncStorage } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';

import 'react-native-gesture-handler';
import Routes from './src/Routes';
import AuthProvider from './src/context/store/user';

function useFonts(fontMap) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  (async () => {
    await Font.loadAsync(fontMap);
    setFontsLoaded(true);
  })();
  return [fontsLoaded];
}

export default function App() {
  StatusBar.setBarStyle('dark-content', true);
  const [fontsLoaded] = useFonts({
    nexaBold: require('./assets/fonts/NexaBold.ttf'),
    nexaLight: require('./assets/fonts/NexaLight.ttf')
  });

  // useEffect(() => {
  //   AsyncStorage.removeItem('token');
  // }, []);

  if (fontsLoaded === false) {
    return <AppLoading />;
  } else {
    return (
      <ErrorBoundary>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ErrorBoundary>
    );
  }
}
