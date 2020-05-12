import React from 'react';
import ErrorBoundary from 'react-native-error-boundary';

import 'react-native-gesture-handler';
import Routes from './src/Routes';

export default function App() {
  return (
    <ErrorBoundary>
      <Routes />
    </ErrorBoundary>
  );
}
