import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import ErrorBoundary from 'react-native-error-boundary';

import 'react-native-gesture-handler';
import Routes from './src/Routes';

function useFonts(fontMap) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  (async () => {
    await Font.loadAsync(fontMap);
    setFontsLoaded(true);
  })();
  return [fontsLoaded];
}

export default function App() {
  const [fontsLoaded] = useFonts({
    nexaBold: require('./assets/fonts/NexaBold.ttf'),
    nexaLight: require('./assets/fonts/NexaLight.ttf')
  });

  if (fontsLoaded === false) {
    return <AppLoading />;
  } else {
    return (
      <ErrorBoundary>
        <Routes />
      </ErrorBoundary>
    );
  }
}
